import type { Concept, Domain, PluginManifest } from '@metalang/schema';

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

export class Registry {
    private concepts: Map<string, Concept> = new Map();
    private domains: Map<string, Domain> = new Map();
    private tagSystems: Map<string, PluginManifest> = new Map();

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
        const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
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
        const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
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
            const conceptIds = Array.isArray(mappingValue) ? mappingValue : [mappingValue];
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

    /**
   * List all loaded concepts.
   */
    public listConcepts(): Concept[] {
        return Array.from(this.concepts.values());
    }

    /**
     * List all registered domains.
     */
    public listDomains(): Domain[] {
        return Array.from(this.domains.values());
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
     * Get a concept by its GUID.
       */
    public getConcept(id: string): Concept | undefined {
        return this.concepts.get(id);
    }

    /**
     * List all registered tag systems.
     */
    public listTagSystems(): PluginManifest[] {
        return Array.from(this.tagSystems.values());
    }

    /**
     * Resolve an external tag to one or more MetaLang concept IDs.
     */
    public resolveTag(tag: string, systemId: string): string[] {
        const system = this.tagSystems.get(systemId);
        if (!system) return [];
        const result = system.mappings[tag] || [];
        return Array.isArray(result) ? result : [result];
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

    /**
     * Resolve a list of external tags to MetaLang concept IDs.
     * Returns a Map where keys are the input tags.
     */
    public resolveTags(tags: string[], systemId: string): Map<string, string[]> {
        const result = new Map<string, string[]>();
        const system = this.tagSystems.get(systemId);

        for (const tag of tags) {
            if (!system) {
                result.set(tag, []);
                continue;
            }
            const mappingValue = system.mappings[tag] || [];
            result.set(tag, Array.isArray(mappingValue) ? mappingValue : [mappingValue]);
        }

        return result;
    }
}

// Singleton instance for default usage
export const defaultRegistry = new Registry();
