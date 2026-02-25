import { Registry } from '../packages/core/src/registry.ts';
import { UD_PLUGIN_MANIFEST } from '../packages/plugin-ud/src/index.ts';
import { EAGLES_PLUGIN_MANIFEST } from '../packages/plugin-eagles/src/index.ts';
import { manifest as EL_GR_MANIFEST } from '../packages/plugin-el-gr/src/index.ts';
import { manifest as NL_TAALUNIE_MANIFEST } from '../packages/plugin-nl-taalunie/src/index.ts';
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
    const udValidation = registry.validatePlugin(UD_PLUGIN_MANIFEST.descriptor.id);
    if (udValidation.valid) {
        console.log(`✅ UD Plugin validated.`);
    }

    // 3. Register & Validate EAGLES Plugin
    registry.registerTagSystem(EAGLES_PLUGIN_MANIFEST);
    const eaglesValidation = registry.validatePlugin(EAGLES_PLUGIN_MANIFEST.descriptor.id);
    if (eaglesValidation.valid) {
        console.log(`✅ EAGLES Plugin validated.`);
    }

    // 4. Register & Validate National Plugins
    registry.registerTagSystem(EL_GR_MANIFEST as any);
    console.log(`✅ Greek (LTT) Plugin registered.`);

    registry.registerTagSystem(NL_TAALUNIE_MANIFEST as any);
    console.log(`✅ Dutch (Taalunie) Plugin registered.`);

    // 5. Test Cross-Plugin Normalization
    const testCases = [
        { systemId: 'universal-dependencies', tag: 'ADJ' },
        { systemId: 'eagles-multext-east', tag: 'N' },
        { systemId: 'el-gr-ltt', tag: 'ΟΥΣ' },
        { systemId: 'el-gr-ltt', tag: 'ΕΠΙΘ' },
        { systemId: 'nl-taalunie', tag: 'znw' },
        { systemId: 'nl-taalunie', tag: 'v' }
    ];

    console.log('\n🔍 Testing Normalization:');
    for (const t of testCases) {
        const concepts = registry.normalizeTag(t.tag, t.systemId);
        if (concepts.length > 0) {
            console.log(`   - [${t.systemId}] "${t.tag}" -> ${concepts.map(c => c.id).join(', ')}`);
        } else {
            console.log(`   - [${t.systemId}] "${t.tag}" -> ❌ [NO MAPPING]`);
        }
    }

    console.log('-------------------------------------------');
}

verifyPlugins().catch(err => {
    console.error('❌ Verification script failed:', err);
    process.exit(1);
});
