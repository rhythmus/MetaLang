# MetaLang TODO

## 🎯 High Priority: Data Enrichment & Integrity
- [ ] **WikiData QID Coverage**: 
  - Fill gaps in `ontology/concepts/pos.tsv` (e.g., subordinative conjunctions, specific numerals).
  - [x] Complete `ontology/concepts/punctuation.tsv` (opening/closing marks, specialized symbols).
  - [x] Map remaining localized rhetorical terms in `ontology/concepts/rhetoric.tsv`.
- [ ] **Label Validation**: Cross-check existing labels and translations against WikiData using QID lookups to ensure global alignment.
- [x] **Punctuation Support**: Verify full engine support in `@metalang/core` and ensure all language plugins map their local punctuation marks to the core ontology.

## 🌍 Language Package Completion
- [x] **Exhaustive Language Plugins**: Complete the "Core 9" language set and expanded to 14 plugins.
- [x] English, German, Dutch, French, Greek, Polish, Spanish, Italian, Russian, Portuguese, Breton, Czech, Norwegian, Romanian.
- [x] **Generic Plugin Upgrade**: Refactor all 14 generic language providers to leverage rich mappings (symbols and localized labels).

## 📏 Standardization & Interoperability
- [x] **Tag-System Plugins**: Implemented mappings for **Lexilogio**, **INTERA**, and **PTB** (Penn Treebank) based on core meta-terms.
- [ ] **Language Tags**: Transition from internal keys to strict **BCP47** compliant tags.
- [ ] **CLDR Integration**: Use CLDR as a dependency for authoritative language metadata and translations (incl. endonyms, exonyms).
- [ ] **Geographic Standards**: Integrate **ISO 3166** or similar for geographic names and identifiers.

## 🧹 Technical Debt & Maintenance
- [x] Retire legacy PoS data: ensure all concepts from `ontology/part-of-speech terms (original list)/` are fully integrated in `pos.tsv` and `morph-value.tsv`. Then delete the directory. <!-- id: 5 -->
- [ ] **Registry Robustness**: Improve `@metalang/core` handling of complex cross-tradition translations and edge-case resolution.

## 📝 Documentation & Publication
- [ ] **Unified Documentation**: Integrate and simplify existing docs.
- [ ] **API Reference**: Expand `docs/API_REFERENCE.md` with comprehensive examples and plugin-author guides.
- [ ] **Academic Output**: Draft Whitepaper and transition to a formal Journal Paper.


- coverage and completeness of the ontology in comparison to https://github.com/UniversalDependencies

