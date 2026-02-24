# Metalang: Cross-Linguistic Terminology Alignment

`metalang` is a multilingual, ontology-based **cross-linguistic terminology alignment layer**. It provides a structured framework for the **metalanguage** (descriptive terminology) used to characterize language data itself—normalizing and interoperating between academic, pedagogical, and computational grammar systems.

## 1. Defining Metalanguage
In lexicography, we distinguish between:
- **Object Language**: The language being described (e.g., the Modern Greek verb λύνω).
- **Metalanguage**: The tool used to describe it (e.g., "verb, transitive, imperfective").

`metalang` lives at the level of **Lexicographic Metalanguage**: a structured system of controlled descriptive categories, relations, and definitions used to formally characterize lexical items across grammatical, semantic, pragmatic, and structural dimensions.

### The L2–L3 Alignment Layer
In a 4-level lexicographic model, `metalang` acts as the **interoperability spine** at the alignment level:
- **L0**: Object language (e.g., *λύω*)
- **L1**: Lexical entry structure
- **L2**: Lexicographic metalanguage categories
- **L3**: **Cross-linguistic metalanguage alignment (metalang)**

> `metalang` catalogs the **term** (e.g., "aorist"), not the linguistic **phenomenon** (e.g., perfective past aspect morphology).

## 2. The Problem: Terminological Fragmentation
Different linguistic traditions and standards use conflicting labels for the same concepts:

| Concept | English | Dutch | Greek | UD | EAGLES | School Grammar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [Q34698](https://www.wikidata.org/wiki/Q34698) | adjective | bijvoeglijk mw. | επίθετο | ADJ | ADJ | 'beschrijfwoord' |
| [Q465800](https://www.wikidata.org/wiki/Q465800) | auxiliary verb | hulpwerkwoord | βοηθητικό ρήμα | AUX | AUX | 'doewoord' |
| [Q103184](https://www.wikidata.org/wiki/Q103184) | article | lidwoord | άρθρο | DET | ART | 'de-woord' |

**The Challenge:**
- **Universal Dependencies (UD)** tags are universal but minimal.
- **Academic vs. Lexicographic** conventions often differ.
- **Pedagogical (School) Grammars** use simplified, often language-specific terms.
- **System Mismatches**: UD (DET) ≠ EAGLES (ART) for articles; abbreviations vary wildly.

## 3. The Solution: A Canonical Pivot Layer
`metalang` acts as the **interoperability spine** between these systems. In a 4-level model, it resides at **L2–L3**:
- **L0**: Object language (e.g., *λύω*)
- **L1**: Lexical entry structure
- **L2**: Lexicographic metalanguage categories
- **L3**: **Cross-linguistic metalanguage alignment (metalang)**

### Monorepo Architecture

To support the complex interplay between core logic, localized labels, and external mappings, MetaLang is structured as a **monorepo**. This ensures:

- **Atomic Updates**: Coordinated changes across the core engine and its plugins.
- **Unified Governance**: A single source of truth for GUIDs and domain hierarchies.
- **Modular Distribution**: Independent NPM packages (`@metalang/core`, `@metalang/plugin-ud`) built from the same shared data source.

### Architectural Role
Everything maps *to* `metalang`, rather than directly to each other. It provides a **stable internal ID system** (GUIDs) to anchor labels across languages and standards:

```yaml
wikidata: Q34698
ud: ADJ
eagles: ADJ
celex: A
en: { sing: adjective, plur: adjectives, abbr: adj. }
el: { sing: επίθετο, plur: επίθετα, abbr: επίθ. }
nl: { sing: adjectief, plur: adjectieven, abbr: adj. }
```

## 4. Taxonomy & Domains
`metalang` separates ontological types into distinct top-level domains to avoid mixing categories (tense), values (aorist), and features (aspect=perfective).

### Core Domains
- **Grammatical**: POS, inflection class, case governance, voice, aspect.
- **Semantic**: Meaning relations (synonym, hypernym), semantic features, definitions (genus + differentia).
- **Pragmatic / Usage**: Register labels (archaic, colloquial, technical), regional/stylistic constraints.
- **Structural**: Lexical architecture (sense numbering, collocations, multi-word expressions).
- **Computational**: Feature-value pairs, typed relations, and graph structures used in databases and XML schemas (TEI).

## 5. Design Philosophy
To ensure precision and accessibility, every `metalang` entry adheres to two core rules:

1.  **Mandatory Metadata**: Each entry must include a stable GUID, domain, definition, cross-standard mappings, language-specific abbreviations, and a school-vs-academic flag.
2.  **Concept/Label Separation**: Never treat strings as canonical. The **Concept** (ID) is distinct from the **Label** (human string).

### Reconciliation Standards
`metalang` maps to and integrates: **UD, EAGLES, CELEX, CGN, Wikidata QIDs**, ISOcat, GOLD, and various national school grammars.

## 6. Technical Schema (Conceptual)
```typescript
interface MetalangConcept {  
  id: string;
  domain: "pos" | "morph_feature" | "morph_value" | "semantic_relation" | "register_label" | "syntactic_role" | "definition_strategy";
  definitions: { en: string; el?: string; nl?: string; };
  mappings: { ud?: string; eagles?: string; celex?: string; wikidata?: string; };
}
```
