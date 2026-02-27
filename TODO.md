# MetaLang TODO

## 🎯 High Priority: Data Enrichment & Integrity
- [ ] **WikiData QID Coverage**: 
  - Fill gaps in `ontology/concepts/pos.tsv` (e.g., subordinative conjunctions, specific numerals).
- [ ] **Label Validation**: Cross-check existing labels and translations against WikiData using QID lookups to ensure global alignment.
- [ ] **Interoperability Analysis**: Audit coverage and completeness of the ontology in comparison to [Universal Dependencies](https://github.com/UniversalDependencies).

## 📝 Documentation & Publication
- [ ] **Unified Documentation**: Integrate and simplify existing specifications.
- [ ] **API Reference**: Expand `docs/API_REFERENCE.md` with comprehensive examples and plugin-author guides.
- [ ] **Academic Output**: Draft Whitepaper and transition to a formal Journal Paper.

## ✅ Completed Milestones
- [x] **BCP 47 Migration**: Standardized all language tags and implemented hierarchical fallback logic.
- [x] **CLDR Integration**: Integrated `Intl.DisplayNames` for localized language/region metadata.
- [x] **ISO 3166 Support**: Implemented region-specific naming and lookups.
- [x] **Registry Robustness**: Enhanced `@metalang/core` for regional fallback (e.g., `nl-BE` -> `nl`).
- [x] **Exhaustive Language Plugins**: Completed 14 core language plugins (Generic providers).
- [x] **Tag-System Plugins**: Implemented mappings for **Lexilogio**, **INTERA**, and **PTB**.
- [x] **Punctuation Support**: Multi-glyph resolution and rich linguistic mappings.
- [x] **Rhetorical Expansion**: Integrated 250+ rhetorical concepts with WikiData cross-referencing.
- [x] **Ontology Cleanup**: Retired legacy PoS data and migrated to modular TSV structure.
