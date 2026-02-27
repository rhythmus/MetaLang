# Vocabulary and Syntax Reference

This document provides detailed guidance on specific vocabulary domains and syntactic markers within the MetaLang ecosystem.

## 1. Punctuation Support

MetaLang provides a standardized ontology for punctuation marks, enabling cross-linguistic normalization and translation of typographic markers.

### 1.1 Core Punctuation Domain
The `PUNCTUATION` domain (child of `ORTHOGRAPHY`) covers standard and specialized punctuation marks. 

| ML_ID | Label | WikiData |
|---|---|---|
| `ML_PUNCTUATION_FULL-STOP` | full stop | Q190618 |
| `ML_PUNCTUATION_COMMA` | comma | Q161737 |
| `ML_PUNCTUATION_QUESTION-MARK` | question mark | Q11169 |
| `ML_PUNCTUATION_EXCLAMATION-MARK` | exclamation mark | Q158661 |
| `ML_PUNCTUATION_QUESTION-MARK-OPEN` | inverted question mark | Q11202 |
| `ML_PUNCTUATION_EXCLAMATION-MARK-OPEN` | inverted exclamation mark | Q1346372 |

### 1.2 Rich Mappings and Symbol Resolution
To support sophisticated typographic normalization and translation, MetaLang uses **Rich Linguistic Mappings**. Instead of flat `glyph: ID` pairs, plugin manifests map concept IDs to rich objects.

#### 1.2.1 The `symbols` Property
The `symbols` property in a `LinguisticMapping` allows a concept to own multiple typographic variants (e.g., different types of quotation marks or regional variants).

```json
"ML_PUNCTUATION_QUESTION-MARK": {
    "id": "ML_PUNCTUATION_QUESTION-MARK",
    "singular": "ερωτηματικό",
    "symbols": [";", "?"]
}
```

### 1.3 Resolution Logic
The `Registry` implements a bidirectional resolution strategy:
1. **Normalization (Glyph → ID)**: The registry indexes all entries in the `symbols` array as lookup keys. An input tag like `;` in a Greek context resolves to `ML_PUNCTUATION_QUESTION-MARK`.
2. **Translation/Localization (ID → Label/Glyph)**: Resolving a concept ID returns the rich mapping object, providing the localized label (e.g., `τελεία`) or the preferred symbol.

## 2. Rhetorical Figures
(Future section for detailed rhetorical mapping documentation)
