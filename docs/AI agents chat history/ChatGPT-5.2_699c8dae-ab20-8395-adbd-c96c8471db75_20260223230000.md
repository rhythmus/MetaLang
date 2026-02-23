You: 

`metalang` is an i18n effort to translate linguistic meta-language terms, like parts-of-speech (PoS) tags and other grammatical, syntactical and morphological jargon, as used in lexicography, dictionaries, and academic linguistics literature

ChatGPT: 

Understood. Let’s position **`metalang`** precisely within the linguistic and technical ecosystem.

---

## 1\. What `metalang` Is (Formally)

`metalang` is a **cross-linguistic terminology alignment layer** for linguistic meta-language — i.e. the vocabulary used to describe language itself:

-   Parts of speech (noun, adjective, auxiliary, etc.)
    
-   Morphological categories (aorist, imperfect, accusative, augment, etc.)
    
-   Syntactic roles (subject, complement, adjunct)
    
-   Lexicographic labels (archaic, dialectal, slang, poetic)
    
-   Grammatical features (definiteness, aspect, voice, mood, polarity)
    

In technical terms:

> `metalang` is a multilingual ontology of linguistic descriptive categories.

It does not describe language data.  
It describes **the vocabulary used to describe language data**.

---

## 2\. Problem It Solves

Different traditions use different labels:

| Concept | English | Dutch | Greek | UD | EAGLES | School grammar |
| --- | --- | --- | --- | --- | --- | --- |
| adjective | adjective | bijvoeglijk naamwoord | επίθετο | ADJ | ADJ | επίθετο |
| auxiliary verb | auxiliary verb | hulpwerkwoord | βοηθητικό ρήμα | AUX | AUX | βοηθητικό |
| article | article | lidwoord | άρθρο | DET | ART | άρθρο |

But:

-   UD tags are universal but minimal
    
-   School grammar is pedagogical
    
-   Academic linguistics differs from lexicographic conventions
    
-   Abbreviations vary wildly
    
-   Greek school grammar ≠ UD ≠ CELEX ≠ CGN ≠ EAGLES
    

`metalang` becomes the **canonical pivot layer** between all these systems.

---

## 3\. Architectural Role in Your Ecosystem

Given your work on:

-   Greek lexica
    
-   UD tag mapping
    
-   CELEX / CGN / EAGLES integration
    
-   school vs academic distinctions
    
-   YAML/TSV structured exports
    

`metalang` should be:

### 1️⃣ A stable internal ID system

Example:

```
YAML

id: POS\_ADJECTIVE  
wikidata: Q34698  
ud: ADJ  
eagles: ADJ  
celex: A  
school:  
  el: επίθετο  
  nl: bijvoeglijk naamwoord  
  en: adjective  
academic:  
  el: επίθετο  
  en: adjective
```

So everything maps *to* `metalang`, never directly to each other.

---

## 4\. Conceptual Classes Inside `metalang`

You likely need distinct top-level domains:

```
Code

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

Do not mix:

-   category (tense)
    
-   value (aorist)
    
-   feature (aspect=perfective)
    

They must be separate ontological types.

---

## 5\. Relationship to Existing Standards

`metalang` should map to:

-   **UD (Universal Dependencies)**
    
-   **EAGLES**
    
-   **CELEX**
    
-   **CGN**
    
-   **Wikidata QIDs**
    
-   Greek school grammar
    
-   Dutch school grammar
    
-   ISOcat (historical reference)
    
-   GOLD ontology (if relevant)
    

It becomes the interoperability spine.

---

## 6\. Why This Is Non-Trivial

Because:

-   “Article” is DET in UD, but ART in EAGLES
    
-   Greek σχολική γραμματική ≠ linguistic theory
    
-   “Auxiliary” is syntactic in some traditions, lexical in others
    
-   “Participles” sometimes treated as verb forms, sometimes adjectives
    
-   Some traditions merge adverbs & particles
    

You are building a **terminology reconciliation system**.

That is ontological work, not translation work.

---

## 7\. Design Recommendations

### A. Every entry must have:

-   Stable ID
    
-   Domain (pos / morph\_feature / etc.)
    
-   Definitions (not just labels)
    
-   Cross-standard mappings
    
-   Abbreviations per language
    
-   School vs academic flag
    

### B. Separate:

-   label (human language string)
    
-   concept (metalang ID)
    

Never treat strings as canonical.

---

## 8\. Strategic Importance for Your Projects

`metalang` would unify:

-   Your Greek morphological stemmer UI
    
-   Vocabulary tiles
    
-   Grammar drill engine
    
-   Flashcard metadata
    
-   YAML export format
    
-   CEFR difficulty modeling
    
-   UD corpus alignment
    
-   OCR ingestion normalization
    

It becomes foundational infrastructure.

---

## 9\. Positioning Statement (Concise)

If you need a formal definition:

> `metalang` is a multilingual, ontology-based alignment framework for linguistic descriptive terminology, designed to normalize and interoperate between academic, pedagogical, and computational grammar systems.

---

If you'd like, we can now:

-   Draft a formal schema (TypeScript interfaces)
    
-   Design a canonical YAML v1
    
-   Define domain taxonomy
    
-   Or align it with your Orbit Tree model
    

Where do you want to go next?

You: 

Lexicographic metalanguage is the specialized language, symbols, and definitions used in dictionaries to describe, analyze, and explain the meanings and usage of words (the object language). It includes definitions, grammatical labels (e.g., "noun," "verb"), usage notes, and semantic formulas designed to be precise, consistent, and user-friendly, crucial for accurate lexicographic description. Key Aspects of Lexicographic Metalanguage: - Function: It is the tool for assigning a definiens to a definiendum (the word being defined). Components: - Labels: Subjective or objective tags for register, field, or region. Definitions: Semantic descriptions. - Structure: Formalized structures for presenting lexical relationships like synonymy or antonymy. Types of Metalanguage: - Natural Semantic Metalanguage (NSM): A theory using a small, universal set of semantic primes (basic concepts) to define complex words, often used for cross-linguistic analysis. - Formal/Technical Metalanguage: Often used in, but sometimes hidden from, specialized electronic dictionaries (e.g., e-lexicography) to manage complex semantic relations. The Challenge: It must balance scientific precision for accuracy with accessibility for the dictionary user. Metalanguage is fundamentally used to describe the properties of a word (morphological, syntactic, semantic, pragmatic). It serves as a bridge between the user and the language being studied.

ChatGPT: 

Excellent. What you are describing is **strictly broader** than PoS translation. It is the full descriptive apparatus of dictionary science.

Let us sharpen the concept rigorously and position it within your `metalang` initiative.

---

# 1\. Object Language vs Metalanguage

In lexicography:

-   **Object language** = the language being described
    
-   **Metalanguage** = the language used to describe it
    

If your dictionary describes Modern Greek:

-   λύνω → object language
    
-   “verb, transitive, imperfective, takes accusative object” → metalanguage
    

Metalanguage is therefore:

> A controlled descriptive system used to encode lexical properties.

---

# 2\. Components of Lexicographic Metalanguage

We can formalize this into domains.

## A. Grammatical Metalanguage

Describes formal linguistic structure:

-   Part of speech
    
-   Inflection class
    
-   Case governance
    
-   Subcategorization frame
    
-   Voice
    
-   Aspect
    
-   Derivational morphology
    

Example:

```
Code

