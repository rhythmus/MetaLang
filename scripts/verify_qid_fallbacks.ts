import { Registry } from '../packages/core/src/registry.ts';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyQidFallbacks() {
    const registry = new Registry();

    console.log('--- MetaLang QID Fallback Verification ---');

    // 1. Manually load a few concepts sharing a QID
    // Let's use Q101244 (part of speech) for general concepts or search for some more specific ones.
    // In our ontology, many POS share QIDs if they are generic.

    const domainsTsv = `wikidata	parent	id	label
Q1		POS	part of speech`;

    const conceptsTsv = `wikidata	parent	id	label	description
Q12547192		ML_POS_NOUN	noun	
Q12547192		ML_POS_SUBSTANTIVE	substantive	
Q12547192		ML_POS_ZNW	zelfstandig naamwoord	`;

    registry.loadTSVData(domainsTsv, conceptsTsv);
    console.log('✅ Mock ontology loaded with sibling concepts (sharing Q12547192).');

    // 2. Register a plugin that only maps ONE of these concepts
    const mockManifest = {
        descriptor: {
            id: 'mock-nl',
            name: 'Mock Dutch',
            language: 'nl'
        },
        mappings: {
            'znw': {
                id: 'ML_POS_ZNW',
                singular: 'zelfstandig naamwoord',
                abbreviations: ['znw.']
            }
        }
    };

    registry.registerTagSystem(mockManifest as any);
    console.log('✅ Mock Dutch plugin registered (only ML_POS_ZNW is mapped).');

    // 3. Request forms for an UNMAPPED sibling
    console.log('\n🔍 Testing Sibling Fallback (Requesting ML_POS_NOUN):');
    const forms = registry.getForms('ML_POS_NOUN', 'mock-nl');

    if (forms) {
        console.log(`   - Result found via ${forms.sourceSystemId}`);
        console.log(`   - Singular: ${forms.singular}`);
        console.log(`   - isQidSibling: ${(forms as any).isQidSibling}`);

        if ((forms as any).isQidSibling) {
            console.log('   ✅ SUCCESS: Correctly fell back to sibling via QID.');
        } else {
            console.log('   ❌ FAILURE: Did not use QID fallback.');
        }
    } else {
        console.log('   ❌ FAILURE: No forms returned.');
    }

    // 4. Test priority (Direct > Language Generic > Global Generic > QID Sibling)
    console.log('\n🔍 Testing Priority (Direct Case):');
    const directForms = registry.getForms('ML_POS_ZNW', 'mock-nl');
    console.log(`   - ML_POS_ZNW (direct): ${directForms?.isFallback ? 'Fallback (Wrong)' : 'Direct Match (Correct)'}`);

    console.log('------------------------------------------');
}

verifyQidFallbacks().catch(err => {
    console.error('❌ Verification script failed:', err);
    process.exit(1);
});
