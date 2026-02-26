# MetaLang Development Roadmap

This document outlines the staged implementation plan for the MetaLang project. It is designed to be consumed by an agentic AI developer to build the core infrastructure, plugin ecosystem, and authoring tools.

## Stage 0: Foundation & Workspace ✅
**Goal**: Establish the monorepo and core schemas.
- [x] **Monorepo Setup**: Initialize a `pnpm` monorepo with workspace folders in `packages/*`.
- [x] **Data Ingestion**: Move existing `.json` and `.tsv` data from `data/` into a versioned structure.
- [x] **Core Schemas**: Define JSON Schemas and TypeScript interfaces for `SeedFile`, `PluginManifest`, and `Concept`.
- [x] **Linting**: Implement automated referential integrity checks (via TypeScript and JSON Schema).
- [x] **Structural Refactoring**: Standardize ML_ID naming conventions (hyphens/underscores) and implement hierarchical domains in `domains.tsv`.

## Stage 1: The Core Engine (`packages/core`) ✅
**Goal**: Build the runtime library for ontology lookup and tag normalization.
- [x] **Registry Logic**: Implement `registerTagSystem()` to handle plugin loading and conflict resolution.
- [x] **Normalization API**: Create the `normalizeTag(tag, system)` function to resolve external strings to GUIDs.
- [x] **Hierarchy Support**: Implement graph walking (parents, children) across domains with support for multi-parenting and nested domains.
- [x] **TypeScript Types**: Generate and export robust types for the entire ontology in `@metalang/schema`.

## Stage 2: Plugin Ecosystem ✅
**Goal**: Bridge MetaLang with global standards.
- [x] **Standard Plugins**: Implement `@metalang/plugin-ud` (Universal Dependencies) and `@metalang/plugin-eagles`.
- [x] **Multi-mapping**: Support mapping a single external tag to multiple canonical concepts.
- [x] **Test Suite**: Establish "Golden Tests" ensuring standard tags resolve to expected GUIDs and structured bibliographic metadata.

## Stage 3: Authoring GUI (`packages/gui`) ✅
**Goal**: A React-based tool for non-dev contributors to maintain the ontology.
- [x] **Workspace Panel**: Grid/table view for browsing concepts with advanced filtering.
- [x] **Inspector Panel**: Detail view for editing labels and external references.
- [x] **Patch Export**: Real-time change tracking with JSON Patch (RFC 6902) export.
- [x] **Graph Visualization**: Hierarchical SVG view of domain taxonomies.
- [x] **Plugin & Settings**: Views for inspecting tag mappings and system statistics.

## Stage 4: Interoperability & Expansion
**Goal**: Industrialize ingestion and expand national standard support.
- [x] **National Plugins**: Implement `@metalang/plugin-el-gr` and `@metalang/plugin-nl-taalunie`.
- [x] **Wiktionary Ingestion**: CLI tool to harvest registers and POS terms from Wiktionary.
- [x] **GitHub Integration**: PR creation flow directly from the GUI.
      - [x] Research GitHub API (Octokit) requirements
      - [x] Implement PR creation service in @metalang/core
      - [x] Add "Submit as PR" to GUI Export Panel
      - [x] Release Pipeline
      - [x] Setup GitHub Actions for build & test
- [x] **Release Pipeline**: CI/CD for package versioning and deployment.

## Stage 5: Documentation & Deployment
- [x] Comprehensive API reference
- [x] Deployment guide for the GUI
- [x] Automated versioning and NPM publishing
- [x] Final Documentation & Release

---

**Development Instruction**: Proceed through these stages sequentially. Verify each stage with unit tests against the `data/` seed files before moving to the next.