λύω  
POS: verb  
Aspect: imperfective  
Voice: active  
Transitivity: transitive  
Subcat: NP\[acc\]
```

---

## B. Semantic Metalanguage

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

---

## C. Pragmatic / Usage Metalanguage

Describes sociolinguistic and stylistic constraints:

-   archaic
    
-   colloquial
    
-   vulgar
    
-   poetic
    
-   technical
    
-   regional
    
-   ironic
    

These are lexicographic **register labels**.

---

## D. Structural Metalanguage

Encodes lexical architecture:

-   sense numbering
    
-   subsense nesting
    
-   phraseological units
    
-   collocations
    
-   idioms
    
-   multi-word expressions
    

This is hidden but crucial in electronic lexicography.

---

# 3\. Types of Metalanguage

Now the deeper typology.

## 1️⃣ Natural Semantic Metalanguage (NSM)

Associated with:

-   Anna Wierzbicka
    
-   Cliff Goddard
    

NSM proposes:

-   ~65 semantic primes
    
-   universal cross-linguistic vocabulary
    
-   definitions written in controlled simple words
    

Example NSM-style definition:

> “kill” =  
> someone did something to someone else  
> because of this, this other someone died

It is theoretically elegant but rarely used directly in commercial dictionaries.

---

## 2️⃣ Formal / Computational Metalanguage

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
    

This is what your system is gravitating toward.

---

# 4\. The Core Tension

Lexicographic metalanguage must balance:

| Scientific precision | User accessibility |
| --- | --- |
| feature matrices | readable prose |
| semantic decomposition | natural definitions |
| ontology relations | intuitive examples |

Too technical → unreadable  
Too intuitive → inconsistent

That tension defines dictionary design.

---

# 5\. Where Your `metalang` Fits

Your `metalang` project can be defined more precisely now:

> `metalang` is a multilingual ontology of lexicographic metalanguage categories and labels, covering grammatical, semantic, pragmatic, and structural domains.

It is NOT:

-   a semantic theory
    
-   a dictionary
    
-   a parser
    

It is:

-   the descriptive infrastructure
    

---

# 6\. Recommended Ontological Layering

You should distinguish four levels:

```
Code

L0  Object language (λύω)  
L1  Lexical entry structure  
L2  Lexicographic metalanguage categories  
L3  Cross-linguistic metalanguage alignment (metalang)
```

Your work lives at L2–L3.

---

# 7\. Formal Schema Proposal (Conceptual)

```
TypeScript

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

You will need to add:

-   school grammar variant
    
-   abbreviation system
    
-   hierarchy support
    

---

# 8\. Important Distinction You Must Maintain

Do NOT conflate:

-   metalanguage term  
    vs
    
-   linguistic phenomenon
    

Example:

-   "aorist" (metalinguistic term)
    
-   perfective past aspect morphology (phenomenon)
    

`metalang` catalogs the term, not the phenomenon.

---

# 9\. Strategic Implication for Your Vocabulary App

If you integrate this properly:

-   OCR ingestion can normalize grammar labels
    
-   Greek stemmer UI can display consistent terminology
    
-   Flashcards can toggle school vs academic labels
    
-   YAML export can remain stable across standards
    
-   Cross-dictionary import becomes possible
    

This is infrastructure-level work.

---

# 10\. Precision Definition (Final)

A tight formulation:

> Lexicographic metalanguage is a structured system of controlled descriptive categories, relations, and definitions used to formally characterize lexical items across grammatical, semantic, pragmatic, and structural dimensions.

And:

> `metalang` is a multilingual alignment ontology for lexicographic metalanguage.

---

If you want to proceed rigorously, the next step is:

-   Define the **top-level taxonomy of lexicographic metalanguage domains**
    
-   Or formalize the distinction between **term ontology** and **feature ontology**
    

Which direction do you prefer?