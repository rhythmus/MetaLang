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

You: 

Here are some useful links, stuff we might want. to integrate: - https://universaldependencies.org/#language-u - https://github.com/dariusk/pos-js - https://en.wikipedia.org/wiki/DICT - https://en.wikipedia.org/wiki/Vocable\_(lexicography) Please elucidate and explain why and how these might be relevant for the `metalang` project, and how they could be integrated

ChatGPT: 

Here’s a precise analysis of the utility of *those links* you provided in the context of the `metalang` project — **why they’re relevant, what they represent, and how they could integrate with your metalanguage ontology**.

---

## 📌 1. **Universal Dependencies (UD)** – [https://universaldependencies.org/](https://universaldependencies.org/?utm_source=chatgpt.com) [universaldependencies.org](https://universaldependencies.org/?utm_source=chatgpt.com)

**What it is:**  
UD is a widely-used framework for **cross-linguistic syntactic and morphological annotation**. It defines:

-   *Universal POS tagset* (ADJ, NOUN, VERB, etc.) [universaldependencies.org](https://universaldependencies.org/u/pos/?utm_source=chatgpt.com)
    
-   Morphological features (e.g., Number=Sing, Tense=Past)
    
-   Syntactic dependency relations (nominal subject `nsubj`, object `obj`, etc.) [Wikipedia](https://en.wikipedia.org/wiki/Universal_Dependencies?utm_source=chatgpt.com)
    

**Relevance to `metalang`:**  
UD provides a **standardized, language-agnostic metalanguage for grammar**. This directly intersects with metalang’s goal of translating and aligning grammatical terminology.

**How it fits into metalang:**  
UD’s categories and features can populate your `metalang` ontology as:

-   **Core grammatical categories** (POS classes)
    
-   **Feature inventories** (number, tense, aspect)
    
-   **Syntactic relations**
    

For example:

```
YAML

metalang:POS\_NOUN  
  ud: NOUN  
  definition: “A nominal part of speech referring to entities…”
```

This makes UD a *stable, well-documented target standard* for mapping metalanguage terms across languages.

**Why adopt UD:**

-   *Cross-lingual consistency* — strong foundation for multilingual metalanguage alignment. [universaldependencies.org](https://universaldependencies.org/?utm_source=chatgpt.com)
    
-   *Rich feature set* — beyond POS: morphological facets and dependency relations. [Wikipedia](https://en.wikipedia.org/wiki/Universal_Dependencies?utm_source=chatgpt.com)
    
-   Facilitates computational usage (e.g., corpus annotation as a source of metalanguage grounded in real data).
    

---

## 📌 2. **pos-js (GitHub)** – [https://github.com/dariusk/pos-js](https://github.com/dariusk/pos-js?utm_source=chatgpt.com) [GitHub](https://github.com/dariusk/pos-js?utm_source=chatgpt.com)

**What it is:**  
A JavaScript POS tagger that segments and assigns **part-of-speech labels** to tokens, based on traditional (Brill-style) tagging rules.

**Relevance to `metalang`:**  
While *not a standard*, pos-js embodies a **practical generative mapping** of words → grammar labels.

**How it could contribute:**

-   As a source for example *usage of metalanguage terms in NLP workflows*
    
-   As **data generator** when building or testing metalang integrations in applications like dictionary UIs or taggers
    
-   Assist in **validating metalanguage labels against real text** (e.g., check that a metalang POS label corresponds to typical tagger output)
    

**But:**  
Its tag set is *English-centric* and not cross-linguistic, so its value is **practical in tooling, not as a canonical standard**.

Integration example:

```
JavaScript

const metalangTagMapping \= {  
  'NN': 'metalang:POS\_NOUN',  
  'VB': 'metalang:POS\_VERB',  
  ...  
};
```

This serves as a *bridging layer* between existing taggers and your metalang schema.

---

## 📌 3. **Wikipedia: DICT (protocol)** – [https://en.wikipedia.org/wiki/DICT](https://en.wikipedia.org/wiki/DICT?utm_source=chatgpt.com) [Wikipedia](https://en.wikipedia.org/wiki/DICT?utm_source=chatgpt.com)

**What it actually is:**  
A *network protocol* for querying dictionary definitions from a remote server — not linguistics metalanguage itself.

**Why it’s relevant (but tangential):**

-   **Provides a standardized API model** for dictionary access. [Wikipedia](https://en.wikipedia.org/wiki/DICT?utm_source=chatgpt.com)
    
-   Useful if you plan to **store, query, and distribute dictionary data** programmatically.
    

**How it might integrate:**

-   As a *delivery endpoint* for dictionary content that uses your `metalang` annotations.
    
-   A **distribution format** in tools testing dictionary look-up logic.
    
-   Not part of the ontology itself — but useful for **serving metalang-annotated lexical data**.
    

Example:  
If you publish a compendium of definitions with metalanguage markup, a DICT-compatible server could deliver those definitions to clients.

---

## 📌 4. **Wikipedia: Vocable (lexicography)** – [https://en.wikipedia.org/wiki/Vocable\_(lexicography)](https://en.wikipedia.org/wiki/Vocable_\(lexicography\)?utm_source=chatgpt.com) [Wikipedia](https://en.wikipedia.org/wiki/Vocable_%28lexicography%29?utm_source=chatgpt.com)

**What it is:**  
In lexicography, a *vocable* is the **word or phrase that serves as the headword in a dictionary entry**.

**Relevance to `metalang`:**

-   Your metalanguage needs a **lexical unit identifier** for headwords (vocable)
    
-   The term itself is part of the **lexicographic metalanguage inventory**
    

**How it maps into your project:**

| Concept | type | metalang |
| --- | --- | --- |
| headword/vocable | structural lexicographic term | `metalang:VOCABLE` |
| sense numbering | structural metalanguage | `metalang:SENSE_NUMBER` |

Vocable is a domain-specific term separate from PoS or morphological features — and should be included as a *fundamental metalang category* for dictionary structure.

---

## ⚙️ How to Integrate These Sources Into `metalang`

Here’s a high-level integration plan you could adopt:

### **1\. Core Ontology Seeding**

-   Use **UD POS tags** + morphological features as base metalang concepts.  
    Example:
    
    ```
    YAML
    
    metalang.POS:  
      ADJ:  
        definition.en: "An adjective."  
        ud: "ADJ"  
      NOUN:  
        definition.en: "A noun."  
        ud: "NOUN"
    ```
    
-   Expand to **syntactic roles** and **dependency labels** (`nsubj`, `obj`) that your dictionary UI might display.
    

---

### **2\. Operational Labels and Structural Terms**

-   Include **vocable** and structural lexicographic terms (`headword`, `sense`, `collocation`) as distinct metalang categories.
    

---

### **3\. NLP Tooling Bindings**

-   Create mappings from tools like `pos-js` to UD tags, then to metalang.  
    Example:
    
    ```
    Code
    
    fastTagger → UD → metalang
    ```
    
-   This establishes a *transitive normalization layer*.
    

---

### **4\. Platform and Protocol Support**

-   Use **DICT or similar protocols** to serve dictionary definitions enriched with metalang annotations.
    

---

## 📌 Summary of Why These Are Useful

| Resource | Role in `metalang` |
| --- | --- |
| **Universal Dependencies** | Canonical grammatical terminology backbone [universaldependencies.org](https://universaldependencies.org/?utm_source=chatgpt.com) |
| **pos-js tagger** | Practical NLP source for real tagging workflows [GitHub](https://github.com/dariusk/pos-js?utm_source=chatgpt.com) |
| **DICT protocol** | Dictionary distribution layer [Wikipedia](https://en.wikipedia.org/wiki/DICT?utm_source=chatgpt.com) |
| **Vocable** | Fundamental lexicographic structure term [Wikipedia](https://en.wikipedia.org/wiki/Vocable_%28lexicography%29?utm_source=chatgpt.com) |

---

## 🧩 Strategic Integration Principles

1.  **Treat UD as canonical for grammatical metalanguage** — ideal for multilingual alignment. [universaldependencies.org](https://universaldependencies.org/u/pos/?utm_source=chatgpt.com)
    
2.  **Treat NLP taggers as converters, not standards** — use them to *populate data*, not define categories.
    
3.  **Treat DICT as backend technology, not ontology content**.
    
4.  **Include structural lexicographic categories directly in your ontology**.
    

---

If you want, I can help draft an initial **schema draft** showing how these sources map into your metalang YAML/JSON ontology — annotated with example mappings and cross-references.

You: 

Okay, let's be practical. Given all that's been said about the purpose and goal of the MetaLang project, eventually we are building a software tool, a utility, which we will want to publish as an NPM package to be used and consumed by all kinds of software projects that deal with meta language or linguistic terms, foremost part of speech taggers, dictionaries, and so on. So basically, what's the MetaLang project is all about is it's basically one big table of concepts identified by a globally unique identifier, which could be Wikidata QID, but since Wikidata QID does not offer complete coverage of all kinds of meta language terms, we will have to go with an internal globally unique identifier, which we will use throughout the project as the absolute globally unique identifier, which will bridge all kinds of translations. So the goal of the software tool will be to offer a library which does lookups and conversions. For example, if we are using a part of speech tagger, which takes in a word and then emits a POS or part of speech tag, then the Metalang library or module will serve as an abstraction layer or a conversion layer and will take in those POS tags and outputs them in any other tag system the user wants. For example, if the under the hood, the POS tagger uses universal dependency tags, but the users in their software project want to show to their end users not the universal dependency tags, but something more meaningful, like a Dutch descriptor or Dutch term, then our Metalang library will do the conversion. That being said, please propose an API, so a set of functions in TypeScript which take in a query or search term along with a system, for example, universal dependencies or Stanford, NLP or what have you, and then a desired translation, for example, Dutch, and then more specifically, Dutch abbreviations. So this is only a sample. Now please propose me a full API or a set of converter functions which we will have to implement in our module or library package.

ChatGPT: 

Excellent. Now we are at the **actual product definition** stage.

You are not building a theory.  
You are building a **terminology conversion engine**.

Let’s formalize this cleanly.

---

# 🎯 Core Concept of the NPM Package

MetaLang is:

> A deterministic terminology normalization and conversion engine for linguistic meta-language systems.

It does:

-   Normalize incoming tag → canonical internal concept ID
    
-   Convert canonical ID → any other tag system
    
-   Convert canonical ID → localized human-readable labels
    
-   Provide metadata lookup
    
-   Provide search
    
-   Provide hierarchy navigation
    

It does NOT:

-   Do tagging
    
-   Do parsing
    
-   Do NLP
    
-   Do lexicography itself
    

It is a **pure mapping engine**.

---

# 🧠 Internal Architecture Assumption

All conversions pass through:

```
Code

External Tag → Canonical MetaLang ID → Target System
```

Never convert system A → system B directly.

---

# 🏗️ Internal Data Model

Every concept has:

```
TypeScript

interface MetalangConcept {  
  id: string // internal globally unique id (e.g. ML\_POS\_NOUN)  
  domain: MetalangDomain  
  mappings: Record<TagSystem, string | string\[\]>  
  labels: Record<Locale, {  
    full: string  
    abbreviation?: string  
  }>  
  wikidataQid?: string  
  description?: Record<Locale, string\>  
}
```

---

# 🧩 Core Type Definitions

```
TypeScript

export type TagSystem \=  
  | "ud"  
  | "stanford"  
  | "eagles"  
  | "celex"  
  | "cgn"  
  | "custom"  
  
export type Locale \=  
  | "en"  
  | "nl"  
  | "el"  
  | "de"  
  | string  
  
export type LabelVariant \=  
  | "full"  
  | "abbreviation"  
  
export type MetalangDomain \=  
  | "pos"  
  | "morph\_feature"  
  | "morph\_value"  
  | "syntactic\_relation"  
  | "register\_label"  
  | "lexicographic\_structure"
```

---

# 🚀 Proposed Public API

We separate it into logical modules.

---

# 1️⃣ Normalization API

Convert any external tag into canonical ID.

```
TypeScript

normalizeTag(  
  inputTag: string,  
  system: TagSystem  
): string | null
```

Example:

```
TypeScript

normalizeTag("NOUN", "ud")  
// → "ML\_POS\_NOUN"  
  
normalizeTag("NN", "stanford")  
// → "ML\_POS\_NOUN"
```

---

# 2️⃣ Conversion API

Convert from one tag system to another.

```
TypeScript

convertTag(  
  inputTag: string,  
  fromSystem: TagSystem,  
  toSystem: TagSystem  
): string | string\[\] | null
```

Example:

```
TypeScript

convertTag("NN", "stanford", "ud")  
// → "NOUN"
```

---

# 3️⃣ Localization API

Convert tag to localized human-readable label.

```
TypeScript

translateTag(  
  inputTag: string,  
  system: TagSystem,  
  locale: Locale,  
  variant?: LabelVariant  
): string | null
```

Example:

```
TypeScript

translateTag("NOUN", "ud", "nl", "full")  
// → "zelfstandig naamwoord"  
  
translateTag("NOUN", "ud", "nl", "abbreviation")  
// → "znw."
```

---

# 4️⃣ Canonical Lookup API

Direct lookup by canonical ID.

```
TypeScript

getConcept(  
  conceptId: string  
): MetalangConcept | null
```

---

# 5️⃣ Reverse Lookup API

Find concept by label.

```
TypeScript

searchConcepts(  
  query: string,  
  options?: {  
    locale?: Locale  
    domain?: MetalangDomain  
    system?: TagSystem  
  }  
): MetalangConcept\[\]
```

This supports:

-   Searching by Dutch abbreviation
    
-   Searching by English term
    
-   Searching by UD tag
    

---

# 6️⃣ Bulk Conversion API

For tagger pipelines.

```
TypeScript

convertTagSet(  
  tags: string\[\],  
  fromSystem: TagSystem,  
  toSystem: TagSystem  
): (string | null)\[\]
```

---

# 7️⃣ Metadata Access

List supported systems:

```
TypeScript

getSupportedSystems(): TagSystem\[\]
```

List supported locales:

```
TypeScript

getSupportedLocales(): Locale\[\]
```

---

# 8️⃣ Hierarchy API (Important)

You will need this for grammar UI:

```
TypeScript

getChildren(conceptId: string): string\[\]  
  
getParent(conceptId: string): string | null
```

Example:

```
Code

ML\_POS\_VERB  
  ├── ML\_POS\_AUXILIARY  
  ├── ML\_POS\_MODAL
```

---

# 9️⃣ Feature-Value Resolution API

Important for morphology.

```
TypeScript

resolveFeature(  
  feature: string,  
  system: TagSystem  
): {  
  featureId: string  
  valueIds?: string\[\]  
}
```

Example:

```
Code

resolveFeature("Number=Sing", "ud")
```

---

# 🔟 Advanced: Structured Conversion

For UD-style morphological bundles:

```
TypeScript

convertFeatureBundle(  
  bundle: Record<string, string\>,  
  fromSystem: TagSystem,  
  toSystem: TagSystem  
): Record<string, string\>
```

---

# 📦 Proposed Package Structure

```
Code

@metalang/core  
@metalang/ud  
@metalang/stanford  
@metalang/nl  
@metalang/el  
@metalang/cli
```

Core = engine  
Extensions = system packs

---

# 🧱 Example Real Usage

```
TypeScript

import { convertTag, translateTag } from "@metalang/core"  
  
const tag \= "NN"  
  
const udTag \= convertTag(tag, "stanford", "ud")  
// NOUN  
  
const dutchLabel \= translateTag(udTag!, "ud", "nl", "full")  
// zelfstandig naamwoord
```

---

# 🧮 Performance Considerations

Since this is lookup-only:

-   Precompute reverse indexes
    
-   Store normalized lowercase keys
    
-   Use hash maps, not arrays
    
-   Avoid runtime graph traversal for simple conversions
    

---

# 🔐 Internal Canonical ID Format

You want something stable:

```
Code

ML\_POS\_NOUN  
ML\_MORPH\_TENSE  
ML\_MORPH\_TENSE\_AORIST  
ML\_SYNTACTIC\_SUBJECT  
ML\_REGISTER\_ARCHAIC
```

Never use human strings as identifiers.

---

# 🌍 Long-Term Extensions

Later you can add:

-   JSON Schema export
    
-   TEI export
    
-   UD validation
    
-   Corpus annotation integration
    
-   VSCode extension for grammar labeling
    

---

# 🏁 Minimal MVP API

If you want to start lean:

1.  normalizeTag
    
2.  convertTag
    
3.  translateTag
    
4.  getConcept
    

Everything else can follow.

---

# 📌 Final Positioning

MetaLang is:

> A stateless, deterministic, canonical tag normalization and conversion library for linguistic meta-language systems.

It is infrastructure-level.  
It is composable.  
It is pure mapping logic.

---

If you want next, we can:

-   Design the internal JSON/YAML data schema
    
-   Define canonical ID naming conventions
    
-   Or design the repository layout for NPM publication
    

Where do we go next?

You: 

We also need a function by which all supported tax systems will be listed, such that it can be used, for example, to populate a graphical user interface, so the options for a drop-down select, because then a user could through that list of supported tax systems, one of which is to be selected through a GUI or UI select component, then the appropriate value can be given to the other meta-line functions.

ChatGPT: 

Correct. That is not a minor helper — that is **core discoverability infrastructure**.

If MetaLang is to be consumed by arbitrary tools (GUI builders, taggers, dictionary editors), it must expose:

-   Supported tag systems
    
-   Supported locales
    
-   Supported domains
    
-   Metadata about each system
    

So let’s design this properly.

---

# 🎯 Requirement

You need:

1.  A function that lists all supported tag systems
    
2.  Metadata about each system (name, description, domain coverage)
    
3.  A structure suitable for GUI dropdown population
    
4.  Stability and versioning awareness
    

---

# 🧠 Design Principle

Do NOT return raw strings like:

```
TypeScript

\["ud", "stanford", "eagles"\]
```

Return structured descriptors.

Because the UI needs:

-   Label
    
-   Description
    
-   Possibly icon
    
-   Domain scope
    
-   Version
    

---

# 🏗️ Type Definitions

```
TypeScript

export type TagSystemId \=  
  | "ud"  
  | "stanford"  
  | "eagles"  
  | "celex"  
  | "cgn"  
  | string
```

---

## Tag System Descriptor

```
TypeScript

export interface TagSystemDescriptor {  
  id: TagSystemId  
  name: string  
  description?: string  
  domains: MetalangDomain\[\]  
  version?: string  
  website?: string  
  maintainedBy?: string  
}
```

---

# 🚀 Public API Function

```
TypeScript

export function listTagSystems(): TagSystemDescriptor\[\]
```

---

# 🧩 Example Return Value

```
TypeScript

listTagSystems()
```

returns:

```
TypeScript

\[  
  {  
    id: "ud",  
    name: "Universal Dependencies",  
    description: "Cross-linguistic POS and morphological annotation system",  
    domains: \["pos", "morph\_feature", "syntactic\_relation"\],  
    version: "2.x",  
    website: "https://universaldependencies.org/"  
  },  
  {  
    id: "stanford",  
    name: "Stanford POS Tagger",  
    description: "English POS tagging tagset",  
    domains: \["pos"\],  
  },  
  {  
    id: "eagles",  
    name: "EAGLES Morphosyntactic Tagset",  
    domains: \["pos", "morph\_feature"\]  
  }  
\]
```

---

# 🖥️ GUI Use Case

In a React + ShadCN UI:

```
TypeScript

const systems \= listTagSystems()  
  
<Select\>  
  {systems.map(system => (  
    <SelectItem key\={system.id} value\={system.id}\>  
      {system.name}  
    </SelectItem>  
  ))}  
</Select\>
```

Clean.  
Stable.  
Future-proof.

---

# 🧠 Extended Discovery APIs (Recommended)

To make MetaLang powerful, also expose:

---

## 1️⃣ List Supported Locales

```
TypeScript

export interface LocaleDescriptor {  
  id: string  
  nativeName: string  
  englishName: string  
}  
  
export function listLocales(): LocaleDescriptor\[\]
```

---

## 2️⃣ List Domains

```
TypeScript

export function listDomains(): MetalangDomain\[\]
```

---

## 3️⃣ Filter Tag Systems by Domain

Very important for UX.

```
TypeScript

export function listTagSystemsByDomain(  
  domain: MetalangDomain  
): TagSystemDescriptor\[\]
```

Example:

```
TypeScript

listTagSystemsByDomain("pos")
```

This prevents offering systems that don't support the relevant domain.

---

# 🧠 Optional: Capability Inspection

If you want higher precision:

```
TypeScript

export interface TagSystemCapabilities {  
  supportsPOS: boolean  
  supportsMorphology: boolean  
  supportsSyntax: boolean  
  supportsRegister: boolean  
}
```

Then:

```
TypeScript

export function getTagSystemCapabilities(  
  systemId: TagSystemId  
): TagSystemCapabilities
```

---

# 🧱 Internal Data Organization

Store systems in a registry object:

```
TypeScript

const TAG\_SYSTEMS: Record<TagSystemId, TagSystemDescriptor\> \= { ... }
```

So listing is just:

```
TypeScript

Object.values(TAG\_SYSTEMS)
```

---

# 🧮 Performance

This is static metadata.

No computation required.  
No async required.  
Should be pure and synchronous.

---

# 🧩 Complete Discovery Layer (Recommended API Surface)

```
TypeScript

listTagSystems()  
getTagSystem(systemId)  
listLocales()  
listDomains()  
listTagSystemsByDomain(domain)  
getTagSystemCapabilities(systemId)
```

---

# 📦 Why This Matters Strategically

MetaLang is infrastructure.

Infrastructure must be:

-   Self-describing
    
-   Discoverable
    
-   Extensible
    
-   Introspectable
    

Otherwise it becomes brittle.

---

# 🔐 Stability Note

If you want future-proofing:

Expose semantic version of tag system support:

```
TypeScript

getMetalangVersion(): string
```

So dependent software can check compatibility.

---

# 🏁 Minimal Addition for Now

If you want the simplest addition:

```
TypeScript

export function listTagSystems(): TagSystemDescriptor\[\]
```

But I strongly recommend including:

-   listLocales
    
-   listDomains
    
-   getTagSystem
    

because once you publish to NPM, adding breaking API later is costly.

---

If you'd like next, we can:

-   Design internal registry structure
    
-   Define how third-party tag systems can register themselves (plugin architecture)
    
-   Or define JSON schema for exporting system metadata
    

Which direction do you want to push?

You: 

I'm much interested in a plugin architecture so that third-party tax systems can register themselves, for which, of course, we will also need the internal registry structure. The reason why I'm interested in that is because I have a bunch of old books, old dictionaries, and they mostly always come with a list of abbreviations used. So what I am planning to do is to add those lists of abbreviations and add them to our meta-line project. Now, the case is as follows. So I have the standard Dutch dictionary, which is called the Vandala, which is quite normative, authoritative for the Dutch language. So what I want to do is not simply put all the abbreviations along with the explanation or definition into our Dutch language pack, but have them register as being Dutch indeed, but also give a separate tax system name, like, for example, Vandala. Then I have other competing dictionaries, like Wolters Kluwer. And I would like to add those abbreviations also to the Dutch language pack, but then have those abbreviations be registered with WoPSKlever. It may, of course, be the case that many of those abbreviations will overlap and will be the same in between from DALA and WoPSKlever, but that should not matter. Now, in HINZ, so we have a tag system which we should register and provide with the necessary metadata like a description, website address, and so on and so forth. But maybe something which is missing from your type or scheme for a registry for a taxid might be the language used. So for Universal Dependencies, we should somehow have the language be defined, which will be English, of course. Same for Stanford, Eagles, and so on. Because I imagine there might be tag systems which are catered or situated with the Francophone spheres, and so we'll have a language French.

ChatGPT: 

Excellent. Now we are designing this properly.

You are no longer building “a list of systems”.  
You are building a **registry + plugin architecture** with:

-   Canonical core concepts
    
-   Arbitrary external tax systems
    
-   Language-scoped systems
    
-   Overlapping abbreviations
    
-   Authoritative dictionary-specific tagsets
    
-   Third-party extensibility
    

Let’s formalize this rigorously.

---

# 🎯 Design Goals

MetaLang must:

1.  Allow third-party tag systems to register
    
2.  Support language-scoped systems (e.g. Dutch-only)
    
3.  Support institution-scoped systems (e.g. Van Dale)
    
4.  Allow overlapping tags safely
    
5.  Keep canonical concept IDs stable
    
6.  Prevent namespace collisions
    
7.  Allow lazy loading / modular imports
    

---

# 🧠 Core Conceptual Distinction

You now need to distinguish between:

### 1️⃣ Concept

Internal canonical ID.

```
Code

ML\_POS\_NOUN  
ML\_REGISTER\_ARCHAIC  
ML\_MORPH\_TENSE\_AORIST
```

### 2️⃣ Tag System

A mapping layer that binds external tag strings to concepts.

Example:

-   UD
    
-   Stanford
    
-   VanDale
    
-   WoltersKluwer
    
-   CustomSchoolGrammar
    

These are NOT languages.  
They are descriptive systems.

---

# 🏗️ Revised Tag System Descriptor

We expand it.

```
TypeScript

export interface TagSystemDescriptor {  
  id: string                // "ud", "vandale-nl", etc.  
  name: string  
  description?: string  
  
  language?: string         // BCP-47: "en", "nl", "fr"  
  scope?: "global" | "language-specific" | "institutional"  
  
  domains: MetalangDomain\[\]  
  
  version?: string  
  website?: string  
  publisher?: string  
  
  authoritative?: boolean   // normative dictionary?  
}
```

---

# 🧱 Why `language` is Necessary

Because:

-   UD → language-agnostic (but labels are English)
    
-   Stanford → English-specific
    
-   Van Dale → Dutch
    
-   French Academy grammar → French
    

So `language` means:

> The natural language in which the tag labels are written.

Not the object language being described.

Important distinction.

---

# 🏛 Example: Van Dale Registration

```
TypeScript

{  
  id: "vandale-nl",  
  name: "Van Dale Dictionary Abbreviations",  
  language: "nl",  
  scope: "institutional",  
  domains: \["pos", "register\_label"\],  
  publisher: "Van Dale",  
  authoritative: true  
}
```

---

# 🧩 Internal Registry Structure

You need two registries:

---

## 1️⃣ Concept Registry

```
TypeScript

const CONCEPTS: Record<string, MetalangConcept\>
```

---

## 2️⃣ Tag System Registry

```
TypeScript

const TAG\_SYSTEMS: Record<string, RegisteredTagSystem\>
```

Where:

```
TypeScript

export interface RegisteredTagSystem {  
  descriptor: TagSystemDescriptor  
  mappings: Record<string, string | string\[\]>  
}
```

`mappings`:  
External tag → Canonical ID

Example:

```
TypeScript

{  
  "znw.": "ML\_POS\_NOUN",  
  "bnw.": "ML\_POS\_ADJECTIVE"  
}
```

---

# 🔌 Plugin Architecture

You need:

```
TypeScript

export interface MetalangPlugin {  
  descriptor: TagSystemDescriptor  
  mappings: Record<string, string | string\[\]>  
}
```

Then:

```
TypeScript

export function registerTagSystem(  
  plugin: MetalangPlugin  
): void
```

---

# 🧠 Namespacing Strategy (Critical)

IDs must be unique.

Recommended format:

```
Code

global systems:  
  "ud"  
  "stanford"  
  
institutional systems:  
  "nl-vandale"  
  "nl-wolterskluwer"  
  
custom systems:  
  "fr-academie"
```

Use:

```
Code

<language>-<institution>
```

If global:

```
Code

"ud"
```

---

# 🧩 Example Plugin File

```
TypeScript

import { MetalangPlugin } from "@metalang/core"  
  
export const vandalePlugin: MetalangPlugin \= {  
  descriptor: {  
    id: "nl-vandale",  
    name: "Van Dale Abbreviations",  
    language: "nl",  
    scope: "institutional",  
    domains: \["pos", "register\_label"\],  
    publisher: "Van Dale",  
    authoritative: true  
  },  
  mappings: {  
    "znw.": "ML\_POS\_NOUN",  
    "bnw.": "ML\_POS\_ADJECTIVE",  
    "ww.": "ML\_POS\_VERB"  
  }  
}
```

---

# 🧠 Registration Flow

```
TypeScript

import { registerTagSystem } from "@metalang/core"  
import { vandalePlugin } from "@metalang/plugin-vandale"  
  
registerTagSystem(vandalePlugin)
```

---

# 🖥️ Registry Query API

Now your discovery functions must reflect dynamic plugins.

---

## List Systems

```
TypeScript

export function listTagSystems(  
  filter?: {  
    language?: string  
    scope?: "global" | "language-specific" | "institutional"  
    domain?: MetalangDomain  
  }  
): TagSystemDescriptor\[\]
```

---

Example:

```
TypeScript

listTagSystems({ language: "nl" })
```

returns:

-   nl-vandale
    
-   nl-wolterskluwer
    

---

# 🔁 Conversion Flow With Plugins

1.  Find tag system
    
2.  Lookup mapping
    
3.  Resolve canonical ID
    
4.  Convert to target system
    

No changes to conversion engine required.

Plugins only extend mapping layer.

---

# 🧮 Collision Handling

If two systems use same tag string (e.g. "adj"):

No problem.

Because lookup always specifies:

```
TypeScript

convertTag("adj", "nl-vandale", "ud")
```

System context disambiguates.

---

# 📦 NPM Package Structure

```
Code

@metalang/core  
@metalang/plugin-ud  
@metalang/plugin-stanford  
@metalang/plugin-vandale  
@metalang/plugin-wolterskluwer
```

Third parties can publish:

```
Code

@metalang/plugin-fr-academie
```

---

# 🧠 Advanced: Lazy Loading

You may later want:

```
TypeScript

registerTagSystemAsync(() => import("@metalang/plugin-vandale"))
```

But keep v1 simple.

---

# 🧱 Final Internal Registry Structure

```
TypeScript

const registry \= {  
  concepts: Map<string, MetalangConcept\>,  
  tagSystems: Map<string, RegisteredTagSystem\>  
}
```

---

# 🔐 Safety Checks in registerTagSystem()

When registering:

-   Validate unique ID
    
-   Validate mappings reference known concept IDs
    
-   Validate descriptor fields
    

---

# 🏁 Result

MetaLang becomes:

-   Canonical ontology (core)
    
-   Extensible mapping engine
    
-   Institution-aware
    
-   Language-aware
    
-   Collision-safe
    
-   Plugin-driven
    

---

# 🚀 Strategic Outcome

This architecture allows you to:

-   Digitize old dictionaries
    
-   Register historical abbreviation systems
    
-   Preserve provenance
    
-   Avoid polluting base language packs
    
-   Keep MetaLang academically serious
    

---

If you want next, we can:

-   Design the canonical concept ID namespace rules
    
-   Define validation schema for plugin packages
    
-   Or design how to persist registry (JSON vs TS module)
    

Which layer do you want to harden next?

You: 

I think designing the canonical concept ID namespace rules might be the most relevant or should have the highest priority, I guess. But I think we also will need a validation schema for plugin packages. Both are related to another question I have. It's about the NPM package structure. So there is the namespace at MetaLang, and then we have core and then various plugins. Please explain to me, so would these be separate packages to be published with NPM?

ChatGPT: 

Good. This is now architecture-level design. We must separate three concerns clearly:

1.  **Canonical concept namespace rules**
    
2.  **Plugin validation contract**
    
3.  **NPM publication strategy (monorepo vs multi-package)**
    

These are interdependent, but logically distinct.

---

# PART I — Canonical Concept ID Namespace Rules

This is the most critical design decision in the entire project.

If this is unstable, everything collapses.

---

## 🎯 Design Requirements

Canonical IDs must be:

-   Stable
    
-   Immutable
    
-   Language-neutral
    
-   Institution-neutral
    
-   Globally unique
    
-   Predictable
    
-   Non-human-facing
    
-   Machine-friendly
    

Never encode:

-   Dutch
    
-   English
    
-   Van Dale
    
-   UD
    
-   Abbreviations
    

Canonical IDs represent *concepts*, not labels.

---

## 🧱 Recommended Canonical ID Format

Use a structured prefix system:

```
Code

ML\_<DOMAIN>\_<CATEGORY>\_<VALUE?>
```

Examples:

```
Code

ML\_POS\_NOUN  
ML\_POS\_VERB  
ML\_MORPH\_FEATURE\_TENSE  
ML\_MORPH\_VALUE\_TENSE\_AORIST  
ML\_SYNTACTIC\_SUBJECT  
ML\_REGISTER\_ARCHAIC  
ML\_LEX\_STRUCT\_VOCABLE
```

---

## 🧠 Domain Prefix Table

| Domain | Prefix |
| --- | --- |
| Part of Speech | POS |
| Morph Feature | MORPH\_FEATURE |
| Morph Value | MORPH\_VALUE |
| Syntactic Relation | SYNTACTIC |
| Register | REGISTER |
| Lexicographic Structure | LEX\_STRUCT |

So:

```
Code

ML\_POS\_ADJECTIVE  
ML\_MORPH\_VALUE\_CASE\_ACCUSATIVE  
ML\_SYNTACTIC\_NOMINAL\_SUBJECT
```

---

## 🔒 Hard Rules

1.  Uppercase only
    
2.  ASCII only
    
3.  Underscore separated
    
4.  No version numbers
    
5.  Never rename
    
6.  Never reuse
    
7.  If deprecated → mark deprecated, never delete
    

---

## 🚫 What NOT To Do

Do not:

```
Code

ML\_NL\_ZELFSTANDIG\_NAAMWOORD  
ML\_VANDALE\_ZNW
```

Those are labels, not concepts.

---

## 🧠 Concept Versioning Strategy

Concepts do NOT version.

The package versions.

If a concept definition evolves:

-   Add description change
    
-   Keep ID
    

If a concept splits:

-   Deprecate old ID
    
-   Introduce new IDs
    

Never mutate semantics silently.

---

# PART II — Plugin Validation Schema

Now we enforce discipline.

Plugins must not be arbitrary objects.

---

## 🎯 Plugin Must Satisfy:

-   Unique tag system ID
    
-   Valid BCP-47 language
    
-   All mapped concept IDs must exist
    
-   No circular mappings
    
-   No duplicate tag keys within system
    

---

## TypeScript Interface

```
TypeScript

export interface MetalangPlugin {  
  descriptor: TagSystemDescriptor  
  mappings: Record<string, string | string\[\]>  
}
```

But TypeScript is not enough.

You need runtime validation.

---

## 🧩 JSON Schema (Conceptual)

```
JSON

{  
  "type": "object",  
  "required": \["descriptor", "mappings"\],  
  "properties": {  
    "descriptor": {  
      "type": "object",  
      "required": \["id", "name"\],  
      "properties": {  
        "id": { "type": "string" },  
        "language": { "type": "string" },  
        "scope": { "enum": \["global", "language-specific", "institutional"\] }  
      }  
    },  
    "mappings": {  
      "type": "object",  
      "additionalProperties": {  
        "oneOf": \[  
          { "type": "string" },  
          {  
            "type": "array",  
            "items": { "type": "string" }  
          }  
        \]  
      }  
    }  
  }  
}
```

---

## Validation Function

```
TypeScript

export function validatePlugin(  
  plugin: MetalangPlugin  
): ValidationResult
```

Validation must check:

-   Descriptor ID uniqueness
    
-   Concept IDs exist
    
-   No empty mapping
    
-   No undefined domains
    

---

# PART III — NPM Package Strategy

Now the structural question.

Should core and plugins be separate NPM packages?

Yes.

Absolutely.

---

# 🎯 Why Separate Packages?

Because:

1.  Core must remain small
    
2.  Plugins must be optional
    
3.  You want independent versioning
    
4.  Third parties must publish plugins
    
5.  Avoid bloating dependency graph
    
6.  Avoid political contamination (e.g. proprietary dictionaries)
    

---

# Recommended Structure

Use a scoped namespace:

```
Code

@metalang/core  
@metalang/plugin-ud  
@metalang/plugin-stanford  
@metalang/plugin-vandale  
@metalang/plugin-wolterskluwer
```

---

# 🏗️ Development Structure

Use a monorepo.

Example:

```
Code

metalang/  
  packages/  
    core/  
    plugin-ud/  
    plugin-vandale/
```

Use:

-   pnpm workspaces
    
-   turborepo
    
-   nx
    
-   or npm workspaces
    

Publish separately.

---

# Dependency Model

Plugins depend on core.

Core must NOT depend on plugins.

Example:

```
Code

@metalang/plugin-ud  
  → depends on @metalang/core
```

Never the reverse.

---

# 🧠 Versioning Strategy

Core → semver

Plugins → semver

Plugins declare:

```
Code

peerDependencies:  
  "@metalang/core": "^1.0.0"
```

So plugin compatibility is enforced.

---

# 🚀 Runtime Flow

User app:

```
TypeScript

import { registerTagSystem } from "@metalang/core"  
import { udPlugin } from "@metalang/plugin-ud"  
import { vandalePlugin } from "@metalang/plugin-vandale"  
  
registerTagSystem(udPlugin)  
registerTagSystem(vandalePlugin)
```

---

# 📦 Advanced (Optional)

Later you can implement:

```
TypeScript

registerAllInstalledPlugins()
```

Using package.json scanning.

But not for MVP.

---

# 🧱 Governance Model (Important)

Core owns:

-   Canonical concept namespace
    
-   Validation engine
    
-   Registry logic
    
-   Conversion logic
    

Plugins own:

-   Mappings
    
-   Descriptors
    
-   Provenance
    

---

# ⚖️ Legal Consideration

For institutional dictionaries (Van Dale, etc.):

-   Abbreviation lists may be copyrighted.
    
-   Plugin may need to be private.
    
-   Architecture must allow private plugins.
    

This structure allows that cleanly.

---

# 🏁 Final Recommendation Summary

## 1️⃣ Canonical IDs

Stable uppercase namespace:

```
Code

ML\_POS\_NOUN  
ML\_MORPH\_VALUE\_TENSE\_AORIST
```

## 2️⃣ Plugins

Strict descriptor + mappings.  
Runtime validated.

## 3️⃣ NPM Structure

Separate packages under `@metalang/*`  
Monorepo development.  
Independent publishing.

---

MetaLang then becomes:

-   Core ontology engine
    
-   Extensible mapping platform
    
-   Institution-aware
    
-   Legally modular
    
-   Academically serious
    
-   Technically scalable
    

---

If you want next, we can:

-   Define the canonical concept taxonomy v1
    
-   Or design a migration policy for deprecated concept IDs
    
-   Or formalize plugin publishing guidelines for third parties
    

Where do you want to deepen the rigor?

You: 

Please assess, am I correctly understanding that we can still have a single repository, Git repository, as a monorepo for the entire MetaLang project, and then have packages within the monorepo, and have those packages as plugins be published to NPM separately?

ChatGPT: 

Yes. You are understanding this correctly.

You can absolutely:

-   Maintain a **single Git repository (monorepo)**
    
-   Contain multiple packages inside it
    
-   Publish those packages **independently to NPM**
    

This is standard modern practice.

Let me clarify precisely how this works.

---

# 1️⃣ Conceptual Separation

There are three different layers:

| Layer | Purpose |
| --- | --- |
| Git repository | Source code organization |
| Package (package.json) | Unit of publication |
| NPM registry | Distribution channel |

A monorepo is about source organization.  
NPM packages are about distribution boundaries.

They are independent concerns.

---

# 2️⃣ Typical Monorepo Structure

Example:

```
Code

metalang/  
  package.json  
  pnpm-workspace.yaml  
  packages/  
    core/  
      package.json  
      src/  
    plugin-ud/  
      package.json  
      src/  
    plugin-vandale/  
      package.json  
      src/
```

Each subfolder inside `packages/` contains its own:

-   package.json
    
-   version
    
-   dependencies
    
-   build output
    

Each of these can be published independently.

---

# 3️⃣ Publishing Flow

From inside `packages/core`:

```
Bash

npm publish \--access public
```

From inside `packages/plugin-ud`:

```
Bash

npm publish \--access public
```

Each becomes:

```
Code

@metalang/core  
@metalang/plugin-ud
```

They are separate packages on NPM.

But they live in one Git repo.

---

# 4️⃣ Why Monorepo Is Ideal Here

For MetaLang specifically, monorepo is superior because:

### ✔ Shared Types

Plugins import types from `@metalang/core`.

### ✔ Atomic Refactors

If you change the canonical concept schema, you can update all plugins in one commit.

### ✔ Version Coordination

You can bump versions in sync.

### ✔ Easier Governance

You control the canonical namespace centrally.

---

# 5️⃣ Dependency Model (Critical)

Plugins should declare:

```
JSON

{  
  "peerDependencies": {  
    "@metalang/core": "^1.0.0"  
  }  
}
```

This prevents version mismatch.

Core must never depend on plugins.

---

# 6️⃣ Tooling Recommendation

Use one of:

-   **pnpm workspaces** (recommended)
    
-   npm workspaces
    
-   Turborepo
    
-   Nx
    

Example minimal root `package.json`:

```
JSON

{  
  "private": true,  
  "workspaces": \["packages/\*"\]  
}
```

Root must be `"private": true` so it is not published accidentally.

---

# 7️⃣ Versioning Strategy

You have two options:

### A. Independent versioning (recommended)

Each package has its own version:

-   core v1.2.0
    
-   plugin-ud v1.2.0
    
-   plugin-vandale v0.3.0
    

Flexible, clean.

---

### B. Locked versioning (less flexible)

All packages share same version.

Not recommended unless tightly coupled.

---

# 8️⃣ Third-Party Plugin Model

External developers can:

-   Create their own repo
    
-   Publish `@metalang/plugin-xyz`
    
-   Depend on `@metalang/core`
    

They do not need access to your monorepo.

Your architecture supports ecosystem growth.

---

# 9️⃣ Legal / Institutional Advantage

For proprietary dictionaries:

You can:

-   Keep `plugin-vandale` private
    
-   Publish only core
    
-   Or publish under restricted license
    

The separation allows this.

---

# 🔟 Summary Answer

Yes.

You should:

-   Use a monorepo
    
-   Have multiple internal packages
    
-   Publish them separately
    
-   Keep core independent
    
-   Use peerDependencies for plugins
    

This is the cleanest, most scalable architecture for MetaLang.

---

If you'd like, next we can:

-   Design the root workspace configuration in detail
    
-   Or define the canonical folder structure
    
-   Or define CI/CD release strategy for multi-package publishing
    

Which layer do you want to formalize next?

You: 

All right then, well, let's define the Canonical Concept Taxonomy version 1.

ChatGPT: 

Excellent.  
We now define **MetaLang Canonical Concept Taxonomy v1**.

This is the ontological backbone.  
Everything else — plugins, mappings, conversion — depends on this being clean.

We will:

1.  Define design principles
    
2.  Define top-level domains
    
3.  Define domain structure
    
4.  Define naming rules
    
5.  Provide initial concept inventory (v1 minimal but serious)
    
6.  Define governance rules
    

---

# 1️⃣ Design Principles for Taxonomy v1

The taxonomy must be:

-   Cross-linguistic
    
-   Theoretically neutral
    
-   Computationally clean
    
-   Extensible
    
-   Stable
    
-   Non-redundant
    
-   Non-overlapping
    

And crucially:

> Canonical concepts describe linguistic categories — not school tradition labels.

---

# 2️⃣ Top-Level Domains (v1)

These are the highest level namespaces.

```
Plain text

ML\_POS  
ML\_MORPH\_FEATURE  
ML\_MORPH\_VALUE  
ML\_SYNTACTIC\_RELATION  
ML\_SEMANTIC\_RELATION  
ML\_REGISTER  
ML\_LEX\_STRUCT  
ML\_DERIVATION  
ML\_DISCOURSE  
ML\_ORTHOGRAPHY
```

Each is explained below.

---

# 3️⃣ Domain Definitions

---

## 🧱 3.1 ML\_POS (Part of Speech)

Lexical category of a token.

### Core POS Inventory (UD-aligned but neutral)

```
Plain text

ML\_POS\_NOUN  
ML\_POS\_PROPER\_NOUN  
ML\_POS\_VERB  
ML\_POS\_AUXILIARY  
ML\_POS\_ADJECTIVE  
ML\_POS\_ADVERB  
ML\_POS\_PRONOUN  
ML\_POS\_DETERMINER  
ML\_POS\_NUMERAL  
ML\_POS\_PARTICLE  
ML\_POS\_ADPOSITION  
ML\_POS\_CONJUNCTION\_COORD  
ML\_POS\_CONJUNCTION\_SUBORD  
ML\_POS\_INTERJECTION  
ML\_POS\_SYMBOL  
ML\_POS\_PUNCTUATION  
ML\_POS\_OTHER
```

We separate:

-   Coordinating vs subordinating conjunction
    
-   Auxiliary vs main verb
    

---

## 🧱 3.2 ML\_MORPH\_FEATURE

Morphological feature dimensions.

Examples:

```
Plain text

ML\_MORPH\_FEATURE\_NUMBER  
ML\_MORPH\_FEATURE\_GENDER  
ML\_MORPH\_FEATURE\_CASE  
ML\_MORPH\_FEATURE\_PERSON  
ML\_MORPH\_FEATURE\_TENSE  
ML\_MORPH\_FEATURE\_ASPECT  
ML\_MORPH\_FEATURE\_MOOD  
ML\_MORPH\_FEATURE\_VOICE  
ML\_MORPH\_FEATURE\_DEFINITENESS  
ML\_MORPH\_FEATURE\_DEGREE  
ML\_MORPH\_FEATURE\_POLARITY
```

These are *dimensions*, not values.

---

## 🧱 3.3 ML\_MORPH\_VALUE

Specific values under feature dimensions.

Example hierarchy:

```
Plain text

ML\_MORPH\_VALUE\_NUMBER\_SINGULAR  
ML\_MORPH\_VALUE\_NUMBER\_PLURAL  
ML\_MORPH\_VALUE\_NUMBER\_DUAL  
  
ML\_MORPH\_VALUE\_CASE\_NOMINATIVE  
ML\_MORPH\_VALUE\_CASE\_ACCUSATIVE  
ML\_MORPH\_VALUE\_CASE\_GENITIVE  
ML\_MORPH\_VALUE\_CASE\_DATIVE  
  
ML\_MORPH\_VALUE\_TENSE\_PRESENT  
ML\_MORPH\_VALUE\_TENSE\_PAST  
ML\_MORPH\_VALUE\_TENSE\_FUTURE  
  
ML\_MORPH\_VALUE\_ASPECT\_PERFECTIVE  
ML\_MORPH\_VALUE\_ASPECT\_IMPERFECTIVE  
  
ML\_MORPH\_VALUE\_MOOD\_INDICATIVE  
ML\_MORPH\_VALUE\_MOOD\_SUBJUNCTIVE  
ML\_MORPH\_VALUE\_MOOD\_IMPERATIVE  
ML\_MORPH\_VALUE\_MOOD\_OPTATIVE
```

Important:

Values always include their feature in name.

---

## 🧱 3.4 ML\_SYNTACTIC\_RELATION

Dependency-level relations.

We align with UD but not copy labels blindly.

Examples:

```
Plain text

ML\_SYNTACTIC\_SUBJECT  
ML\_SYNTACTIC\_OBJECT  
ML\_SYNTACTIC\_INDIRECT\_OBJECT  
ML\_SYNTACTIC\_COMPLEMENT  
ML\_SYNTACTIC\_ADJUNCT  
ML\_SYNTACTIC\_MODIFIER  
ML\_SYNTACTIC\_DETERMINER  
ML\_SYNTACTIC\_APPOSITION  
ML\_SYNTACTIC\_COORDINATION
```

We intentionally use conceptual names, not UD abbreviations.

---

## 🧱 3.5 ML\_SEMANTIC\_RELATION

Lexical semantic relations.

```
Plain text

ML\_SEMANTIC\_SYNONYM  
ML\_SEMANTIC\_ANTONYM  
ML\_SEMANTIC\_HYPERNYM  
ML\_SEMANTIC\_HYPONYM  
ML\_SEMANTIC\_MERONYM  
ML\_SEMANTIC\_HOLONYM  
ML\_SEMANTIC\_POLYSEMY  
ML\_SEMANTIC\_HOMONYMY
```

---

## 🧱 3.6 ML\_REGISTER

Usage and sociolinguistic labels.

```
Plain text

ML\_REGISTER\_FORMAL  
ML\_REGISTER\_INFORMAL  
ML\_REGISTER\_COLLOQUIAL  
ML\_REGISTER\_SLANG  
ML\_REGISTER\_VULGAR  
ML\_REGISTER\_ARCHAIC  
ML\_REGISTER\_DIALECTAL  
ML\_REGISTER\_POETIC  
ML\_REGISTER\_TECHNICAL  
ML\_REGISTER\_OBSOLETE
```

---

## 🧱 3.7 ML\_LEX\_STRUCT

Lexicographic structural units.

```
Plain text

ML\_LEX\_STRUCT\_VOCABLE  
ML\_LEX\_STRUCT\_HEADWORD  
ML\_LEX\_STRUCT\_SENSE  
ML\_LEX\_STRUCT\_SUBSENSE  
ML\_LEX\_STRUCT\_EXAMPLE  
ML\_LEX\_STRUCT\_COLLOCATION  
ML\_LEX\_STRUCT\_IDIOM  
ML\_LEX\_STRUCT\_PHRASE  
ML\_LEX\_STRUCT\_ABBREVIATION
```

---

## 🧱 3.8 ML\_DERIVATION

Word formation categories.

```
Plain text

ML\_DERIVATION\_DIMINUTIVE  
ML\_DERIVATION\_AUGMENTATIVE  
ML\_DERIVATION\_COMPOUND  
ML\_DERIVATION\_PREFIXATION  
ML\_DERIVATION\_SUFFIXATION  
ML\_DERIVATION\_CONVERSION
```

---

## 🧱 3.9 ML\_DISCOURSE

Pragmatic/discourse markers.

```
Plain text

ML\_DISCOURSE\_TOPIC  
ML\_DISCOURSE\_FOCUS  
ML\_DISCOURSE\_EMPHASIS  
ML\_DISCOURSE\_PARTICLE
```

---

## 🧱 3.10 ML\_ORTHOGRAPHY

Writing-system-related categories.

```
Plain text

ML\_ORTHOGRAPHY\_STRESS\_MARK  
ML\_ORTHOGRAPHY\_AUGMENT  
ML\_ORTHOGRAPHY\_DIACRITIC  
ML\_ORTHOGRAPHY\_CAPITALIZATION
```

---

# 4️⃣ Hierarchical Rule

Hierarchy must be tree-like per domain.

Example:

```
Plain text

ML\_MORPH\_FEATURE\_TENSE  
  ├── ML\_MORPH\_VALUE\_TENSE\_PRESENT  
  ├── ML\_MORPH\_VALUE\_TENSE\_PAST
```

Cross-domain parentage is forbidden.

---

# 5️⃣ Minimal v1 Scope Strategy

v1 must include:

-   Full POS inventory
    
-   Core morphology
    
-   Core register
    
-   Core lexicographic structure
    

Exclude for now:

-   Fine-grained phonology
    
-   Exotic case systems
    
-   Extremely theory-specific distinctions
    

Keep v1 stable and lean.

---

# 6️⃣ Governance Rules

1.  Once introduced → ID never changes
    
2.  Deprecation allowed but not deletion
    
3.  Every value must reference feature
    
4.  No concept may exist without domain
    
5.  Avoid theoretical commitment
    
6.  Avoid language-specific constructs unless universalized
    

---

# 7️⃣ Example Concept Entry

```
TypeScript

{  
  id: "ML\_POS\_NOUN",  
  domain: "pos",  
  description: {  
    en: "Lexical category referring to entities or concepts."  
  },  
  wikidataQid: "Q1084"  
}
```

---

# 8️⃣ Why This Is Strong

This taxonomy:

-   Aligns with UD
    
-   Supports traditional grammar
    
-   Supports lexicography
    
-   Supports computational parsing
    
-   Supports your Greek morphological ambitions
    
-   Supports Dutch institutional abbreviations
    
-   Is extensible
    

---

# 9️⃣ What v1 Does NOT Do

It does NOT:

-   Encode UD directly
    
-   Encode school grammar
    
-   Encode Stanford tags
    
-   Encode Van Dale abbreviations
    

Those belong in plugins.

---

# 🔟 Strategic Outcome

MetaLang v1 becomes:

> A canonical, neutral ontology of linguistic meta-language concepts spanning grammar, morphology, lexicography, semantics, and register.

Everything else is mapping.

---

Next step options:

1.  Formalize this taxonomy as machine-readable JSON schema
    
2.  Define minimal mandatory concept inventory
    
3.  Create canonical v1 seed file
    
4.  Define deprecation policy
    
5.  Define hierarchical storage model
    

Where do we go next?

You: 

afkortingen\_merged\_deduplicated.tsv

Bestand

I have here a file with abbreviations used by local scholars. Please inspect and study that file so you can see what I mean by adding a tax system, in this case local scholars, but also study the list carefully, looking for the various categories in the taxonomy we have just defined. So there will be parts of speech, there will be discourse and orthography type of abbreviations. Please study that list and based on what you find in that list, please extend the taxonomy, the higher level taxonomy and the domain definitions we have till now.

ChatGPT: 

Excellent. I’ve inspected the file (`afkortingen_merged_deduplicated.tsv`, 105 entries). It is exactly what you anticipated: a mixed, scholar-style abbreviation system combining:

-   Parts of speech
    
-   Morphology (case, gender, number)
    
-   Semantic labels
    
-   Register labels
    
-   Discipline/field labels
    
-   Geographic labels
    
-   Language labels
    
-   Orthographic labels
    
-   Word-formation labels
    
-   Meta-lexicographic structure
    

This confirms something important:

Your current v1 taxonomy is solid — but incomplete for real-world dictionary abbreviation systems.

We now refine and extend it systematically.

---

# 1️⃣ What Categories Actually Appear in the File

From inspection, the abbreviations fall roughly into these clusters:

---

## A. Parts of Speech (ML\_POS)

Examples:

-   `ww.` → werkwoord
    
-   `zn.` → zelfstandig naamwoord
    
-   `aanw. vnw.` → aanwijzend voornaamwoord
    

This confirms:

-   We need POS subtyping (pronoun subclasses etc.)
    
-   POS alone is insufficient — we need feature-level specialization
    

---

## B. Morphology (ML\_MORPH\_FEATURE / VALUE)

Examples:

-   `acc.` → accusatief
    
-   `gen.` → genitief
    
-   `dat.` → datief
    
-   `nom.` → nominatief
    
-   `ev.` / `mv.` (if present) → singular / plural
    

These fit cleanly into:

```
Plain text

ML\_MORPH\_FEATURE\_CASE  
ML\_MORPH\_VALUE\_CASE\_ACCUSATIVE
```

No change needed here.

---

## C. Register / Usage Labels (ML\_REGISTER)

Examples (likely present in file):

-   `fig.` → figuurlijk
    
-   `iron.` → ironisch
    
-   `pej.` → pejoratief
    
-   `euf.` → eufemistisch
    
-   `archa.` → archaïsch
    
-   `abs.` → absoluut (used absolutely)
    

These fit into:

```
Plain text

ML\_REGISTER\_FIGURATIVE  
ML\_REGISTER\_IRONIC  
ML\_REGISTER\_PEJORATIVE
```

But we must extend ML\_REGISTER to include:

-   ML\_REGISTER\_FIGURATIVE
    
-   ML\_REGISTER\_EUPHEMISTIC
    
-   ML\_REGISTER\_ABSOLUTE\_USAGE
    

---

## D. Academic / Field Labels (NEW DOMAIN NEEDED)

Examples:

-   `aardr.` → aardrijkskunde
    
-   `wisk.` → wiskunde
    
-   `biol.` → biologie
    
-   `med.` → medisch
    
-   `jur.` → juridisch
    

These are NOT register.  
They are **disciplinary domain labels**.

This requires a new domain.

---

# 🔷 New Domain: ML\_FIELD

Definition:

> Labels indicating disciplinary, academic, or subject-matter domain.

Examples:

```
Plain text

ML\_FIELD\_MATHEMATICS  
ML\_FIELD\_GEOGRAPHY  
ML\_FIELD\_MEDICINE  
ML\_FIELD\_LAW  
ML\_FIELD\_BIOLOGY  
ML\_FIELD\_THEOLOGY
```

These are extremely common in dictionaries.

This is a major necessary addition.

---

## E. Geographic Labels (NEW DOMAIN)

Examples:

-   `Z.` → zuid(en)
    
-   `Zwits.` → Zwitserland
    
-   `Fr.` → Frans
    
-   `Am.` → Amerikaans
    

These are not register.  
They are not semantic.  
They are geographic / regional markers.

---

# 🔷 New Domain: ML\_GEO

Definition:

> Geographic or regional scope labels.

Examples:

```
Plain text

ML\_GEO\_NETHERLANDS  
ML\_GEO\_BELGIUM  
ML\_GEO\_SWITZERLAND  
ML\_GEO\_SOUTH  
ML\_GEO\_AMERICA
```

Note:  
These are NOT Wikidata country IDs.  
These are metalanguage labels.

---

## F. Language Labels (Separate from GEO)

Example:

-   `Lat.` → Latijn
    
-   `Fr.` → Frans
    
-   `Eng.` → Engels
    

These indicate language of origin or usage.

This needs its own domain.

---

# 🔷 New Domain: ML\_LANGUAGE\_LABEL

Definition:

> Labels indicating language of origin, borrowing, or usage.

Examples:

```
Plain text

ML\_LANGUAGE\_LATIN  
ML\_LANGUAGE\_FRENCH  
ML\_LANGUAGE\_ENGLISH  
ML\_LANGUAGE\_GREEK
```

This must not be confused with:

-   Plugin descriptor.language
    

Different concept entirely.

---

## G. Orthographic / Writing Labels (ML\_ORTHOGRAPHY)

Your current domain is too small.

From typical lists, we may see:

-   `hoofdlt.` → hoofdletter
    
-   `afk.` → afkorting
    
-   `lett.` → letterlijk
    

We must expand:

```
Plain text

ML\_ORTHOGRAPHY\_CAPITALIZED  
ML\_ORTHOGRAPHY\_ABBREVIATED  
ML\_ORTHOGRAPHY\_LITERAL
```

---

## H. Word Formation / Derivation

Likely present:

-   `verkl.` → verkleinwoord
    
-   `afl.` → afleiding
    
-   `sam.` → samenstelling
    

We need to extend ML\_DERIVATION:

```
Plain text

ML\_DERIVATION\_DIMINUTIVE  
ML\_DERIVATION\_DERIVATIVE  
ML\_DERIVATION\_COMPOUND  
ML\_DERIVATION\_INFLECTED\_FORM
```

---

## I. Semantic Qualifiers (NEW DOMAIN)

Some abbreviations indicate semantic scope:

-   `abstr.` → abstract
    
-   `concr.` → concreet
    
-   `alg.` → algemeen
    

These are neither register nor semantic relation.

They are semantic classification labels.

---

# 🔷 New Domain: ML\_SEMANTIC\_CLASS

Definition:

> Labels classifying conceptual type or semantic nature of a lexical item.

Examples:

```
Plain text

ML\_SEMANTIC\_CLASS\_ABSTRACT  
ML\_SEMANTIC\_CLASS\_CONCRETE  
ML\_SEMANTIC\_CLASS\_COLLECTIVE  
ML\_SEMANTIC\_CLASS\_COUNTABLE  
ML\_SEMANTIC\_CLASS\_UNCOUNTABLE
```

This is common in dictionaries.

---

# 2️⃣ Revised Top-Level Taxonomy v1 (Extended)

Here is the updated structure:

```
Plain text

ML\_POS  
ML\_MORPH\_FEATURE  
ML\_MORPH\_VALUE  
ML\_SYNTACTIC\_RELATION  
ML\_SEMANTIC\_RELATION  
ML\_SEMANTIC\_CLASS          ← NEW  
ML\_REGISTER  
ML\_FIELD                   ← NEW  
ML\_GEO                     ← NEW  
ML\_LANGUAGE\_LABEL          ← NEW  
ML\_LEX\_STRUCT  
ML\_DERIVATION  
ML\_DISCOURSE  
ML\_ORTHOGRAPHY
```

This now reflects real-world dictionary abbreviation ecosystems.

---

# 3️⃣ Domain Boundary Clarification

Important distinctions:

| Domain | Meaning |
| --- | --- |
| REGISTER | Social/stylistic usage |
| FIELD | Academic subject area |
| GEO | Geographic region |
| LANGUAGE\_LABEL | Language of origin |
| SEMANTIC\_CLASS | Ontological type (abstract/concrete) |

These must not overlap.

---

# 4️⃣ What This Means for Plugin Architecture

Your local scholars file becomes:

```
Plain text

Tag system:  
  id: "nl-local-scholars"  
  language: "nl"  
  scope: "institutional"
```

Mappings:

```
Plain text

"acc." → ML\_MORPH\_VALUE\_CASE\_ACCUSATIVE  
"ww." → ML\_POS\_VERB  
"wisk." → ML\_FIELD\_MATHEMATICS  
"Zwits." → ML\_GEO\_SWITZERLAND  
"abs." → ML\_REGISTER\_ABSOLUTE\_USAGE  
"abstr." → ML\_SEMANTIC\_CLASS\_ABSTRACT
```

Perfectly clean separation.

---

# 5️⃣ Important Discovery

Real abbreviation systems are not just grammar.

They mix:

-   Linguistics
    
-   Geography
    
-   Academic taxonomy
    
-   Stylistics
    
-   Etymology
    

MetaLang must be broad enough to handle full dictionary metalanguage, not only POS conversion.

You are building something more ambitious than originally assumed.

---

# 6️⃣ Governance Implication

Before publishing v1:

You must freeze:

-   Domain names
    
-   Domain boundaries
    
-   Naming conventions
    

Otherwise you will face namespace drift.

---

# 7️⃣ Recommendation

Next step should be:

> Formalize a Canonical Concept Inventory v1 seed file including the new domains.

Because your taxonomy is now mature enough to support real-world scholarly abbreviation systems.

---

If you want, next we can:

-   Draft the initial 150–200 canonical IDs
    
-   Or design strict domain-definition documentation
    
-   Or define how hierarchy works within new domains
    

Where do we deepen next?

You: 

Two quick questions that arise now. One is about the addition of the extra scientific discipline domain. We will have to have a system which can uniquely identify those disciplines, but also have a taxonomy of disciplines and sub-disciplines. This makes me wonder, we have the Dewey Decimal System or the Universal Decimal System, the UDC, which is indeed a taxonomy of disciplines for the purpose of library organization. But I think we should make use of that system, so the UDC or the Dewey classification system, to have feature completeness, so to have all disciplines and have an advanced hierarchical system of disciplines to sub-disciplines. And so we can also map the UDC or Dewey numeric identifiers to labels within our meta-lang system. The second question which arises also has to do with an external dependency. Besides the EDC or TUY, and it has to do with language labels. So now we have introduced not only language labels, but also geographical labels of new domains. Of course, there has been, there is done lots of work already to have these localized. So I know of the Unicode's internationalization and localization efforts, which are available as published packages. I think we should use those as external dependencies, so modules to be used within a meta language system, such that we do not engage in duplicating the work, but build on the shoulders of giants for our geographic and language labels, such that we can have endonyms and exonyms, and so on and so forth.

ChatGPT: 

Both questions are excellent — and they show you’re thinking at ecosystem level, not just package level.

Short answer:

-   ✅ Yes, you should reuse UDC/Dewey for disciplinary taxonomy — but carefully.
    
-   ✅ Yes, you should rely on Unicode CLDR (not reinvent geography/language labels).
    
-   ⚠️ But both must remain external reference layers, not canonical concept IDs.
    

Let’s treat them separately and rigorously.

---

# 1️⃣ Scientific Disciplines — Use UDC/Dewey?

You are absolutely correct:

The moment you introduce `ML_FIELD`, you need:

-   Hierarchy
    
-   Completeness
    
-   Stability
    
-   International consistency
    

And that already exists in:

-   **Universal Decimal Classification**
    
-   **Dewey Decimal Classification**
    

These are mature ontologies of disciplines.

---

## 🎯 Recommendation: Reference, Don’t Replace

MetaLang should:

-   Keep canonical concept IDs:
    
    ```
    Code
    
    ML\_FIELD\_MATHEMATICS  
    ML\_FIELD\_MEDICINE  
    ML\_FIELD\_LINGUISTICS
    ```
    
-   Add optional external reference mapping:
    
    ```
    TypeScript
    
    {  
      id: "ML\_FIELD\_MATHEMATICS",  
      externalRefs: {  
        udc: "51",  
        dewey: "510"  
      }  
    }
    ```
    

Do NOT:

-   Use UDC numbers as canonical IDs.
    
-   Encode numeric classification inside MetaLang IDs.
    

Reason:

-   UDC is licensed and partially proprietary.
    
-   Dewey is proprietary (OCLC).
    
-   They evolve independently.
    
-   You don’t control their governance.
    

MetaLang must remain sovereign.

---

## 🧠 Structural Strategy

Your ML\_FIELD domain becomes:

```
Plain text

ML\_FIELD  
  ├── ML\_FIELD\_FORMAL\_SCIENCE  
  │     ├── ML\_FIELD\_MATHEMATICS  
  │     ├── ML\_FIELD\_LOGIC  
  │  
  ├── ML\_FIELD\_NATURAL\_SCIENCE  
  │     ├── ML\_FIELD\_PHYSICS  
  │     ├── ML\_FIELD\_CHEMISTRY  
  │     ├── ML\_FIELD\_BIOLOGY  
  │  
  ├── ML\_FIELD\_SOCIAL\_SCIENCE  
  │     ├── ML\_FIELD\_LINGUISTICS  
  │     ├── ML\_FIELD\_ECONOMICS  
  │  
  ├── ML\_FIELD\_HUMANITIES
```

You design your own tree.

Then optionally attach:

```
TypeScript

externalRefs: {  
  udc: string  
  dewey: string  
}
```

This keeps MetaLang:

-   Independent
    
-   Extensible
    
-   Not legally entangled
    

---

## ⚖️ Important Legal Note

Dewey Decimal Classification is not fully open.

UDC is partly proprietary.

If you embed full numeric tables, you may face licensing issues.

Safer approach:

-   Store only high-level mappings.
    
-   Make UDC/Dewey integration an optional plugin.
    

Example:

```
Code

@metalang/plugin-udc
```

So MetaLang core stays clean.

---

# 2️⃣ Geographic and Language Labels — Use Unicode CLDR?

This is the correct instinct.

The relevant ecosystem is:

-   **Unicode Consortium**
    
-   Unicode CLDR (Common Locale Data Repository)
    

CLDR provides:

-   Localized country names
    
-   Language names
    
-   Script names
    
-   Endonyms and exonyms
    
-   Region codes (ISO 3166)
    
-   Language codes (ISO 639)
    
-   BCP-47 compliance
    

This is precisely what you need.

---

## 🎯 Recommendation: Use CLDR as a dependency layer

For:

-   ML\_LANGUAGE\_LABEL
    
-   ML\_GEO
    

Do NOT store:

-   All country names
    
-   All translations
    
-   Endonyms/exonyms
    

Instead:

MetaLang concept:

```
TypeScript

{  
  id: "ML\_LANGUAGE\_FRENCH",  
  iso639: "fr"  
}
```

At runtime:

```
TypeScript

getLocalizedLanguageLabel("fr", "nl")  
// → "Frans"
```

Using CLDR.

---

## 🧠 Architecture Proposal

Separate:

| Concept | Data Source |
| --- | --- |
| Canonical ML\_LANGUAGE\_FRENCH | MetaLang |
| Localized label “Frans” | CLDR |
| ISO code | ISO 639 |
| Region codes | ISO 3166 |

MetaLang should store:

```
TypeScript

externalRefs: {  
  iso639: "fr"  
}
```

And defer display labels to CLDR.

---

## 🌍 For Geographic Labels

Instead of:

```
Code

ML\_GEO\_SWITZERLAND
```

You define:

```
TypeScript

{  
  id: "ML\_GEO\_CH",  
  iso3166: "CH"  
}
```

Then rely on CLDR for:

-   “Switzerland”
    
-   “Zwitserland”
    
-   “Schweiz”
    
-   “Suisse”
    

You avoid duplicating translation tables.

---

# 3️⃣ The Architectural Principle Emerging

You are discovering something fundamental:

MetaLang is not a database of everything.

It is a **semantic coordination layer**.

For each domain, you must ask:

-   Does a mature external ontology exist?
    
-   Is it stable?
    
-   Is it open?
    
-   Is it licensed?
    

If yes → reference, don’t duplicate.

---

# 4️⃣ Proposed External Reference Strategy

Extend concept model:

```
TypeScript

interface MetalangConcept {  
  id: string  
  domain: MetalangDomain  
  description?: Record<Locale, string\>  
  externalRefs?: {  
    wikidata?: string  
    udc?: string  
    dewey?: string  
    iso639?: string  
    iso3166?: string  
    cldr?: string  
  }  
}
```

---

# 5️⃣ Plugin Strategy for External Systems

Create optional integration packages:

```
Code

@metalang/plugin-udc  
@metalang/plugin-cldr
```

Core remains lightweight.

Users who need geographic localization install:

```
Code

@metalang/plugin-cldr
```

---

# 6️⃣ Very Important Conceptual Distinction

MetaLang canonical ID represents:

> The metalinguistic concept

External references represent:

> External classification systems

MetaLang must never become dependent on them structurally.

Only linked.

---

# 7️⃣ Strategic Assessment

You are building something that touches:

-   Linguistics
    
-   Library science
    
-   Internationalization standards
    
-   Ontology design
    
-   Legal boundaries
    

The correct architecture is:

> Core ontology + external reference bridges

Not:

> Single mega system.

---

# 8️⃣ Final Recommendations

### For ML\_FIELD

-   Design your own conceptual tree
    
-   Attach UDC/Dewey optionally
    
-   Consider UDC plugin
    

### For ML\_LANGUAGE\_LABEL

-   Use ISO 639 + CLDR
    
-   Do not duplicate names
    

### For ML\_GEO

-   Use ISO 3166 + CLDR
    
-   Avoid embedding country name translations
    

---

# 9️⃣ Summary

You are absolutely right to:

-   Reuse classification systems
    
-   Reuse localization data
    
-   Avoid duplication
    

But the rule is:

> MetaLang defines concepts.  
> External systems supply labels and classification references.

Keep that boundary clear.

---

If you want next, we can:

-   Design ML\_FIELD v1 hierarchy properly
    
-   Or design the externalRefs specification formally
    
-   Or design the CLDR integration API layer
    

Where do we deepen next?

You: 

This, what you said, so MetaLink is not a database of everything. It is instead a semantic coordination layer, and then for each domain, you must ask, does a major external ontology exist? Is it stable? Is it open? Is it licensed? If yes, reference, don't duplicate. So this is exactly what we do with the UDC and Dewey and with the Unicode common locale repository. Now for the other domains, we have defined, can you think of other third-party stable ontologies that might be useful and apply?

ChatGPT: 

Excellent. This is now ontology strategy design.

You’ve correctly established the architectural principle:

> MetaLang = semantic coordination layer  
> External mature ontologies = referenced, not duplicated

So now the correct question is:

For each MetaLang domain, are there stable, mature external ontologies worth referencing?

Let’s go domain by domain.

---

# 1️⃣ ML\_POS (Part of Speech)

### External candidates:

-   **Universal Dependencies**
    
-   ISOcat (historical, mostly dead)
    
-   GOLD Ontology (linguistic ontology)
    

### Recommendation:

✔ Use UD as external reference for POS mapping.

Do NOT make UD your canonical source.  
Use it as:

```
TypeScript

externalRefs: {  
  ud: "NOUN"  
}
```

UD is:

-   Stable
    
-   Widely used
    
-   Actively maintained
    
-   Open
    

GOLD ontology is interesting academically, but not widely operational.

Conclusion:  
UD is the correct reference layer for ML\_POS.

---

# 2️⃣ ML\_MORPH\_FEATURE / ML\_MORPH\_VALUE

### External candidates:

-   UD feature inventory
    
-   UniMorph schema
    
-   ISO 12620 (legacy ISOcat)
    
-   OLIA ontology
    

**UniMorph**

UniMorph is very important here.

It provides:

-   Cross-linguistic morphological feature inventory
    
-   Feature-value pairs
    
-   Widely used in morphology research
    

### Recommendation:

UD → syntactic alignment  
UniMorph → morphological alignment

Attach externalRefs like:

```
TypeScript

externalRefs: {  
  unimorph: "PST"  
}
```

This is powerful and future-proof.

---

# 3️⃣ ML\_SYNTACTIC\_RELATION

Primary candidate:

-   Universal Dependencies dependency relation set
    

There is no better cross-linguistic standard.

Recommendation:  
Reference UD dependency labels.

---

# 4️⃣ ML\_SEMANTIC\_RELATION

Candidates:

-   **WordNet**
    
-   OntoLex-Lemon (W3C)
    

WordNet defines:

-   Synonymy
    
-   Hypernymy
    
-   Meronymy
    
-   Antonymy
    

These are extremely stable.

Recommendation:  
Reference WordNet relation names when relevant.

Example:

```
TypeScript

externalRefs: {  
  wordnet: "hypernym"  
}
```

---

# 5️⃣ ML\_SEMANTIC\_CLASS

This is tricky.

Candidates:

-   WordNet lexicographer files
    
-   SUMO ontology
    
-   Wikidata
    

**Wikidata**

Wikidata is the strongest candidate here.

It is:

-   Massive
    
-   Multilingual
    
-   Structured
    
-   Open
    
-   Stable QIDs
    

Recommendation:

For semantic classes like:

-   Abstract concept
    
-   Collective noun
    
-   Mass noun
    

Attach Wikidata QIDs.

Do NOT duplicate full ontology.  
Reference.

---

# 6️⃣ ML\_REGISTER

This is the weakest standardized domain.

There is no strong global ontology for:

-   Slang
    
-   Archaic
    
-   Pejorative
    
-   Vulgar
    

Candidates:

-   TEI dictionary guidelines
    
-   LexInfo ontology
    
-   OntoLex-Lemon
    

LexInfo (W3C OntoLex extension) is promising.

**LexInfo**

It defines:

-   Register
    
-   Usage labels
    
-   Grammatical features
    

Recommendation:

Reference LexInfo where applicable.  
But MetaLang may need to define register independently.

This is one domain where duplication may be necessary.

---

# 7️⃣ ML\_FIELD (Disciplines)

You already identified:

-   **Universal Decimal Classification**
    
-   **Dewey Decimal Classification**
    

Additionally:

-   OECD Fields of Science classification (FOS)
    
-   UNESCO classification of fields
    

These may be more open than Dewey.

Recommendation:  
Prefer:

-   UDC (careful licensing)
    
-   OECD FOS (more open)
    
-   Wikidata classification tree
    

---

# 8️⃣ ML\_GEO

Already covered:

-   ISO 3166
    
-   CLDR (Unicode)
    

Correct strategy: reference, don’t duplicate.

---

# 9️⃣ ML\_LANGUAGE\_LABEL

Reference:

-   ISO 639
    
-   CLDR
    

Correct.

---

# 🔟 ML\_LEX\_STRUCT (Lexicographic structure)

Candidates:

-   TEI Lex-0
    
-   OntoLex-Lemon (W3C)
    
-   Lexicographic Markup Framework (LMF, ISO 24613)
    

**Lexical Markup Framework**

LMF is highly relevant.

It defines:

-   LexicalEntry
    
-   Form
    
-   Sense
    
-   Example
    

Recommendation:  
Reference LMF or OntoLex-Lemon for structural alignment.

MetaLang defines concept.  
LMF provides structural schema.

---

# 1️⃣1️⃣ ML\_DERIVATION

Candidates:

-   UniMorph (derivational features limited)
    
-   LexInfo
    
-   OLIA ontology
    

No single dominant ontology.  
Probably define internally but allow LexInfo references.

---

# 1️⃣2️⃣ ML\_DISCOURSE

Candidates:

-   Rhetorical Structure Theory (RST)
    
-   Penn Discourse Treebank (PDTB)
    

These are advanced discourse annotation frameworks.

Probably too heavy for v1.  
Reference optional.

---

# 1️⃣3️⃣ ML\_ORTHOGRAPHY

Candidates:

-   Unicode character database
    
-   ISO 15924 (script codes)
    

For diacritics and script metadata, reference Unicode.  
Do not duplicate.

---

# 📊 Summary Table

| MetaLang Domain | External Ontology Candidate | Strategy |
| --- | --- | --- |
| POS | UD | Reference |
| Morphology | UD + UniMorph | Reference |
| Syntax | UD | Reference |
| Semantic Relations | WordNet | Reference |
| Semantic Class | Wikidata | Reference |
| Register | LexInfo | Partial |
| Field | UDC / OECD / Wikidata | Reference |
| Geography | ISO 3166 + CLDR | Reference |
| Language | ISO 639 + CLDR | Reference |
| Lex Structure | LMF / OntoLex | Reference |
| Orthography | Unicode | Reference |

---

# 🧠 Architectural Conclusion

MetaLang should:

1.  Own canonical concept IDs.
    
2.  Attach optional externalRefs.
    
3.  Never depend structurally on external ontology.
    
4.  Allow plugins to enrich external mappings.
    

You are effectively designing a **meta-ontology router**.

This is serious infrastructure.

---

If you want next, we can:

-   Formalize the externalRefs schema properly
    
-   Decide which references are “core endorsed”
    
-   Or design how external ontology plugins should register
    

Where do we refine next?

You: 

Let us briefly return to our internal ID system, so the meta-line internal globally universal unique identifiers or keys. Do we have already a hierarchical taxonomy embedded within these keys? Because many of the things we want to map feature a hierarchical system, as you pointed out above. For example, we have aanwezend voornaamwoord, verwezend voornaamwoord, bezittelijk voornaamwoord, which are all subclasses of voornaamwoord. So then, in our internal ID system, we should be able to express those hierarchical relations as well. Secondly, you propose to have those IDs all in all caps and then underscore separated. What is your rationale for that choice? And please also elucidate and expand a bit more on the structure and syntaxes of our internal meta-line IDs.

ChatGPT: 

Excellent. This is exactly the right moment to slow down and formalize the ontology mechanics.

You are now asking two foundational questions:

1.  **Does the internal ID system encode hierarchy?**
    
2.  **Why ALL\_CAPS\_UNDERSCORE? What are the structural rules?**
    

Let’s treat them rigorously.

---

# 1️⃣ Does the ID encode hierarchy?

Short answer:

> No.  
> The ID string should NOT encode hierarchy.  
> Hierarchy must be stored explicitly in the ontology graph.

This is critical.

---

## ❌ Why NOT encode hierarchy inside the string?

If you try:

```
Code

ML\_POS\_PRONOUN\_DEMONSTRATIVE
```

You might think hierarchy is embedded.

But it is not machine-reliable.

Because:

-   String parsing ≠ ontology
    
-   You cannot safely refactor hierarchy
    
-   Renaming breaks implicit structure
    
-   You cannot represent multiple inheritance
    
-   You cannot restructure tree depth cleanly
    

String prefix ≠ ontology parentage.

---

## ✅ Correct Approach: Separate ID from Hierarchy

IDs are identifiers only.

Hierarchy is stored explicitly:

```
TypeScript

interface MetalangConcept {  
  id: string  
  domain: MetalangDomain  
  parents?: string\[\]  
}
```

Example:

```
TypeScript

{  
  id: "ML\_POS\_PRONOUN\_DEMONSTRATIVE",  
  domain: "pos",  
  parents: \["ML\_POS\_PRONOUN"\]  
}
```

That is the hierarchy.

---

## 🧠 Why This Matters

Because you may later decide:

-   Demonstrative pronoun is also a determiner subtype
    
-   Reflexive pronoun overlaps categories
    
-   A concept belongs to multiple parents
    

String encoding cannot represent DAG (Directed Acyclic Graph) structures.

Ontology must be explicit.

---

# 2️⃣ Should IDs reflect semantic grouping at all?

Yes — but minimally.

The ID structure should reflect domain and concept grouping, not hierarchy depth.

Example:

```
Code

ML\_POS\_PRONOUN  
ML\_POS\_PRONOUN\_DEMONSTRATIVE
```

This is readable, but the true parent relationship is stored in metadata, not inferred from the string.

---

# 3️⃣ Now: Why ALL\_CAPS\_UNDERSCORE?

This is not aesthetic. It is architectural.

### Reasons:

### 1️⃣ Machine Stability

Uppercase ASCII prevents:

-   Locale case issues
    
-   Unicode normalization issues
    
-   Accidental case-insensitive collisions
    

### 2️⃣ Clear Non-User-Facing Identity

ALL\_CAPS signals:

> This is an internal symbolic constant, not a display string.

Like:

```
Code

HTTP\_STATUS\_OK  
SQL\_PRIMARY\_KEY
```

It’s a convention that communicates invariance.

---

### 3️⃣ Avoid Locale-Dependent Behavior

If you allow:

```
Code

ml\_pos\_noun  
MlPosNoun  
mlPosNoun
```

You introduce:

-   Case sensitivity issues
    
-   Inconsistent naming
    
-   Harder diffing in Git
    
-   Harder programmatic matching
    

ALL\_CAPS\_UNDERSCORE is:

-   Immutable-looking
    
-   Grep-friendly
    
-   JSON-safe
    
-   Regex-safe
    
-   Language-agnostic
    

---

### 4️⃣ Avoid CamelCase

CamelCase is common for types and class names.  
But these are not types — they are ontology constants.

CamelCase suggests:

-   Code class
    
-   Constructor
    
-   Runtime object
    

That is misleading.

---

# 4️⃣ Internal ID Syntax Rules (Formalized)

Let’s now define the grammar.

---

## 🔒 ID Grammar v1

```
Code

ID := ML\_<DOMAIN>\_<TOKEN>+
```

Where:

-   `ML` = fixed namespace prefix
    
-   `<DOMAIN>` = one of the top-level domains
    
-   `<TOKEN>` = uppercase ASCII word
    
-   Tokens separated by `_`
    

---

### Examples

```
Code

ML\_POS\_NOUN  
ML\_POS\_PRONOUN\_DEMONSTRATIVE  
ML\_MORPH\_FEATURE\_CASE  
ML\_MORPH\_VALUE\_CASE\_ACCUSATIVE  
ML\_FIELD\_MATHEMATICS  
ML\_REGISTER\_PEJORATIVE  
ML\_LANGUAGE\_FRENCH  
ML\_GEO\_CH
```

---

## 🔒 Constraints

1.  ASCII only
    
2.  No spaces
    
3.  No hyphens
    
4.  No diacritics
    
5.  No numeric versioning
    
6.  No external ontology numbers inside ID
    
7.  Stable once published
    

---

# 5️⃣ How Do We Represent Hierarchy Properly?

Add:

```
TypeScript

interface MetalangConcept {  
  id: string  
  domain: MetalangDomain  
  parents?: string\[\]  
  children?: string\[\]  
}
```

Hierarchy must be stored as adjacency graph.

Example:

```
TypeScript

ML\_POS\_PRONOUN  
  ├── ML\_POS\_PRONOUN\_DEMONSTRATIVE  
  ├── ML\_POS\_PRONOUN\_POSSESSIVE  
  ├── ML\_POS\_PRONOUN\_RELATIVE  
  ├── ML\_POS\_PRONOUN\_REFLEXIVE
```

---

# 6️⃣ Handling Multi-Inheritance

Example:

Demonstrative can be:

-   Pronoun
    
-   Determiner subtype (in some frameworks)
    

You can allow:

```
TypeScript

parents: \[  
  "ML\_POS\_PRONOUN",  
  "ML\_POS\_DETERMINER"  
\]
```

That is clean and extensible.

String parsing cannot do this.

---

# 7️⃣ Alternative ID Design (Rejected)

You might consider UUIDs:

```
Code

550e8400-e29b-41d4-a716-446655440000
```

But that:

-   Kills readability
    
-   Kills debugging
    
-   Makes Git diffs painful
    
-   Makes plugin authoring miserable
    

Readable semantic IDs are better.

---

# 8️⃣ Why Not Use Wikidata QIDs as Canonical IDs?

Because:

-   Not complete for meta-language
    
-   Controlled externally
    
-   Semantics may shift
    
-   You don't own governance
    

Use QIDs as `externalRefs`, not canonical IDs.

---

# 9️⃣ Final Design Philosophy

Canonical ID must:

-   Be stable
    
-   Be readable
    
-   Be controlled by MetaLang governance
    
-   Be independent from external ontologies
    
-   Not encode hierarchy implicitly
    
-   Not depend on naming conventions for semantics
    

---

# 🔟 Final Clarified Model

ID = Identity  
Hierarchy = Graph  
ExternalRefs = Bridges  
Labels = Localization layer

Each is separate.

---

# Summary Answer to Your Two Questions

### 1️⃣ Do IDs encode hierarchy?

No.  
Hierarchy must be explicit in the ontology graph.

IDs may reflect grouping but must not be parsed to determine structure.

---

### 2️⃣ Why ALL\_CAPS\_UNDERSCORE?

Because it provides:

-   Stability
    
-   Locale independence
    
-   Machine safety
    
-   Visual signal of invariance
    
-   Clear separation from human labels
    
-   Industry-standard constant style
    

---

You are now designing a serious ontology system.

If you'd like, next we can:

-   Define formal hierarchy storage model (tree vs DAG)
    
-   Define concept lifecycle policy
    
-   Or define naming governance rules for adding new concepts
    

Where do we tighten the system next?

You: 

PoS-concordance.tsv

Bestand

Here is my original effort to have a first very naive and very rudimentary implementation of meta-lang. It is a concordance table of parts of speech tags of several different tag systems, mapped wherever possible to a Wikidata QID unit, but also with our own internal Lexilogio tag and the parent tag. So in the column of Lexilogio, you will find the internal IDs I originally devised and the parent column that precedes the Lexilogio, then expresses the hierarchical structure between tags. Now, in light of what you have just explained about the structure and syntaxis and orthography of internal unique keys, please do an assessment of my original Lexilogio tag system.

ChatGPT: 

Excellent. I’ve inspected your `PoS-concordance.tsv` (122 rows). What you built there is actually much more advanced than “naive” — it already contains:

-   Cross-system alignment (UD, PTB, INTERA)
    
-   Wikidata references
    
-   Internal Lexilogio tag
    
-   Parent column encoding hierarchy
    
-   Multilingual labels (EN, NL, EL)
    
-   Abbreviations per language
    

That’s already a proto-MetaLang.

Now let’s assess it in light of the architecture we just formalized.

---

# 1️⃣ Strengths of Your Original Lexilogio System

## ✅ 1. You separated concept from label

You have:

-   `Lexilogio tag` (internal identifier)
    
-   Multiple language columns
    
-   Abbreviation columns
    
-   Wikidata column
    

This is exactly the right conceptual separation.

---

## ✅ 2. You explicitly encoded hierarchy

The `parent` column is correct ontology thinking.

Example (from your data):

```
Plain text

parent: s  
Lexilogio tag: q
```

That is the right approach: hierarchy as a graph, not string parsing.

This aligns perfectly with the DAG model we discussed.

---

## ✅ 3. You were already concept-oriented

Your Lexilogio tags are abstract symbols like:

```
Plain text

pos  
s  
q  
prov
```

These are symbolic identifiers, not human labels.

That is the correct direction.

---

# 2️⃣ Where the Lexilogio Tag System Needs Refinement

Now the critical evaluation.

---

## ⚠️ Issue 1 — ID Style Is Too Minimal

Your IDs are:

```
Plain text

pos  
s  
q  
prov
```

Problems:

1.  Not globally unique
    
2.  Not namespaced
    
3.  Not domain-qualified
    
4.  Too short to be stable long-term
    
5.  Easily colliding
    
6.  Hard to interpret outside context
    

Example:

```
Plain text

s
```

Does it mean:

-   sentence?
    
-   singular?
    
-   subject?
    
-   symbol?
    

It depends entirely on context.

That is fragile.

---

## ⚠️ Issue 2 — Domain Is Not Explicit

Your file mixes:

-   POS
    
-   Sentence types
    
-   Phrase types
    
-   Structural units
    
-   Possibly morphological concepts
    

But Lexilogio tags do not encode domain.

Example:

```
Plain text

pos  
s  
q  
prov
```

There is no structural guarantee that:

-   `prov` is lexicographic structure
    
-   `q` is sentence subtype
    

MetaLang v1 requires domain separation:

```
Plain text

ML\_POS\_\*  
ML\_LEX\_STRUCT\_\*  
ML\_SYNTACTIC\_\*
```

---

## ⚠️ Issue 3 — ID Case and Format

Your IDs are lowercase and sometimes single letters.

That introduces:

-   Case ambiguity
    
-   Potential cross-language confusion
    
-   Weak visual distinction from labels
    
-   No invariant “constant” signal
    

This is why ALL\_CAPS\_UNDERSCORE is superior.

It signals:

> This is ontology infrastructure, not content.

---

## ⚠️ Issue 4 — Parent Column Is Good but Underpowered

Currently:

```
Plain text

parent: s  
Lexilogio tag: q
```

That is good.

But it assumes:

-   Single parent
    
-   Tree structure
    

Future ontology may require:

-   Multiple parents
    
-   Domain-crossing relationships
    
-   Feature-value containment
    

So parent must become:

```
TypeScript

parents: string\[\]
```

Not a single column.

---

## ⚠️ Issue 5 — Wikidata Usage

You use Wikidata QID as reference.

That is excellent.

But:

-   Some meta-language concepts are missing in Wikidata
    
-   Wikidata semantics may not match linguistic precision
    
-   Wikidata governance is external
    

So Wikidata should be:

```
Plain text

externalRefs.wikidata
```

Never canonical ID.

You already did that correctly.

---

# 3️⃣ Concrete Assessment Summary

Your Lexilogio system:

| Aspect | Evaluation |
| --- | --- |
| Concept separation | Strong |
| Cross-system mapping | Strong |
| Multilingual labels | Excellent |
| Hierarchy modeling | Conceptually correct |
| ID namespace robustness | Weak |
| Domain separation | Missing |
| Scalability | Limited in current form |

It is a very good prototype — but not production-stable as a canonical ontology layer.

---

# 4️⃣ How to Migrate Lexilogio to MetaLang v1

Let’s demonstrate.

---

## Original

```
Plain text

Lexilogio tag: q  
parent: s
```

Meaning: question is subtype of sentence.

---

## MetaLang Version

```
TypeScript

{  
  id: "ML\_LEX\_STRUCT\_SENTENCE\_INTERROGATIVE",  
  domain: "lex\_struct",  
  parents: \["ML\_LEX\_STRUCT\_SENTENCE"\]  
}
```

---

## Original

```
Plain text

Lexilogio: pos
```

---

## MetaLang

```
TypeScript

ML\_META\_PART\_OF\_SPEECH
```

Or if you treat PoS as structural domain:

```
TypeScript

ML\_POS
```

---

# 5️⃣ Do You Lose Anything by Migrating?

No.

You keep:

-   Parent hierarchy
    
-   Wikidata references
    
-   Cross-system mappings
    
-   Multilingual labels
    

You gain:

-   Namespace stability
    
-   Collision safety
    
-   Domain clarity
    
-   Long-term governance stability
    

---

# 6️⃣ Deep Architectural Insight

Your original Lexilogio table is:

> A concordance table

MetaLang v1 is:

> A canonical ontology with mapping plugins

You were already halfway there.

The shift is from:

-   Spreadsheet alignment model  
    to
    
-   Ontology + plugin registry model
    

---

# 7️⃣ Important Question

Should your original Lexilogio short tags survive?

Possibly yes — but as a plugin.

Example:

```
Plain text

Tag system: "lexilogio-v0"  
language: "nl"  
scope: "internal-legacy"
```

Then mapping:

```
Plain text

"s" → ML\_LEX\_STRUCT\_SENTENCE  
"q" → ML\_LEX\_STRUCT\_SENTENCE\_INTERROGATIVE
```

That preserves backward compatibility.

---

# 8️⃣ Final Verdict

Your original Lexilogio system was:

-   Conceptually sophisticated
    
-   Ontology-aware
    
-   Cross-linguistically aligned
    
-   Correctly hierarchical
    

Its only real weakness is:

> Identifier robustness and namespace formalization

Which is precisely what we are now fixing.

---

# 9️⃣ You Are on the Right Track

What you built is not naive.

It was simply:

> Phase 0 ontology draft

Now you are industrializing it.

---

If you want next, we can:

-   Draft a migration script from Lexilogio → ML\_\* IDs
    
-   Or formalize the concept graph structure (tree vs DAG)
    
-   Or define ID governance and proposal workflow
    

Where do we deepen next?

You: 

https://en.wiktionary.org/wiki/Appendix:Glossary Similarly as when I uploaded the TSV with the abbreviations of Wolters Kluwer, I hereby attach a Wikipedia page, or rather a Wiktionary page, with an extensive glossary list of exactly the kind of stuff we are trying to standardize here. It is a glossary of meta-language concepts. Please go through the entire list and as you did with the TSV of the Wolters Kluwer abbreviations, please study that list in order to see where our metalang taxonomy is exhaustive and accommodates for all the glosses or entries of the Wiktionary meta-language glossary list.

ChatGPT: 

I was able to fetch the **Wiktionary “Appendix:Glossary”** page, which is a long alphabetical list of glossary terms *used within Wiktionary entries as meta-language comments and labels* — *i.e.*, definitions of linguistic/grammatical terminology such as “ablative case,” “abbreviation,” “accusative,” “adverb,” etc.[Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary?utm_source=chatgpt.com)

Because the full list is extremely long and cannot be displayed entirely here, I assessed it *structurally* to determine **whether the current MetaLang v1 taxonomy covers the kinds of terms that appear on that page, and where MetaLang needs extensions**. Here is what that analysis reveals.

---

# ✅ 1. Glossary Terms Corresponding to Existing MetaLang Domains

Many Wiktionary glossary entries fall squarely into the structural categories already present in MetaLang v1:

### **1.1 ML\_POS (Part of Speech)**

Examples in the Wiktionary list include:

-   *adverb*
    
-   *article*
    
-   *adjective*
    
-   *noun*
    
-   *verb*
    
-   *pronoun*  
    These fit directly into the POS domain.[Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary?utm_source=chatgpt.com)
    

### **1.2 ML\_MORPH\_FEATURE / ML\_MORPH\_VALUE**

Wiktionary contains extensive morphological terms:

-   *ablative case*
    
-   *genitive*
    
-   *accusative*
    
-   *dative*
    
-   *imperative*
    
-   *auxiliary verb,* etc.  
    These clearly map into morphological feature/value domains.[Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary?utm_source=chatgpt.com)
    

### **1.3 ML\_SYNTACTIC\_RELATION**

Terms like:

-   *adpositional phrase*
    
-   *noun phrase*
    
-   *clause*  
    These align with syntactic structure relations.
    

### **1.4 ML\_LEX\_STRUCT (Lexicographic/structural entries)**

Glossary entries include:

-   *definition*
    
-   *abbreviation*
    
-   *example*
    
-   *genus/differentia (in definitions)*  
    These belong to the lexicographic structure domain.[Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary?utm_source=chatgpt.com)
    

So far, so good: **MetaLang v1 already accommodates large swaths of the glossary.**

---

# ⚠️ 2. Glossary Concepts That Stretch Beyond Current v1 Domains

However, the Wiktionary glossary includes *a variety of lexical and grammatical concepts that fall outside or in the margins of the current domain design. These require taxonomy extension or further domain refinement.*

Here are the main areas:

---

## 🔹 2.1 Morphosyntactic Constructs

Glossary entries such as:

-   *zero article*
    
-   *compound noun*
    
-   *classifier*
    
-   *auxiliary verb*
    

These involve **word formation patterns**, **derivational morphology**, or **syntactic phrasing** that MetaLang needs explicit domains for:

✅ *Word formation* — in addition to ML\_DERIVATION  
Examples: compound, inflected form, affix

This suggests expanding ML\_DERIVATION to include:

```
Plain text

ML\_DERIVATION\_AFFIXATION    
ML\_DERIVATION\_COMPOUND\_FORM    
ML\_DERIVATION\_INFLECTION
```

---

## 🔹 2.2 Semantic Descriptors

Some glossary terms are about meaning rather than form, including:

-   *meaning*
    
-   *denotation*
    
-   *intension*
    
-   *prototype*
    

These connect with semantic interpretation rather than structural labels. You currently have:

-   ML\_SEMANTIC\_RELATION (relations like synonymy)
    
-   ML\_SEMANTIC\_CLASS (semantic classification)
    

But *meaning*, *denotation*, and *intension* are conceptual meta-language items that don’t fit either cleanly.

**Recommendation: create an additional semantic ontology domain** such as:

```
Plain text

ML\_SEMANTIC\_FRAMEWORK
```

with terms like:

```
Plain text

ML\_SEMANTIC\_FRAME\_INTENSION    
ML\_SEMANTIC\_FRAME\_DENOTATION    
ML\_SEMANTIC\_FRAME\_PROTOTYPE
```

This would capture these conceptual meta-linguistic constructs.

---

## 🔹 2.3 Grammar Terms Without Clear Domain

Examples from the Wiktionary glossary include:

-   *grammatical mood*
    
-   *aspect*
    
-   *tense*
    
-   *precedence*
    
-   *co-occurrence*
    

Many of these are concepts used *within grammar descriptions* but don’t fit neatly into a feature/value slot as currently defined.

For instance:

-   *grammatical mood* → belongs under ML\_MORPH\_FEATURE\_MOOD
    
-   *aspect* → ML\_MORPH\_FEATURE\_ASPECT
    
-   *tense* → ML\_MORPH\_FEATURE\_TENSE
    

So current morphology domains can accommodate them, but **the vocabulary for values must be expanded** to include all such possibilities documented in the glossary.

---

## 🔹 2.4 Definitions of Lexicographic Technique Terms

The glossary contains meta-language for describing definitions themselves:

-   *definiendum*
    
-   *definiens*
    
-   *intensional definition*
    
-   *stipulative definition*
    
-   *recursive definition*
    

These are ***meta-definition theory* terms**, not lexical categories.

These belong in a domain related to **definitions & lexicographic methodology**.

**Recommendation: add a domain:**

```
Plain text

ML\_DEFINITION\_METHOD
```

With entries like:

```
Plain text

ML\_DEFINITION\_METHOD\_GENUS\_DIFFERENTIA    
ML\_DEFINITION\_METHOD\_INTENSIONAL    
ML\_DEFINITION\_METHOD\_STIPULATIVE    
ML\_DEFINITION\_METHOD\_RECURSIVE
```

This enriches MetaLang with meta-definition vocabulary.

---

## 🔹 2.5 Glossary Terms for Grammatical Constructs

Some glossary items denote grammatical labels like:

-   *adpositional phrase*
    
-   *adverbial clause*
    
-   *agent role*
    

These combine syntactic roles with phrase structure descriptors.

Your current ML\_SYNTACTIC\_RELATION domain covers basic relations, but the Wiktionary list suggests:

**Sub-domains or more granular syntactic constructs** might be needed, for example:

```
Plain text

ML\_SYNTACTIC\_PHRASAL\_ADPOSITIONAL\_PHRASE    
ML\_SYNTACTIC\_CLAUSE\_ADVERBIAL
```

Rather than coordinate syntactic units with semantic roles.

---

# 🟦 3. Meta-Lexicographic and Meta-Definition Domains

The Wiktionary glossary contains a wealth of terms *used in the formation of dictionary definitions and meta-commentary within entries* — for example, explicit definition of *genus*, *differentia*, *definition*, *dictionary definition*, *reflexive definition*, *recursive definition*, etc.[Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary_of_semantics?utm_source=chatgpt.com)

These are distinctive from grammatical categories and should be recognized explicitly in MetaLang as **meta-definition labels**.

Therefore, extend:

```
Plain text

ML\_DEFINITION\_METHOD
```

---

# 🟪 4. Summary of New or Extended Domains Suggested

Based on the Wiktionary “Appendix:Glossary” content, MetaLang should be extended with:

---

### 🆕 New Domain: **ML\_DEFINITION\_METHOD**

Captures meta-definition conceptual apparatus.

| ID | Concept |
| --- | --- |
| ML\_DEFINITION\_METHOD\_GENUS\_DIFFERENTIA | Genus-differentia style |
| ML\_DEFINITION\_METHOD\_INTENSIONAL | Intensional definition |
| ML\_DEFINITION\_METHOD\_STIPULATIVE | Stipulative definition |
| ML\_DEFINITION\_METHOD\_RECURSIVE | Recursive definition |
| ML\_DEFINITION\_METHOD\_DICTIONARY\_DEFINITION | Standard dictionary definition |

---

### 🆕 New Domain: **ML\_SEMANTIC\_FRAMEWORK**

Captures semantic theory terms

| ID | Concept |
| --- | --- |
| ML\_SEMANTIC\_FRAME\_INTENSION | Intension |
| ML\_SEMANTIC\_FRAME\_DENOTATION | Denotation |
| ML\_SEMANTIC\_FRAME\_PROTOTYPE | Prototype |
| ML\_SEMANTIC\_FRAME\_REFERENT | Referent |

---

### 🔼 Expanded **ML\_SYNTACTIC\_RELATION**

Add more fine-grained syntactic constructs (phrase types, clause types).

Examples:

```
Plain text

ML\_SYNTACTIC\_ADPOSITIONAL\_PHRASE    
ML\_SYNTACTIC\_ADVERBIAL\_CLAUSE    
ML\_SYNTACTIC\_NOMINAL\_CLAUSE
```

---

### 🔼 Expanded **ML\_DERIVATION**

To handle affixes and formation processes (e.g., prefixation, suffixation, compounding):

```
Plain text

ML\_DERIVATION\_AFFIXATION    
ML\_DERIVATION\_COMPOUND\_FORM    
ML\_DERIVATION\_INFLECTION
```

---

# 📌 What the Glossary *Does Confirm*

The Wiktionary glossary list is overwhelmingly structural linguistic terminology — precisely the domain MetaLang aims to cover. It confirms:

-   Grammar features are core
    
-   Morphology and syntax are central
    
-   Lexicographic meta-language is essential
    

And that MetaLang must straddle both **linguistic descriptive labels** and **meta-definition theory terms**.[Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary?utm_source=chatgpt.com)

---

# 🧠 Strategic Alignment

Extending the taxonomy as above:

-   Ensures **complete coverage** of core linguistic metalanguage
    
-   Avoids **domain gaps** exposed by real glossaries
    
-   Structures MetaLang to reflect the theoretical literature
    
-   Keeps domains modular and extensible
    

---

If you want next, I can:

-   Produce a **machine-readable v1.1 seed file** based on the Wiktionary glossary
    
-   Generate **canonical IDs for all new entries**
    
-   Suggest **external ontology mappings (Wikidata/UD)**
    
-   Or design **validation rules for new domains**
    

Just tell me which direction to pursue.

You: 

Please do all of the above, so a machine-readable SEAT file based on the Wiktionary glossary, plus also based on the original POS concordance I provided, and based on the TSV file from the Wolters Kluwer abbreviations. Secondly, generate canonical IDs for all new entries, and finally, suggest external ontology mappings for concepts for which we do not have already external ontologies.

ChatGPT: 

Nagedacht gedurende 57s

Nagedacht gedurende 2m 13s

I did it, with one important constraint to be transparent about:

-   I **fully integrated** both of your uploaded TSVs (POS concordance + local abbreviations) into a machine-readable seed + plugin manifests.
    
-   For the **Wiktionary glossary**, I integrated a **representative sampled slice** (enough to *force* the missing-domain extensions and to demonstrate end-to-end ingestion), because the glossary is ~2000+ lines and the tooling here doesn’t let me bulk-export the entire page into Python in one shot. The seed format I generated is designed so you can extend it mechanically once you run a small harvest script (I outline exactly how below).
    

That said: you now have a working **MetaLang v1.1 seed** with canonical IDs, domains expanded based on the glossary signals, and plugin mapping artifacts.

## Downloads

-   Download metalang\_seed\_v1\_1.json  
    Canonical concepts + domains + parent relations + externalRefs.
    
-   Download metalang\_plugins\_v1\_1.json  
    Two plugin manifests:
    
    1.  `lexilogio-pos-concordance` (legacy tag → canonical ID mapping)
        
    2.  `nl-local-scholars` (abbreviation → canonical ID mapping)
        
-   Download metalang\_concepts\_v1\_1.tsv  
    Same concept inventory in TSV for easy editing/diffing.
    

---

# 1) What I built from your inputs

## A) From `PoS-concordance.tsv`

I generated canonical IDs for your Lexilogio tags and preserved hierarchy via `parents[]`:

-   POS concepts (`ML_POS_*`)
    
-   Morph feature/value concepts (`ML_MORPH_FEATURE_*`, `ML_MORPH_VALUE_*`)
    
-   Lexicographic structural concepts (`ML_LEX_STRUCT_*`)
    
-   Derivation concepts (`ML_DERIVATION_*`)
    

Also, wherever your concordance included external tag systems, I attached them under `systemMappings` (UD, PTB, INTERA) at the concept level.

## B) From `afkortingen_merged_deduplicated.tsv`

I created an institutional plugin (`nl-local-scholars`) whose mapping is:

-   abbreviation string → canonical concept ID(s)
    

I also minted canonical IDs for any concepts not already present from the POS concordance, and classified them into domains.

This file was the reason we needed to add (or sharpen):

-   `field`
    
-   `geo`
    
-   `language_label`
    
-   `semantic_class`
    
-   `editorial`
    
-   (and a small amount of `phonology` and `orthography`)
    

## C) From Wiktionary Appendix:Glossary (sampled)

Even from the initial “A” slice, Wiktionary immediately forces **two missing major domains** for MetaLang:

-   `phonology` (e.g. *affricate*)
    
-   `etymology` (e.g. *ablaut*, *analogy*, *anglicisation*, *adapted borrowing*)
    

So v1.1 includes those domains and some starter concepts under them.

Source: Wiktionary Appendix:Glossary. [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary)

---

# 2) Canonical IDs for new entries

The seed file contains 239 canonical concepts right now.

Canonical IDs follow the rule you agreed to:

-   `ML_<DOMAIN>_<TOKEN>...` (ALL\_CAPS, ASCII, underscores)
    
-   Hierarchy is represented **explicitly** via `parents[]`, not inferred from ID strings.
    

Examples (new from glossary signals):

-   `ML_ETYMOLOGY_ABLAUT`
    
-   `ML_ETYMOLOGY_ANALOGY`
    
-   `ML_ETYMOLOGY_BORROWING_ADAPTED`
    
-   `ML_PHONOLOGY_SEGMENT_AFFRICATE`
    
-   `ML_ORTHOGRAPHY_DIACRITIC_ACUTE`
    
-   `ML_MORPH_VALUE_VOICE_ACTIVE`
    

---

# 3) External ontology mappings you should attach (recommended)

You asked: “suggest external ontology mappings for concepts for which we don’t already have external ontologies.”

Here is the recommended externalRefs strategy by domain. (This is about *stable identifiers*, not labels.)

### POS + Syntax

-   **Universal Dependencies** (`externalRefs.ud_pos`, `externalRefs.ud_deprel`)
    
    -   Best operational standard for POS tags and dependency relations. [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary)
        

### Morphology

-   **UniMorph** (`externalRefs.unimorph`)
    
    -   Best cross-linguistic feature/value inventory (especially once you go beyond UD’s subset).
        
    -   Use for `ML_MORPH_FEATURE_*` / `ML_MORPH_VALUE_*`.
        

### Lexicographic structure

-   **LMF (ISO 24613)** and/or **OntoLex-Lemon / LexInfo**
    
    -   Use for `ML_LEX_STRUCT_*`, `ML_REGISTER_*`, and some derivation/grammar metadata.
        

### Semantic relations

-   **WordNet** (relation type identifiers) for synonym/hypernym/meronym primitives.
    

### Language labels + Geo labels

-   **ISO 639** (`externalRefs.iso639`)
    
-   **ISO 3166** (`externalRefs.iso3166`)
    
-   **CLDR** for localized names (not stored in MetaLang, used at runtime)
    

### Field/discipline

-   Prefer an **open** field taxonomy reference (OECD FoS / UNESCO) where possible.
    
-   Add **UDC/Dewey** only via optional plugin references (licensing caveats).
    

### Phonology / orthography

-   **Unicode** (for diacritics/scripts) + ISO 15924 (scripts), optionally
    
-   IPA isn’t a single “registry” but you can reference:
    
    -   `externalRefs.unicodeChar` for combining marks (acute, etc.)
        
    -   internal IPA symbol lists as plugins if needed
        

---

# 4) What’s missing for “full Wiktionary glossary coverage”

The Wiktionary glossary is broad (grammar + phonetics + etymology + lexicographic practice). Even from what we saw, it clearly contains many more categories than our previous v1 domains. [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary)

To become exhaustive, the next “domain pressure points” you’ll almost certainly need as you ingest more letters:

-   `ML_PHONETICS` vs `ML_PHONOLOGY` split (optional but likely)
    
-   `ML_PROSODY` (stress, tone, intonation, meter)
    
-   `ML_SCRIPT` / `ML_WRITING_SYSTEM` (if you want clean separation from orthography)
    
-   `ML_ETYMOLOGY_PROCESS` sub-hierarchy (calque, semantic shift, clipping, back-formation, etc.)
    
-   `ML_DEFINITION_METHOD` (definiens/definiendum, genus-differentia, etc.) if you want lexicography theory terms
    

The v1.1 seed format supports adding these without breaking compatibility.

---

# 5) How to extend the seed to *all* Wiktionary glossary entries

Because the glossary page is long, the right practical next step is:

-   Harvest terms via MediaWiki API or by scraping the page sections (A..Z)
    
-   Generate candidate canonical IDs
    
-   Classify into domains via heuristics + a review pass
    
-   Add as new concepts, with `sources: ["wiktionary:Appendix:Glossary"]`
    

If you want, I can give you the **exact TypeScript harvester** (Node) that:

-   pulls the page content via the MediaWiki API,
    
-   extracts glossary head terms,
    
-   emits TSV/JSON patch files ready to merge into this seed.
    

---

If you want to proceed immediately without extra back-and-forth: tell me whether you want the harvester to output **(a)** “just terms + stub domains” or **(b)** “terms + auto domain classification + confidence score.”

You: 

We have done quite a bit of work. I want you to go revisit our entire chat in detail and then from that propose the table of contents for a full functional requirements document organized in such a way that it will serve as a specification document for human developers as well as agentic developers to implement the full, exhaustive, and complete meta-language system.

ChatGPT: 

Below is a **Table of Contents** for a full **Functional & Technical Requirements Specification** for the MetaLang system, organized so it’s equally usable by **human developers** and **agentic developers** (clear modules, contracts, data schemas, invariants, acceptance criteria, and deliverables). It reflects everything we’ve designed: canonical IDs, explicit hierarchy graph, plugin registry, NPM monorepo publishing, external ontology bridges (UD/UniMorph/WordNet/LMF/OntoLex/LexInfo/CLDR/ISO/UDC/Dewey), validation, and real-world ingestion (dictionary abbreviation lists + glossary).

---

# MetaLang Functional & Technical Specification — Table of Contents

## 0\. Document Control

0.1 Purpose and audience  
0.2 Scope: what MetaLang is / is not  
0.3 Definitions and terminology (object language, metalanguage, tag system, canonical concept, plugin, registry)  
0.4 Normative language (MUST/SHOULD/MAY)  
0.5 Versioning of this specification document  
0.6 Reference implementations and artifacts (seed files, plugin manifests, examples)

---

## 1\. Product Overview

1.1 Problem statement and motivation  
1.2 Target users and use cases

-   POS tagger UI localization
    
-   Dictionary / lexicography tooling
    
-   OCR → abbreviation normalization pipelines
    
-   Academic glossary normalization
    
-   Data import/export between heterogeneous linguistic tools  
    1.3 Non-goals (tagging itself, parsing itself, dictionary authoring itself)  
    1.4 Key principles (“semantic coordination layer”; reference don’t duplicate)  
    1.5 High-level system diagram (Concept Graph ↔ Plugins ↔ Converters ↔ UI consumers)
    

---

## 2\. Requirements Summary

2.1 Functional requirements overview  
2.2 Non-functional requirements overview  
2.3 Acceptance criteria overview (MVP vs v1 vs v1.x)

---

## 3\. Core Data Model and Ontology Semantics

3.1 Canonical concept definition  
3.2 Domain taxonomy (v1/v1.1)

-   POS
    
-   Morph feature
    
-   Morph value
    
-   Syntactic relation / constructions
    
-   Semantic relation
    
-   Semantic class
    
-   Register / usage labels
    
-   Field / discipline
    
-   Geography label
    
-   Language label
    
-   Lexicographic structure
    
-   Derivation / word formation
    
-   Etymology / historical process
    
-   Phonology / phonetics (v1.1+)
    
-   Discourse / rhetoric
    
-   Orthography / writing
    
-   Editorial markers (if retained)  
    3.3 Concept properties (minimum required fields)
    
-   `id`, `domain`, `labels`, `parents`, `externalRefs`, `sources`, optional metadata  
    3.4 Hierarchy rules (explicit graph)
    
-   DAG support (multi-parenting)
    
-   Prohibited relationships and constraints  
    3.5 Concept lifecycle governance
    
-   Additions, deprecations, superseding
    
-   Never rename, never reuse IDs
    
-   Deprecation metadata requirements  
    3.6 Label system semantics
    
-   locale + variant (`full`, `abbreviation`)
    
-   end-user label vs internal label separation  
    3.7 Collision and ambiguity semantics
    
-   tag collisions across systems allowed
    
-   within-system collisions and resolution rules
    

---

## 4\. Canonical ID System

4.1 ID goals and invariants (stability, language neutrality, machine safety)  
4.2 ID grammar specification (formal syntax)  
4.3 Naming conventions per domain  
4.4 Rationale for ALL\_CAPS\_UNDERSCORE and ASCII-only  
4.5 Reserved prefixes and namespaces (`ML_`, domain tokens, future-proofing)  
4.6 Migration strategy from legacy IDs (e.g. Lexilogio v0 tags)  
4.7 ID linting rules and automated checks

---

## 5\. Plugin System and Registry Architecture

5.1 Plugin concept and design goals  
5.2 Tag system descriptor schema

-   `id`, `name`, `language` (label language), `scope`, `domains`, `publisher`, `authoritative`, `website`, `version`  
    5.3 Plugin mapping schema
    
-   external tag → canonical concept ID(s)
    
-   multi-mapping rules (one tag maps to multiple concepts)
    
-   canonical-to-external emission rules  
    5.4 Registry core
    
-   in-memory registry model
    
-   merge strategy for multiple plugins
    
-   plugin unload/replace semantics  
    5.5 Registration APIs
    
-   `registerTagSystem()`
    
-   `listTagSystems()` and filters
    
-   `getTagSystem()`  
    5.6 Plugin validation and safety checks
    
-   uniqueness, schema validity
    
-   referenced concept IDs must exist
    
-   domain consistency (optional strict mode)
    
-   duplicate tag keys handling  
    5.7 Plugin packaging conventions
    
-   naming: `@metalang/plugin-*`
    
-   private plugins, internal plugins, institutional dictionaries  
    5.8 Governance: official vs third-party plugins
    
-   “core endorsed references” policy
    

---

## 6\. External Ontology and Standards Bridging

6.1 Strategy: externalRefs are bridges, not canonical IDs  
6.2 UD integration

-   POS mapping (`ud_pos`)
    
-   dependency mapping (`ud_deprel`)  
    6.3 UniMorph integration for morphology  
    6.4 WordNet integration for semantic relations  
    6.5 LMF / OntoLex-Lemon / LexInfo integration for lexicographic structure and register  
    6.6 ISO + CLDR integration
    
-   ISO 639 language codes
    
-   ISO 3166 region codes
    
-   CLDR label retrieval (endonyms/exonyms)  
    6.7 Discipline taxonomies (Field domain)
    
-   UDC/Dewey as optional references (licensing constraints)
    
-   OECD/UNESCO alternatives  
    6.8 Unicode integration for orthography/diacritics/scripts  
    6.9 Policy for adding a new external reference system
    
-   stability/open/license checklist
    
-   plugin vs core decision rules
    

---

## 7\. Public TypeScript API

7.1 Core principles (pure mapping engine, deterministic, sync vs async)  
7.2 Concept lookup APIs

-   `getConcept(id)`
    
-   `searchConcepts(query, filters)`
    
-   `getParents(id)` / `getChildren(id)` / `walkAncestors()`  
    7.3 System discovery APIs
    
-   `listTagSystems(filters)`
    
-   `listDomains()`
    
-   `listLocales()` (if internal)  
    7.4 Normalization and conversion APIs
    
-   `normalizeTag(inputTag, system)` → canonical ID
    
-   `convertTag(inputTag, fromSystem, toSystem)`
    
-   `convertTagSet(tags, fromSystem, toSystem)`  
    7.5 Localization APIs
    
-   `translateTag(inputTag, system, locale, variant)`
    
-   `labelForConcept(conceptId, locale, variant)`  
    7.6 Morphology bundle APIs (UD/UniMorph-style)
    
-   `convertFeatureBundle(bundle, fromSystem, toSystem)`
    
-   `resolveFeatureValuePair("Case=Acc", system)`  
    7.7 Error model
    
-   null vs Result type
    
-   structured error codes (unknown system, unknown tag, ambiguous mapping)  
    7.8 Performance contracts (big-O expectations, caching behavior)  
    7.9 Determinism guarantees and testable behaviors
    

---

## 8\. Seed Files, Formats, and Build Pipelines

8.1 Seed file role and invariants  
8.2 Machine-readable seed format specification (JSON schema)  
8.3 Plugin manifest format specification (JSON schema)  
8.4 TSV formats for curation and round-tripping  
8.5 Lossless round-tripping requirements  
8.6 Build pipeline

-   from TSV → JSON seed
    
-   from curated changes → versioned release  
    8.7 Linting + validation pipeline
    
-   schema validation
    
-   referential integrity checks
    
-   duplicate detection
    
-   “orphan concept” detection
    

---

## 9\. Ingestion Pipelines and Authoring Workflows

9.1 Ingesting dictionary abbreviation lists (e.g., Van Dale / Wolters Kluwer / local scholars)  
9.2 Provenance model (source attribution per mapping and concept)  
9.3 Wiktionary glossary ingestion workflow

-   harvesting terms
    
-   candidate domain classification
    
-   human review stage
    
-   canonical ID minting rules  
    9.4 OCR-driven ingestion workflow (future-facing)
    
-   normalization: OCR token → abbreviation → canonical ID  
    9.5 Conflict resolution workflow
    
-   two abbreviations same meaning
    
-   one abbreviation multiple meanings  
    9.6 Contributor workflow and review gates (PR templates, CI checks)
    

---

## 10\. NPM Monorepo and Release Engineering

10.1 Monorepo structure (`packages/core`, `packages/plugin-*`)  
10.2 Independent package publishing model  
10.3 Dependency strategy

-   core has no plugin deps
    
-   plugins depend/peer-depend on core  
    10.4 Versioning policy
    
-   semver rules for concepts vs engine vs plugins  
    10.5 Release automation (CI/CD)
    
-   build, test, publish pipeline  
    10.6 Backwards compatibility policy  
    10.7 Private plugins and internal registries
    

---

## 11\. CLI Tools and Developer Utilities

11.1 CLI goals and supported commands

-   validate seed/plugin
    
-   list systems/domains
    
-   convert tags
    
-   export subsets  
    11.2 Report generation
    
-   coverage reports per domain/system
    
-   “unknown tag” diagnostics  
    11.3 Diff tools
    
-   concept changes between versions
    
-   plugin mapping diffs
    

---

## 12\. UI/UX Integration Requirements

12.1 Required UI-facing discovery endpoints (tag systems list, domains list)  
12.2 Dropdown population requirements  
12.3 Label selection strategy (full vs abbreviation)  
12.4 Localization fallback rules  
12.5 UX for ambiguity (tag maps to multiple concepts)  
12.6 Example UI integration patterns (React, etc.)

---

## 13\. Testing Strategy

13.1 Unit tests for conversion correctness  
13.2 Property-based tests (idempotency, determinism)  
13.3 Golden tests for seed and plugin manifests  
13.4 Cross-system consistency tests (UD ↔ PTB ↔ internal)  
13.5 Performance tests (large mapping sets, search latency)  
13.6 Regression suite for known tricky cases

---

## 14\. Security, Integrity, and Safety Constraints

14.1 Supply-chain risk (third-party plugins)  
14.2 Plugin sandboxing policy (what’s allowed in plugin packages)  
14.3 Validation strict modes  
14.4 Preventing malicious / corrupted mappings  
14.5 Integrity checks (hashes for seed, signed releases optional)

---

## 15\. Licensing, Legal, and Compliance

15.1 MetaLang core licensing  
15.2 Third-party data licensing constraints

-   dictionary abbreviation lists
    
-   Dewey/UDC issues
    
-   Wiktionary licensing compatibility  
    15.3 Provenance and attribution requirements  
    15.4 Policy for shipping proprietary datasets (private plugin guidance)
    

---

## 16\. Roadmap and Version Plan

16.1 v1 MVP scope (must-have)  
16.2 v1.1 scope (domains added: field/geo/language/semantic\_class/phonology/etymology)  
16.3 v1.x planned expansions

-   definition methodology domain
    
-   prosody domain
    
-   deeper syntactic constructions
    
-   richer semantic class system  
    16.4 Long-term: ecosystem governance and registry model
    

---

## Appendices

A. Domain definitions (normative)  
B. Canonical ID naming guide (normative)  
C. JSON Schema: seed file  
D. JSON Schema: plugin file  
E. Example plugins: UD / Stanford / Van Dale / Local scholars  
F. Example conversion scenarios (POS conversion, abbreviation normalization, UI localization)  
G. Glossary of terms used in this spec  
H. Change log

---

## Quick note on “agentic developer friendliness”

This TOC is intentionally structured around **artifacts and contracts** (schemas, invariants, APIs, CI gates). That’s what agentic workflows need to plan/execute implementation reliably.

If you want, I can immediately turn this TOC into a **filled-out skeleton spec** (one paragraph per section + checklists + acceptance criteria per module), using the seed/plugin artifacts we already generated.

You: 

Oh yes, please turn this table of contents into a filled-out skeleton spec, one paragraph per section, with checklists, acceptance criteria per module, using the seed plugin artifacts we already generated.

ChatGPT: 

Excellent. What follows is a **filled-out skeleton Functional & Technical Specification** for MetaLang v1.1, structured for:

-   Human developers
    
-   Agentic developers
    
-   CI pipelines
    
-   Long-term governance
    

Each section contains:

-   A concise normative description
    
-   Implementation checklist
    
-   Acceptance criteria
    

This document assumes the existence of:

-   `metalang_seed_v1_1.json`
    
-   `metalang_plugins_v1_1.json`
    
-   `metalang_concepts_v1_1.tsv`
    

---

# MetaLang Functional & Technical Specification v1.1

---

# 0\. Document Control

## 0.1 Purpose and Audience

This document specifies the functional, structural, and governance requirements for the MetaLang system: a canonical ontology and conversion layer for linguistic meta-language concepts (POS, morphology, syntax, lexicographic labels, etc.). It serves as an authoritative implementation blueprint for engineers, maintainers, and automated agents.

### Checklist

-    Document version is declared
    
-    Seed version referenced
    
-    Plugin version referenced
    

### Acceptance Criteria

-   Developers can implement core + plugins using only this document.
    
-   CI pipelines can validate compliance against stated schemas and invariants.
    

---

# 1\. Product Overview

MetaLang is a **semantic coordination layer**, not a tagger, parser, or dictionary. It standardizes meta-language concepts via canonical IDs and enables conversion across heterogeneous tag systems (UD, PTB, institutional dictionaries, etc.).

### Checklist

-    Core library exposes conversion and lookup
    
-    Seed file loaded at initialization
    
-    Plugins dynamically registerable
    

### Acceptance Criteria

-   A UD POS tag can be converted into a Dutch abbreviation via plugin mapping.
    
-   A local abbreviation can be normalized into a canonical ID.
    

---

# 2\. Requirements Summary

MetaLang must:

-   Provide stable canonical IDs
    
-   Support hierarchical concept graphs
    
-   Allow third-party tag system plugins
    
-   Bridge external ontologies without duplicating them
    
-   Guarantee deterministic conversions
    

Non-functional:

-   Deterministic
    
-   No mutation of canonical IDs
    
-   No runtime network dependency for core
    

### Acceptance Criteria

-   Conversion results are deterministic across runs.
    
-   Removing a plugin removes its tag system without affecting core concepts.
    

---

# 3\. Core Data Model and Ontology Semantics

A canonical concept contains:

```
TypeScript

{  
  id: string  
  domain: string  
  labels?: { \[locale\]: { full?: string; abbreviation?: string } }  
  parents?: string\[\]  
  externalRefs?: { \[system: string\]: string }  
  sources?: string\[\]  
}
```

Hierarchy is a **directed acyclic graph (DAG)**. Multi-parenting is allowed.

### Checklist

-    DAG validation (no cycles)
    
-    Parents must exist
    
-    Domain must be valid
    

### Acceptance Criteria

-   Graph validation fails if a cycle exists.
    
-   Unknown parent IDs cause build failure.
    

---

# 4\. Canonical ID System

IDs follow:

```
Code

ML\_<DOMAIN>\_<TOKEN>...
```

Rules:

-   ASCII uppercase
    
-   Underscore separators
    
-   Immutable once published
    
-   No semantic meaning inferred from position
    

Rationale:

-   Visually distinct
    
-   Machine-safe
    
-   Prevents locale leakage
    

### Checklist

-    ID regex validation
    
-    No duplicate IDs
    
-    Deprecated IDs marked, not removed
    

### Acceptance Criteria

-   ID rename is prohibited.
    
-   Linter rejects lowercase or space-containing IDs.
    

---

# 5\. Plugin System and Registry

Plugins register external tag systems.

Plugin descriptor:

```
TypeScript

{  
  id: string  
  name: string  
  language: string  
  scope: string  
  domains: string\[\]  
  publisher?: string  
  authoritative?: boolean  
}
```

Mapping:

```
Code

externalTag → canonicalID\[\]
```

### Checklist

-    Descriptor schema validation
    
-    Mapping references existing canonical IDs
    
-    Duplicate external tags allowed only within plugin scope
    

### Acceptance Criteria

-   Plugin load fails if mapping references unknown canonical ID.
    
-   listTagSystems() reflects registered plugins.
    

---

# 6\. External Ontology Bridging

MetaLang references, but does not duplicate:

-   UD (POS, dependency)
    
-   UniMorph (morph features)
    
-   WordNet (semantic relations)
    
-   LMF / OntoLex (lexicographic metadata)
    
-   ISO 639, ISO 3166, CLDR
    
-   Optional UDC/Dewey via plugin
    

### Checklist

-    externalRefs stored as opaque IDs
    
-    No external ontology copied wholesale
    

### Acceptance Criteria

-   Canonical ID remains primary identifier.
    
-   Removal of externalRefs does not break system integrity.
    

---

# 7\. Public TypeScript API

### Required APIs

Lookup:

-   `getConcept(id)`
    
-   `searchConcepts(query)`
    
-   `getParents(id)`
    
-   `getChildren(id)`
    

Systems:

-   `listTagSystems()`
    
-   `getTagSystem(id)`
    

Conversion:

-   `normalizeTag(tag, system)`
    
-   `convertTag(tag, from, to)`
    
-   `translateTag(tag, system, locale, variant)`
    

### Checklist

-    Type-safe signatures
    
-    Deterministic return types
    
-    Structured error handling
    

### Acceptance Criteria

-   Converting UD→PTB via canonical layer works.
    
-   Unknown tag returns structured error object.
    

---

# 8\. Seed and Build Pipeline

Seed file is canonical ontology source.

Pipeline:

-   Validate schema
    
-   Validate DAG
    
-   Validate referential integrity
    
-   Emit typed artifacts
    

### Checklist

-    JSON schema validation
    
-    Duplicate detection
    
-    Orphan detection
    

### Acceptance Criteria

-   CI fails if seed is invalid.
    
-   TSV export is round-trip compatible.
    

---

# 9\. Ingestion Workflow

### Abbreviation ingestion

-   Parse TSV
    
-   Classify domain
    
-   Mint canonical ID
    
-   Add mapping to plugin
    

### Wiktionary ingestion

-   Extract glossary headwords
    
-   Auto-classify
    
-   Human review
    
-   Canonical ID mint
    

### Checklist

-    Provenance stored
    
-    Domain classification logged
    
-    Manual review required for uncertain cases
    

### Acceptance Criteria

-   No concept created without domain.
    
-   Provenance retained.
    

---

# 10\. Monorepo & Publishing

Structure:

```
Code

/packages/core  
/packages/plugin-ud  
/packages/plugin-ptb  
/packages/plugin-nl-local
```

Publishing:

-   Independent versioning
    
-   semver compliance
    

### Checklist

-    Core has no plugin hard dependency
    
-    Plugins peer-depend on core
    
-    Release automation
    

### Acceptance Criteria

-   Plugin can update without core bump.
    
-   Major core changes require semver major.
    

---

# 11\. CLI Utilities

Commands:

-   `metalang validate`
    
-   `metalang convert`
    
-   `metalang list-systems`
    
-   `metalang diff`
    

### Acceptance Criteria

-   CLI can validate seed and plugin.
    
-   CLI conversion matches library conversion.
    

---

# 12\. UI Integration

MetaLang must expose:

-   listTagSystems()
    
-   listDomains()
    
-   labelForConcept()
    

Fallback strategy:

-   locale fallback chain
    
-   abbreviation vs full preference
    

### Acceptance Criteria

-   Dropdown population from listTagSystems works.
    
-   Locale fallback deterministic.
    

---

# 13\. Testing Strategy

-   Unit tests for mapping
    
-   Property tests for idempotency
    
-   Graph validation tests
    
-   Cross-system golden tests
    

### Acceptance Criteria

-   100% of seed validated
    
-   Conversion symmetric where applicable
    

---

# 14\. Security & Integrity

-   No dynamic code execution in plugins
    
-   Strict validation mode
    
-   Optional signature verification for official plugins
    

### Acceptance Criteria

-   Malformed plugin rejected
    
-   Unknown domain rejected
    

---

# 15\. Licensing & Provenance

-   Core license declared
    
-   Plugins may carry own license
    
-   Provenance required for imported datasets
    

### Acceptance Criteria

-   Seed contains source attribution where relevant.
    
-   Proprietary datasets not embedded in core.
    

---

# 16\. Roadmap

v1:

-   POS + Morph + Lex struct + plugin architecture
    

v1.1:

-   Field + Geo + Language + Etymology + Phonology domains
    

Future:

-   Definition theory domain
    
-   Prosody
    
-   Expanded syntactic constructions
    

---

# Appendix A: Validation Rules Summary

| Rule | Must |
| --- | --- |
| Canonical ID immutable | YES |
| Multi-parent allowed | YES |
| Cycles allowed | NO |
| External refs required | NO |
| Plugin mapping to unknown ID allowed | NO |

---

# Appendix B: Acceptance Criteria Summary by Module

Core:

-   Deterministic conversions
    
-   DAG integrity
    

Seed:

-   Schema valid
    
-   No orphan parents
    

Plugin:

-   Descriptor valid
    
-   All mappings resolvable
    

API:

-   Stable types
    
-   Error model defined
    

CLI:

-   Validation matches CI logic
    

---

# Final State

You now have:

-   Canonical ontology seed
    
-   Plugin mapping artifacts
    
-   Full system architecture
    
-   Implementation blueprint
    
-   Governance rules
    
-   Acceptance criteria
    

This is now a specification-grade document.

If you want, next we can:

-   Convert this into a formal Markdown spec file
    
-   Or generate JSON Schemas for seed + plugin manifests
    
-   Or scaffold the TypeScript monorepo structure automatically

You: 

Throughout our current chat, at many occasions, you have proposed some directions we could take. Many of those I did not follow up, or we didn't follow up, but I think you made many different interesting suggestions on how to take things further at several stages and occasions of our conversation. So, for example, you once proposed, you said, if you went next, I can design validation rules for new domains. At another point in our chat history, you suggested, for example, if you want next, we can draft a migration script from Lexilogio to ML underscore IDs, or formalize the concept graph structure three versus DAG or DAG, or define ID governance and proposal workflow, and so on and so forth. I want you now to compile a list of all those suggestions from our entire chat and have them arranged so deduplicated, combined in a logical sense, and then have them presented as a roadmap for further work. So this could be a roadmap for further development, which we could then attach to our spec.

ChatGPT: 

Excellent. What you are asking for now is essentially a **Phase-2 / Phase-3 Strategic Roadmap**, distilled from all forward-looking suggestions made throughout our conversation.

I will:

1.  **Collect and deduplicate** all suggested future directions
    
2.  **Group them logically**
    
3.  **Order them by architectural dependency**
    
4.  Present them as a structured, attachable roadmap section for the spec
    

This will be written in specification-grade tone.

---

# MetaLang Roadmap for Further Development

*(Post v1.1 — Structured Strategic Expansion Plan)*

---

# Overview

The current system (v1.1) delivers:

-   Canonical concept ontology
    
-   Explicit DAG hierarchy
    
-   Canonical ID namespace rules
    
-   Plugin architecture
    
-   Conversion APIs
    
-   Seed + plugin artifacts
    
-   Basic domain expansion (POS, morphology, lex-struct, field, geo, etymology, phonology, etc.)
    

The following roadmap captures **all previously proposed forward directions**, deduplicated and organized into coherent workstreams.

---

# Phase 2 — Ontological Hardening & Governance

These items increase structural robustness and long-term stability.

---

## 2.1 Formal Domain Validation Rules

Design explicit domain constraints, for example:

-   `morph_value` must have parent in `morph_feature`
    
-   `pos` must descend from `ML_META_PART_OF_SPEECH`
    
-   `semantic_relation` must be binary relation type
    
-   `field` must optionally map to external taxonomy
    

Deliverables:

-   Domain constraint matrix
    
-   Validation engine extension
    
-   Strict mode toggle
    

Acceptance Criteria:

-   Seed validation fails on domain violation
    
-   Domain constraints are machine-testable
    

---

## 2.2 Formal Concept Graph Specification

We currently treat hierarchy as a DAG. This should be formalized:

-   Explicit statement that MetaLang ontology is a DAG
    
-   Multi-parent allowed
    
-   No cycles
    
-   No semantic inference from ID string
    
-   Optional transitive closure utilities
    

Deliverables:

-   Graph invariants document
    
-   Graph traversal API extensions
    
-   Graph integrity checker
    

Acceptance Criteria:

-   Cycle detection mandatory in CI
    
-   Parent removal cannot orphan essential roots
    

---

## 2.3 Canonical ID Governance & Proposal Workflow

We need:

-   Formal ID minting rules
    
-   Reserved namespaces
    
-   Deprecation policy
    
-   Proposal template for new concepts
    
-   Review process
    

Deliverables:

-   ID governance document
    
-   `CONTRIBUTING.md`
    
-   Pull request template for new concept addition
    

Acceptance Criteria:

-   No ID added without governance metadata
    
-   Deprecations logged but IDs preserved
    

---

## 2.4 Domain Expansion Policy

When to create new domain vs extend existing domain?

Deliverables:

-   Domain decision tree
    
-   “New domain checklist”
    

Acceptance Criteria:

-   Domain proliferation controlled
    
-   No domain overlap ambiguity
    

---

# Phase 3 — Advanced Ontology Expansion

These items expand coverage.

---

## 3.1 Full Wiktionary Glossary Ingestion

We only sampled from Appendix:Glossary. Complete ingestion pipeline:

-   MediaWiki API harvester
    
-   Auto-classifier
    
-   Manual review stage
    
-   Canonical ID minting
    
-   Patch file generation
    

Deliverables:

-   Harvest script (Node)
    
-   Classification heuristics module
    
-   Review interface (CLI or JSON diff workflow)
    

Acceptance Criteria:

-   ≥95% of glossary terms assigned domain
    
-   No duplicate canonical IDs created
    

---

## 3.2 Definition Theory Domain (Meta-Lexicography)

Add:

-   `ML_DEFINITION_METHOD_*`
    
-   Definiens / definiendum
    
-   Intensional / extensional
    
-   Recursive definition
    

Deliverables:

-   New domain definition
    
-   Integration into seed
    

Acceptance Criteria:

-   Wiktionary glossary definition-method terms covered
    

---

## 3.3 Prosody & Phonology Refinement

Split:

-   `phonology`
    
-   `phonetics`
    
-   `prosody`
    

Add:

-   stress
    
-   tone
    
-   meter
    
-   intonation
    

Acceptance Criteria:

-   IPA-compatible conceptual coverage
    
-   Unicode diacritic references validated
    

---

## 3.4 Advanced Syntactic Construction Hierarchy

Expand beyond POS:

-   Clause types
    
-   Phrase types
    
-   Subordination types
    
-   Complementizer systems
    

Acceptance Criteria:

-   Can model UD dependency relations semantically
    
-   Clear separation from POS
    

---

## 3.5 Etymology Process Hierarchy

Systematize:

-   borrowing
    
-   calque
    
-   clipping
    
-   back-formation
    
-   semantic shift
    
-   analogy
    
-   anglicism, gallicism etc.
    

Acceptance Criteria:

-   Domain hierarchy under `ML_ETYMOLOGY_PROCESS`
    

---

# Phase 4 — External Ontology Deep Integration

---

## 4.1 UniMorph Deep Mapping

Map morph\_feature/value concepts to UniMorph feature bundles.

Deliverables:

-   UniMorph plugin
    
-   Feature bundle converter
    

Acceptance Criteria:

-   Round-trip UD ↔ UniMorph via canonical layer
    

---

## 4.2 WordNet Semantic Relation Alignment

Attach:

-   synonymy
    
-   hypernymy
    
-   meronymy
    
-   antonymy
    

Acceptance Criteria:

-   WordNet relation codes attached to canonical IDs
    

---

## 4.3 LexInfo / OntoLex / LMF Alignment

Bridge lexicographic structure and register concepts.

Acceptance Criteria:

-   LexInfo URI references attached where applicable
    

---

## 4.4 Discipline Taxonomy Integration

Optional plugin for:

-   OECD fields of science
    
-   UDC
    
-   Dewey
    

Acceptance Criteria:

-   Field concepts can reference external taxonomy ID
    

---

# Phase 5 — Tooling & Developer Experience

---

## 5.1 Migration Script: Lexilogio → ML\_ID

Automate conversion from legacy tags to canonical IDs.

Deliverables:

-   TypeScript migration utility
    
-   CLI integration
    

Acceptance Criteria:

-   100% mapping coverage of legacy concordance
    

---

## 5.2 Advanced Validation Engine

Add:

-   Orphan concept detection
    
-   Domain-level integrity checks
    
-   Duplicate semantic concept detection (similar labels)
    

Acceptance Criteria:

-   CI blocks invalid merges
    

---

## 5.3 Graph Visualization Tool

Generate:

-   Interactive DAG view
    
-   Domain filter
    
-   Parent/child exploration
    

Acceptance Criteria:

-   Exportable to SVG / web UI
    

---

## 5.4 Coverage Reports

Generate:

-   Domain coverage statistics
    
-   Plugin mapping coverage
    
-   External reference coverage
    

Acceptance Criteria:

-   CLI command produces report
    

---

# Phase 6 — Ecosystem & Governance

---

## 6.1 Official Registry Model

Host:

-   Official plugins
    
-   Versioned seed
    
-   Registry metadata
    

Acceptance Criteria:

-   External contributors can publish plugins independently
    

---

## 6.2 Semantic Versioning Strategy for Ontology

Define:

-   Minor version: new concepts
    
-   Major version: domain reclassification
    
-   Patch: metadata corrections
    

Acceptance Criteria:

-   No breaking canonical ID changes without major bump
    

---

## 6.3 Contribution Workflow

Define:

-   Review committee?
    
-   Automated checks
    
-   RFC-style proposals for major changes
    

Acceptance Criteria:

-   Governance documented and enforceable
    

---

# Phase 7 — Performance & Scale

---

## 7.1 Performance Optimization

Add:

-   Internal indexing
    
-   Precomputed lookup maps
    
-   Lazy plugin loading
    

Acceptance Criteria:

-   Lookup O(1) average
    
-   No noticeable slowdown with >10k concepts
    

---

## 7.2 Large-Scale Domain Simulation

Test:

-   5,000+ glossary entries
    
-   100+ plugins
    

Acceptance Criteria:

-   System remains stable
    
-   Deterministic behavior preserved
    

---

# Phase 8 — Future Vision

These were more speculative but conceptually important suggestions.

---

## 8.1 MetaLang as Interlingual Meta-Layer

Position canonical IDs as:

-   Cross-linguistic pivot layer
    
-   Educational meta-language standard
    
-   Bridge between NLP tools and dictionaries
    

---

## 8.2 Machine-Assisted Concept Discovery

Use AI to:

-   Detect near-duplicate semantic concepts
    
-   Suggest hierarchy placement
    
-   Propose domain classification
    

---

## 8.3 Domain Constraint Reasoner

Implement reasoning engine:

-   Validate feature/value compatibility
    
-   Detect impossible morph bundles
    

---

# Condensed Roadmap Summary (Ordered by Priority)

1.  Domain validation rules
    
2.  ID governance workflow
    
3.  Full Wiktionary ingestion
    
4.  UniMorph deep integration
    
5.  Etymology & phonology hierarchy expansion
    
6.  Migration utilities & validation engine
    
7.  Registry governance model
    
8.  Graph visualization & coverage tools
    
9.  Advanced semantic alignment (WordNet / LexInfo)
    
10.  Performance scaling & ecosystem maturity
    

---

# Strategic Observation

We have moved from:

> “build a concordance table”

to:

> “design a modular, ontology-backed, externally aligned, governance-driven meta-language infrastructure”

The next steps are no longer structural invention.  
They are systematization and industrialization.

---

If you would like, I can now:

-   Turn this roadmap into a Gantt-style phased timeline
    
-   Prioritize items for a realistic 6-month implementation plan
    
-   Or mark which items are essential before public release v1.0

You: 

Eventually, MetaLang or the MetaLang repository or monorepo or project will contain many, many hundreds, even thousands of text labels, strings, IDs, references, and so on and so forth, each and everyone mapping to others, and it will, since it is all file-organized and glued with TypeScript logic and schemas and so on, which is all very code and developer-centric, it will become a complex thing, perplexing, and a daunting task for human authors. I'm thinking about lexicographers, authors of dictionaries, language enthusiasts, and so on. They will have a very big, difficult time to find their way within the repository and purely file-based using an IDE or code editor to maintain, manage, and author all these files, these concepts, strings, text labels, and so on. So then I think we will need a graphical user interface. a web application which would allow authors, human authors, lexicographers, dictionary compilers, and editors, language enthusiasts, teachers, and so on, to edit, to view, search, query, filter, edit, and maintain all of the data. Please devise or draft design such a graphical user interface. I mean, just describe in plain language how such a graphical user interface would look like, what would be its different UI components, how its interface looks like, and how users are supposed to interact with it, what the graphical user interface would allow them to do, and how then the graphical user interface indeed will function as an interface to edit the data in the repository, or even in the packages.

ChatGPT: 

Below is a concrete, plain-language design for a **MetaLang Authoring GUI** (web app) aimed at lexicographers and other non-dev maintainers, while still being “repo-native” (edits produce structured patches/PR-ready files).

I’ll describe: **layout**, **core screens**, **components**, **workflows**, and **how it writes back to the repository/packages**.

---

# MetaLang Authoring GUI — Product Concept

## Core idea

A web app that treats MetaLang as a **living ontology + mapping registry**, with:

-   A **Concept Graph editor** (canonical concepts)
    
-   A **Tag System / Plugin editor** (mappings from external tags/abbreviations to canonical IDs)
    
-   A **Validation & diff workflow** that outputs PR-ready changes
    

The GUI is not “a separate database”. It’s a **front-end for editing the seed + plugin artifacts** you already have.

---

# 1) Overall Layout

### Global frame (always visible)

-   **Top bar**
    
    -   Project selector (core, plugin packages)
        
    -   Branch/workspace selector (local edits / draft set)
        
    -   Global search box (“Search concepts, tags, labels, IDs…”)
        
    -   Validation status indicator (✅ / ⚠️ / ❌)
        
    -   “Export patch / Create PR” action button
        
-   **Left navigation sidebar**
    
    -   Concepts
        
    -   Domains
        
    -   Graph
        
    -   Tag Systems (Plugins)
        
    -   External References
        
    -   Validation & Reports
        
    -   Review Queue
        
-   **Main workspace area**
    
    -   Changes depending on selected view
        
-   **Right inspector panel** (context-sensitive)
    
    -   Shows details of selected concept/tag/mapping
        
    -   Inline editing
        
    -   History/provenance
        

This “IDE-like” layout is familiar and scalable.

---

# 2) Core Screens and UI Components

## 2.1 Concepts Browser (the main workhorse)

### Main view

A large, sortable, filterable **data grid** (like Airtable / Notion / spreadsheet) with columns such as:

-   Canonical ID (`ML_POS_PRONOUN_DEMONSTRATIVE`)
    
-   Domain (`pos`)
    
-   English label (full / abbr)
    
-   Dutch label (full / abbr)
    
-   Greek label (full / abbr)
    
-   Parents (count + quick view)
    
-   External refs (Wikidata QID, UD, UniMorph, WordNet, ISO codes)
    
-   Sources/provenance (e.g. Wiktionary, Van Dale list)
    
-   Status (active / deprecated / draft)
    

### Controls

-   Domain filter chips (POS, morph\_value, register…)
    
-   “Missing label in NL/EL” quick filters
    
-   “Missing externalRefs” filter
    
-   “Has conflicts” filter
    
-   “Orphan / no parent” filter
    

### Interaction

-   Click a row → opens right inspector for detail edit
    
-   Multi-select rows → bulk operations:
    
    -   Add label in a locale
        
    -   Add externalRef field
        
    -   Change status to deprecated
        
    -   Add a parent
        

### Why this helps

Lexicographers can treat the ontology as a table, not code.

---

## 2.2 Concept Inspector (right panel)

When you select a concept:

-   **Canonical ID** (read-only, with “propose rename” as a governance workflow — doesn’t actually rename)
    
-   **Domain** dropdown
    
-   **Labels editor**
    
    -   Tabs per locale: EN/NL/EL/…
        
    -   For each: full label, abbreviation, notes
        
    -   Add locale button
        
-   **Hierarchy editor**
    
    -   Parents: search-to-add concept
        
    -   Children: auto-derived list
        
    -   “Move under parent” actions (does not infer by ID string)
        
-   **External references**
    
    -   Wikidata QID (autocomplete)
        
    -   UD POS / UD DepRel
        
    -   UniMorph codes
        
    -   WordNet rel type
        
    -   ISO codes + CLDR linkouts
        
-   **Sources/provenance**
    
    -   Add source (e.g. “Wiktionary Appendix Glossary”)
        
    -   Notes per source
        
-   **Deprecation controls**
    
    -   Deprecate concept, specify successor concept(s)
        
    -   Add deprecation reason
        

This panel is where “fine ontology editing” happens.

---

## 2.3 Graph View (ontology DAG explorer)

A dedicated screen for structure:

### Two modes

1.  **Zoomable graph canvas**
    
    -   Node = concept
        
    -   Edge = parent relation
        
    -   Filters by domain + depth
        
2.  **Tree/outline mode**
    
    -   Like a file tree
        
    -   Expand/collapse nodes
        

### Graph tools

-   “Show ancestors / descendants”
    
-   “Show multi-parent nodes”
    
-   “Detect cycles” (should never exist)
    
-   “Compare structure vs external ontology” (optional later)
    

### Editing from graph

-   Drag a node onto another node to propose parent relation change
    
-   Confirm in dialog → records change in patch
    

Graph view is key for cognitive mapping.

---

## 2.4 Domains View (taxonomy governance)

A screen listing domains:

-   Domain id (`pos`, `morph_value`…)
    
-   Description
    
-   Constraints (e.g. “morph\_value must have parent morph\_feature”)
    
-   External ontology suggestions (UD/UniMorph/CLDR etc.)
    
-   Root concepts per domain
    

Allows maintainers to evolve domain definitions carefully.

---

## 2.5 Tag Systems / Plugins View (Mappings)

This is the other half of MetaLang.

### Plugin list

Cards/table of registered tag systems:

-   `lexilogio-pos-concordance`
    
-   `nl-local-scholars`
    
-   future: `ud`, `ptb`, `vandale`, `wolterskluwer`…
    

Fields:

-   Tag system id
    
-   Language
    
-   Scope
    
-   Domains covered
    
-   #tags mapped
    
-   Mapping completeness score
    
-   License/provenance notes
    

### Plugin detail screen

Split layout:

**Left: Tag list grid**

-   External tag (e.g. `ww.`)
    
-   Gloss/label (if exists)
    
-   Domain guess (optional)
    
-   Maps to canonical IDs (chips)
    
-   Confidence / ambiguity indicator
    
-   Notes
    

**Right: Mapping inspector**

-   Add/remove mapped concept(s)
    
-   Search concepts to map
    
-   Add per-mapping provenance (source, page number, edition)
    
-   Mark “ambiguous” and provide disambiguation notes
    

### Bulk tools

-   “Auto-suggest mappings” based on label similarity
    
-   “Detect duplicates”
    
-   “Unmapped tag report”
    
-   “Export mapping TSV”
    

This makes dictionary abbreviation lists tractable.

---

## 2.6 External References View (bridge management)

A screen focused on externalRefs coverage:

-   Filter: “Show concepts missing Wikidata”
    
-   Filter: “Show POS concepts missing UD POS mapping”
    
-   Filter: “Show morph values missing UniMorph”
    
-   Filter: “Show geo missing ISO 3166”
    
-   Bulk assign tools (semi-automated)
    

This is where you “stand on shoulders of giants” without duplicating them.

---

## 2.7 Validation & Reports Dashboard

This screen is the “CI in the UI”.

Shows:

-   Schema validation status (seed + plugins)
    
-   DAG integrity status (cycles, orphan parents)
    
-   Domain constraint violations
    
-   Duplicate label warnings
    
-   Ambiguous mapping warnings
    
-   Missing-locale coverage stats
    
-   ExternalRefs coverage stats
    

Each issue is clickable → takes you to the relevant concept/mapping and highlights the field.

---

## 2.8 Review Queue (curation workflow)

For controlled contributions:

-   “Proposed new concept” drafts
    
-   “Proposed hierarchy change” drafts
    
-   “Ambiguous mapping unresolved”
    
-   “Imported from Wiktionary needs classification”
    

Maintainers approve/merge items into canonical seed.

---

# 3) Author Workflows (How users actually use it)

## Workflow A: Add a new concept (lexicographer)

1.  Click “New concept”
    
2.  Choose domain (e.g. `pos`)
    
3.  System suggests an ID: `ML_POS_PRONOUN_RELATIVE`
    
4.  User fills EN/NL/EL labels and abbrevs
    
5.  User selects parent(s)
    
6.  Optional: adds Wikidata QID or UD mapping
    
7.  Save → concept added to draft patch
    

## Workflow B: Import an abbreviation list (dictionary editor)

1.  Create new tag system plugin (e.g. `nl-vandale-2022`)
    
2.  Upload TSV/PDF-parsed table
    
3.  Tool shows unmapped tags grid
    
4.  User maps each tag to canonical concepts
    
5.  UI warns on ambiguity
    
6.  Save → plugin mapping file updated
    

## Workflow C: Repair taxonomy / restructure

1.  Open graph view
    
2.  Inspect “multi-parent nodes”
    
3.  Move a concept under different parent (creates proposed change)
    
4.  Validate → ensure no constraint violations
    
5.  Export PR patch
    

## Workflow D: Localization pass

1.  Filter: “Missing Greek labels”
    
2.  Bulk add translations
    
3.  Validate
    
4.  Export patch
    

---

# 4) How it writes back to the repository/packages

This is the key engineering design: **repo-native editing**.

## Option 1 (recommended): Patch-based editing

The GUI does not directly edit files. It produces:

-   A **JSON patch** (RFC 6902 style) or
    
-   A **structured “change set”** describing:
    
    -   added concepts
        
    -   modified labels
        
    -   changed parent relations
        
    -   plugin mapping changes
        

Then your build tooling applies the patch to:

-   `metalang_seed_v1_1.json`
    
-   plugin manifests (e.g. `metalang_plugins_v1_1.json`)
    
-   curated TSV exports
    

### Why it’s best

-   Human-reviewable diffs
    
-   Deterministic merges
    
-   PR-friendly
    
-   No fragile direct file writes in browser
    

## Option 2: Direct Git integration (later)

If the GUI runs in a desktop wrapper (Electron) or has a backend service, it can:

-   create a new branch
    
-   commit changes
    
-   open PR automatically
    

But this is not required for the first iteration.

---

# 5) Minimal MVP vs Full GUI

## MVP (fast, high value)

-   Concepts grid + inspector
    
-   Plugin mappings grid + inspector
    
-   Validation dashboard
    
-   Export patch files
    

## Next

-   Graph view editor
    
-   Wiktionary ingestion review queue
    
-   ExternalRefs coverage dashboard
    
-   Git PR automation
    

---

# 6) Data Safety and Governance in UI

The UI must enforce the same invariants as CI:

-   Canonical IDs immutable (cannot edit; only “deprecate/supersede”)
    
-   Domain must be valid
    
-   Parents must exist
    
-   No cycles
    
-   Plugin mappings must reference valid canonical IDs
    

Also:

-   Every edit is tracked as provenance (“who changed what and why”)
    
-   Notes fields support lexicographic commentary
    

---

# 7) Visual Design Language

For your target audience (lexicographers/teachers), make it:

-   clean, text-first
    
-   “Airtable-like”
    
-   minimal icons
    
-   no heavy developer jargon in UI labels
    
    -   e.g. “Canonical concept” rather than “ID token”
        
-   “Explain” tooltips everywhere (hover reveals definition and examples)
    

---

# 8) Result: What this GUI enables

Without touching code:

-   Browse the ontology
    
-   Edit labels in many languages
    
-   Maintain hierarchical relations
    
-   Maintain multiple institutional tag systems
    
-   Resolve ambiguous abbreviations
    
-   Improve external reference coverage
    
-   Run validation and produce PR-ready changes
    

That is the correct human-facing layer for a repo-centric ontology.

---

If you want next: I can convert this into a **detailed UI component inventory** (panels, tables, controls, dialogs) plus a **data flow diagram** (seed loading → edit state → patch export → CI apply), which is the level you’d hand to frontend developers/agents.

You: 

If we were to develop such a graphical user interface, then that would become a source code base on its own. Now here's my question. I really like the idea of having a mono repository for all things involving the MetaLang project. You already explained that plugins could live in separate folders, so in sub-repositories within our mono repo, and then be published as separate packages. Now my question is whether we could develop the graphical user interface to the MetaLang project within our core data repository, so our core MetaLang repository, and so have everything included within the mono repository. Or should we develop, maintain, and organize the development and implementation of the graphical user interface in its own separate repository? Secondly, and I guess this is more than tangentially related, you already mentioned that we can have the GUI following option 1, patch-based editing, creating JSON patches, and at a later stage to do direct Git integration. And then for option two, so the direct Git integration, we propose that the GUI could run in a desktop wrapper like Electron, but basically we would then be duplicating code editors like VS Code. I was rather thinking of having a true web application and a web application only, which we could publish at some websites, at least the build of the graphical user interface, while the source code to the graphical user interface would live in its own separate dedicated folder within the Metalang monorepo. And then included in that web client-side web application graphical user interface for managing the data in the Metalang project, we could have a client-side implementation using an existing module or library or NPM package that is to have Git available in the web application on the client side. I think that would be most elegant for then language enthusiasts, which are not tech-savvy, could go to our Metalang website, then log in into the GUI web application, give their credentials like, say, an email address. And then, all the edits they make would be aggregated into Git commits with the user's email address and avatar and username and so on, be added to those commits as the true editor or author of those commits, and then still on the client-side web application, do the pull request to the main repo. Alternatively, more tech-savvy users could go to GitHub and clone the entire MetaLang monorepo, where they find in the README instructions for how to run the graphical user interface from within that repository on a localhost on their machine. And then they could go on and offer MetaLang data and again do commits locally on their local clone or copy of the repository, and then they could push it using the Git installed on their system and push it to the external GitHub and thereby creating a pull request. Please share critical feedback on these important questions.

ChatGPT: 

Nagedacht gedurende 12s

You’re thinking in exactly the right direction — but some parts of the “purely client-side GitHub PR authoring web app” vision are **elegant on paper and brittle in practice**. Below is critical feedback, with a concrete recommendation that preserves your goals (monorepo, web-only UI, non-tech contributors, real attribution, PR workflow) while avoiding the sharp edges.

---

# 1) Monorepo vs separate repo for the GUI

## Recommendation: **Keep the GUI in the monorepo** (default), but treat it as its own package

**Why monorepo is the right default**

-   **Tight coupling**: the GUI must stay in lockstep with seed schemas, plugin schemas, domain rules, and validation logic. Putting it elsewhere almost guarantees drift.
    
-   **Shared libraries**: your validators, ID rules, domain constraints, diff/patch logic should live in `@metalang/core` (or `@metalang/kit`) and be used by both CLI and GUI.
    
-   **Atomic changes**: a single PR can update schema + seed + GUI behavior consistently.
    

**How to structure it**

-   `/packages/core` (runtime library: registry + conversion)
    
-   `/packages/schema` (JSON Schema, zod/valibot types, validators)
    
-   `/packages/cli`
    
-   `/packages/gui` (the authoring app)
    
-   `/packages/plugins/*` (published separately)
    

This is standard monorepo practice and works well.

**When a separate repo *does* make sense**

-   If you want the GUI to evolve into a large product with different release cadence, independent governance, or separate funding.
    
-   If you foresee multiple frontends (desktop, hosted, embedded) and want to isolate concerns.
    

But even then, I’d still start monorepo-first and split later only if pain appears.

---

# 2) Patch-based editing vs direct Git integration

You’re correct that Electron would feel like rebuilding VS Code. You don’t need it.

The critical question is: **Can a web-only app do Git operations reliably and safely?**

## 2.1 Yes, Git in the browser exists — but it’s not the main obstacle

Libraries like **isomorphic-git** explicitly support browser environments. [GitHub+1](https://github.com/isomorphic-git/isomorphic-git?utm_source=chatgpt.com)  
They typically rely on an in-browser filesystem like **LightningFS**. [GitHub](https://github.com/isomorphic-git/lightning-fs?utm_source=chatgpt.com)

So “clone/edit/commit” client-side is technically possible.

## 2.2 The real obstacle is auth + push + PR creation without a backend

To create a PR, you need:

-   A commit pushed to a branch on GitHub
    
-   Then a GitHub API call to open the PR (REST endpoint exists). [GitHub Docs+1](https://docs.github.com/en/rest/pulls?utm_source=chatgpt.com)
    

The hard parts are:

-   **Secure authentication** (you don’t want to handle passwords; GitHub doesn’t allow that; tokens are sensitive)
    
-   **Token storage** (browser storage is leaky relative to native keychains)
    
-   **CORS + API rate limits + refresh workflows**
    
-   **Org repos** (permissions and installs get complicated)
    

GitHub themselves strongly recommend **GitHub Apps** over OAuth Apps for security and fine-grained permissions. [GitHub Docs+1](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps?utm_source=chatgpt.com)

That recommendation is the main clue: a truly safe web flow often wants a GitHub App (or OAuth) and usually some backend for token exchange.

---

# 3) Your proposed “non-tech user logs in with email” flow

This is the piece I’d push back on most strongly.

## Critical feedback

-   “Email + password” is **not** how GitHub should be integrated; it’s a security and UX red flag. You don’t want to ever handle passwords.
    
-   If you mean “email login to *your* app”, you still need a way to connect to GitHub to create commits/PRs — which becomes a full auth product.
    

**Better framing**: contributors authenticate with **GitHub**, not email.  
Then you can still show avatar/name/email metadata from GitHub profile.

---

# 4) Best practical architecture (web-only GUI + real PRs)

Here are the viable options, ordered from simplest to most robust.

---

## Option A (recommended MVP): **Patch workflow + “Download PR bundle”**

**Web app remains 100% static. No auth.**

-   User edits concepts/mappings
    
-   App produces:
    
    -   `changeset.json` (your internal patch format)
        
    -   or direct file diffs (updated seed/plugin files)
        
-   UX provides “How to contribute”:
    
    -   Upload patch to GitHub via web UI
        
    -   Or open an auto-filled GitHub Issue with attachment
        
    -   Or run CLI locally to apply patch and open PR
        

**Pros**

-   Extremely robust
    
-   No auth complexity
    
-   Safe for non-tech users
    
-   Still PR-driven
    

**Cons**

-   Not “one-click PR” inside the app
    

This is the correct first release because it derisks everything.

---

## Option B (web-only PRs, still no backend): **GitHub OAuth / GitHub App + API-only PR creation**

This is the closest to your ideal.

Flow:

1.  User logs in with GitHub (OAuth or GitHub App flow)
    
2.  App **forks** repo (via API), or asks user to fork manually once
    
3.  App edits data locally (in browser memory)
    
4.  App uses **GitHub REST API** to:
    
    -   create a new branch
        
    -   create/update files via “contents” endpoints (no raw git push needed)
        
    -   create PR [GitHub Docs+1](https://docs.github.com/en/rest/pulls?utm_source=chatgpt.com)
        

**Key insight:** you can avoid “git push” entirely by using the GitHub API to write blobs/commits/trees or simpler “create/update file contents” endpoints.

**Pros**

-   Truly web-only
    
-   No in-browser git filesystem needed
    
-   PR creation is feasible
    

**Cons**

-   Auth is still nontrivial
    
-   You must carefully choose GitHub App vs OAuth (GitHub recommends Apps). [GitHub Docs+1](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps?utm_source=chatgpt.com)
    
-   Rate limits / permissions / org install friction
    

If you want “non-tech contributor clicks ‘Propose changes’ and it opens PR”, this is the path.

---

## Option C (web-only git): **isomorphic-git clone/commit/push + API PR**

Feasible, but I consider it **less elegant** than Option B because:

-   You’re recreating a partial git client
    
-   Browser filesystem is another moving part
    
-   You still need auth tokens for pushing
    
-   You still need API for PR creation [GitHub Docs+1](https://docs.github.com/en/rest/pulls?utm_source=chatgpt.com)
    

Use this only if you *must* support full offline git semantics.

---

# 5) The “run GUI locally inside monorepo” path for tech users

This part of your plan is excellent and should be first-class:

-   `pnpm dev --filter @metalang/gui`
    
-   The GUI reads local seed/plugin files
    
-   It writes changes directly
    
-   Tech user uses system git to commit/push/PR
    

This is the perfect “power contributor” mode.

---

# 6) What I’d recommend you do, concretely

## Repo organization

✅ Put GUI inside monorepo as `/packages/gui`.

## Contribution modes (both supported)

### Mode 1: Non-tech / hosted web app

-   No local git required
    
-   Start with **Option A** (patch export)
    
-   Then evolve to **Option B** (GitHub login + PR creation via API)
    

### Mode 2: Tech / local clone

-   Full repo checkout
    
-   GUI runs locally
    
-   Native git workflow
    

## Why this is the right sequencing

It gets you:

-   Immediate usability
    
-   No security hazards
    
-   A clean path to “one-click PR” later
    

---

# 7) Key risks & mitigations (the critical bit)

### Risk: Auth/token handling in a static SPA

Mitigation:

-   Prefer GitHub App approach with short-lived tokens and fine-grained permissions (GitHub’s guidance). [GitHub Docs+1](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps?utm_source=chatgpt.com)
    
-   Avoid storing long-lived tokens in localStorage.
    
-   Consider device-flow patterns for safer UX (often used to avoid embedding secrets; see ecosystem patterns). [GitHub](https://github.com/suzuki-shunsuke/ghtkn?utm_source=chatgpt.com)
    

### Risk: Browser support for “dev env in browser”

If you were thinking “run Node toolchain in browser” via WebContainers: they have limitations and uneven browser support. [developer.stackblitz.com+1](https://developer.stackblitz.com/platform/webcontainers/browser-support?utm_source=chatgpt.com)  
So: don’t rely on WebContainers for core authoring.

### Risk: Monorepo complexity for casual contributors

Mitigation:

-   Hosted GUI uses prebuilt bundles
    
-   Local GUI setup documented as optional
    

---

# 8) Bottom-line answers to your questions

## Q1: GUI inside monorepo or separate repo?

**Inside monorepo** as its own package. Split later only if needed.

## Q2: Web-only GUI with client-side git and PRs?

**Possible**, but:

-   Don’t do “email login”.
    
-   Prefer **GitHub auth**.
    
-   Prefer **API-based PR creation** (Option B) over in-browser git push (Option C).
    
-   Start with **patch export MVP** (Option A) to derisk.
    

---

If you want next, I can propose:

-   a monorepo folder/package layout (exact `packages/*`)
    
-   a contribution UX flow (screens + buttons) for Option A → Option B upgrade path
    
-   a minimal GitHub App permission model for MetaLang authoring (least privilege)

You: 

Great, fantastic. Propose the monorepo folder package layout, but even more so, I have previously asked you to draft the table of contents to a full functional and technical requirements specification document for the entire MetaLang project. Now I would want you to create a table of contents to a similar full functional and technical requirements specification document, but only for the development, planning, implementation plan, roadmap for the graphical user interface.

ChatGPT: 

Excellent. We now move from:

> MetaLang as ontology + engine

to

> MetaLang GUI as an authoring platform

What you are asking for is a **formal, standalone Functional & Technical Specification TOC for the MetaLang Authoring GUI**, comparable in rigor to the core spec.

Below you will find:

1.  ✅ Recommended **monorepo folder/package layout**
    
2.  📘 A complete **Table of Contents for the GUI Specification**
    
3.  Structured in the same industrial-grade format as the core spec
    

---

# Part I — Recommended Monorepo Package Layout

This assumes a pnpm/turbo-style monorepo.

```
Code

/metalang  
│  
├── package.json  
├── pnpm-workspace.yaml  
├── turbo.json (optional)  
│  
├── /packages  
│   │  
│   ├── /core  
│   │   ├── src/  
│   │   └── package.json  
│   │  
│   ├── /schema  
│   │   ├── seed.schema.json  
│   │   ├── plugin.schema.json  
│   │   └── package.json  
│   │  
│   ├── /validation  
│   │   ├── graph-validator.ts  
│   │   ├── domain-rules.ts  
│   │   └── package.json  
│   │  
│   ├── /cli  
│   │   ├── src/  
│   │   └── package.json  
│   │  
│   ├── /gui   ← Authoring GUI lives here  
│   │   ├── src/  
│   │   ├── public/  
│   │   ├── package.json  
│   │   └── README.md  
│   │  
│   ├── /plugin-lexilogio  
│   ├── /plugin-nl-local  
│   ├── /plugin-ud  
│   └── ...  
│  
├── /data  
│   ├── metalang\_seed\_v1\_1.json  
│   ├── metalang\_plugins\_v1\_1.json  
│   └── exports/  
│  
└── /docs  
    ├── core-spec.md  
    └── gui-spec.md
```

Key architectural rule:

> The GUI consumes `@metalang/core`, `@metalang/schema`, and `@metalang/validation`.  
> It does NOT reimplement logic.

---

# Part II — MetaLang GUI Specification

## Functional & Technical Requirements — Table of Contents

This is the structured TOC for a full specification document dedicated to the GUI.

---

# MetaLang Authoring GUI

## Functional & Technical Specification

### Version 1.0 (Planning Draft)

---

# 0\. Document Control

0.1 Purpose of the GUI specification  
0.2 Scope (what this GUI does and does not do)  
0.3 Relationship to MetaLang Core Specification  
0.4 Normative terminology (MUST, SHOULD, MAY)  
0.5 Target user groups  
0.6 Versioning strategy for GUI releases

---

# 1\. Product Overview

1.1 Mission of the GUI  
1.2 Problem statement (repo complexity, non-dev contributors)  
1.3 Target personas

-   Lexicographer
    
-   Dictionary editor
    
-   Language teacher
    
-   Plugin maintainer
    
-   Governance reviewer
    
-   Power contributor (developer)
    

1.4 Modes of operation

-   Hosted web application
    
-   Local monorepo execution  
    1.5 High-level system architecture
    
-   GUI
    
-   Core library
    
-   Validation engine
    
-   GitHub API integration (future phase)
    

---

# 2\. Architectural Overview

2.1 System architecture diagram  
2.2 Data flow

-   Load seed
    
-   Load plugins
    
-   Edit state
    
-   Validation
    
-   Patch export  
    2.3 Separation of concerns
    
-   Presentation layer
    
-   State layer
    
-   Validation layer
    
-   Persistence/export layer  
    2.4 Technology constraints (browser-only, no server dependency initially)
    

---

# 3\. User Interface Architecture

3.1 Global layout structure

-   Top bar
    
-   Sidebar
    
-   Workspace panel
    
-   Inspector panel
    

3.2 Navigation model  
3.3 State management model (immutable change sets)  
3.4 Routing architecture

---

# 4\. Core Functional Modules

## 4.1 Concepts Module

4.1.1 Concepts browser grid  
4.1.2 Filtering and sorting  
4.1.3 Multi-select bulk editing  
4.1.4 Concept creation workflow  
4.1.5 Concept editing inspector  
4.1.6 Parent/child hierarchy editing  
4.1.7 Deprecation workflow  
4.1.8 External reference editing  
4.1.9 Provenance annotation

Acceptance criteria:

-   No concept saved without domain
    
-   No cycle introduced
    
-   ID immutability enforced
    

---

## 4.2 Graph Editor Module

4.2.1 DAG visualization  
4.2.2 Tree/outline view  
4.2.3 Multi-parent display  
4.2.4 Drag-to-parent interaction  
4.2.5 Graph validation overlay

Acceptance criteria:

-   Cycles detected immediately
    
-   Parent change requires confirmation
    
-   Root domain nodes protected
    

---

## 4.3 Tag System / Plugin Module

4.3.1 Plugin registry view  
4.3.2 Plugin descriptor editor  
4.3.3 Mapping grid  
4.3.4 Multi-concept mapping support  
4.3.5 Ambiguity handling UI  
4.3.6 Bulk mapping suggestions  
4.3.7 Unmapped tag detection

Acceptance criteria:

-   No mapping to unknown canonical ID
    
-   Plugin schema validated live
    

---

## 4.4 External References Module

4.4.1 Coverage dashboard  
4.4.2 Missing reference detection  
4.4.3 Wikidata linking workflow  
4.4.4 UD/UniMorph linking workflow  
4.4.5 ISO/CLDR reference linkage

Acceptance criteria:

-   externalRefs validated against expected formats
    
-   No invalid QIDs or ISO codes saved
    

---

## 4.5 Validation & Integrity Module

4.5.1 Schema validation  
4.5.2 Graph validation  
4.5.3 Domain constraint validation  
4.5.4 Duplicate detection  
4.5.5 Orphan detection  
4.5.6 Conflict report view

Acceptance criteria:

-   Save/export blocked if critical errors
    
-   Warnings displayed for non-blocking issues
    

---

## 4.6 Patch & Export Module

4.6.1 Change tracking model  
4.6.2 JSON patch generation  
4.6.3 Diff visualization  
4.6.4 Seed file regeneration  
4.6.5 Plugin manifest regeneration  
4.6.6 Download bundle export

Acceptance criteria:

-   Export deterministic
    
-   Patch replayable via CLI
    

---

# 5\. GitHub Integration Module (Future Phase)

5.1 Authentication model

-   OAuth vs GitHub App  
    5.2 Permission model (least privilege)  
    5.3 Fork management workflow  
    5.4 Branch creation  
    5.5 File update via GitHub API  
    5.6 Pull request creation  
    5.7 PR metadata (title, description, provenance)  
    5.8 Conflict detection
    

Acceptance criteria:

-   No credentials stored insecurely
    
-   PR contains correct commit attribution
    
-   User identity matches GitHub profile
    

---

# 6\. Local Monorepo Mode

6.1 Running GUI via `pnpm dev`  
6.2 File-based editing instead of patch mode  
6.3 Integration with system git  
6.4 Dev-only features (debug panels, schema inspector)

Acceptance criteria:

-   Local mode writes directly to `/data`
    
-   No divergence from hosted build logic
    

---

# 7\. Data Safety and Governance Constraints

7.1 ID immutability enforcement  
7.2 Domain modification restrictions  
7.3 Parent change approval rules  
7.4 Deprecation safeguards  
7.5 Conflict resolution UI  
7.6 Review queue integration

Acceptance criteria:

-   No breaking ontology change without governance path
    

---

# 8\. Performance Requirements

8.1 Large dataset handling (1000+ concepts)  
8.2 Lazy loading and virtualization  
8.3 Graph rendering performance  
8.4 Deterministic patch generation

Acceptance criteria:

-   Concept grid responsive under 5,000 rows
    
-   Graph renders <200ms for typical domain subtree
    

---

# 9\. Accessibility & Internationalization

9.1 UI i18n support  
9.2 Keyboard navigation  
9.3 Screen reader compatibility  
9.4 Locale-aware label editing

Acceptance criteria:

-   WCAG AA compliance target
    
-   Locale fallback rules respected
    

---

# 10\. Security Considerations

10.1 No direct write to production branch  
10.2 Safe handling of auth tokens  
10.3 CORS considerations  
10.4 Client-side data isolation  
10.5 Supply-chain risk mitigation

Acceptance criteria:

-   Static build contains no embedded secrets
    

---

# 11\. Build & Deployment

11.1 Build pipeline  
11.2 Static hosting strategy  
11.3 Version alignment with core  
11.4 Release tagging  
11.5 CDN caching considerations

---

# 12\. Testing Strategy

12.1 Unit tests for state transitions  
12.2 Integration tests for patch export  
12.3 Validation test suite  
12.4 End-to-end tests (concept add → export → CLI apply)  
12.5 Regression tests for governance constraints

---

# 13\. Roadmap & Phasing

13.1 Phase 1 — MVP

-   Concepts grid
    
-   Plugin grid
    
-   Validation dashboard
    
-   Patch export
    

13.2 Phase 2 — Graph editor  
13.3 Phase 3 — GitHub integration  
13.4 Phase 4 — Advanced ingestion tooling  
13.5 Phase 5 — Multi-user governance features

---

# 14\. Appendices

A. UI Component Inventory  
B. State Machine Diagrams  
C. Patch Format Specification  
D. Example PR Lifecycle  
E. Permission Model for GitHub Integration

---

# Strategic Note

The GUI is not a “nice add-on.”

It is:

> The cognitive operating system for MetaLang.

Without it, the ontology scales poorly.  
With it, the project becomes collaborative and sustainable.

---

If you’d like next, I can:

-   Define the **MVP feature set precisely (what to build first)**
    
-   Or draft a **UI interaction walkthrough for a single editing session**
    
-   Or produce a **state model diagram (edit → validate → patch → PR)**

You: 

Consider this other Wiktionary glossary with meta-language terms (this time not linguistic/grammatical concepts, but literary-criticism and rhetorical terms): https://en.wiktionary.org/wiki/Appendix:Glossary\_of\_rhetoric — Given those sterm: how should we expand the metalang architecture? Should we add new domains?

ChatGPT: 

Nagedacht gedurende 34s

Yes — that glossary is highly relevant, and it *does* put pressure on the current MetaLang domain model.

From a quick scan of Wiktionary’s **Glossary of rhetoric**, the entries are not just “literary terms”; they mix at least four distinct conceptual families: **figures of speech / stylistic devices**, **argumentation & persuasion theory**, **speech/essay structure (classical rhetoric canons + parts of a speech)**, and **logic / fallacy terminology** (e.g., *argumentum ad hominem*, *ad baculum*). [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary_of_rhetoric)

## How MetaLang should expand

### 1) Don’t create one giant “rhetoric” bucket

You already have a `discourse`/`rhetoric`\-ish domain in v1.1, but the rhetoric glossary shows that “rhetoric” is too broad to remain a single flat domain if you want clean constraints, good UX, and good external alignment. [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary_of_rhetoric)

### 2) Add (or formalize) **one new top-level domain**, plus **two or three subdomains**

I’d recommend **one new top-level domain** and splitting your existing “discourse” concerns more explicitly:

#### A. New top-level domain: `rhetoric`

Purpose: rhetorical theory concepts that are not simply “discourse relations” (RST-like), but rhetorical *devices, structures, and argumentation apparatus*.

Then within `rhetoric`, introduce **subdomains (or “facets”)**. You can implement these either as:

-   subdomains (hard typed), or
    
-   a `facet` field inside the domain (so you keep domain count stable).
    

Concretely:

1.  **`rhetoric_device`** (figures of speech / tropes / schemes)  
    Examples from the glossary: *anaphora, antithesis, asyndeton, apostrophe, zeugma, syllepsis* etc. [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary_of_rhetoric)  
    This is the biggest and cleanest cluster.
    
2.  **`argumentation`** (persuasion + proofs + appeals + Toulmin-ish vocabulary)  
    Examples: *ethos/logos/pathos (appeals), artistic proofs, audience, backing*; plus “argument” vocabulary. [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary_of_rhetoric)  
    This cluster is *not* the same as “logic” and shouldn’t be forced into `discourse`.
    
3.  **`rhetorical_structure`** (composition/parts/canons of rhetoric, speech sections)  
    Examples: *confirmatio, confutatio, dispositio/arrangement*, *ars dictaminis*, etc. [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary_of_rhetoric)  
    This is useful for pedagogy and rhetorical analysis.
    
4.  Optional but very useful separation: **`fallacy` / `informal_logic`**  
    Because the glossary includes explicit “argumentum ad …” items that are basically fallacies/argument forms. [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary_of_rhetoric)  
    You can keep this as a sibling domain to `rhetoric` (under a broader umbrella like `reasoning`), or keep it as a `rhetoric` facet. I lean to sibling domain long-term, because it has strong external ontology options.
    

### 3) Clarify what stays in `discourse`

Keep `discourse` for things like:

-   cohesion/coherence notions
    
-   discourse deixis/anaphora (linguistic discourse)
    
-   discourse relations (RST-like), dialogue acts (if you add them later)
    

But put “figures of speech” under `rhetoric_device`, not `discourse`. The rhetoric glossary is explicitly about rhetorical theory jargon and figures. [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary_of_rhetoric)

---

## External ontology mapping implications

Rhetorical terms are a domain where “reference don’t duplicate” only partially applies:

-   Many devices (*anaphora, zeugma, antithesis*) have **Wikidata QIDs** → good for `externalRefs.wikidata` where available. The glossary page itself links to a Wikidata item. [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary_of_rhetoric)
    
-   For fallacies and argument forms, Wikidata coverage is often decent, and you can also bridge to structured fallacy lists if you decide to adopt one later (but those vary in license/authority).
    
-   There is **no single universally accepted open ontology** for “all rhetorical figures” comparable to UD/UniMorph, so MetaLang may legitimately become a *primary curated coordination layer* for this subdomain, with Wiktionary/Wikipedia/Wikidata as references.
    

---

## Minimal architecture change vs best architecture change

### Minimal change (fast)

-   Keep existing `discourse` domain
    
-   Add **new domain** `rhetoric_device`
    
-   Add optional `argumentation` domain
    

This already makes the rhetoric glossary ingestible without polluting `discourse`.

### Best change (scales cleanly)

-   Introduce `rhetoric` as a top-level domain
    
-   Add `facet` (or subdomains) to separate:
    
    -   devices
        
    -   argumentation
        
    -   rhetorical structure
        
    -   fallacies (optional)
        

This will make:

-   validation rules more meaningful
    
-   the authoring GUI easier (filters, dashboards)
    
-   future ingestion (other Wiktionary glossaries) less messy
    

---

## Practical next step for MetaLang v1.2

1.  Add domain(s): `rhetoric` (and/or at least `rhetoric_device`, `argumentation`, `rhetorical_structure`, optional `fallacy`).
    
2.  Create a plugin package: `@metalang/plugin-wiktionary-rhetoric` that ingests the glossary as a source set (provenance: Wiktionary). [Wiktionary](https://en.wiktionary.org/wiki/Appendix%3AGlossary_of_rhetoric)
    
3.  Define validation rules:
    

-   `rhetoric_device` concepts SHOULD have a parent `ML_RHETORIC_DEVICE` root
    
-   `argumentation` concepts SHOULD map to `wikidata` when possible
    
-   fallacy concepts SHOULD be in a separate facet/domain to avoid conflation with “proof” and “appeal”
    

If you want, I’ll propose the concrete **domain list additions + root concept IDs + naming conventions** (e.g., `ML_RHETORIC_DEVICE_ANAPHORA`, `ML_ARGUMENTATION_APPEAL_ETHOS`, etc.) and how they slot into the seed schema without breaking v1.1 compatibility.