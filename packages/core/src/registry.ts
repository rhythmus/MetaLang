import {
    Concept, Domain, PluginManifest, LinguisticMapping,
    ResolvedLinguisticMapping, SearchOptions, SearchResult, PluginDescriptor
} from '@metalang/schema';
import { Locale } from './locale.js';
import { TSVLoader } from './loaders/tsv-loader.js';

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

export class Registry {
    private concepts: Map<string, Concept> = new Map();
    private domains: Map<string, Domain> = new Map();
    private tagSystems: Map<string, PluginManifest> = new Map();
    private linguisticMappings: Map<string, Map<string, LinguisticMapping>> = new Map(); // systemId -> ML_ID -> mapping
    private qidMap: Map<string, string[]> = new Map(); // QID -> [ML_ID, ...]
    private childMap: Map<string, Set<string>> = new Map(); // parentId -> [childId, ...]
    private searchIndex: Map<string, SearchResult[]> = new Map(); // normalized term -> results
    private normalizationCache: Map<string, string> = new Map(); // raw -> normalized

    // --- Core Management ---

    /**
     * Load concepts and domains from TSV data strings.
     */
    public loadTSVData(domainsTsv: string, conceptsTsv: string | string[]): void {
        TSVLoader.parseDomains(domainsTsv).forEach(d => this.domains.set(d.id, d));
        const conceptsContents = Array.isArray(conceptsTsv) ? conceptsTsv : [conceptsTsv];
        conceptsContents.forEach(content => {
            TSVLoader.parseConcepts(content).forEach(c => {
                this.concepts.set(c.id, c);
                this.updateIndices(c);
            });
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
            seed.concepts.forEach((c: Concept) => {
                this.concepts.set(c.id, c);
                this.updateIndices(c);
            });
        }
    }

    private updateIndices(c: Concept): void {
        if (c.wikidata) {
            const ids = this.qidMap.get(c.wikidata) || [];
            if (!ids.includes(c.id)) {
                this.qidMap.set(c.wikidata, [...ids, c.id]);
            }
        }
        // Update child map
        const parents = Array.isArray(c.parent) ? c.parent : [c.parent];
        for (const pid of parents) {
            if (!pid) continue;
            if (!this.childMap.has(pid)) this.childMap.set(pid, new Set());
            this.childMap.get(pid)!.add(c.id);
        }
    }



    /**
     * Register an external tag system (plugin).
     */
    public registerTagSystem(manifest: PluginManifest): void {
        // Normalize language tag if present
        if (manifest.descriptor.language) {
            manifest.descriptor.language = this.normalizeLanguage(manifest.descriptor.language);
        }

        this.tagSystems.set(manifest.descriptor.id, manifest);

        const systemLinguisticMappings = new Map<string, LinguisticMapping>();

        // Process mappings
        for (const [tag, value] of Object.entries(manifest.mappings)) {
            const tagLower = tag.toLowerCase();
            let conceptIds: string[] = [];

            if (typeof value === 'object' && !Array.isArray(value)) {
                // Rich LinguisticMapping
                const lm = value as LinguisticMapping;
                systemLinguisticMappings.set(lm.id, lm);
                conceptIds = [lm.id];

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
                        this.addToSearchIndex(abbr, manifest.descriptor.id, lm.id);
                    }
                }

                // Add singular/plural forms
                if (lm.singular) {
                    const terms = Array.isArray(lm.singular) ? lm.singular : [lm.singular];
                    for (const term of terms) {
                        this.addInternalMapping(manifest.descriptor.id, term, lm.id);
                        this.addToSearchIndex(term, manifest.descriptor.id, lm.id);
                    }
                }
                if (lm.plural) {
                    const terms = Array.isArray(lm.plural) ? lm.plural : [lm.plural];
                    for (const term of terms) {
                        this.addInternalMapping(manifest.descriptor.id, term, lm.id);
                        this.addToSearchIndex(term, manifest.descriptor.id, lm.id);
                    }
                }
                if (lm.symbols) {
                    for (const sym of lm.symbols) {
                        this.addInternalMapping(manifest.descriptor.id, sym, lm.id);
                        this.addToSearchIndex(sym, manifest.descriptor.id, lm.id);
                    }
                }
            } else {
                // Flat mapping (string or string[])
                conceptIds = Array.isArray(value) ? value : [value];
                for (const id of conceptIds) {
                    this.addInternalMapping(manifest.descriptor.id, tag, id);
                    this.addToSearchIndex(tag, manifest.descriptor.id, id);
                }
            }
        }

