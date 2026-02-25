import type { Concept, PluginManifest, SeedFile } from '@metalang/schema';

export class Registry {
    private concepts: Map<string, Concept> = new Map();
    private tagSystems: Map<string, PluginManifest> = new Map();

    /**
     * Load concepts from a seed file.
     */
    public loadSeed(seed: SeedFile): void {
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
