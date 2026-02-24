#!/usr/bin/env python3
"""
Extract Wiktionary glossary pages to TSV format (multi-language).
Output: term TAB definition TAB term_links
"""

import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Callable

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Install beautifulsoup4: pip install beautifulsoup4", file=sys.stderr)
    sys.exit(1)

GLOSSARIES = {
    "en": {
        "url": "https://en.wiktionary.org/wiki/Appendix:Glossary",
        "base": "https://en.wiktionary.org",
    },
    "en_rhetoric": {
        "url": "https://en.wiktionary.org/wiki/Appendix:Glossary_of_rhetoric",
        "base": "https://en.wiktionary.org",
    },
    "fr": {
        "url": "https://fr.wiktionary.org/wiki/Annexe:Glossaire_grammatical",
        "base": "https://fr.wiktionary.org",
    },
    "cs": {
        "url": "https://cs.wiktionary.org/wiki/P%C5%99%C3%ADloha:Slovn%C3%AD%C4%8Dek_jazykov%C4%9Bdn%C3%BDch_pojm%C5%AF",
        "base": "https://cs.wiktionary.org",
    },
    "no": {
        "url": "https://no.wiktionary.org/wiki/Tillegg:Vokabular",
        "base": "https://no.wiktionary.org",
    },
    "pt": {
        "url": "https://pt.wiktionary.org/wiki/Ap%C3%AAndice:Gloss%C3%A1rio",
        "base": "https://pt.wiktionary.org",
    },
}


