# Glossary data extraction to TSV
_Exported on 24-2-2026 at 17:39:18 CET from Cursor (2.5.20)_

---

**User**

I want you to create a new .tsv file inside the @data folder, in which you will collect data from https://en.wiktionary.org/wiki/Appendix:Glossary I want you to go through that entire glossary, and for each entry take the term, and take the definition/description, separated by a tab (\t). I want you to also keep as much as possible all the inline styling as found on the Wiktionary html page, but converted to markdown: italics, bold, bold italics, and hyperlinks. If the link points to an anchor/id within the gloassary itself, you will keep that internal link; if the link points to an external resource (Wiktionary or Wikipedia page) then keep that url. The terms themselves (frst column in our tsv) are all linkes; some have even more than one link. Links in the first column (the terms), must be extracted and be put in a third column on our tsv, such that the values of the first column (the terms) remain pure strings. If more than one link is found on the terms, then add them all to the third column in the tsv, as an array of links, separated by a comma. Here is an example of what I expect, using on the Glossary the "adapted borrowing" entry as an example.

Given this input:

```html
<dt><span class="template-anchor" id="adapted_borrowing" data-id="adapted borrowing"></span> <a href="/wiki/adapt" title="adapt">adapted</a> <a href="/wiki/borrowing" title="borrowing">borrowing</a></dt>
<dd>A <a href="#loanword">loanword</a> formed with the addition of an <a href="/wiki/affix" title="affix">affix</a> to conform the term to the normal <a href="/wiki/morphology" title="morphology">morphology</a> of the <a href="/wiki/language" title="language">language</a>, e.g. Polish <i class="Latn mention" lang="pl"><a href="/wiki/normatywny#Polish" title="normatywny">normatywny</a></i>, borrowed from French <i class="Latn mention" lang="fr"><a href="/wiki/normatif#French" title="normatif">normatif</a></i> and adapted with Polish <i class="Latn mention nowrap" lang="pl"><a href="/wiki/-ny#Polish" title="-ny">-ny</a></i>.</dd>
<dd>Contrast <a href="#unadapted_borrowing">unadapted borrowings</a>.</dd>
```
I expect returned:

```tsv
adapted borrowing	    A [loanword](#loanword) formed with the addition of an [affix](https://en.wiktionary.org/wiki/affix) to conform the term to the normal [morphology](https://en.wiktionary.org/wiki/morphology) of the [language](https://en.wiktionary.org/wiki/language), e.g. Polish [_normatywny_](https://en.wiktionary.org/wiki/normatywny#Polish), borrowed from French [_normatif_](https://en.wiktionary.org/wiki/normatif#French) and adapted with Polish [_-ny_](https://en.wiktionary.org/wiki/-ny#Polish). / Contrast [unadapted borrowings](#unadapted_borrowing).	https://en.wiktionary.org/wiki/adapt, https://en.wiktionary.org/wiki/borrowing
```


---

**Cursor**


Fetching the Wiktionary Glossary page and parsing it to produce the TSV file.



Fetching the raw HTML to parse the structure and extract internal vs external links.



Creating a Python script to parse the glossary and generate the TSV file.



Fixing dd collection: we should stop at the next dt.



Updating `html_to_markdown` to handle italics inside links (e.g. `[_normatywny_](url)`):



Fixing link handling when an <a> is the root element being processed:



Avoiding double-wrapping when <i> contains only an <a>:



Running the script and verifying the "adapted borrowing" entry:



Verifying a few more entries and checking edge cases:



Fixing two issues: stripping the Wikipedia interproject box from terms, and correcting bold+link handling.



The file is created. Summary:

## Created: `/Users/woutersoudan/Desktop/metalang/data/wiktionary_glossary.tsv`

**Format:** 3 columns, tab-separated:
1. **term** – Plain text (no links)
2. **definition** – Markdown with:
   - Internal links: `[text](#anchor_id)`
   - External links: `[text](https://en.wiktionary.org/wiki/...)` or `[text](https://en.wikipedia.org/wiki/...)`
   - Italics: `_text_`
   - Bold: `**text**`
   - Italics inside links: `[_normatywny_](url)`
3. **term_links** – Comma-separated URLs for all links in the term (empty if none)

**Stats:** 611 entries from the Wiktionary Appendix:Glossary.

**Example (adapted borrowing):**
```
adapted borrowing	A [loanword](#loanword) formed with the addition of an [affix](https://en.wiktionary.org/wiki/affix) to conform the term to the normal [morphology](https://en.wiktionary.org/wiki/morphology) of the [language](https://en.wiktionary.org/wiki/language), e.g. Polish [_normatywny_](https://en.wiktionary.org/wiki/normatywny#Polish), borrowed from French [_normatif_](https://en.wiktionary.org/wiki/normatif#French) and adapted with Polish [_-ny_](https://en.wiktionary.org/wiki/-ny#Polish). / Contrast [unadapted borrowings](#unadapted_borrowing).	https://en.wiktionary.org/wiki/adapt, https://en.wiktionary.org/wiki/borrowing
```

