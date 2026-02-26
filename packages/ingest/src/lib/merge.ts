import fs from 'fs';
import { SeedFile, Concept, DomainID } from '@metalang/schema';

export interface MergeOptions {
    dryRun: boolean;
    domain?: DomainID;
}

/**
 * Merges curated terms from a TSV into a MetaLang SeedFile.
 * Supports both standard candidate TSV and the specific Rhetoric glossary format.
 */
export function mergeTsvIntoSeed(tsvPath: string, seedPath: string, options: MergeOptions): void {
    const tsvContent = fs.readFileSync(tsvPath, 'utf8');
    const seedContent = fs.readFileSync(seedPath, 'utf8');
    const seed: SeedFile = JSON.parse(seedContent);

    const rows = tsvContent.split('\n').filter(line => line.trim().length > 0);
    if (rows.length === 0) {
        console.warn('⚠️ TSV file is empty.');
        return;
    }

    const firstRow = rows[0];
    if (!firstRow) return;

    const header = firstRow.split('\t').map(h => h.trim().toLowerCase());

    // Identify format
    const isGlossary = header.includes('term') && header.includes('definition');
    const isCandidate = header.includes('suggested guid') || header.includes('suggested_guid');

    console.log(`📂 Merging ${rows.length - 1} rows into ${seedPath}...`);
    let added = 0;
    let updated = 0;

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row) continue;

        const cols = row.split('\t').map(c => c.trim());
        let concept: Partial<Concept> = {};

        if (isGlossary) {
            // Rhetoric Glossary format: term, definition, term_links, wikidata_qid
            const termIdx = header.indexOf('term');
            const qidIdx = header.indexOf('wikidata_qid');

            if (termIdx === -1) continue;

            const term = cols[termIdx];
            if (!term) continue;

            const qid = qidIdx !== -1 ? cols[qidIdx] : undefined;
            const guid = `ML_RHETORIC_${term.toUpperCase().replace(/\s+/g, '_')}`;

            concept = {
                id: guid,
                domain: (options.domain as DomainID) || 'other',
                labels: {
                    en: { full: term, abbreviation: null }
                },
                externalRefs: qid ? { wikidata: qid } : {},
                systemMappings: {}
            };
        } else if (isCandidate) {
            // Standard Candidate format: Title, Wiktionary ID, Suggested GUID, Confidence, Domain
            const titleIdx = header.indexOf('title');
            const guidIdx = header.indexOf('suggested guid') !== -1 ? header.indexOf('suggested guid') : header.indexOf('suggested_guid');
            const domainIdx = header.indexOf('domain');

            if (titleIdx === -1 || guidIdx === -1) continue;

            const title = cols[titleIdx];
            const guid = cols[guidIdx];
            const domain = (domainIdx !== -1 ? cols[domainIdx] : 'other') as DomainID;

            if (!guid || !title) continue;

            concept = {
                id: guid,
                domain: domain,
                labels: {
                    el: { full: title, abbreviation: null }
                },
                systemMappings: {}
            };
        }

        if (concept.id) {
            const existingIndex = seed.concepts.findIndex(c => c.id === concept.id);
            if (existingIndex !== -1) {
                // Merge logic (shallow for now)
                seed.concepts[existingIndex] = { ...seed.concepts[existingIndex], ...concept } as Concept;
                updated++;
            } else {
                seed.concepts.push(concept as Concept);
                added++;
            }
        }
    }

    if (!options.dryRun) {
        fs.writeFileSync(seedPath, JSON.stringify(seed, null, 2));
        console.log(`✅ Successfully integrated data: ${added} added, ${updated} updated.`);
    } else {
        console.log(`📝 Dry run complete: ${added} would be added, ${updated} would be updated.`);
    }
}
