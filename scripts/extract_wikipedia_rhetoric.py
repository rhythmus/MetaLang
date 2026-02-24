#!/usr/bin/env python3
"""
Extract Wikipedia rhetoric/stylistic figures lists to TSV format.
Output: term TAB definition TAB term_links TAB wikidata_qid

Resolves Wikipedia article links to Wikidata QIDs via the Wikipedia API.
"""

import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Install beautifulsoup4: pip install beautifulsoup4", file=sys.stderr)
    sys.exit(1)

# Q17017605 = List of rhetorical terms (Wikidata)
QID_PREFIX = "Q17017605"

PAGES = {
    "de": {
        "url": "https://de.wikipedia.org/wiki/Liste_rhetorischer_Stilmittel",
        "lang": "de",
    },
    "fr": {
        "url": "https://fr.wikipedia.org/wiki/Liste_des_figures_de_style",
        "lang": "fr",
    },
    "nl": {
        "url": "https://nl.wikipedia.org/wiki/Lijst_van_stijlfiguren",
        "lang": "nl",
    },
    "pl": {
        "url": "https://pl.wikipedia.org/wiki/%C5%9Arodki_stylistyczne",
        "lang": "pl",
    },
    "ro": {
        "url": "https://ro.wikipedia.org/wiki/List%C4%83_cu_figuri_retorice",
        "lang": "ro",
    },
    "br": {
        "url": "https://br.wikipedia.org/wiki/Roll_al_lunienno%C3%B9_stil",
        "lang": "br",
    },
}

# Cache for Wikipedia title -> QID to avoid repeated API calls
_qid_cache: dict[tuple[str, str], str | None] = {}


def fetch_url(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "MetalangBot/1.0"})
    with urllib.request.urlopen(req, timeout=30) as f:
        return f.read().decode("utf-8")


def resolve_wikipedia_to_qid(lang: str, title: str) -> str | None:
    """Resolve a Wikipedia article title to its Wikidata QID."""
    if not title or "redlink=1" in title:
        return None
    key = (lang, title)
    if key in _qid_cache:
        return _qid_cache[key]
    try:
        encoded = urllib.parse.quote(title.replace(" ", "_"), safe="")
        api_url = f"https://{lang}.wikipedia.org/w/api.php?action=query&prop=pageprops&titles={encoded}&format=json"
        req = urllib.request.Request(api_url, headers={"User-Agent": "MetalangBot/1.0"})
        with urllib.request.urlopen(req, timeout=10) as f:
            data = json.loads(f.read().decode("utf-8"))
        pages = data.get("query", {}).get("pages", {})
        for page in pages.values():
            qid = page.get("pageprops", {}).get("wikibase_item")
            if qid:
                _qid_cache[key] = qid
                return qid
        _qid_cache[key] = None
    except Exception:
        _qid_cache[key] = None
    return None


def extract_wiki_title_from_href(href: str, base_lang: str) -> str | None:
    """Extract Wikipedia article title from href. Returns None for redlinks."""
    if not href or href.startswith("#"):
        return None
    if "redlink=1" in href or "action=edit" in href:
        return None
    if "/wiki/" not in href:
        return None
    parsed = urllib.parse.urlparse(href)
    path = parsed.path
    if "/wiki/" in path:
        title = path.split("/wiki/", 1)[-1]
        title = urllib.parse.unquote(title)
        return title if title else None
    return None


def escape_tsv(s: str) -> str:
    return s.replace("\t", " ").replace("\n", " ").replace("\r", " ").strip()


