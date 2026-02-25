import { CandidateMapping } from './classify.js';

/**
 * Exports candidate mappings to a TSV string for human curation.
 */
export function exportToTSV(mappings: CandidateMapping[]): string {
    const header = ['Title', 'Wiktionary ID', 'Suggested GUID', 'Confidence', 'Domain'].join('\t');
    const rows = mappings.map(m => [
        m.title,
        m.wiktionary_id,
        m.suggested_guid || '',
        m.confidence.toFixed(2),
        m.domain || ''
    ].join('\t'));

    return [header, ...rows].join('\n');
}
