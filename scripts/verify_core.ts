import { Registry } from '../packages/core/src/registry.ts';
import { UD_PLUGIN_MANIFEST } from '../packages/plugin-UD/src/index.ts';
import { LEXILOGIO_PLUGIN_MANIFEST } from '../packages/plugin-Lexilogio/src/index.ts';
import { INTERA_PLUGIN_MANIFEST } from '../packages/plugin-intera/src/index.ts';
import { PTB_PLUGIN_MANIFEST } from '../packages/plugin-ptb/src/index.ts';
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
    const domainsPath = path.join(__dirname, '../ontology/domains.tsv');
    const conceptsPath = path.join(__dirname, '../ontology/concepts.tsv');

    if (!fs.existsSync(domainsPath)) {
        throw new Error(`TSV file not found: domains.tsv`);
    }

    const domainsTsv = fs.readFileSync(domainsPath, 'utf8');

    // Read all concept files from ontology/concepts/
    const conceptsDir = path.join(__dirname, '../ontology/concepts');
    const conceptFiles = fs.readdirSync(conceptsDir).filter(f => f.endsWith('.tsv'));
    const conceptsTsvs = conceptFiles.map(f => fs.readFileSync(path.join(conceptsDir, f), 'utf8'));

    registry.loadTSVData(domainsTsv, conceptsTsvs);
    console.log(`✅ Core data loaded from TSVs (${conceptFiles.length} files).`);

    // 2. Register Plugins
    registry.registerTagSystem(UD_PLUGIN_MANIFEST);
    console.log('✅ UD Plugin registered.');

    registry.registerTagSystem(LEXILOGIO_PLUGIN_MANIFEST);
    console.log('✅ Lexilogio Plugin registered.');

    registry.registerTagSystem(INTERA_PLUGIN_MANIFEST);
    console.log('✅ INTERA Plugin registered.');

    registry.registerTagSystem(PTB_PLUGIN_MANIFEST);
    console.log('✅ PTB Plugin registered.');

    // 3. Test Normalization
    const testTag = 'ADJ';
    const concepts = registry.normalizeTag(testTag, 'universal-dependencies');

    if (concepts.length > 0) {
        console.log(`✅ Successfully normalized "${testTag}" to: ${concepts.map(c => c.id).join(', ')}`);
    } else {
        console.error(`❌ Failed to normalize "${testTag}"`);
    }

    // Test Lexilogio
    const lexTag = 'n';
    const lexConcepts = registry.normalizeTag(lexTag, 'lexilogio');
    if (lexConcepts.length > 0) {
        console.log(`✅ Normalized Lexilogio "${lexTag}" -> ${lexConcepts[0].id}`);
    }

    // Test INTERA
    const interaTag = 'No';
    const interaConcepts = registry.normalizeTag(interaTag, 'intera');
    if (interaConcepts.length > 0) {
        console.log(`✅ Normalized INTERA "${interaTag}" -> ${interaConcepts[0].id}`);
    }

    // Test PTB
    const ptbTag = 'NN';
    const ptbConcepts = registry.normalizeTag(ptbTag, 'penn-treebank');
    if (ptbConcepts.length > 0) {
        console.log(`✅ Normalized PTB "${ptbTag}" -> ${ptbConcepts[0].id}`);
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
