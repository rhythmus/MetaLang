import { Registry } from '@metalang/core';
import { Concept } from '@metalang/schema';

export interface CandidateMapping {
    title: string;
    wiktionary_id: number;
    suggested_guid: string | undefined;
    confidence: number;
    domain: string | undefined;
}

/**
 * Classifies harvested Wiktionary terms by matching them against the MetaLang registry.
 */
export function classifyTerms(terms: any[], registry: Registry): CandidateMapping[] {
    const concepts = registry.listConcepts();
    const mappings: CandidateMapping[] = [];

    for (const term of terms) {
        const title = term.title.toLowerCase();
        let bestMatch: Concept | undefined = undefined;
        let maxConfidence = 0;

        for (const concept of concepts) {
            // Check all labels in all languages
            for (const locale in concept.labels) {
                const labels = concept.labels[locale];
                if (!labels) continue;

                if (labels.full && labels.full.toLowerCase() === title) {
                    bestMatch = concept;
                    maxConfidence = 1.0;
                    break;
                }

                if (labels.abbreviation?.toLowerCase() === title) {
                    bestMatch = concept;
                    maxConfidence = 0.9;
                    break;
                }
            }
            if (maxConfidence === 1.0) break;
        }

        mappings.push({
            title: term.title,
            wiktionary_id: term.id,
            suggested_guid: bestMatch?.id,
            confidence: maxConfidence,
            domain: bestMatch?.domain
        });
    }

    return mappings;
}
