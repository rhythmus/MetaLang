# Vocabulary and Syntax Reference

This document provides detailed guidance on specific vocabulary domains and syntactic markers within the MetaLang ecosystem.

## 1. Punctuation Support

MetaLang provides a standardized ontology for punctuation marks, enabling cross-linguistic normalization and translation of typographic markers.

### 1.1 Core Punctuation Domain
The `PUNCTUATION` domain (child of `ORTHOGRAPHY`) covers standard and specialized punctuation marks. Each mark is assigned a unique `ML_PUNCTUATION_` identifier and, where available, a WikiData QID.

| ML_ID | Label | WikiData |
|---|---|---|
| `ML_PUNCTUATION_FULL-STOP` | full stop | Q190618 |
| `ML_PUNCTUATION_COMMA` | comma | Q161737 |
| `ML_PUNCTUATION_QUESTION-MARK` | question mark | Q11169 |
| `ML_PUNCTUATION_EXCLAMATION-MARK` | exclamation mark | Q158661 |
| `ML_PUNCTUATION_OPEN-QUESTION` | inverted question mark | Q11202 |
| `ML_PUNCTUATION_OPEN-EXCLAMATION` | inverted exclamation mark | Q1346372 |

### 1.2 Language-Specific Markers
MetaLang accounts for language-specific punctuation nuances:
- **Spanish**: Includes inverted marks (`¿`, `¡`) mapped to `ML_PUNCTUATION_OPEN-QUESTION` and `ML_PUNCTUATION_OPEN-EXCLAMATION`.
- **Greek**: Standardizes the Greek question mark (`;`) to `ML_PUNCTUATION_QUESTION-MARK` and the Greek semicolon (`·`, *ano teleia*) to `ML_PUNCTUATION_GREEK-SEMICOLON`.

### 1.3 Normalization and Translation
Plugins map local glyphs (tags) to these IDs. The `Registry` can then:
1. **Normalize**: Resolve a glyph like `¿` to `ML_PUNCTUATION_OPEN-QUESTION`.
2. **Translate**: Resolve a concept like `ML_PUNCTUATION_FULL-STOP` to the matching glyph in a target language (e.g., `.` in English).

## 2. Rhetorical Figures
(Future section for detailed rhetorical mapping documentation)
