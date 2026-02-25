import { Registry } from '../packages/core/src/registry.js';
import { UD_PLUGIN_MANIFEST } from '../packages/plugin-ud/src/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runVerification() {
    const registry = new Registry();

    console.log('--- MetaLang Verification ---');

    // 1. Load Seed Data
    const seedPath = path.join(__dirname, '../data/metalang_seed_v1_1.json');
    if (!fs.existsSync(seedPath)) {
        throw new Error(`Seed file not found at ${seedPath}`);
    }
    const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    registry.loadSeed(seedData);
    console.log('✅ Seed data loaded.');

    // 2. Register UD Plugin
    registry.registerTagSystem(UD_PLUGIN_MANIFEST);
    console.log('✅ UD Plugin registered.');

    // 3. Test Normalization
    const testTag = 'ADJ';
    const concepts = registry.normalizeTag(testTag, 'universal-dependencies');

    if (concepts.length > 0) {
        console.log(`✅ Successfully normalized "${testTag}" to:`);
        concepts.forEach(c => {
            console.log(`   - ID: ${c.id}`);
            console.log(`   - Domain: ${c.domain}`);
            console.log(`   - Labels (en): ${c.labels.en?.full}`);
        });
    } else {
        console.error(`❌ Failed to normalize "${testTag}"`);
    }

    // 4. Test Hierarchy
    const childId = 'ML_CUSTOM_ART_DEF'; // Definite Article
    const parents = registry.getParents(childId);
    console.log(`\n🔍 Checking parents for ${childId}:`);
    if (parents.length > 0) {
        parents.forEach(p => {
            console.log(`   - Parent: ${p.id} (${p.labels.en?.full})`);
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