**Script:** `scripts/extract_wiktionary_glossary.py` – fetches the glossary and regenerates the TSV. Requires `beautifulsoup4` (`pip install beautifulsoup4`). Run with:
```bash
python3 scripts/extract_wiktionary_glossary.py
```

---

**User**

I have renamed the file to ``Q31178539_wiktionary_glossary_en.tsv`thereby encoding that the data contained in the file pertains to a globally unique WikiData concept (Q31178539), *and* that it is the English-version (en). 

Consequently, I would want you to create similar files for:

- https://fr.wiktionary.org/wiki/Annexe:Glossaire_grammatical
- https://cs.wiktionary.org/wiki/P%C5%99%C3%ADloha:Slovn%C3%AD%C4%8Dek_jazykov%C4%9Bdn%C3%BDch_pojm%C5%AF
- https://no.wiktionary.org/wiki/Tillegg:Vokabular
- https://pt.wiktionary.org/wiki/Ap%C3%AAndice:Gloss%C3%A1rio


---

**Cursor**


Creating TSV files for the French, Czech, Norwegian, and Portuguese Wiktionary glossaries. Checking each page's structure:



Fetching raw HTML from each page to inspect their structure:



Creating a multi-language extraction script and adding a todo list:



Switching Portuguese to the dl/dt/dd parser and fixing the French definition column.



The four new glossary TSV files are in place. Summary:

## Created files

| File | Entries | Source |
|------|---------|--------|
| `Q31178539_wiktionary_glossary_fr.tsv` | 183 | [fr.wiktionary.org/wiki/Annexe:Glossaire_grammatical](https://fr.wiktionary.org/wiki/Annexe:Glossaire_grammatical) |
| `Q31178539_wiktionary_glossary_cs.tsv` | 265 | [cs.wiktionary.org/wiki/Příloha:Slovníček_jazykovědných_pojmů](https://cs.wiktionary.org/wiki/P%C5%99%C3%ADloha:Slovn%C3%AD%C4%8Dek_jazykov%C4%9Bdn%C3%BDch_pojm%C5%AF) |
| `Q31178539_wiktionary_glossary_no.tsv` | 17 | [no.wiktionary.org/wiki/Tillegg:Vokabular](https://no.wiktionary.org/wiki/Tillegg:Vokabular) |
| `Q31178539_wiktionary_glossary_pt.tsv` | 30 | [pt.wiktionary.org/wiki/Apêndice:Glossário](https://pt.wiktionary.org/wiki/Ap%C3%AAndice:Gloss%C3%A1rio) |

All use the same format as the English file:
- **Column 1**: term (plain text)
- **Column 2**: definition (markdown with internal `#anchor` links and external URLs)
- **Column 3**: term_links (comma-separated URLs for links in the term)

## Extraction script

`scripts/extract_wiktionary_glossary_multi.py` supports all five languages. Run:

```bash
# All four new languages
python3 scripts/extract_wiktionary_glossary_multi.py fr cs no pt

# Or a single language
python3 scripts/extract_wiktionary_glossary_multi.py fr
```

The Norwegian glossary is small (17 terms). The Portuguese one has 30 entries, matching the 30 `<dl>` blocks on the page.

---

**User**

Now please do the same for https://en.wiktionary.org/wiki/Appendix:Glossary_of_rhetoric 

---

**Cursor**


Adding a parser for the rhetoric glossary (ul/li with bold links) and extending the extraction script.



Checking definition extraction for "animorum motus" and normalizing redlink URLs.



The rhetoric glossary has been added and extracted. Summary of changes:

**Updates to `scripts/extract_wiktionary_glossary_multi.py`:**

1. **`en_rhetoric` config** – New entry for the rhetoric glossary URL.
2. **`parse_rhetoric_ul_format`** – Parser for the `<ul><li><b><a>term</a></b> - definition</li></ul>` structure.
3. **Redlink handling** – `/w/index.php?title=X&action=edit&redlink=1` is normalized to `https://en.wiktionary.org/wiki/X`.
4. **Definition extraction** – Separator search limit increased from 100 to 300 characters to handle long term links.

**Output:** `data/Q31178539_wiktionary_glossary_rhetoric_en.tsv` with 337 entries.

**Run:**
```bash
python3 scripts/extract_wiktionary_glossary_multi.py en_rhetoric
```

The TSV uses the same format as the other glossaries: `term`, `definition` (markdown), and `term_links` (comma-separated URLs).

---

**User**

You got the Wikidata QID wrong for that list (it is Q17017605 instead of Q31178539). — That being said: Similarly as how the main linguistic terms glossary has other-than-English-language versions, this list of rhetorical terms too has several language version, each for which I want you to create separate files:

- https://de.wikipedia.org/wiki/Liste_rhetorischer_Stilmittel
- https://fr.wikipedia.org/wiki/Liste_des_figures_de_style
- https://nl.wikipedia.org/wiki/Lijst_van_stijlfiguren
- https://pl.wikipedia.org/wiki/%C5%9Arodki_stylistyczne
- https://ro.wikipedia.org/wiki/List%C4%83_cu_figuri_retorice
- https://br.wikipedia.org/wiki/Roll_al_lunienno%C3%B9_stil

