import type { Concept } from '@metalang/schema';

export interface PatchOperation {
    op: 'add' | 'remove' | 'replace';
    path: string;
    value?: any;
}

/**
 * Generates a JSON Patch (RFC 6902) by comparing updated concepts against original seed data.
 */
export function generatePatch(original: Concept[], updated: Concept[]): PatchOperation[] {
    const patch: PatchOperation[] = [];
    const originalMap = new Map(original.map(c => [c.id, c]));
    const updatedMap = new Map(updated.map(c => [c.id, c]));

    // Find added or modified concepts
    for (const [id, updatedConcept] of updatedMap.entries()) {
        const originalConcept = originalMap.get(id);

        if (!originalConcept) {
            // New concept
            patch.push({
                op: 'add',
                path: `/concepts/${id}`,
                value: updatedConcept
            });
            continue;
        }

        // Compare fields (simplified for now: check labels, parents, domain)
        if (JSON.stringify(updatedConcept.labels) !== JSON.stringify(originalConcept.labels)) {
            patch.push({
                op: 'replace',
                path: `/concepts/${id}/labels`,
                value: updatedConcept.labels
            });
        }

        if (JSON.stringify(updatedConcept.parents) !== JSON.stringify(originalConcept.parents)) {
            patch.push({
                op: 'replace',
                path: `/concepts/${id}/parents`,
                value: updatedConcept.parents
            });
        }

        if (updatedConcept.domain !== originalConcept.domain) {
            patch.push({
                op: 'replace',
                path: `/concepts/${id}/domain`,
                value: updatedConcept.domain
            });
        }
    }

    // Find removed concepts
    for (const id of originalMap.keys()) {
        if (!updatedMap.has(id)) {
            patch.push({
                op: 'remove',
                path: `/concepts/${id}`
            });
        }
    }

    return patch;
}
