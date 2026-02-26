import csv
import os
import re

# Paths
ONTOLOGY_DIR = 'ontology/concepts'
SEED_FILE = 'ontology/todo_Wiktionary-terms/Q31178539_wiktionary_glossary_en.tsv'
OUTPUT_DIR = 'ontology/concepts' # Overwrite the same directory

def slugify(text):
    # ML_ID style slug
    s = text.upper().replace(' ', '-').replace('_', '-')
    s = re.sub(r'[^A-Z0-9-]', '', s)
    return s

def main():
    # 1. Load seed terms
    seed_data = []
    with open(SEED_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')
        for row in reader:
            term = row['term'].strip()
            # Handle forms like "accusative case , acc."
            primary_term = term.split(',')[0].split('(')[0].strip()
            seed_data.append({
                'term': primary_term,
                'definition': row.get('definition', '').strip(),
                'link': row.get('term_links', '').strip()
            })

    # 2. Map existing concepts
    concepts_by_label = {} # label.lower() -> concept_obj
    all_files = [f for f in os.listdir(ONTOLOGY_DIR) if f.endswith('.tsv')]
    
    # Track which file holds which concept for rewriting
    file_map = {} # concept_id -> filename
    
    enriched_concepts = {} # concept_id -> updated_row

    for filename in all_files:
        filepath = os.path.join(ONTOLOGY_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            if not lines: continue
            header = lines[0].strip().split('\t')
            # Column 0: wikidata, 1: parent, 2: id, 3: label
            for line in lines[1:]:
                if not line.strip(): continue
                parts = line.strip('\n').split('\t')
                # Ensure 6 columns
                while len(parts) < 6: parts.append('')
                
                cid = parts[2]
                label = parts[3]
                concepts_by_label[label.lower()] = cid
                file_map[cid] = filename
                enriched_concepts[cid] = parts

    # 3. Merge seed data
    matched_terms = set()
    new_concepts = [] # for custom.tsv

    for item in seed_data:
        term_lower = item['term'].lower()
        if term_lower in concepts_by_label:
            cid = concepts_by_label[term_lower]
            matched_terms.add(term_lower)
            # Update description (col 4) and wiktionary (col 5)
            # Only update if empty or different? For now, always update to glossary values
            # unless glossary is empty
            if item['definition']: enriched_concepts[cid][4] = item['definition']
            if item['link']: enriched_concepts[cid][5] = item['link']
        else:
            # New concept candidate
            new_concepts.append(item)

    # 4. Write back existing files with 6 columns
    for filename in all_files:
        filepath = os.path.join(ONTOLOGY_DIR, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write("WikiData QID\tparent\tML_ID\tlabel\tdescription\twiktionary\n")
            for cid, parts in enriched_concepts.items():
                if file_map[cid] == filename:
                    # Make sure exactly 6 parts
                    while len(parts) < 6: parts.append('')
                    f.write('\t'.join(parts[:6]) + '\n' )

    # 5. Handle new concepts (append to custom.tsv)
    custom_path = os.path.join(ONTOLOGY_DIR, 'custom.tsv')
    # If custom.tsv wasn't in all_files, create it
    mode = 'a' if os.path.exists(custom_path) else 'w'
    with open(custom_path, mode, encoding='utf-8') as f:
        if mode == 'w':
             f.write("WikiData QID\tparent\tML_ID\tlabel\tdescription\twiktionary\n")
        
        for item in new_concepts:
            # Create a unique ML_ID
            # Guess domain based on term? Or just CUSTOM for now.
            # Let's try some basic keyword matching for domain
            domain = "CUSTOM"
            t = item['term'].lower()
            if "case" in t or "person" in t or "number" in t or "gender" in t: domain = "MORPH-VALUE"
            elif "verb" in t or "noun" in t or "adjective" in t or "adverb" in t or "pronoun" in t: domain = "POS"
            elif "suffix" in t or "prefix" in t or "affix" in t: domain = "DERIVATION"
            elif "accent" in t or "vowel" in t or "consonant" in t: domain = "PHONOLOGY"
            
            cid = f"ML_{domain}_{slugify(item['term'])}"
            # Check for duplicates in enriched_concepts just in case
            if cid in enriched_concepts: continue 

            f.write(f"\t\t{cid}\t{item['term']}\t{item['definition']}\t{item['link']}\n")

    print(f"Successfully merged {len(matched_terms)} existing terms and added {len(new_concepts)} new concepts.")

if __name__ == "__main__":
    main()