However! The links in the list above are to Wikipedia pages, and have widely differing structure. You will have to be creative to get the data from those pages, and force it into the same structure as we have been doing so far with the other lists.

Additionally, since we are now deali,g with Wikipedia pages, which in their turn oftentimes link to other Wikipedia pages, we can at once add standardized links, not to language-versions Wikiepedia pages, but immeidately to Wiki QIDs. Likewise and verymeimproatntly we could add a foruth column to the tsv files we will be creating, caontaing the WikiData QID.

For example, on https://fr.wikipedia.org/wiki/Liste_des_figures_de_style we find a term "Morphème", which is linked to https://fr.wikipedia.org/wiki/Morph%C3%A8me.Then when we create a record/entry/line in our tsv with term (first column) "morphème", we should resolve it to "Q43249" (value in the fourth column), because on https://fr.wikipedia.org/wiki/Morph%C3%A8me we find the link (Outils > Elément Wikidata) to https://www.wikidata.org/wiki/Q43249


---

**Cursor**


Exploring the structure of each Wikipedia page and how to resolve Wikipedia links to Wikidata QIDs.



Creating the Wikipedia rhetoric extractor script:



Improving the FR and RO parsers to filter out noise and restrict the RO parser to the main list:



Adding a fourth column to the Wiktionary rhetoric output for consistency. Checking whether we can resolve Wiktionary entries to QIDs:



Summary of changes:

## 1. QID fix for rhetoric glossary

- Updated `extract_wiktionary_glossary_multi.py` so the rhetoric glossary uses **Q17017605** instead of Q31178539.
- Output file: `data/Q17017605_wiktionary_glossary_rhetoric_en.tsv`.

## 2. Wikipedia rhetoric extractor

Added `scripts/extract_wikipedia_rhetoric.py` to extract rhetoric/stylistic figures from six Wikipedia lists:

| Lang | URL | Entries |
|------|-----|---------|
| **de** | [Liste rhetorischer Stilmittel](https://de.wikipedia.org/wiki/Liste_rhetorischer_Stilmittel) | 150 |
| **fr** | [Liste des figures de style](https://fr.wikipedia.org/wiki/Liste_des_figures_de_style) | 141 |
| **nl** | [Lijst van stijlfiguren](https://nl.wikipedia.org/wiki/Lijst_van_stijlfiguren) | 223 |
| **pl** | [Środki stylistyczne](https://pl.wikipedia.org/wiki/Środki_stylistyczne) | 70 |
| **ro** | [Listă cu figuri retorice](https://ro.wikipedia.org/wiki/Listă_cu_figuri_retorice) | 62 |
| **br** | [Roll al luniennoù stil](https://br.wikipedia.org/wiki/Roll_al_luniennoù_stil) | 54 |

## 3. TSV format (4 columns)

All rhetoric TSV files use:

- **term** – plain text
- **definition** – markdown (empty for NL/PL where not available)
- **term_links** – comma-separated Wikidata QIDs (from Wikipedia links)
- **wikidata_qid** – main term’s Wikidata QID (from the term’s Wikipedia link)

Wikipedia links are resolved to QIDs via the Wikipedia API (`prop=pageprops`, `wikibase_item`).

## 4. Usage

```bash
# Extract all 6 Wikipedia rhetoric lists
python3 scripts/extract_wikipedia_rhetoric.py

# Extract specific languages
python3 scripts/extract_wikipedia_rhetoric.py de fr nl

# Wiktionary rhetoric (English)
python3 scripts/extract_wiktionary_glossary_multi.py en_rhetoric

# Optional: resolve Wiktionary entries to QIDs (slow, ~337 API calls)
python3 scripts/extract_wiktionary_glossary_multi.py en_rhetoric --resolve-qids
```

Output files: `data/Q17017605_wiktionary_glossary_rhetoric_{de,fr,nl,pl,ro,br,en}.tsv`.

---

**User**

We've done quite a bit of work; please chunk all of our work/changes, respective to the latest commit, in several sizeable commmit stages, as per the rules in AGENTS.md Then commit in order, using a sensible, descriptive, concise commit message for each commit.

---

**Cursor**


Created 4 commits on top of `a9cfbbb`:

| Commit   | Message |
|----------|---------|
| `dea5b92` | **feat: add Wiktionary glossary extraction scripts** — `extract_wiktionary_glossary.py`, `extract_wiktionary_glossary_multi.py` (multi-language + en_rhetoric), `__pycache__/` in `.gitignore` |
| `cccbb01` | **feat: add Wikipedia rhetoric extraction script** — `extract_wikipedia_rhetoric.py` for 6 Wikipedia rhetoric lists with QID resolution |
| `a63c520` | **feat: add multi-language Wiktionary glossary TSV data** — Q31178539_* (en, fr, cs, no, pt) |
| `ed6b40c` | **feat: add rhetoric glossary TSV data** — Q17017605_* (en, de, fr, nl, pl, ro, br) |

Unchanged and left uncommitted: `docs/concept-note.md`, deleted part-of-speech files, `docs/core-Specification.md`, `docs/gui-Specification.md`, and other untracked files.

