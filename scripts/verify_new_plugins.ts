import { Registry } from '../packages/core/src/registry.ts';
import { manifest as ES_GENERIC_MANIFEST } from '../packages/plugin-es/src/index.ts';
import { manifest as IT_GENERIC_MANIFEST } from '../packages/plugin-it/src/index.ts';
import { manifest as RU_GENERIC_MANIFEST } from '../packages/plugin-ru/src/index.ts';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyNewPlugins() {
    const registry = new Registry();

    console.log('--- MetaLang New Plugins Verification (ES, IT, RU) ---');

    // 1. Load Core Data
    const ontologyPath = path.join(__dirname, '../ontology');
    const domainsPath = path.join(ontologyPath, 'domains.tsv');
    const domainsTsv = fs.readFileSync(domainsPath, 'utf8');

    const conceptsDir = path.join(ontologyPath, 'concepts');
    const conceptFiles = fs.readdirSync(conceptsDir).filter(f => f.endsWith('.tsv'));
    const conceptsTsvs = conceptFiles.map(f => fs.readFileSync(path.join(conceptsDir, f), 'utf8'));

    registry.loadTSVData(domainsTsv, conceptsTsvs);
    console.log(`✅ Core data loaded from TSVs (${conceptFiles.length} files).`);

    // 2. Register Plugins
    registry.registerTagSystem(ES_GENERIC_MANIFEST as any);
    console.log(`✅ Spanish (Generic) Plugin registered.`);
    registry.registerTagSystem(IT_GENERIC_MANIFEST as any);
    console.log(`✅ Italian (Generic) Plugin registered.`);
    registry.registerTagSystem(RU_GENERIC_MANIFEST as any);
    console.log(`✅ Russian (Generic) Plugin registered.`);

    // 3. Test Normalization
    const testCases = [
        // Spanish
        { systemId: 'es-generic', tag: 'sust.', expected: 'ML_POS_NOUN' },
        { systemId: 'es-generic', tag: 'adj', expected: 'ML_POS_ADJECTIVE' },
        // Italian
        { systemId: 'it-generic', tag: 'agg.', expected: 'ML_POS_ADJECTIVE' },
        { systemId: 'it-generic', tag: 'sost.', expected: 'ML_POS_NOUN' },
        // Russian
        { systemId: 'ru-generic', tag: 'сущ.', expected: 'ML_POS_NOUN' },
        { systemId: 'ru-generic', tag: 'гл.', expected: 'ML_POS_VERB' }
    ];

    console.log('\n🔍 Testing Normalization:');
    for (const t of testCases) {
        const result = registry.resolveTag(t.tag, t.systemId);
        const resolved = result.length > 0 ? result.join(', ') : '❌ [NO MAPPING]';
        console.log(`   - [${t.systemId}] "${t.tag}" -> ${resolved}`);
    }

    // 4. Test Localization
    const localizationTests = [
        { conceptId: 'ML_POS_NOUN', systemId: 'es-generic' },
        { conceptId: 'ML_POS_NOUN', systemId: 'it-generic' },
        { conceptId: 'ML_POS_NOUN', systemId: 'ru-generic' }
    ];

    console.log('\n🔍 Testing Localization:');
    for (const test of localizationTests) {
        const mapping = registry.getLinguisticMapping(test.conceptId, test.systemId);
        if (mapping) {
            console.log(`   - [${test.systemId}] ${test.conceptId}: ${mapping.singular}`);
        } else {
            console.log(`   - [${test.systemId}] ${test.conceptId}: ❌ [NOT FOUND]`);
        }
    }

    console.log('-------------------------------------------');
}

verifyNewPlugins().catch(err => {
    console.error('❌ Verification script failed:', err);
    process.exit(1);
});
