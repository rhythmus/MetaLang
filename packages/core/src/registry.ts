import type { Concept, Domain, PluginManifest, SeedFile } from '@metalang/schema';

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

export class Registry {
    private concepts: Map<string, Concept> = new Map();
    private domains: Map<string, Domain> = new Map();
    private tagSystems: Map<string, PluginManifest> = new Map();

    /**
     * Load concepts and domains from a seed file.
     */
    public loadSeed(seed: SeedFile): void {
        if (seed.domains) {
            for (const domain of seed.domains) {
                this.domains.set(domain.id, domain);
            }
        }
        for (const concept of seed.concepts) {
            this.concepts.set(concept.id, concept);
        }
    }

    /**
     * Register an external tag system (plugin).
     */
    public registerTagSystem(manifest: PluginManifest): void {
        this.tagSystems.set(manifest.id, manifest);
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

        for (const [tag, conceptIds] of Object.entries(manifest.mappings)) {
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
        return system.mappings[tag] || [];
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
        if (!concept || !concept.parents) return [];
        return concept.parents
            .map((pid: string) => this.getConcept(pid))
            .filter((c: Concept | undefined): c is Concept => !!c);
    }
}

// Singleton instance for default usage
export const defaultRegistry = new Registry();
