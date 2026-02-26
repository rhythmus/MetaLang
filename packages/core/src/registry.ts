import type {
    Concept, Domain, PluginManifest, LinguisticMapping,
    ResolvedLinguisticMapping, SearchOptions, SearchResult, PluginDescriptor
} from '@metalang/schema';

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

export class Registry {
    private concepts: Map<string, Concept> = new Map();
    private domains: Map<string, Domain> = new Map();
    private tagSystems: Map<string, PluginManifest> = new Map();
    private linguisticMappings: Map<string, Map<string, LinguisticMapping>> = new Map(); // systemId -> ML_ID -> mapping

    // --- Core Management ---

    /**
     * Load concepts and domains from TSV data strings.
     */
    public loadTSVData(domainsTsv: string, conceptsTsv: string | string[]): void {
        this.parseDomainsTSV(domainsTsv).forEach(d => this.domains.set(d.id, d));
        const conceptsContents = Array.isArray(conceptsTsv) ? conceptsTsv : [conceptsTsv];
        conceptsContents.forEach(content => {
            this.parseConceptsTSV(content).forEach(c => this.concepts.set(c.id, c));
        });
    }

    /**
     * Load the entire registry state from a JSON seed object.
     */
    public loadSeed(seed: any): void {
        if (seed.domains) {
            seed.domains.forEach((d: Domain) => this.domains.set(d.id, d));
        }
        if (seed.concepts) {
            seed.concepts.forEach((c: Concept) => this.concepts.set(c.id, c));
        }
    }

    private parseDomainsTSV(content: string): Domain[] {
        const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#')).slice(1);
        return lines.map(line => {
            const parts = line.split('\t').map(s => s.trim());
            return {
                wikidata: parts[0] || '',
                parent: parts[1] || '',
                id: parts[2] || '',
                label: parts[3] || ''
            };
        });
    }

    private parseConceptsTSV(content: string): Concept[] {
        const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#')).slice(1);
        return lines.map(line => {
            const parts = line.split('\t').map(s => s.trim());
            const wikidata = parts[0] || '';
            const parent = parts[1] || '';
            const id = parts[2] || '';
            const label = parts[3] || '';

            // Derive domain from ML_ID (e.g. ML_POS_NOUN -> POS)
            const idParts = id.split('_');
            const domain = idParts.length >= 2 ? idParts[1] : 'CUSTOM';

            return {
                domain: domain || 'CUSTOM',
                parent: parent ? parent.split(',').map(p => p.trim()) : [],
                wikidata,
                id,
                label
            };
        });
    }

    /**
     * Register an external tag system (plugin).
     */
    public registerTagSystem(manifest: PluginManifest): void {
        this.tagSystems.set(manifest.descriptor.id, manifest);

        const systemLinguisticMappings = new Map<string, LinguisticMapping>();

        // Process mappings
        for (const [tag, value] of Object.entries(manifest.mappings)) {
            if (typeof value === 'object' && !Array.isArray(value)) {
                // Rich LinguisticMapping
                const lm = value as LinguisticMapping;
                systemLinguisticMappings.set(lm.id, lm);

                // Add abbreviations (with automatic dot-stripping)
                if (lm.abbreviations) {
                    const allAbbrs = new Set<string>();
                    for (const abbr of lm.abbreviations) {
                        allAbbrs.add(abbr);
                        if (abbr.includes('.') && abbr.endsWith('.')) {
                            allAbbrs.add(abbr.replace(/\.+$/, ''));
                        }
                    }
                    for (const abbr of allAbbrs) {
                        this.addInternalMapping(manifest.descriptor.id, abbr, lm.id);
                    }
                }

                // Add singular/plural forms
                if (lm.singular) {
                    const terms = Array.isArray(lm.singular) ? lm.singular : [lm.singular];
                    for (const term of terms) this.addInternalMapping(manifest.descriptor.id, term, lm.id);
                }
                if (lm.plural) {
                    const terms = Array.isArray(lm.plural) ? lm.plural : [lm.plural];
                    for (const term of terms) this.addInternalMapping(manifest.descriptor.id, term, lm.id);
                }
            } else {
                // Flat mapping (string or string[])
                const conceptIds = Array.isArray(value) ? value : [value];
                for (const id of conceptIds) {
                    this.addInternalMapping(manifest.descriptor.id, tag, id);
                }
            }
        }

        if (systemLinguisticMappings.size > 0) {
            this.linguisticMappings.set(manifest.descriptor.id, systemLinguisticMappings);
        }
    }

