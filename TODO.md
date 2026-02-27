# MetaLang TODO

## 🎯 Priority: Data Enrichment & Integrity
- [ ] **WikiData QID Coverage**: Fill remaining gaps in `ontology/concepts/` (especially tags for logic, punctuation, and rhetoric).
- [ ] **Label Validation**: Cross-check existing labels and translations against WikiData using QID lookups to ensure global alignment.
- [ ] **Interoperability Analysis**: Audit coverage and completeness of the ontology in comparison to [Universal Dependencies](https://github.com/UniversalDependencies).

- [ ] Thoroughly revist the webapp GUI

## 🧹 Maintainability & Architecture
- [ ] **Unified Validation Service**: Consolidate `scripts/validate_plugins.ts` and `Registry.validatePlugin()` into a shared, robust validation utility.
- [ ] **Componentize Packaging**: Create a `@metalang/plugin-kit` to reduce boilerplate across linguistic plugin packages.

## 📝 Documentation & Outreach
- [ ] **Unified Specification**: Integrate existing notes and specs into a single, cohesive specification document.
- [ ] **API Reference Expansion**: Add comprehensive examples, edge-case behavior, and plugin-author guides to `docs/API_REFERENCE.md`.
- [ ] **Discoverability**: Add recommended topics (e.g., `language-resources`, `computational-linguistics`) to the GitHub repository.

## 🎓 Scholarship & Community
- [ ] **Affiliation**: Apply to the [Ronin Institute](https://ronininstitute.org/) to establish formal affiliation for independent scholarship.
- [ ] **GitHub Pages**: Deploy the GUI as a static site for easier stakeholder access and demonstration.
