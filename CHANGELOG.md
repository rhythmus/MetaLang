# Changelog

All notable changes to this project are to be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for its output schema (see `VERSIONING.md`).

## [1.2.0] - 2026-02-27

### Added
- **BCP 47 & CLDR Integration**: True hierarchical fallback logic and standardized language tag normalization.
- **Locale Utility**: New core utility for localized endonyms, exonyms, and regional metadata.
- **Resolution Sandbox**: Diagnostic GUI view for visualizing BCP 47 fallback paths.
- **New Plugins**: `@metalang/plugin-Lexilogio`, `@metalang/plugin-PTB`, and `@metalang/plugin-el-INTERA`.

### Changed
- **Registry Architecture**: Optimized with $O(1)$ child indexing and an inverted search index for sub-millisecond lookups.
- **GUI Authoring**: Transitioned to modular TSV cluster loading and dynamic plugin registration.
- **Naming Conventions**: Standardized plugin naming (e.g., `plugin-el-INTERA` for Greek-specific systems).
- **Core Specification**: Updated to reflect new indexing and resolution logic.

### Fixed
- Performance bottlenecks in large-scale ontology browsing.
- Inconsistent language tag naming across historical seed files.
