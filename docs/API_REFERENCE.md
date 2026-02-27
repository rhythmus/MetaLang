# MetaLang API Reference

This document provides a technical overview of the primary interfaces and classes within the MetaLang monorepo.

## 📦 @metalang/core

The core engine responsible for registry management and external integrations.

### `Registry`
The central state manager for concepts, domains, and tag systems.
- `loadTSVData(domainsTsv: string, conceptFiles: string[])`: Orchestrates loading using `TSVLoader` for modular ingestion.
- `registerTagSystem(manifest: PluginManifest)`: Adds a new external mapping system with automated indexing and language normalization caching.
- `resolve(tag: string, systemId: string)`: Resolves an external tag to Concept objects.
- `search(query: string, options: SearchOptions)`: Sub-millisecond exact and partial search using the inverted `searchIndex`.
- `getChildren(conceptId: string)`: $O(1)$ child retrieval using pre-computed `childMap`.
- `resolveLinguisticMapping(conceptId, systemOrLang)`: Advanced BCP 47 hierarchical fallback resolution with QID redirection support.

### `TSVLoader`
A stateless utility for parsing MetaLang TSV data formats.
- `parseDomains(content: string)`: Parses `domains.tsv` into `Domain` objects.
- `parseConcepts(content: string)`: Parses `concepts.tsv` files into indexed `Concept` objects.

### `Locale`
Utility for BCP 47 normalization and CLDR-backed localization.
- `normalize(tag: string)`: Standardizes language tags (e.g., `en-us` -> `en-US`). The `Registry` class caches these results for performance.
- `getAncestry(tag: string)`: Returns the hierarchical fallback path (e.g., `nl-BE` -> `nl`).
- `getEndonym(tag: string)`: Returns the native name of a language (e.g., `el` -> `Ελληνικά`).
- `getExonym(tag, displayLocale)`: Returns the localized name of a language.

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