def fetch_url(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as f:
        return f.read().decode("utf-8")


def make_normalize_href(base: str):
    def normalize_href(href: str) -> str:
        if not href:
            return ""
        href = href.strip()
        if href.startswith("#"):
            return href
        if "/w/index.php" in href and "title=" in href:
            parsed = urllib.parse.urlparse(href)
            qs = urllib.parse.parse_qs(parsed.query)
            title = qs.get("title", [""])[0]
            if title:
                return base + "/wiki/" + title.replace(" ", "_")
        if href.startswith("/wiki/"):
            return base + href
        if href.startswith("/w/"):
            return base + href
        if href.startswith("//"):
            return "https:" + href
        if href.startswith("http://") or href.startswith("https://"):
            return href
        return base + "/" + href.lstrip("/")

    return normalize_href


def make_html_to_markdown(normalize_href):
    def html_to_markdown(elem, inside_i=False, inside_b=False):
        if elem is None:
            return ""
        if isinstance(elem, str):
            return elem
        if hasattr(elem, "name") and elem.name is None:
            return str(elem) if elem else ""

        if hasattr(elem, "name") and elem.name == "a":
            href = elem.get("href", "")
            text = "".join(html_to_markdown(c, False, False) for c in elem.children)
            url = normalize_href(href)
            if url:
                if inside_i and not inside_b:
                    return f"[_{text}_]({url})"
                if inside_b and not inside_i:
                    return f"[**{text}**]({url})"
                if inside_i and inside_b:
                    return f"[**_{text}_**]({url})"
                return f"[{text}]({url})"
            return text

        parts = []
        for child in elem.children:
            if isinstance(child, str):
                parts.append(child)
                continue
            if not hasattr(child, "name"):
                continue
            tag = child.name
            if tag == "a":
                href = child.get("href", "")
                text = "".join(html_to_markdown(c, False, False) for c in child.children)
                url = normalize_href(href)
                if url:
                    if inside_i and not inside_b:
                        parts.append(f"[_{text}_]({url})")
                    elif inside_b and not inside_i:
                        parts.append(f"[**{text}**]({url})")
                    elif inside_i and inside_b:
                        parts.append(f"[**_{text}_**]({url})")
                    else:
                        parts.append(f"[{text}]({url})")
                else:
                    parts.append(text)
            elif tag == "i":
                elem_children = [c for c in child.children if hasattr(c, "name") and c.name]
                inner_parts = [html_to_markdown(c, True, inside_b) for c in child.children]
                inner = "".join(inner_parts)
                if len(elem_children) == 1 and elem_children[0].name == "a":
                    parts.append(inner)
                else:
                    parts.append(f"_{inner}_")
            elif tag == "b":
                elem_children = [c for c in child.children if hasattr(c, "name") and c.name]
                inner_parts = [html_to_markdown(c, inside_i, True) for c in child.children]
                inner = "".join(inner_parts)
                if len(elem_children) == 1 and elem_children[0].name == "a":
                    parts.append(inner)
                else:
                    parts.append(f"**{inner}**")
            elif tag in ("span", "div"):
                cls = child.get("class") or []
                cls_str = " ".join(cls) if isinstance(cls, list) else str(cls)
                if "template-anchor" in cls_str or "interproject-box" in cls_str or "interProject" in cls_str:
                    continue
                if "Latn" in cls_str and "mention" in cls_str:
                    inner = "".join(html_to_markdown(c, True, inside_b) for c in child.children)
                    parts.append(inner)
                elif "mention-gloss" in cls_str:
                    inner = "".join(html_to_markdown(c, inside_i, inside_b) for c in child.children)
                    parts.append(inner)
                else:
                    inner = "".join(html_to_markdown(c, inside_i, inside_b) for c in child.children)
                    parts.append(inner)
            elif tag == "sup":
                continue
            elif tag in ("style", "link", "script"):
                continue
            else:
                inner = "".join(html_to_markdown(c, inside_i, inside_b) for c in child.children)
                parts.append(inner)
        return "".join(parts)

    return html_to_markdown


def _has_interproject(elem) -> bool:
    if not hasattr(elem, "get"):
        return False
    cls = elem.get("class") or []
    cls_str = " ".join(cls) if isinstance(cls, list) else str(cls)
    if "interproject-box" in cls_str or "interProject" in cls_str:
        return True
    return any(_has_interproject(c) for c in getattr(elem, "children", []) if hasattr(c, "get"))


def _inside_interproject(elem) -> bool:
    parent = elem.parent
    while parent:
        cls = parent.get("class") or []
        cls_str = " ".join(cls) if isinstance(cls, list) else str(cls)
        if "interproject-box" in cls_str or "interProject" in cls_str:
            return True
        parent = getattr(parent, "parent", None)
    return False


# --- Parser: dl/dt/dd (English, Czech) ---
def parse_dl_format(html: str, base: str) -> list[tuple[str, str, list[str]]]:
    normalize_href = make_normalize_href(base)
    html_to_md = make_html_to_markdown(normalize_href)
    soup = BeautifulSoup(html, "html.parser")
    results = []

    for dl in soup.find_all("dl"):
        for dt in dl.find_all("dt"):
            if _has_interproject(dt):
                continue
            term_text = _extract_term_text_dt(dt)
            term_links = _extract_term_links_dt(dt, normalize_href)

            def_parts = []
            for sib in dt.find_next_siblings():
                if sib.name == "dt":
                    break
                if sib.name == "dd":
                    md = html_to_md(sib)
                    md = re.sub(r"\s+", " ", md).strip()
                    if md:
                        def_parts.append(md)

            definition = " / ".join(def_parts) if def_parts else ""
            if term_text or definition:
                results.append((term_text, definition, term_links))

    return results


def _extract_term_text_dt(dt) -> str:
    parts = []
    for child in dt.children:
        if isinstance(child, str):
            parts.append(child.strip())
            continue
        if not hasattr(child, "name"):
            continue
        if _has_interproject(child):
            continue
        cls = child.get("class") or []
        cls_str = " ".join(cls) if isinstance(cls, list) else str(cls)
        if child.name == "span" and "template-anchor" in cls_str:
            continue
        if child.name in ("span", "div") and ("interproject-box" in cls_str or "interProject" in cls_str):
            continue
        if child.name == "a":
            parts.append(child.get_text(strip=True))
        elif child.name in ("span", "div") and "template-anchor" not in cls_str:
            parts.append(child.get_text(strip=True))
        elif child.name not in ("style", "link"):
            parts.append(child.get_text(strip=True))
    return " ".join(p for p in parts if p).strip()


def _extract_term_links_dt(dt, normalize_href) -> list[str]:
    links = []
    for a in dt.find_all("a"):
        if _inside_interproject(a):
            continue
        href = a.get("href")
        if not href or href.startswith("#"):
            continue
        url = normalize_href(href)
        if url and url not in links:
            links.append(url)
    return links


# --- Parser: ul/li (French) ---
def parse_fr_ul_format(html: str, base: str) -> list[tuple[str, str, list[str]]]:
    normalize_href = make_normalize_href(base)
    html_to_md = make_html_to_markdown(normalize_href)
    soup = BeautifulSoup(html, "html.parser")
    results = []
    content = soup.find("div", class_="mw-parser-output")
    if not content:
        return results

    for ul in content.find_all("ul"):
        for li in ul.find_all("li", recursive=False):
            first_a = li.find("a", href=lambda h: h and "/wiki/" in (h or "") and "Annexe:" not in (h or ""))
            if not first_a:
                continue
            term_text = first_a.get_text(strip=True)
            term_links = [normalize_href(first_a.get("href", ""))] if first_a.get("href") else []
            definition = html_to_md(li)
            # Strip leading "[Term](url) : " from definition
            definition = re.sub(r"^\s*\[[^\]]+\]\([^)]+\)\s*:\s*", "", definition)
            definition = re.sub(r"\s+", " ", definition).strip()
            if term_text:
                results.append((term_text, definition, term_links))
    return results


# --- Parser: ul/li with bold term link (Rhetoric glossary) ---
def parse_rhetoric_ul_format(html: str, base: str) -> list[tuple[str, str, list[str]]]:
    normalize_href = make_normalize_href(base)
    html_to_md = make_html_to_markdown(normalize_href)
    soup = BeautifulSoup(html, "html.parser")
    results = []
    content = soup.find("div", class_="mw-parser-output")
    if not content:
        return results

    for li in content.find_all("li"):
        b = li.find("b")
        if not b:
            continue
        first_a = b.find("a", href=lambda h: h and ("/wiki/" in (h or "") or "/w/index.php" in (h or "")))
        if not first_a:
            continue
        term_text = b.get_text(strip=True)
        term_links = []
        for a in b.find_all("a"):
            href = a.get("href")
            if href and not href.startswith("#"):
                url = normalize_href(href)
                if url and url not in term_links:
                    term_links.append(url)
        definition = html_to_md(li)
        for sep in (" - ", ". "):
            if sep in definition:
                idx = definition.find(sep)
                if idx < 300:
                    definition = definition[idx + len(sep):].strip()
                    break
        definition = re.sub(r"\s+", " ", definition).strip()
        if term_text:
            results.append((term_text, definition, term_links))
    return results


# --- Parser: ul/li with em dash (Norwegian) ---
def parse_no_ul_format(html: str, base: str) -> list[tuple[str, str, list[str]]]:
    normalize_href = make_normalize_href(base)
    html_to_md = make_html_to_markdown(normalize_href)
    soup = BeautifulSoup(html, "html.parser")
    results = []
    content = soup.find("div", class_="mw-parser-output")
    if not content:
        return results

    for li in content.find_all("li"):
        first_a = li.find("a", href=lambda h: h and "/wiki/" in (h or "") and "Tillegg:" not in (h or ""))
        if not first_a:
            continue
        term_text = first_a.get_text(strip=True)
        term_links = [normalize_href(first_a.get("href", ""))] if first_a.get("href") else []
        definition = html_to_md(li)
        if "—" in definition:
            definition = definition.split("—", 1)[-1].strip()
        elif "–" in definition:
            definition = definition.split("–", 1)[-1].strip()
        else:
            definition = definition[len(term_text):].strip().lstrip("—–:")
        definition = re.sub(r"\s+", " ", definition).strip()
        if term_text and term_text not in ("D", "E", "F", "H", "I", "J", "N", "O", "S", "T", "U", "V"):
            results.append((term_text, definition, term_links))
    return results


PARSERS = {
    "en": parse_dl_format,
    "en_rhetoric": parse_rhetoric_ul_format,
    "cs": parse_dl_format,
    "fr": parse_fr_ul_format,
    "no": parse_no_ul_format,
    "pt": parse_dl_format,
}


def escape_tsv(s: str) -> str:
    return s.replace("\t", " ").replace("\n", " ").replace("\r", " ")


_wiktionary_qid_cache: dict[str, str | None] = {}


def resolve_wiktionary_to_qid(title: str) -> str | None:
    """Resolve a Wiktionary entry title to its Wikidata QID."""
    if not title:
        return None
    if title in _wiktionary_qid_cache:
        return _wiktionary_qid_cache[title]
    try:
        encoded = urllib.parse.quote(title.replace(" ", "_"), safe="")
        api_url = f"https://en.wiktionary.org/w/api.php?action=query&prop=pageprops&titles={encoded}&format=json"
        req = urllib.request.Request(api_url, headers={"User-Agent": "MetalangBot/1.0"})
        with urllib.request.urlopen(req, timeout=10) as f:
            data = json.loads(f.read().decode("utf-8"))
        for page in data.get("query", {}).get("pages", {}).values():
            qid = page.get("pageprops", {}).get("wikibase_item")
            if qid:
                _wiktionary_qid_cache[title] = qid
                return qid
    except Exception:
        pass
    _wiktionary_qid_cache[title] = None
    return None


def extract_glossary(lang: str) -> list[tuple[str, str, list[str]]]:
    cfg = GLOSSARIES.get(lang)
    if not cfg:
        raise ValueError(f"Unknown language: {lang}")
    html = fetch_url(cfg["url"])
    parser = PARSERS.get(lang, parse_dl_format)
    return parser(html, cfg["base"])


def main():
    script_dir = Path(__file__).resolve().parent
    data_dir = script_dir.parent / "data"

    args = [a for a in sys.argv[1:] if a != "--resolve-qids"]
    langs = args if args else ["fr", "cs", "no", "pt"]

    for lang in langs:
        if lang not in GLOSSARIES:
            print(f"Unknown language: {lang}", file=sys.stderr)
            continue
        base = "Q17017605" if lang == "en_rhetoric" else "Q31178539"
        fname = f"{base}_wiktionary_glossary_{lang}.tsv".replace("en_rhetoric", "rhetoric_en")
        out_path = data_dir / fname
        print(f"Fetching {lang}...", file=sys.stderr)
        try:
            entries = extract_glossary(lang)
            print(f"  Found {len(entries)} entries", file=sys.stderr)
            with open(out_path, "w", encoding="utf-8") as f:
                if lang == "en_rhetoric":
                    f.write("term\tdefinition\tterm_links\twikidata_qid\n")
                    for term, definition, links in entries:
                        term_safe = escape_tsv(term)
                        def_safe = escape_tsv(definition)
                        links_str = ", ".join(links) if links else ""
                        qid = ""
                        if links and "--resolve-qids" in sys.argv:
                            for url in links:
                                if "/wiki/" in url and "index.php" not in url:
                                    title = url.split("/wiki/", 1)[-1].split("#")[0]
                                    title = urllib.parse.unquote(title)
                                    qid = resolve_wiktionary_to_qid(title) or ""
                                    break
                        f.write(f"{term_safe}\t{def_safe}\t{links_str}\t{qid}\n")
                else:
                    f.write("term\tdefinition\tterm_links\n")
                    for term, definition, links in entries:
                        term_safe = escape_tsv(term)
                        def_safe = escape_tsv(definition)
                        links_str = ", ".join(links) if links else ""
                        f.write(f"{term_safe}\t{def_safe}\t{links_str}\n")
            print(f"  Written to {out_path}", file=sys.stderr)
        except Exception as e:
            print(f"  Error: {e}", file=sys.stderr)
            raise


if __name__ == "__main__":
    main()