        if (systemLinguisticMappings.size > 0) {
            this.linguisticMappings.set(manifest.descriptor.id, systemLinguisticMappings);
        }
    }

    private addToSearchIndex(term: string, systemId: string, conceptId: string): void {
        const q = term.toLowerCase();
        if (!this.searchIndex.has(q)) this.searchIndex.set(q, []);
        const results = this.searchIndex.get(q)!;
        if (!results.some(r => r.systemId === systemId && r.conceptId === conceptId)) {
            results.push({ systemId, conceptId, tag: term, matchType: 'exact' });
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

        // 1. Try exact matches from search index (O(1))
        if (this.searchIndex.has(q)) {
            const indexedHits = this.searchIndex.get(q)!;
            for (const hit of indexedHits) {
                if (systems.includes(hit.systemId)) {
                    results.push(hit);
                    if (results.length >= limit) return results;
                }
            }
        }

        if (exact) return results;

        // 2. Partial matches (O(N) search index scan, much faster than mappings scan)
        for (const [term, hits] of this.searchIndex.entries()) {
            if (term === q) continue; // Already handled
            if (term.includes(q)) {
                for (const hit of hits) {
                    if (systems.includes(hit.systemId)) {
                        results.push({ ...hit, matchType: 'partial' });
                        if (results.length >= limit) return results;
                    }
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
        const childIds = this.childMap.get(conceptId);
        if (!childIds) return [];
        return Array.from(childIds)
            .map(id => this.getConcept(id))
            .filter((c): c is Concept => !!c);
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

    // --- BCP 47 & CLDR Metadata ---

    /**
     * Get the name of a language in its own script.
     * Example: 'el' -> 'Ελληνικά'
     */
    public getEndonym(langTag: string): string {
        return Locale.getEndonym(langTag);
    }

    /**
     * Get the name of a language localized for another language.
     * Example: getExonym('el', 'en') -> 'Greek'
     */
    public getExonym(langTag: string, targetLangTag: string): string {
        return Locale.getExonym(langTag, targetLangTag);
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
            if (s.descriptor.language) {
                langs.add(Locale.normalize(s.descriptor.language));
            }
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
    public resolveLinguisticMapping(conceptId: string, systemOrLang?: string): ResolvedLinguisticMapping | undefined {
        const isValid = (m: LinguisticMapping) => !!(m.singular || m.plural || (m.abbreviations && m.abbreviations.length > 0));

        let systemsToTry: string[] = [];

        if (systemOrLang) {
            // 1. If it's a registered system ID, start there
            if (this.tagSystems.has(systemOrLang)) {
                systemsToTry.push(systemOrLang);
            }

            // 2. Derive ancestry from the system/lang
            // If it's a system ID, use its associated language. If not, treat as a tag.
            const langTag = this.tagSystems.get(systemOrLang)?.descriptor.language || systemOrLang;
            const ancestry = Locale.getAncestry(langTag);

            for (const lang of ancestry) {
                // Try the lang tag itself as a system ID (new standard)
                if (this.tagSystems.has(lang) && !systemsToTry.includes(lang)) {
                    systemsToTry.push(lang);
                }
                // Compatibility fallback for old -generic IDs
                const genericId = `${lang}-generic`;
                if (this.tagSystems.has(genericId) && !systemsToTry.includes(genericId)) {
                    systemsToTry.push(genericId);
                }
            }
        }

        // Always try English as a last resort generic fallback
        for (const fallback of ['en', 'en-generic']) {
            if (this.tagSystems.has(fallback) && !systemsToTry.includes(fallback)) {
                systemsToTry.push(fallback);
            }
        }

        for (const sid of systemsToTry) {
            const mapping = this.getLinguisticMapping(conceptId, sid);
            if (mapping && isValid(mapping)) {
                return { ...mapping, sourceSystemId: sid, isFallback: sid !== systemOrLang };
            }
        }

        // 3. QID Sibling Fallback
        const concept = this.getConcept(conceptId);
        if (concept?.wikidata) {
            const siblingIds = this.qidMap.get(concept.wikidata) || [];
            for (const siblingId of siblingIds) {
                if (siblingId === conceptId) continue;
                for (const sid of systemsToTry) {
                    const siblingMapping = this.getLinguisticMapping(siblingId, sid);
                    if (siblingMapping && isValid(siblingMapping)) {
                        return {
                            ...siblingMapping,
                            id: conceptId,
                            sourceSystemId: sid,
                            isFallback: true,
                            isQidSibling: true
                        };
                    }
                }
            }
        }

        // 4. Ontology Fallback
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
                        this.updateIndices(op.value);
                    } else if (concept) {
                        // Shallow property update for now
                        const c = concept as any;
                        if (parts[2] in c) {
                            c[parts[2]] = op.value;
                        }
                        this.updateIndices(concept);
                    }
                } else if (op.op === 'remove' && parts.length === 2) {
                    this.concepts.delete(conceptId);
                    // Note: full re-indexing might be needed for removal in a real system
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

    private normalizeLanguage(lang: string): string {
        if (this.normalizationCache.has(lang)) {
            return this.normalizationCache.get(lang)!;
        }
        const normalized = Locale.normalize(lang);
        this.normalizationCache.set(lang, normalized);
        return normalized;
    }
}

// Singleton instance for default usage
export const defaultRegistry = new Registry();