# --- Parser: DE (table with Bezeichnung | Beschreibung | Beispiele) ---
def parse_de(html: str, lang: str) -> list[tuple[str, str, list[str], str | None]]:
    soup = BeautifulSoup(html, "html.parser")
    results = []
    content = soup.find("div", id="mw-content-text") or soup.find("div", class_="mw-parser-output")
    if not content:
        return results

    for table in content.find_all("table", class_="wikitable"):
        for tr in table.find_all("tr")[1:]:
            cells = tr.find_all(["td", "th"])
            if len(cells) < 2:
                continue
            first = cells[0]
            first_a = first.find("a", href=lambda h: h and "/wiki/" in (h or "") and "redlink" not in (h or ""))
            if not first_a:
                continue
            term = first_a.get_text(strip=True)
            if not term or len(term) < 2:
                continue
            title = extract_wiki_title_from_href(first_a.get("href", ""), lang)
            qid = resolve_wikipedia_to_qid(lang, title) if title else None
            definition = cells[1].get_text(separator=" ", strip=True) if len(cells) > 1 else ""
            definition = re.sub(r"\s+", " ", definition).strip()
            term_links = [qid] if qid else []
            results.append((term, definition, term_links, qid))

    return results


# --- Parser: FR (tables with Nom | Description) ---
_FR_SKIP_TERMS = frozenset({"Antonyme", "Paronyme", "Synonyme", "aucun", "Figure mère", "Figure fille"})


def parse_fr(html: str, lang: str) -> list[tuple[str, str, list[str], str | None]]:
    soup = BeautifulSoup(html, "html.parser")
    results = []
    content = soup.find("div", id="mw-content-text") or soup.find("div", class_="mw-parser-output")
    if not content:
        return results

    seen_terms = set()
    for table in content.find_all("table", class_="wikitable"):
        for tr in table.find_all("tr"):
            cells = tr.find_all(["td", "th"])
            if len(cells) < 2:
                continue
            first = cells[0]
            first_a = first.find("a", href=lambda h: h and "/wiki/" in (h or "") and "redlink" not in (h or ""))
            if not first_a:
                continue
            term = first_a.get_text(strip=True)
            if not term or len(term) < 2 or term in _FR_SKIP_TERMS:
                continue
            if term.lower() in seen_terms:
                continue
            seen_terms.add(term.lower())
            definition = cells[1].get_text(separator=" ", strip=True) if len(cells) > 1 else ""
            definition = re.sub(r"\s+", " ", definition).strip()
            if definition in _FR_SKIP_TERMS and len(definition) < 10:
                continue
            title = extract_wiki_title_from_href(first_a.get("href", ""), lang)
            qid = resolve_wikipedia_to_qid(lang, title) if title else None
            term_links = [qid] if qid else []
            results.append((term, definition, term_links, qid))

    return results


# --- Parser: NL, PL (simple bullet list with [term](url)) ---
def parse_nl_pl(html: str, lang: str) -> list[tuple[str, str, list[str], str | None]]:
    soup = BeautifulSoup(html, "html.parser")
    results = []
    content = soup.find("div", id="mw-content-text") or soup.find("div", class_="mw-parser-output")
    if not content:
        return results

    for li in content.find_all("li"):
        a = li.find("a", href=lambda h: h and "/wiki/" in (h or "") and "redlink" not in (h or ""))
        if not a:
            continue
        term = a.get_text(strip=True)
        if not term or len(term) < 2:
            continue
        href = a.get("href", "")
        if "Lijst_van" in href or "Tillegg" in href or "P%C5%99%C3%ADloha" in href or "%C5%9Arodki" in href:
            continue
        title = extract_wiki_title_from_href(href, lang)
        qid = resolve_wikipedia_to_qid(lang, title) if title else None
        definition = ""
        term_links = [qid] if qid else []
        results.append((term, definition, term_links, qid))

    return results


# --- Parser: RO (mixed: [Term](url)– definition or - [Term](url)– definition) ---
_RO_SKIP_TITLES = frozenset({"Retorică", "Grecia_antică", "Roma_antică", "Greacă", "Latină"})


