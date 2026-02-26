import { Registry } from '../packages/core/src/registry.ts';
import { UD_PLUGIN_MANIFEST } from '../packages/plugin-ud/src/index.ts';
import { EAGLES_PLUGIN_MANIFEST } from '../packages/plugin-eagles/src/index.ts';
import { manifest as EL_GR_MANIFEST } from '../packages/plugin-el-ΓΝΕΓ/src/index.ts';
import { manifest as NL_TAALUNIE_MANIFEST } from '../packages/plugin-nl-taalunie/src/index.ts';
import { manifest as NL_GENERIC_MANIFEST } from '../packages/plugin-nl/src/index.ts';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyPlugins() {
    const registry = new Registry();

    console.log('--- MetaLang Plugin Ecosystem Verification ---');

    // 1. Load Core Data
    const domainsPath = path.join(__dirname, '../ontology/domains.tsv');
    const domainsTsv = fs.readFileSync(domainsPath, 'utf8');

    const conceptsDir = path.join(__dirname, '../ontology/concepts');
    const conceptFiles = fs.readdirSync(conceptsDir).filter(f => f.endsWith('.tsv'));
    const conceptsTsvs = conceptFiles.map(f => fs.readFileSync(path.join(conceptsDir, f), 'utf8'));

    registry.loadTSVData(domainsTsv, conceptsTsvs);
    console.log(`✅ Core data loaded from TSVs (${conceptFiles.length} files).`);

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

    registry.registerTagSystem(NL_GENERIC_MANIFEST as any);
    console.log(`✅ Dutch (Generic) Plugin registered.`);

    // 5. Test Cross-Plugin Normalization
    const testCases = [
        { systemId: 'universal-dependencies', tag: 'ADJ' },
        { systemId: 'eagles-multext-east', tag: 'N' },
        { systemId: 'el-gr-ltt', tag: 'ΟΥΣ' },
        { systemId: 'el-gr-ltt', tag: 'ΕΠΙΘ' },
        { systemId: 'nl-taalunie', tag: 'znw' },
        { systemId: 'nl-taalunie', tag: 'v' },
        { systemId: 'nl-generic', tag: 'znw.' },
        { systemId: 'nl-generic', tag: 'bv.' },
        { systemId: 'nl-generic', tag: 'enz.' }
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
