# MetaLang: The Cross-Linguistic Terminology Alignment Layer

MetaLang is a multilingual, ontology-based framework for **linguistic metalanguage** — the vocabulary used to describe language itself. It serves as a canonical pivot layer between academic, pedagogical, and computational grammar systems (e.g., Universal Dependencies, EAGLES, national school grammars).

## 🌍 The Problem

Linguistic terminology is fragmented. The same concept (e.g., an "article") might be labeled `ART`, `DET`, `lidwoord`, or `επίθετο` depending on the tradition, standard, or language. MetaLang resolves this by mapping these disparate labels to stable, globally unique identifiers (GUIDs).

## 🚀 The Solution

MetaLang provides:

- **Canonical Ontology**: A stable hierarchy of linguistic concepts across domains (POS, Morphology, Syntax, etc.).
- **Multilingual Labels**: localized terms and abbreviations for end-users and software.
- **Plugin Architecture**: A system for mapping any external tagset (e.g., UD, CELEX) to the MetaLang core.

## 📂 Project Structure

This is a monorepo containing the following components:
- `packages/core`: The central ontology engine and registry.
- `packages/plugin-*`: Mappings for specific standards and dictionaries.
- `docs/`: Comprehensive specifications and concept notes.
- `data/`: The machine-readable "seed" data for the ontology.

## 📖 Key Documentation

- [Concept Note](file:///Users/woutersoudan/Desktop/metalang/docs/concept-note.md): Philosophical and architectural introduction.
- [Core Specification](file:///Users/woutersoudan/Desktop/metalang/docs/core-Specification.md): Functional and technical requirements for the engine.
- [GUI Specification](file:///Users/woutersoudan/Desktop/metalang/docs/gui-Specification.md): Requirements for the MetaLang authoring and governance tool.

## 🛠️ Getting Started

*(Instructions for setup and development will be added as the monorepo matures.)*

---

*MetaLang: Bridging the gap between human linguistics and machine data.*
