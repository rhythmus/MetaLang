# Metalang


## What `metalang` Is (Formally)

`metalang` is a multilingual, ontology-based, **cross-linguistic terminology alignment layer**, a framework for linguistic meta-language (descriptive terminology) — i.e. the vocabulary used to describe language itself, designed to normalize and interoperate between academic, pedagogical, and computational grammar systems.

It is an internationalization (i18n) effort to help translate (and consistently use, across natural languages) lexicographic terminology, grammatical, syntactical and morphological jargon, as used in lexica, dictionaries, academic linguistics literature, and, ultimately, in language-driven software projects.

Included are:

-   [Parts of speech](https://en.wikipedia.org/wiki/Part_of_speech) (e.g. `noun`, `adjective`, `auxiliary (verb)`, etc.)
-   Morphological categories (e.g. `aorist`, `imperfect`, `accusative`, `augment`, etc.)
-   Syntactic roles (e.g. `subject`, `complement`, `adjunct`, etc.)
-   Lexicographic labels (e.g. `archaic`, `dialectal`, `slang`, `poetic`, etc.)
-   Grammatical features (e.g. `definiteness`, `aspect`, `voice`, `mood`, `polarity`, etc.)
    

In technical terms:

> `metalang` is a multilingual ontology of linguistic descriptive categories.

It does not describe language data.  
It describes **the vocabulary used to describe language data**.

## Problem It Solves

Different traditions use different labels:

| Concept | English | Dutch | Greek | UD | EAGLES | School grammar |
| --- | --- | --- | --- | --- | --- | --- |
| [Q34698](https://www.wikidata.org/wiki/Q34698) | adjective | bijvoeglijk naamwoord | επίθετο | ADJ | ADJ | ‘beschrijfwoord’ |
| [Q465800](https://www.wikidata.org/wiki/Q465800) | auxiliary verb | hulpwerkwoord | βοηθητικό ρήμα | AUX | AUX | ‘doewoord’ |
| [Q103184](https://www.wikidata.org/wiki/Q103184) | article | lidwoord | άρθρο | DET | ART | ‘de-woord’ |

But:

-   UD tags are universal but minimal
-   school grammar is pedagogical
-   academic linguistics differs from lexicographic conventions
-   abbreviations vary wildly
-   UD ≠ CELEX ≠ CGN ≠ EAGLES …
    

`metalang` becomes the **canonical pivot layer** between all these systems.

---

## Architectural Role in the Lexicographic Ecosystem

`metalang` aims to be:

### 1️⃣ A stable internal ID system

Example:

```YAML

wikidata: Q34698  # the ultimate GUID (globally unqique identifier)…
ud: ADJ
eagles: ADJ
celex: A
en: 
  sing: adjective 
  plur: adjectives
  abbr: adj.
el:
  sing: επίθετο
  plur: επίθετα
  abbr: επίθ.
nl:
  sing: [bijvoeglijk naamwoord, adjectief]
  plur: [bijvoeglijk naamwoorden, adjectieven]
  abbr: [bvw, adj.]

```

So everything maps *to* `metalang`, never directly to each other.


### Conceptual Classes Inside `metalang`

`metalang` distinguishes ditinct top-level domains:

```plaintext
metalang  
├── pos                # noun, verb, adjective  
├── morph\_feature      # tense, aspect, case  
├── morph\_value        # aorist, imperfect, accusative  
├── syntactic\_role     # subject, object  
├── derivational\_type  # diminutive, augmentative  
├── lex\_register       # slang, archaic, formal  
├── discourse\_label    # ironic, pejorative  
├── orthographic\_term  # stress mark, augment
```

These separate ontological types; hence, do not mix:

- category (tense)  
- value (aorist)
- feature (aspect=perfective)
    


## Relationship to Existing Standards

`metalang`  maps to:

-   **UD (Universal Dependencies)**
-   **EAGLES**
-   **CELEX**
-   **CGN**
-   **Wikidata QIDs**
-   ISOcat (historical reference)
-   GOLD ontology (?)
-   various school grammars (Dutch, Greek, etc.)

It becomes the interoperability spine.

## Why This Is Non-Trivial

Because:

-   “Article” is `DET` in UD, but `ART` in EAGLES
-   “Auxiliary” is syntactic in some traditions, lexical in others
-   “Participles” sometimes treated as verb forms, sometimes adjectives
-   Some traditions merge adverbs & particles
    

`metalang` thus is a **terminology reconciliation system**.


---

## Design Philosophy

### 1. Every entry must have:

- stable GUID   
- domain (pos / morph\_feature / etc.)
- definitions (not just labels)
- cross-standard mappings
- abbreviations per language
- school vs academic flag
    

### 2. Separate:

-  label (human language string)   
-  concept (metalang ID)
    
Never treat strings as canonical!


## What is “meta language”?

In lexicography we distinguish:

-  **Object language** = the language being described
-  **Metalanguage** = the language used to describe it
    
For example, if your dictionary describes Modern Greek:

- λύνω → object language  
- “verb, transitive, imperfective, takes accusative object” → metalanguage

Lexicographic metalanguage thus is the specialized language, symbols, and definitions used in dictionaries to describe, analyze, and explain the meanings and usage of words (the object language). It includes definitions, grammatical labels (e.g., "noun," "verb"), usage notes, and semantic formulas designed to be precise, consistent, and user-friendly, crucial for accurate lexicographic description.

Key Aspects of Lexicographic Metalanguage:

- **Function** — It is the tool for assigning a definiens to a definiendum (the word being defined).
- **Components**
	- _Labels_ — Subjective or objective tags for register, field, or region.
	- _Definitions_ — Semantic descriptions.
	- _Structure_ — Formalized structures for presenting lexical relationships like synonymy or antonymy.

The Challenge: Meta language must balance scientific precision for accuracy with accessibility for the dictionary user. Metalanguage is fundamentally used to describe the properties of a word (morphological, syntactic, semantic, pragmatic). It serves as a bridge between the user and the language being studied.

Metalanguage is therefore:

> A controlled descriptive system used to encode lexical properties.

Or a more tight formulation:

> Lexicographic metalanguage is a structured system of controlled descriptive categories, relations, and definitions used to formally characterize lexical items across grammatical, semantic, pragmatic, and structural dimensions.

And:

> `metalang` is a multilingual alignment ontology for lexicographic metalanguage.

## Components (domains) of Lexicographic Metalanguage

### A. Grammatical Metalanguage

Describes formal linguistic structure:

-   Part of speech    
-   Inflection class
-   Case governance
-   Subcategorization frame
-   Voice
-   Aspect
-   Derivational morphology
    
Example:

```plaintext

λύω  
POS: verb  
Aspect: imperfective  
Voice: active  
Transitivity: transitive  
Subcat: NP[acc]
```

### B. Semantic Metalanguage

Describes meaning relations and semantic decomposition.

Includes:

-   Definition (genus + differentia)
-   Synonym
-   Antonym
-   Hypernym
-   Hyponym
-   Semantic features
    
Example:

> λύω = “cause something to become free from constraint”

This is structured semantic metalanguage.


### C. Pragmatic / Usage Metalanguage

Describes sociolinguistic and stylistic constraints:

-   archaic    
-   colloquial
-   vulgar
-   poetic
-   technical
-   regional
-   ironic

These are lexicographic **register labels**.

### D. Structural Metalanguage

Encodes lexical architecture:

-   sense numbering
-   subsense nesting
-   phraseological units
-   collocations
-   idioms
-   multi-word expressions

This is hidden but crucial in electronic lexicography.

    
Computational Metalanguage

Used in:

-   Frame semantics
    
-   WordNet-style ontologies
    
-   Lexical databases
    
-   e-lexicography backends
    
-   XML dictionary schemas (e.g., TEI)
    

Here the metalanguage becomes:

-   Feature-value pairs
-   Typed relations
-   Graph structures
-   Ontology nodes
    

## The Core Tension

Lexicographic metalanguage must balance:

| Scientific precision | User accessibility |
| --- | --- |
| feature matrices | readable prose |
| semantic decomposition | natural definitions |
| ontology relations | intuitive examples |

Too technical → unreadable  
Too intuitive → inconsistent

That tension defines dictionary design.


## In conclusion

Your `metalang` project can be defined more precisely now:

> `metalang` is a multilingual ontology of lexicographic metalanguage categories and labels, covering grammatical, semantic, pragmatic, and structural domains.

It is NOT:

-   a semantic theory
-   a dictionary
-   a parser
    
It is:

-   the descriptive infrastructure
    
If we distinguish four levels:

```plaintext
L0  Object language (λύω)  
L1  Lexical entry structure  
L2  Lexicographic metalanguage categories  
L3  Cross-linguistic metalanguage alignment (metalang)
```

Then `metalang` lives at L2–L3.



Do NOT conflate:

-   metalanguage term  
    vs
-   linguistic phenomenon
    

Example:

-   "aorist" (metalinguistic term)
-   perfective past aspect morphology (phenomenon)

`metalang` catalogs the term, not the phenomenon.



# Formal Schema Proposal (Conceptual)

```TypeScript

interface MetalangConcept {  
  id: string  
  domain:   
    | "pos"  
    | "morph\_feature"  
    | "morph\_value"  
    | "semantic\_relation"  
    | "register\_label"  
    | "syntactic\_role"  
    | "definition\_strategy"  
  definitions: {  
    en: string  
    el?: string  
    nl?: string  
  }  
  mappings: {  
    ud?: string  
    eagles?: string  
    celex?: string  
    wikidata?: string  
  }  
}
```