    private addInternalMapping(systemId: string, tag: string, conceptId: string): void {
        const manifest = this.tagSystems.get(systemId);
        if (!manifest) return;

        const existing = manifest.mappings[tag];
        if (!existing) {
            manifest.mappings[tag] = conceptId;
        } else if (typeof existing === 'string' || Array.isArray(existing)) {
            const ids = Array.isArray(existing) ? existing : [existing];
            if (!ids.includes(conceptId)) {
                manifest.mappings[tag] = [...ids, conceptId];
            }
        }
        // If it's a rich mapping already, we don't overwrite it for now
        // to avoid losing the rich data, but normalization should handle it.
    }

    /**
     * Validate a plugin manifest against the currently loaded concepts.
     */
    public validatePlugin(systemId: string): ValidationResult {
        const manifest = this.tagSystems.get(systemId);
        const errors: string[] = [];

        if (!manifest) {
            return { valid: false, errors: [`Plugin system "${systemId}" not found.`] };
        }

        for (const [tag, mappingValue] of Object.entries(manifest.mappings)) {
            let conceptIds: string[];
            if (typeof mappingValue === 'object' && !Array.isArray(mappingValue)) {
                conceptIds = [(mappingValue as LinguisticMapping).id];
            } else {
                conceptIds = Array.isArray(mappingValue) ? mappingValue as string[] : [mappingValue as string];
            }

            for (const id of conceptIds) {
                if (!this.concepts.has(id)) {
                    errors.push(`Tag "${tag}" in system "${systemId}" maps to non-existent concept: ${id}`);
                }
            }
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    // --- Search & Resolution API ---

    /**
     * Search across all systems for exact or partial matches.
     */
    public search(query: string, options: SearchOptions = {}): SearchResult[] {
        const results: SearchResult[] = [];
        const systems = options.systemIds || Array.from(this.tagSystems.keys());
        const exact = options.exactMatch ?? false;
        const limit = options.limit ?? 100;

        const q = query.toLowerCase();

        for (const systemId of systems) {
            const manifest = this.tagSystems.get(systemId);
            if (!manifest) continue;

            for (const [tag, value] of Object.entries(manifest.mappings)) {
                const tagLower = tag.toLowerCase();
                let matchType: SearchResult['matchType'] | null = null;
                let conceptId: string;

                if (tagLower === q) {
                    matchType = 'exact';
                } else if (!exact && tagLower.includes(q)) {
                    matchType = 'partial';
                }

                if (matchType) {
                    if (typeof value === 'object' && !Array.isArray(value)) {
                        conceptId = (value as LinguisticMapping).id;
                    } else {
                        const ids = Array.isArray(value) ? value : [value as string];
                        conceptId = ids[0] || '';
                    }
                    if (conceptId) {
                        results.push({ systemId, conceptId, tag, matchType });
                    }
                    if (results.length >= limit) return results;
                }
            }
        }

        return results;
    }

    /**
     * Resolve a tag to full Concept objects.
     */
    public resolve(tag: string, systemId: string): Concept[] {
        return this.normalizeTag(tag, systemId);
    }

    /**
     * Batch resolution of multiple tags.
     */
    public resolveTerms(tags: string[], systemId: string): Map<string, Concept[]> {
        const result = new Map<string, Concept[]>();
        for (const tag of tags) {
            result.set(tag, this.resolve(tag, systemId));
        }
        return result;
    }

    // --- Cross-System Resolution (Conversion) ---

    /**
     * Convert a tag from one system to equivalent tags in another system.
     */
    public translateTag(tag: string, fromSystemId: string, toSystemId: string): string[] {
        const conceptIds = this.resolveTag(tag, fromSystemId);
        const result = new Set<string>();
        for (const cid of conceptIds) {
            this.translateConcept(cid, toSystemId).forEach(t => result.add(t));
        }
        return Array.from(result);
    }

    /**
     * Get all tags for a concept in a specific system.
     */
    public translateConcept(conceptId: string, systemId: string): string[] {
        const manifest = this.tagSystems.get(systemId);
        if (!manifest) return [];

        const tags: string[] = [];
        for (const [tag, value] of Object.entries(manifest.mappings)) {
            if (typeof value === 'object' && !Array.isArray(value)) {
                if ((value as LinguisticMapping).id === conceptId) tags.push(tag);
            } else {
                const ids = Array.isArray(value) ? value : [value];
                if (ids.includes(conceptId)) tags.push(tag);
            }
        }
        return tags;
    }

    // --- Linguistic L10n API ---

    /**
     * Get rich forms for a concept with full hierarchical fallback.
     */
    public getForms(conceptId: string, systemId: string): ResolvedLinguisticMapping | undefined {
        return this.resolveLinguisticMapping(conceptId, systemId);
    }

    public getSingular(conceptId: string, systemId: string): string[] {
        const m = this.getForms(conceptId, systemId);
        if (!m?.singular) return [];
        return Array.isArray(m.singular) ? m.singular : [m.singular];
    }

    public getPlural(conceptId: string, systemId: string): string[] {
        const m = this.getForms(conceptId, systemId);
        if (!m?.plural) return [];
        return Array.isArray(m.plural) ? m.plural : [m.plural];
    }

    public getAbbreviations(conceptId: string, systemId: string): string[] {
        const m = this.getForms(conceptId, systemId);
        return m?.abbreviations || [];
    }

    // --- Ontology & Connections ---

    /**
   * List all loaded concepts.
   */
    public listConcepts(): Concept[] {
        return Array.from(this.concepts.values());
    }

    /**
     * Get a concept by its GUID.
       */
    public getConcept(id: string): Concept | undefined {
        return this.concepts.get(id);
    }

    public getDomain(domainId: string): Domain | undefined {
        return this.domains.get(domainId);
    }

    /**
     * List all registered domains.
     */
    public listDomains(): Domain[] {
        return Array.from(this.domains.values());
    }

    /**
     * Get all direct children of a concept.
     */
    public getChildren(conceptId: string): Concept[] {
        return Array.from(this.concepts.values()).filter(c => {
            const parents = Array.isArray(c.parent) ? c.parent : [c.parent];
            return parents.includes(conceptId);
        });
    }

    /**
     * Get all concepts belonging to a specific domain.
     */
    public getConceptsByDomain(domainId: string): Concept[] {
        return Array.from(this.concepts.values()).filter(c => c.domain === domainId);
    }

    /**
     * Get all parents of a concept.
     */
    public getParents(id: string): Concept[] {
        const concept = this.getConcept(id);
        if (!concept || !concept.parent) return [];
        const parentIds = Array.isArray(concept.parent) ? concept.parent : [concept.parent];
        return parentIds
            .map((pid: string) => this.getConcept(pid))
            .filter((c: Concept | undefined): c is Concept => !!c);
    }

    // --- Semantic & External Metadata ---

    public getWikiDataId(conceptId: string): string | undefined {
        return this.getConcept(conceptId)?.wikidata;
    }

    public getWikipediaUrl(conceptId: string, lang: string = 'en'): string | undefined {
        const wikiId = this.getWikiDataId(conceptId);
        if (!wikiId) return undefined;
        // In a real app, we might query Wikidata API or have a localized mapping.
        // For now, we return a standard link template or concept label if available.
        const concept = this.getConcept(conceptId);
        if (!concept) return undefined;
        return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(concept.label.replace(/ /g, '_'))}`;
    }

    public getWiktionaryUrl(term: string, lang: string = 'en'): string {
        return `https://${lang}.wiktionary.org/wiki/${encodeURIComponent(term)}`;
    }

    // --- System Info ---

    public getSystems(): PluginDescriptor[] {
        return Array.from(this.tagSystems.values()).map(s => ({
            id: s.descriptor.id,
            name: s.descriptor.name,
            language: s.descriptor.language ?? undefined,
            scope: s.descriptor.scope ?? undefined,
            domains: s.descriptor.domains ?? undefined
        }));
    }

    public getLanguages(): string[] {
        const langs = new Set<string>();
        for (const s of this.tagSystems.values()) {
            if (s.descriptor.language) langs.add(s.descriptor.language);
        }
        return Array.from(langs);
    }

    public getSystemsByLanguage(lang: string): PluginDescriptor[] {
        return this.getSystems().filter(s => s.language === lang);
    }

    // --- Internal Helpers & Legacy Compatibility ---

    public registerLinguisticMapping(manifest: PluginManifest): void {
        this.registerTagSystem(manifest);
    }

    /**
     * Get the rich linguistic mapping for a concept in a specific system.
     */
    public getLinguisticMapping(conceptId: string, systemId: string): LinguisticMapping | undefined {
        return this.linguisticMappings.get(systemId)?.get(conceptId);
    }

    /**
     * Resolve a linguistic mapping using a hierarchical fallback mechanism:
     * 1. Target System
     * 2. Generic Language Plugin (e.g. nl-generic)
     * 3. Global Fallback (en-generic)
     * 4. Ontology Label
     */
    public resolveLinguisticMapping(conceptId: string, systemId: string): ResolvedLinguisticMapping | undefined {
        const isValid = (m: LinguisticMapping) => !!(m.singular || m.plural || (m.abbreviations && m.abbreviations.length > 0));

        // 1. Target System
        let mapping = this.getLinguisticMapping(conceptId, systemId);
        if (mapping && isValid(mapping)) {
            return { ...mapping, sourceSystemId: systemId, isFallback: false };
        }

        // 2. Language Fallback
        const targetSystem = this.tagSystems.get(systemId);
        if (targetSystem?.descriptor.language) {
            const langGenericId = `${targetSystem.descriptor.language}-generic`;
            if (langGenericId !== systemId) {
                mapping = this.getLinguisticMapping(conceptId, langGenericId);
                if (mapping && isValid(mapping)) {
                    return { ...mapping, sourceSystemId: langGenericId, isFallback: true };
                }
            }
        }

        // 3. Global Fallback (English)
        if (systemId !== 'en-generic') {
            mapping = this.getLinguisticMapping(conceptId, 'en-generic');
            if (mapping && isValid(mapping)) {
                return { ...mapping, sourceSystemId: 'en-generic', isFallback: true };
            }
        }

        // 4. Ontology Fallback
        const concept = this.getConcept(conceptId);
        if (concept) {
            const label = concept.label || conceptId;
            return {
                id: conceptId,
                singular: `[${label}]`,
                sourceSystemId: 'ontology',
                isFallback: true,
                isOntologyLabel: true
            };
        }

        return undefined;
    }

    /**
     * Resolve an external tag to one or more MetaLang concept IDs.
     */
    public resolveTag(tag: string, systemId: string): string[] {
        const system = this.tagSystems.get(systemId);
        if (!system) return [];
        const result = system.mappings[tag] || [];
        if (typeof result === 'object' && !Array.isArray(result)) {
            return [(result as LinguisticMapping).id];
        }
        return Array.isArray(result) ? result : [result as string];
    }

    /**
     * Normalize an external tag string to a list of full MetaLang Concept objects.
     */
    public normalizeTag(tag: string, systemId: string): Concept[] {
        const conceptIds = this.resolveTag(tag, systemId);
        return conceptIds
            .map((id: string) => this.getConcept(id))
            .filter((c: Concept | undefined): c is Concept => !!c);
    }

    /**
     * List all registered tag systems.
     */
    public listTagSystems(): PluginManifest[] {
        return Array.from(this.tagSystems.values());
    }

    /**
   * Apply a JSON Patch (RFC 6902) to the registry state.
   * This is a simplified implementation for the GUI authoring flow.
   */
    public applyPatch(patch: any[]): void {
        for (const op of patch) {
            const parts = op.path.split('/').filter(Boolean);
            if (parts[0] === 'concepts') {
                const conceptId = parts[1];
                const concept = this.concepts.get(conceptId);

                if (op.op === 'add' || op.op === 'replace') {
                    if (parts.length === 2) {
                        this.concepts.set(conceptId, op.value);
                    } else if (concept) {
                        // Shallow property update for now
                        (concept as any)[parts[2]] = op.value;
                    }
                } else if (op.op === 'remove' && parts.length === 2) {
                    this.concepts.delete(conceptId);
                }
            }
        }
    }

    /**
     * Resolve a list of external tags to MetaLang concept IDs.
     * Returns a Map where keys are the input tags.
     */
    public resolveTags(tags: string[], systemId: string): Map<string, string[]> {
        const result = new Map<string, string[]>();

        for (const tag of tags) {
            result.set(tag, this.resolveTag(tag, systemId));
        }

        return result;
    }
}

// Singleton instance for default usage
export const defaultRegistry = new Registry();
