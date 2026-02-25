# MetaLang Development Roadmap

This document outlines the staged implementation plan for the MetaLang project. It is designed to be consumed by an agentic AI developer to build the core infrastructure, plugin ecosystem, and authoring tools.

## Stage 0: Foundation & Workspace ✅
**Goal**: Establish the monorepo and core schemas.
- [x] **Monorepo Setup**: Initialize a `pnpm` monorepo with workspace folders in `packages/*`.
- [x] **Data Ingestion**: Move existing `.json` and `.tsv` data from `data/` into a versioned structure.
- [x] **Core Schemas**: Define JSON Schemas and TypeScript interfaces for `SeedFile`, `PluginManifest`, and `Concept`.
- [x] **Linting**: Implement automated referential integrity checks (via TypeScript and JSON Schema).

## Stage 1: The Core Engine (`packages/core`) ✅
**Goal**: Build the runtime library for ontology lookup and tag normalization.
- [x] **Registry Logic**: Implement `registerTagSystem()` to handle plugin loading and conflict resolution.
- [x] **Normalization API**: Create the `normalizeTag(tag, system)` function to resolve external strings to GUIDs.
- [x] **Hierarchy Support**: Implement graph walking (parents, children) across domains.
- [x] **TypeScript Types**: Generate and export robust types for the entire ontology in `@metalang/schema`.

## Stage 2: Plugin Ecosystem
**Goal**: Bridge MetaLang with global standards.
- [ ] **Standard Plugins**: Implement `@metalang/plugin-ud` (Universal Dependencies) and `@metalang/plugin-eagles`.
- [ ] **Multi-mapping**: Support mapping a single external tag to multiple canonical concepts.
- [ ] **Test Suite**: Establish "Golden Tests" ensuring standard tags resolve to expected GUIDs.

## Stage 3: Authoring GUI (`packages/gui`)
**Goal**: A React-based tool for non-dev contributors to maintain the ontology.
- [ ] **Workspace Panel**: Grid/table view for browsing concepts with advanced filtering.
- [ ] **Inspector Panel**: Detail view for editing labels, GUIDs, and external references.
- [ ] **Patch Export**: Implement a "Change Set" model that exports JSON patches for PRs.
- [ ] **Graph Visualization**: Simple DAG view of domain hierarchies.

## Stage 4: Advanced Tooling & Governance
**Goal**: Industrialize the ingestion and maintenance process.
- [ ] **Wiktionary Ingestion**: CLI tool to harvest registers and POS terms from Wiktionary dump files.
- [ ] **GitHub Integration**: Add "Commit to Branch" and "Create Pull Request" features directly from the GUI.
- [ ] **Ambiguity UI**: Dedicated interface for resolving N-to-N mapping conflicts.
- [ ] **Release Automation**: CI/CD pipeline for independent package versioning and publishing.

---
**Development Instruction**: Proceed through these stages sequentially. Verify each stage with unit tests against the `data/` seed files before moving to the next.
