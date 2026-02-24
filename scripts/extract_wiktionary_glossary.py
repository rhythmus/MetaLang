#!/usr/bin/env python3
"""
Extract Wiktionary Appendix:Glossary to TSV format.
Fetches the page, parses HTML, outputs: term TAB definition TAB term_links
"""

import re
import sys
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Install beautifulsoup4: pip install beautifulsoup4", file=sys.stderr)
    sys.exit(1)

WIKT_BASE = "https://en.wiktionary.org"
GLOSSARY_URL = f"{WIKT_BASE}/wiki/Appendix:Glossary"


def fetch_glossary() -> str:
    """Fetch the raw HTML of the glossary page."""
    req = urllib.request.Request(GLOSSARY_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as f:
        return f.read().decode("utf-8")


def normalize_href(href: str) -> str:
    """Convert href to full URL or keep internal anchor."""
    if not href:
        return ""
    href = href.strip()
    if href.startswith("#"):
        return href
    if href.startswith("/wiki/"):
        return WIKT_BASE + href
    if href.startswith("/w/"):
        return WIKT_BASE + href
    if href.startswith("//"):
        return "https:" + href
    if href.startswith("http://") or href.startswith("https://"):
        return href
    return WIKT_BASE + "/" + href.lstrip("/")


def html_to_markdown(elem, inside_i: bool = False, inside_b: bool = False) -> str:
    """Recursively convert HTML element to markdown, preserving links and formatting."""
    if elem is None:
        return ""
    if isinstance(elem, str):
        return elem

    if hasattr(elem, "name") and elem.name is None:
        return str(elem) if elem else ""

    # When the element itself is an <a>, produce the link (handles <i><a>text</a></i>)
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
            elem_children = [c for c in child.children if hasattr(c, "name") and c.name is not None]
            inner_parts = [html_to_markdown(c, True, inside_b) for c in child.children]
            inner = "".join(inner_parts)
            # If content is a single <a>, it already produced [_text_](url), don't wrap
            if len(elem_children) == 1 and elem_children[0].name == "a":
                parts.append(inner)
            else:
                parts.append(f"_{inner}_")
        elif tag == "b":
            elem_children = [c for c in child.children if hasattr(c, "name") and c.name is not None]
            inner_parts = [html_to_markdown(c, inside_i, True) for c in child.children]
            inner = "".join(inner_parts)
            if len(elem_children) == 1 and elem_children[0].name == "a":
                parts.append(inner)
            else:
                parts.append(f"**{inner}**")
        elif tag in ("span", "div"):
            cls = child.get("class", []) or []
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


def _has_interproject(elem) -> bool:
    """Check if element contains or is an interproject box."""
    if not hasattr(elem, "get"):
        return False
    cls = elem.get("class") or []
    cls_str = " ".join(cls) if isinstance(cls, list) else str(cls)
    if "interproject-box" in cls_str or "interProject" in cls_str:
        return True
    return any(_has_interproject(c) for c in getattr(elem, "children", []) if hasattr(c, "get"))


def extract_term_text(dt) -> str:
    """Extract plain text term from dt, stripping links and anchors."""
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
        if child.name == "span" and ("interproject-box" in cls_str or "interProject" in cls_str):
            continue
        if child.name == "div" and "interproject-box" in cls_str:
            continue
        if child.name == "a":
            parts.append(child.get_text(strip=True))
        elif child.name in ("span", "div"):
            if "template-anchor" in cls_str or "interproject-box" in cls_str:
                continue
            parts.append(child.get_text(strip=True))
        elif child.name not in ("style", "link"):
            parts.append(child.get_text(strip=True))
    return " ".join(p for p in parts if p).strip()


def _inside_interproject(elem) -> bool:
    """Check if element is a descendant of an interproject box (not just if dt contains one)."""
    parent = elem.parent
    while parent:
        cls = parent.get("class") or []
        cls_str = " ".join(cls) if isinstance(cls, list) else str(cls)
        if "interproject-box" in cls_str or "interProject" in cls_str:
            return True
        parent = getattr(parent, "parent", None)
    return False


def extract_term_links(dt) -> list[str]:
    """Extract all href URLs from links in the dt (term) element, excluding interproject boxes."""
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


def parse_glossary(html: str) -> list[tuple[str, str, list[str]]]:
    """Parse HTML and return list of (term, definition, term_links)."""
    soup = BeautifulSoup(html, "html.parser")
    results = []

    for dl in soup.find_all("dl"):
        dts = dl.find_all("dt")
        for dt in dts:
            term_text = extract_term_text(dt)
            term_links = extract_term_links(dt)

            def_parts = []
            for sib in dt.find_next_siblings():
                if sib.name == "dt":
                    break
                if sib.name == "dd":
                    md = html_to_markdown(sib)
                    md = re.sub(r"\s+", " ", md).strip()
                    if md:
                        def_parts.append(md)

            definition = " / ".join(def_parts) if def_parts else ""

            if term_text or definition:
                results.append((term_text, definition, term_links))

    return results


def escape_tsv(s: str) -> str:
    """Escape tabs and newlines for TSV."""
    return s.replace("\t", " ").replace("\n", " ").replace("\r", " ")


def main():
    script_dir = Path(__file__).resolve().parent
    data_dir = script_dir.parent / "data"
    out_path = data_dir / "wiktionary_glossary.tsv"

    print("Fetching glossary...", file=sys.stderr)
    html = fetch_glossary()

    print("Parsing...", file=sys.stderr)
    entries = parse_glossary(html)
    print(f"Found {len(entries)} entries", file=sys.stderr)

    with open(out_path, "w", encoding="utf-8") as f:
        f.write("term\tdefinition\tterm_links\n")
        for term, definition, links in entries:
            term_safe = escape_tsv(term)
            def_safe = escape_tsv(definition)
            links_str = ", ".join(links) if links else ""
            f.write(f"{term_safe}\t{def_safe}\t{links_str}\n")

    print(f"Written to {out_path}", file=sys.stderr)


if __name__ == "__main__":
    main()
