# MetaLang TODO

## 🎯 High Priority: Data Enrichment & Integrity
- [ ] **WikiData QID Coverage**: 
  - Fill gaps in `ontology/concepts/pos.tsv` (e.g., subordinative conjunctions, specific numerals).
- [ ] **Label Validation**: Cross-check existing labels and translations against WikiData using QID lookups to ensure global alignment.
- [ ] **Interoperability Analysis**: Audit coverage and completeness of the ontology in comparison to [Universal Dependencies](https://github.com/UniversalDependencies).

## 🐛 Bug-fixes & Logic Tightening
- [x] **Standardize Plugin Exports**: Unify manifests to export a single `manifest` object; remove legacy `register()` functions.
- [x] **Type safety audit**: Remove `any` casts in `Registry.ts` (especially in `resolveLinguisticMapping` and `applyPatch`).
- [x] **Schema Linkage**: Fix broken `$schema` paths in all plugin manifests.

## 🚀 Efficiency & Performance
- [x] **Normalization Caching**: Cache BCP 47 results in the `Registry` to avoid redundant normalization overhead.

## 🧹 Maintainability & DRY
- [ ] **Unified Validation**: Consolidate `validate_plugins.ts` and `Registry.validatePlugin()` into a shared validation service.
- [x] **Decouple Registry Parsing**: Move TSV/JSON loading logic from `Registry.ts` to dedicated `Loader` utilities.
- [ ] **Componentize Packaging**: Create a `@metalang/plugin-kit` or similar to reduce boilerplate in plugin packages.

## 📝 Documentation & Publication
- [ ] **Unified Documentation**: Integrate and simplify existing specifications.
- [ ] **API Reference**: Expand `docs/API_REFERENCE.md` with comprehensive examples and plugin-author guides.
- [x] **Academic Positioning**: Formally defined the domain as "Language Resource Infrastructure and Standardization."
- [x] **Academic Output**: Fleshed out initial Journal Paper draft (`docs/paper/draft.md`).
- [x] **Citation Standards**: Enhanced `CITATION.cff` and `README.md` with academic credentials and related standards.

## 🎓 Scholarship & Community
- [ ] **Affiliation**: Apply to the [Ronin Institute](https://ronininstitute.org/) to establish formal affiliation for independent scholarship.
- [ ] **Discoverability**: Add recommended topics to the GitHub repository (e.g., `language-resources`, `computational-linguistics`).
- [ ] **GitHub Pages**: Deploy the GUI as a static site for easier stakeholder access.
