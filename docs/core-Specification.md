
# MetaLang Functional & Technical Specification — Table of Contents

## 0. Document Control

0.1 Purpose and audience  
0.2 Scope: what MetaLang is / is not  
0.3 Definitions and terminology (object language, metalanguage, tag system, canonical concept, plugin, registry)  
0.4 Normative language (MUST/SHOULD/MAY)  
0.5 Versioning of this specification document  
0.6 Reference implementations and artifacts (seed files, plugin manifests, examples)

### 0.7 Rationale: Specification Split and Monorepo Transition

To manage the increasing complexity of the project, the MetaLang specification has been split into **Core** and **GUI** components. This separation ensures that the fundamental ontolological engine remains decoupled from the authoring tools. The project has also transitioned to a **monorepo** structure to facilitate atomic updates, unified governance of GUIDs, and modular distribution of the core library and its various plugins.

## 1. Product Overview

1.1 Problem statement and motivation  
1.2 Target users and use cases

- POS tagger UI localization
- Dictionary / lexicography tooling
- OCR → abbreviation normalization pipelines
- Academic glossary normalization
- Data import/export between heterogeneous linguistic tools  

1.3 Non-goals (tagging itself, parsing itself, dictionary authoring itself)  
1.4 Key principles (“semantic coordination layer”; reference don’t duplicate)  
1.5 High-level system diagram (Concept Graph ↔ Plugins ↔ Converters ↔ UI consumers)
    

## 2. Requirements Summary

2.1 Functional requirements overview  
2.2 Non-functional requirements overview  
2.3 Acceptance criteria overview (MVP vs v1 vs v1.x)

## 3. Core Data Model and Ontology Semantics

3.1 Canonical concept definition

3.2 Domain taxonomy (v1/v1.1)

- POS
- Morph feature
- Morph value
- Syntactic relation / constructions
- Semantic relation
- Semantic class
- Register / usage labels
- Field / discipline
- Geography label
- Language label
- Lexicographic structure
- Derivation / word formation
- Etymology / historical process
- Phonology / phonetics (v1.1+)
- Discourse / rhetoric
- Orthography / writing
- Editorial markers (if retained) 

3.3 Concept properties (minimum required fields)

- `id`, `domain`, `labels`, `parents`, `externalRefs`, `sources`, optional metadata  
    3.4 Hierarchy rules (explicit graph)
- DAG support (multi-parenting)
- Prohibited relationships and constraints  
    3.5 Concept lifecycle governance
- Additions, deprecations, superseding
- Never rename, never reuse IDs
- Deprecation metadata requirements  
    3.6 Label system semantics
- locale + variant (`full`, `abbreviation`)
- end-user label vs internal label separation  
    3.7 Collision and ambiguity semantics
- tag collisions across systems allowed
- within-system collisions and resolution rules
    

## 4. Canonical ID System

4.1 ID goals and invariants (stability, language neutrality, machine safety)  
4.2 ID grammar specification (formal syntax)  
4.3 Naming conventions per domain  
4.4 Rationale for ALL\_CAPS\_UNDERSCORE and ASCII-only  
4.5 Reserved prefixes and namespaces (`ML_`, domain tokens, future-proofing)  
4.6 Migration strategy from legacy IDs (e.g. Lexilogio v0 tags)  
4.7 ID linting rules and automated checks

## 5. Plugin System and Registry Architecture

5.1 Plugin concept and design goals  
5.2 Tag system descriptor schema

- `id`, `name`, `language` (label language), `scope`, `domains`, `publisher`, `authoritative`, `website`, `version`

5.3 Plugin mapping schema

- external tag → canonical concept ID(s)
- multi-mapping rules (one tag maps to multiple concepts)
- canonical-to-external emission rules  

5.4 Registry core

- in-memory registry model
- merge strategy for multiple plugins
- plugin unload/replace semantics  

5.5 Registration APIs

- `registerTagSystem()`
- `listTagSystems()` and filters
- `getTagSystem()`  

5.6 Plugin validation and safety checks

- uniqueness, schema validity
- referenced concept IDs must exist
- domain consistency (optional strict mode)
- duplicate tag keys handling  

5.7 Plugin packaging conventions

- naming: `@metalang/plugin-*`
- private plugins, internal plugins, institutional dictionaries  

5.8 Governance: official vs third-party plugins

- “core endorsed references” policy
    

## 6. External Ontology and Standards Bridging

6.1 Strategy: externalRefs are bridges, not canonical IDs

6.2 UD integration

- POS mapping (`ud_pos`)
- dependency mapping (`ud_deprel`)

6.3 UniMorph integration for morphology  
6.4 WordNet integration for semantic relations  
6.5 LMF / OntoLex-Lemon / LexInfo integration for lexicographic structure and register  
6.6 ISO + CLDR integration

- ISO 639 language codes
- ISO 3166 region codes
- CLDR label retrieval (endonyms/exonyms)  

6.7 Discipline taxonomies (Field domain)

- UDC/Dewey as optional references (licensing constraints)
- OECD/UNESCO alternatives  

6.8 Unicode integration for orthography/diacritics/scripts  

6.9 Policy for adding a new external reference system

- stability/open/license checklist
- plugin vs core decision rules
    

## 7. Public TypeScript API

7.1 Core principles (pure mapping engine, deterministic, sync vs async)  
7.2 Concept lookup APIs