def parse_ro(html: str, lang: str) -> list[tuple[str, str, list[str], str | None]]:
    soup = BeautifulSoup(html, "html.parser")
    results = []
    content = soup.find("div", id="mw-content-text") or soup.find("div", class_="mw-parser-output")
    if not content:
        return results

    in_main_list = False
    for elem in content.find_all(["p", "li", "h2"]):
        if elem.name == "h2":
            heading = elem.get_text(strip=True)
            if len(heading) == 1 and heading.isalpha():
                in_main_list = True
            continue
        if not in_main_list:
            continue
        text = elem.get_text(separator=" ", strip=True)
        first_a = elem.find("a", href=lambda h: h and "/wiki/" in (h or "") and "redlink" not in (h or ""))
        if not first_a:
            continue
        term = first_a.get_text(strip=True)
        if not term or len(term) < 2:
            continue
        href = first_a.get("href", "")
        if "List" in href or "List%C4%83" in href:
            continue
        title = extract_wiki_title_from_href(href, lang)
        if title and title.replace(" ", "_") in _RO_SKIP_TITLES:
            continue
        qid = resolve_wikipedia_to_qid(lang, title) if title else None
        definition = ""
        for sep in ("–", "—", "-"):
            if sep in text:
                idx = text.find(sep)
                after = text[idx + len(sep):].strip()
                if len(after) > 10 and not after.startswith("exemplu"):
                    definition = re.sub(r"\s*-\s*exemplu:.*", "", after, flags=re.DOTALL).strip()
                    break
        definition = re.sub(r"\s+", " ", definition).strip()
        term_links = [qid] if qid else []
        results.append((term, definition, term_links, qid))

    return results


# --- Parser: BR (Breton - simple list, some with links) ---
def parse_br(html: str, lang: str) -> list[tuple[str, str, list[str], str | None]]:
    soup = BeautifulSoup(html, "html.parser")
    results = []
    content = soup.find("div", id="mw-content-text") or soup.find("div", class_="mw-parser-output")
    if not content:
        return results

    for li in content.find_all("li"):
        a = li.find("a", href=lambda h: h and "/wiki/" in (h or ""))
        term = a.get_text(strip=True) if a else li.get_text(strip=True)
        if not term or len(term) < 2:
            continue
        qid = None
        term_links = []
        if a:
            href = a.get("href", "")
            if "redlink" not in href:
                title = extract_wiki_title_from_href(href, lang)
                qid = resolve_wikipedia_to_qid(lang, title) if title else None
                if qid:
                    term_links = [qid]
        definition = ""
        results.append((term, definition, term_links, qid))

    return results


PARSERS = {
    "de": parse_de,
    "fr": parse_fr,
    "nl": parse_nl_pl,
    "pl": parse_nl_pl,
    "ro": parse_ro,
    "br": parse_br,
}


def extract_page(lang: str) -> list[tuple[str, str, list[str], str | None]]:
    cfg = PAGES.get(lang)
    if not cfg:
        raise ValueError(f"Unknown language: {lang}")
    html = fetch_url(cfg["url"])
    parser = PARSERS.get(lang)
    if not parser:
        raise ValueError(f"No parser for {lang}")
    return parser(html, cfg["lang"])


def main():
    script_dir = Path(__file__).resolve().parent
    data_dir = script_dir.parent / "data"

    langs = sys.argv[1:] if len(sys.argv) > 1 else list(PAGES.keys())

    for lang in langs:
        if lang not in PAGES:
            print(f"Unknown language: {lang}", file=sys.stderr)
            continue
        out_path = data_dir / f"{QID_PREFIX}_wiktionary_glossary_rhetoric_{lang}.tsv"
        print(f"Fetching {lang}...", file=sys.stderr)
        try:
            entries = extract_page(lang)
            print(f"  Found {len(entries)} entries", file=sys.stderr)
            with open(out_path, "w", encoding="utf-8") as f:
                f.write("term\tdefinition\tterm_links\twikidata_qid\n")
                for term, definition, links, qid in entries:
                    term_safe = escape_tsv(term)
                    def_safe = escape_tsv(definition)
                    links_str = ", ".join(links) if links else ""
                    qid_str = qid or ""
                    f.write(f"{term_safe}\t{def_safe}\t{links_str}\t{qid_str}\n")
            print(f"  Written to {out_path}", file=sys.stderr)
            time.sleep(0.5)
        except Exception as e:
            print(f"  Error: {e}", file=sys.stderr)
            raise


if __name__ == "__main__":
    main()
