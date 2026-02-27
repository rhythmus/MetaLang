import { Domain, Concept } from '@metalang/schema';

/**
 * Utility for parsing MetaLang TSV data formats.
 */
export class TSVLoader {
    /**
     * Parse domains from a TSV string.
     */
    public static parseDomains(content: string): Domain[] {
        const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#')).slice(1);
        return lines.map(line => {
            const parts = line.split('\t').map(s => s.trim());
            return {
                wikidata: parts[0] || '',
                parent: parts[1] || '',
                id: parts[2] || '',
                label: parts[3] || ''
            };
        });
    }

    /**
     * Parse concepts from a TSV string.
     */
    public static parseConcepts(content: string): Concept[] {
        const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#')).slice(1);
        return lines.map(line => {
            const parts = line.split('\t').map(s => s.trim());
            const wikidata = parts[0] || '';
            const parent = parts[1] || '';
            const id = parts[2] || '';
            const label = parts[3] || '';
            const description = parts[4] || '';
            const wiktionary = parts[5] || '';

            // Derive domain from ML_ID (e.g. ML_POS_NOUN -> POS)
            const idParts = id.split('_');
            const domain = idParts.length >= 2 ? idParts[1] : 'CUSTOM';

            return {
                domain: domain || 'CUSTOM',
                parent: parent ? parent.split(',').map(p => p.trim()) : [],
                wikidata,
                id,
                label,
                description: description || undefined,
                wiktionary: wiktionary || undefined
            };
        });
    }
}
