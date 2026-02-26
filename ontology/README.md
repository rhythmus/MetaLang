# MetaLang Ontology

This directory contains the canonical MetaLang ontology, structured into domain-specific TSV files.

## Structure

```
ontology/
├── domains.tsv          # Definition of all canonical domains
└── concepts/            # Domain-specific concept definitions
    ├── rhetoric.tsv     # Rhetorical figures and devices
    ├── pos.tsv          # Parts of speech
    ├── morph-value.tsv  # Grammatical values (gender, number, case, etc.)
    └── ...
```

## Concept ID Conventions (ML_ID)

All MetaLang IDs follow a strict naming convention:
`ML_[DOMAIN]_[CONCEPT-NAME]`

### Formatting Rules

1.  **Prefix**: Always starts with `ML_`.
2.  **Domain**: The domain identifier in ALL_CAPS.
3.  **Concept Name**: The specific concept identifier in ALL_CAPS.
4.  **Separators**: Underscore (`_`) is used only between the prefix, domain, and concept parts.
5.  **Word Joining**: Within a concept name, words are joined by hyphens (`-`).
    *   *Example*: `ML_RHETORIC_HENDIADYS`, `ML_MORPH-VALUE_GENDER-MASCULINE`.

## Domain-Specific Protocols

### Rhetoric (`ML_RHETORIC_`)
The rhetorical ontology was significantly expanded in early 2026 to include over 250 concepts cross-referenced with Wikidata QIDs. 

- **Primary Source**: Wiktionary rhetorical glossaries across multiple languages.
- **Standardization**: Non-standard characters (like the tricolon symbol `⁝`) are mapped to descriptive IDs (e.g., `ML_RHETORIC_TRICOLON`) in manifestations while preserving the original tag in mappings.

### Phonology & Orthography
Used for lower-level linguistic markers such as elision, epenthesis, and punctuation.
