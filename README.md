# MetaLang: The Cross-Linguistic Terminology Alignment Layer

MetaLang is a multilingual, ontology-based framework for **linguistic metalanguage** — the vocabulary used to describe language itself. It serves as a canonical pivot layer between academic, pedagogical, and computational grammar systems (e.g., Universal Dependencies, EAGLES, national school grammars).

## 🌍 The Problem

Linguistic terminology is fragmented. The same concept (e.g., an "article") might be labeled `ART`, `DET`, `lidwoord`, or `επίθετο` depending on the tradition, standard, or language. MetaLang resolves this by mapping these disparate labels to stable, globally unique identifiers (GUIDs).

## 🚀 The Solution

MetaLang provides:

- **Canonical Ontology**: A stable hierarchy of linguistic concepts across domains (POS, Morphology, Syntax, etc.).
- **Multilingual Labels**: localized terms and abbreviations for end-users and software (EN, NL, EL, DE, FR, PT, ES, IT, RU).
- **Plugin Architecture**: A system for mapping any external tagset (e.g., UD, CELEX, PTB) to the MetaLang core.

## 🎓 Academic & Professional Context

MetaLang is positioned within the emerging subdiscipline of **Language Resource Infrastructure and Standardization**. It addresses the "Backbone infrastructure" problems of:
- **Linguistic Data Infrastructure (LDI)**: Organizing and disclosing heterogeneous linguistic data.
- **Interoperability**: Bridging the gap between legacy institutional data (e.g., Greek-specific INTERA) and modern standards like **Universal Dependencies (UD)** and **CLDF**.
- **Lexicography & Morphology**: Providing a machine-readable path for historical lexicographic terms to modern NLP pipelines.

### Related Standards
MetaLang complements and integrates with:
- **UD**: Standardized syntactic annotation.
- **CLDF**: Cross-Linguistic Data Formats for comparative studies.
- **FoLiA**: Framework for Linguistic Annotation.
- **CLDR**: Unicode Common Locale Data Repository (for localization).

## 📂 Project Structure

This is a monorepo containing the following components:
- `packages/schema`: Core TypeScript interfaces and JSON schemas.
- `packages/core`: The central ontology engine and registry.
- `packages/plugin-ud`: Universal Dependencies tag mapping provider.
- `docs/`: Comprehensive specifications and concept notes.
- `ontology/`: The single-source-of-truth directory of definitions, defining the entire "world" of MetaLang—the domains, the concepts, and their hierarchical relationships

## 📖 Key Documentation

- [Concept Note](file:///Users/woutersoudan/Desktop/metalang/docs/concept-note.md): Philosophical and architectural introduction.
- [Core Specification](file:///Users/woutersoudan/Desktop/metalang/docs/core-Specification.md): Functional and technical requirements for the engine.
- [GUI Specification](file:///Users/woutersoudan/Desktop/metalang/docs/gui-Specification.md): Requirements for the MetaLang authoring and governance tool.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)

### Installation

```bash
pnpm install
```

## 💻 API Usage Examples

MetaLang provides a powerful programmatic interface to resolve, translate, and explore linguistic metalanguage data.

### 1. Unified Search & Resolution
Quickly find concepts or resolve tags from specific systems.

```typescript
import { defaultRegistry as registry } from '@metalang/core';

// Search across all plugins for any tag or term
const results = registry.search("znw"); 
// [ { systemId: "nl-generic", tag: "znw.", conceptId: "ML_POS_NOUN", matchType: "partial" }, ... ]

// Resolve a tag in a specific context
const concepts = registry.resolve("v", "nl-taalunie"); 
// Returns full Concept objects for ML_MORPH-VALUE_GENDER_FEMININE
```

### 2. Cross-System Translation (Conversion)
Map terminology directly from one tradition to another.

```typescript
// Translate a Dutch school grammar tag to its English pedagogical equivalent
const enTags = registry.translateTag("znw", "nl-generic", "en-generic");
// Returns: ["noun", "n.", "noun phrase"]

// Get all tags for a concept in a specific system
const elTags = registry.translateConcept("ML_POS_NOUN", "el-generic");
// Returns: ["ουσιαστικό", "ουσ.", ...]
```

### 3. Linguistic Forms & Fallbacks
Retrieve localized singular, plural, and abbreviated forms with a robust fallback chain.

```typescript
// Get forms for 'article' in a specific system, with automatic fallbacks
const forms = registry.getForms("ML_POS_ARTICLE", "nl-taalunie");

console.log(forms.singular);      // "lidwoord"
console.log(forms.abbreviations);   // ["lw."]
console.log(forms.sourceSystemId); // "nl-generic" (resolves via language fallback)
```

### 4. Ontology Navigation & Metadata
Traverse the concept hierarchy and link to global knowledge bases.

```typescript
// Navigate the ontology
const children = registry.getChildren("ML_POS_NOUN"); 
// [Concept(ML_POS_NOUN-COMMON), Concept(ML_POS_PROPER-NOUN), ...]

// External Links
const wikidata = registry.getWikiDataId("ML_POS_NOUN"); // "Q1401131"
const wikiUrl = registry.getWikipediaUrl("ML_POS_NOUN", "nl"); 
// "https://nl.wikipedia.org/wiki/zelfstandig_naamwoord"
```

## 🧪 Verification

Run the comprehensive API stress test:

```bash
npx tsx scripts/verify_api.ts
```

## 📝 Citation

If you use MetaLang in your research or project, please cite it as follows:

```bibtex
@software{Soudan_MetaLang_2026,
  author = {Soudan, Wouter},
  affiliation = {Independent Scholar; PhD from KU Leuven; former postdoc in Computational Linguistics, Universiteit Antwerpen, Belgium},
  license = {ISC},
  month = {2},
  title = {{MetaLang: Cross-Linguistic Terminology Alignment Layer}},
  url = {https://github.com/rhythmus/MetaLang},
  version = {1.0.0},
  year = {2026}
}
```

Alternatively, you can use the `CITATION.cff` file in this repository for other formats.
