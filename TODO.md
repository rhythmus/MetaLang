# MetaLang TODO

## 🎯 High Priority: Data Enrichment & Integrity
- [ ] **WikiData QID Coverage**: 
  - Fill gaps in `ontology/concepts/pos.tsv` (e.g., subordinative conjunctions, specific numerals).
  - Complete `ontology/concepts/punctuation.tsv` (opening/closing marks, specialized symbols).
  - Map remaining localized rhetorical terms in `ontology/concepts/rhetoric.tsv`.
- [ ] **Label Validation**: Cross-check existing labels and translations against WikiData using QID lookups to ensure global alignment.
- [ ] **Punctuation Support**: Verify full engine support in `@metalang/core` and ensure all language plugins map their local punctuation marks to the core ontology.

## 🌍 Language Package Completion
- [ ] **Exhaustive Language Plugins**: Complete the "Core 9" language set.
  - [x] English, German, Dutch, French, Greek, Polish.
  - [x] **Spanish (`es`)**: Develop exhaustive plugin mapping.
  - [x] **Italian (`it`)**: Develop exhaustive plugin mapping.
  - [x] **Russian (`ru`)**: Develop exhaustive plugin mapping.
- [ ] **Generic Plugin Upgrade**: Refactor generic language providers to leverage QID lookups for more robust fallbacks.

## 📏 Standardization & Interoperability
- [ ] **Language Tags**: Transition from internal keys to strict **BCP47** compliant tags.
- [ ] **CLDR Integration**: Use CLDR as a dependency for authoritative linguistic metadata and translations.
- [ ] **Geographic Standards**: Integrate **ISO 3166** or similar for geographic names and identifiers.

## 🧹 Technical Debt & Maintenance
- [ ] **Legacy PoS Retirement**: Confirm full coverage of `ontology/part-of-speech terms (original list)` in the new TSV files. Deprecate and remove the legacy directory once verified.
- [ ] **Registry Robustness**: Improve `@metalang/core` handling of complex cross-tradition translations and edge-case resolution.

## 📝 Documentation & Publication
- [ ] **Unified Documentation**: Integrate and simplify existing docs.
- [ ] **API Reference**: Expand `docs/API_REFERENCE.md` with comprehensive examples and plugin-author guides.
- [ ] **Academic Output**: Draft Whitepaper and transition to a formal Journal Paper.