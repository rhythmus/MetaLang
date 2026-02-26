import { Registry } from '../packages/core/src/registry.js';
import { UD_PLUGIN_MANIFEST } from '../packages/plugin-ud/src/index.js';
import type { Concept } from '@metalang/schema';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runVerification() {
    const registry = new Registry();

    console.log('--- MetaLang Verification ---');

    // 1. Load TSV Data
    const domainsPath = path.join(__dirname, '../data/domains.tsv');
    const conceptsPath = path.join(__dirname, '../data/concepts.tsv');

    if (!fs.existsSync(domainsPath)) {
        throw new Error(`TSV file not found: domains.tsv`);
    }

    const domainsTsv = fs.readFileSync(domainsPath, 'utf8');

    // Read all concept files from data/concepts/
    const conceptsDir = path.join(__dirname, '../data/concepts');
    const conceptFiles = fs.readdirSync(conceptsDir).filter(f => f.endsWith('.tsv'));
    const conceptsTsvs = conceptFiles.map(f => fs.readFileSync(path.join(conceptsDir, f), 'utf8'));

    registry.loadTSVData(domainsTsv, conceptsTsvs);
    console.log(`✅ Core data loaded from TSVs (${conceptFiles.length} files).`);

    // 2. Register UD Plugin
    registry.registerTagSystem(UD_PLUGIN_MANIFEST);
    console.log('✅ UD Plugin registered.');

    // 3. Test Normalization
    const testTag = 'ADJ';
    const concepts = registry.normalizeTag(testTag, 'universal-dependencies');

    if (concepts.length > 0) {
        console.log(`✅ Successfully normalized "${testTag}" to:`);
        concepts.forEach((concept: Concept) => {
            console.log(`   - ID: ${concept.id}`);
            console.log(`   - Domain: ${concept.domain}`);
            console.log(`   - Label: ${concept.label}`);
        });
    } else {
        console.error(`❌ Failed to normalize "${testTag}"`);
    }

    // 4. Test Hierarchy
    const childId = 'ML_POS_ART-DEF'; // Definite Article
    const parents = registry.getParents(childId);
    console.log(`\n🔍 Checking parents for ${childId}:`);
    if (parents.length > 0) {
        parents.forEach((p: Concept) => {
            console.log(`   - Parent: ${p.id} (${p.label})`);
        });
    } else {
        console.log('   (No parents found - check seed data mapping)');
    }

    console.log('----------------------------');
}

runVerification().catch(err => {
    console.error('❌ Verification failed:', err);
    process.exit(1);
});