- `getConcept(id)`
- `searchConcepts(query, filters)`
- `getParents(id)` / `getChildren(id)` / `walkAncestors()`  

7.3 System discovery APIs

- `listTagSystems(filters)`
- `listDomains()`
- `listLocales()` (if internal)  

7.4 Normalization and conversion APIs

- `normalizeTag(inputTag, system)` → canonical ID
- `convertTag(inputTag, fromSystem, toSystem)`
- `convertTagSet(tags, fromSystem, toSystem)`  

7.5 Localization APIs

- `translateTag(inputTag, system, locale, variant)`
- `labelForConcept(conceptId, locale, variant)`  

7.6 Morphology bundle APIs (UD/UniMorph-style)

- `convertFeatureBundle(bundle, fromSystem, toSystem)`
- `resolveFeatureValuePair("Case=Acc", system)`  

7.7 Error model

- null vs Result type
- structured error codes (unknown system, unknown tag, ambiguous mapping)  

7.8 Performance contracts (big-O expectations, caching behavior)  

7.9 Determinism guarantees and testable behaviors
    

## 8. Seed Files, Formats, and Build Pipelines

8.1 Seed file role and invariants  
8.2 Machine-readable seed format specification (JSON schema)  
8.3 Plugin manifest format specification (JSON schema)  
8.4 TSV formats for curation and round-tripping  
8.5 Lossless round-tripping requirements  
8.6 Build pipeline

- from TSV → JSON seed
- from curated changes → versioned release  

8.7 Linting + validation pipeline

- schema validation
- referential integrity checks
- duplicate detection
- “orphan concept” detection
    

## 9. Ingestion Pipelines and Authoring Workflows

9.1 Ingesting dictionary abbreviation lists (e.g., Van Dale / Wolters Kluwer / local scholars)  
9.2 Provenance model (source attribution per mapping and concept)  
9.3 Wiktionary glossary ingestion workflow

- harvesting terms
- candidate domain classification
- human review stage
- canonical ID minting rules  

9.4 OCR-driven ingestion workflow (future-facing)

- normalization: OCR token → abbreviation → canonical ID  

9.5 Conflict resolution workflow

- two abbreviations same meaning
- one abbreviation multiple meanings  

9.6 Contributor workflow and review gates (PR templates, CI checks)



## 10. NPM Monorepo and Release Engineering

10.1 Monorepo structure (`packages/core`, `packages/plugin-*`)  
10.2 Independent package publishing model  
10.3 Dependency strategy

- core has no plugin deps
- plugins depend/peer-depend on core  

10.4 Versioning policy

- semver rules for concepts vs engine vs plugins  

10.5 Release automation (CI/CD)

- build, test, publish pipeline  

10.6 Backwards compatibility policy  


10.7 Private plugins and internal registries



## 11. CLI Tools and Developer Utilities

11.1 CLI goals and supported commands

- validate seed/plugin
- list systems/domains
- convert tags
- export subsets  

11.2 Report generation

- coverage reports per domain/system
- “unknown tag” diagnostics  

11.3 Diff tools

- concept changes between versions
- plugin mapping diffs
    

## 12. UI/UX Integration Requirements

12.1 Required UI-facing discovery endpoints (tag systems list, domains list)  
12.2 Dropdown population requirements  
12.3 Label selection strategy (full vs abbreviation)  
12.4 Localization fallback rules  
12.5 UX for ambiguity (tag maps to multiple concepts)  
12.6 Example UI integration patterns (React, etc.)

## 13. Testing Strategy

13.1 Unit tests for conversion correctness  
13.2 Property-based tests (idempotency, determinism)  
13.3 Golden tests for seed and plugin manifests  
13.4 Cross-system consistency tests (UD ↔ PTB ↔ internal)  
13.5 Performance tests (large mapping sets, search latency)  
13.6 Regression suite for known tricky cases

## 14. Security, Integrity, and Safety Constraints

14.1 Supply-chain risk (third-party plugins)  
14.2 Plugin sandboxing policy (what’s allowed in plugin packages)  
14.3 Validation strict modes  
14.4 Preventing malicious / corrupted mappings  
14.5 Integrity checks (hashes for seed, signed releases optional)

## 15. Licensing, Legal, and Compliance

15.1 MetaLang core licensing  
15.2 Third-party data licensing constraints

- dictionary abbreviation lists
- Dewey/UDC issues
- Wiktionary licensing compatibility  
    15.3 Provenance and attribution requirements  
    15.4 Policy for shipping proprietary datasets (private plugin guidance)
    

## 16. Roadmap and Version Plan

16.1 v1 MVP scope (must-have)  
16.2 v1.1 scope (domains added: field/geo/language/semantic\_class/phonology/etymology)  
16.3 v1.x planned expansions

- definition methodology domain
- prosody domain
- deeper syntactic constructions
- richer semantic class system  

16.4 Long-term: ecosystem governance and registry model
    

## Appendices

A. Domain definitions (normative)  
B. Canonical ID naming guide (normative)  
C. JSON Schema: seed file  
D. JSON Schema: plugin file  
E. Example plugins: UD / Stanford / Van Dale / Local scholars  
F. Example conversion scenarios (POS conversion, abbreviation normalization, UI localization)  
G. Glossary of terms used in this spec  
H. Change log
