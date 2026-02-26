# MetaLang API Reference

This document provides a technical overview of the primary interfaces and classes within the MetaLang monorepo.

## 📦 @metalang/core

The core engine responsible for registry management and external integrations.

### `Registry`
The central state manager for concepts, domains, and tag systems.
- `loadSeed(seed: SeedFile)`: Initializes the registry with canonical data.
- `registerTagSystem(manifest: PluginManifest)`: Adds a new external mapping system.
- `resolveTags(tags: string[], systemId: string)`: Resolves a list of external tags to MetaLang GUIDs.
- `validatePlugin(systemId: string)`: Performs integrity checks on a plugin's mappings.

### `GitHubService`
Handles automated Pull Request creation.
- `createPullRequest(request: PRRequest)`: Creates a branch, commits changes, and submits a PR to the target repository.

---

## 📐 @metalang/schema

Defines the formal data structures for the MetaLang ecosystem.

### Key Interfaces
- `Concept`: The primary unit of the ontology (ID, Domain, Labels, Refs).
- `Domain`: Defines the hierarchical structure (e.g., `pos`, `morph_feature`).
- `SeedFile`: The structure for the primary `metalang_seed.json`.
- `PluginManifest`: Metadata and mappings for external standard plugins (UD, EAGLES, etc.).

### JSON Schemas
Located in `packages/schema/schemas/`:
- `concept.schema.json`: Validation for individual concept objects.
- `plugin-manifest.schema.json`: Validation for plugin metadata.

---

## 🚜 @metalang/ingest (CLI)

Utility for harvesting and integrating linguistic data.

### Commands
- `harvest <category>`: Fetches terms from Wiktionary categories.
- `classify <file>`: Suggests MetaLang GUIDs for harvested terms.
- `export <file> <output>`: Serializes candidates to TSV for curation.
- `merge <tsv> <seed>`: Safely integrates curated terms back into the seed data.
