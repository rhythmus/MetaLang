import { Registry } from '../packages/core/src/registry.js';
import { UD_PLUGIN_MANIFEST } from '../packages/plugin-ud/src/index.js';
import { EAGLES_PLUGIN_MANIFEST } from '../packages/plugin-eagles/src/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyPlugins() {
    const registry = new Registry();

    console.log('--- MetaLang Plugin Ecosystem Verification ---');

    // 1. Load Seed Data
    const seedPath = path.join(__dirname, '../data/metalang_seed_v1_1.json');
    const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    registry.loadSeed(seedData);
    console.log('✅ Seed data loaded.');

    // 2. Register & Validate UD Plugin
    registry.registerTagSystem(UD_PLUGIN_MANIFEST);
    const udValidation = registry.validatePlugin(UD_PLUGIN_MANIFEST.id);
    if (udValidation.valid) {
        console.log('✅ UD Plugin validated.');
    } else {
        console.error('❌ UD Plugin validation failed:');
        udValidation.errors.forEach(err => console.error(`   - ${err}`));
    }

    // 3. Register & Validate EAGLES Plugin
    registry.registerTagSystem(EAGLES_PLUGIN_MANIFEST);
    const eaglesValidation = registry.validatePlugin(EAGLES_PLUGIN_MANIFEST.id);
    if (eaglesValidation.valid) {
        console.log('✅ EAGLES Plugin validated.');
    } else {
        console.warn('⚠️ EAGLES Plugin has validation warnings (see below):');
        eaglesValidation.errors.forEach(err => console.warn(`   - ${err}`));
    }

    // 4. Test Cross-Plugin Normalization
    const testCases = [
        { systemId: 'universal-dependencies', tag: 'ADJ' },
        { systemId: 'universal-dependencies', tag: 'Gender=Fem' },
        { systemId: 'eagles-multext-east', tag: 'N' },
        { systemId: 'eagles-multext-east', tag: 'Gender=f' }
    ];

    console.log('\n🔍 Testing Normalization:');
    for (const t of testCases) {
        const concepts = registry.normalizeTag(t.tag, t.systemId);
        if (concepts.length > 0) {
            console.log(`   - [${t.systemId}] "${t.tag}" -> ${concepts.map(c => c.id).join(', ')} (${concepts[0].labels.en?.full})`);
        } else {
            console.log(`   - [${t.systemId}] "${t.tag}" -> ❌ [NO MAPPING/CONCEPT]`);
        }
    }

    console.log('-------------------------------------------');
}

verifyPlugins().catch(err => {
    console.error('❌ Verification script failed:', err);
    process.exit(1);
});
