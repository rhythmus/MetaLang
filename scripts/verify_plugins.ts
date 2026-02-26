import { Registry } from '../packages/core/src/registry.ts';
import { UD_PLUGIN_MANIFEST } from '../packages/plugin-UD/src/index.ts';
import { EAGLES_PLUGIN_MANIFEST } from '../packages/plugin-EAGLES/src/index.ts';
import { manifest as EL_GR_MANIFEST } from '../packages/plugin-el-ΓΝΕΓ/src/index.ts';
import { manifest as NL_TAALUNIE_MANIFEST } from '../packages/plugin-nl-Taalunie/src/index.ts';
import { manifest as NL_GENERIC_MANIFEST } from '../packages/plugin-nl/src/index.ts';
import { manifest as EN_GENERIC_MANIFEST } from '../packages/plugin-en/src/index.ts';
import { manifest as EL_GENERIC_MANIFEST } from '../packages/plugin-el/src/index.ts';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyPlugins() {
    const registry = new Registry();

    console.log('--- MetaLang Plugin Ecosystem Verification ---');

    // 1. Load Core Data
    const ontologyPath = path.join(__dirname, '../ontology');
    const domainsPath = path.join(ontologyPath, 'domains.tsv');
    const domainsTsv = fs.readFileSync(domainsPath, 'utf8');

    const conceptsDir = path.join(ontologyPath, 'concepts');
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

    registry.registerTagSystem(EN_GENERIC_MANIFEST as any);
    console.log(`✅ English (Generic) Plugin registered.`);

    registry.registerTagSystem(EL_GENERIC_MANIFEST as any);
    console.log(`✅ Greek (Generic) Plugin registered.`);

    // 5. Test Cross-Plugin Normalization
    const testCases = [
        { systemId: 'universal-dependencies', tag: 'ADJ' },
        { systemId: 'eagles-multext-east', tag: 'N' },
        { systemId: 'el-gr-ltt', tag: 'ΟΥΣ' },
        { systemId: 'el-gr-ltt', tag: 'ΕΠΙΘ' },
        { systemId: 'nl-taalunie', tag: 'znw' },
        { systemId: 'nl-taalunie', tag: 'v' },
        { systemId: 'nl-generic', tag: 'znw.', expected: 'ML_POS_NOUN' },
        { systemId: 'nl-generic', tag: 'znw', expected: 'ML_POS_NOUN' }, // Test dot-stripping
        { systemId: 'nl-generic', tag: 'bv.', expected: 'ML_EDITORIAL_eg' },
        { systemId: 'nl-generic', tag: 'bv', expected: 'ML_EDITORIAL_eg' }, // Test dot-stripping
        { systemId: 'nl-generic', tag: 'enz.', expected: 'ML_EDITORIAL_etc' },
        { systemId: 'en-generic', tag: 'n.', expected: 'ML_POS_NOUN' },
        { systemId: 'en-generic', tag: 'n', expected: 'ML_POS_NOUN' },  // Test dot-stripping
        { systemId: 'en-generic', tag: 'e.g.', expected: 'ML_EDITORIAL_eg' },
        { systemId: 'en-generic', tag: 'eg', expected: 'ML_EDITORIAL_eg' }, // Test dot-stripping
        { systemId: 'el-generic', tag: 'ουσ.', expected: 'ML_POS_NOUN' },
        { systemId: 'el-generic', tag: 'ουσ', expected: 'ML_POS_NOUN' }, // Test dot-stripping
        { systemId: 'el-generic', tag: 'κλπ.', expected: 'ML_EDITORIAL_etc' }
    ];

    console.log('\n🔍 Testing Normalization:');
    for (const t of testCases) {
        const result = registry.resolveTag(t.tag, t.systemId);
        const resolved = result.length > 0 ? result.join(', ') : '❌ [NO MAPPING]';
        console.log(`   - [${t.systemId}] "${t.tag}" -> ${resolved}`);
    }

    console.log('\n🔍 Testing Localization (Rich Mappings):');
    const localizationTests = [
        { conceptId: 'ML_POS_NOUN', systemId: 'nl-generic' },
        { conceptId: 'ML_POS_NOUN', systemId: 'en-generic' },
        { conceptId: 'ML_POS_NOUN', systemId: 'el-generic' },
        { conceptId: 'ML_EDITORIAL_eg', systemId: 'nl-generic' },
        { conceptId: 'ML_EDITORIAL_eg', systemId: 'en-generic' },
        { conceptId: 'ML_POS_NUMERAL-COLLECTIVE', systemId: 'en-generic' },
        { conceptId: 'ML_CUSTOM_PASS', systemId: 'nl-generic' }
    ];

    for (const test of localizationTests) {
        const mapping = registry.getLinguisticMapping(test.conceptId, test.systemId);
        if (mapping) {
            console.log(`   - [${test.systemId}] ${test.conceptId}:`);
            const s = mapping.singular;
            const p = mapping.plural;
            console.log(`     Singular: ${Array.isArray(s) ? s.join(' | ') : (s || '-')}`);
            console.log(`     Plural:   ${Array.isArray(p) ? p.join(' | ') : (p || '-')}`);
            console.log(`     Abbrs:    ${mapping.abbreviations?.join(', ') || '-'}`);
        } else {
            console.log(`   - [${test.systemId}] ${test.conceptId}: ❌ [NOT FOUND]`);
        }
    }

    console.log('\n🔍 Testing Hierarchical Fallback:');
    const fallbackTests = [
        { conceptId: 'ML_POS_NOUN', systemId: 'nl-taalunie' },       // 1. Direct match
        { conceptId: 'ML_EDITORIAL_eg', systemId: 'nl-taalunie' },   // 2. Language Fallback (to nl-generic)
        { conceptId: 'ML_CUSTOM_N-ABBR', systemId: 'nl-taalunie' },  // 3. Global Fallback (to en-generic)
        { conceptId: 'ML_DERIVATION_AFFIX', systemId: 'nl-taalunie' } // 4. Ontology Fallback
    ];

    for (const test of fallbackTests) {
        const resolved = registry.resolveLinguisticMapping(test.conceptId, test.systemId);
        if (resolved) {
            const status = resolved.isFallback ? `[FALLBACK: ${resolved.sourceSystemId}]` : '[DIRECT]';
            const term = Array.isArray(resolved.singular) ? resolved.singular[0] : resolved.singular;
            console.log(`   - [${test.systemId}] ${test.conceptId} -> "${term}" ${status}`);
        } else {
            console.log(`   - [${test.systemId}] ${test.conceptId} -> ❌ [NOT RESOLVED]`);
        }
    }

    console.log('-------------------------------------------');
}

verifyPlugins().catch(err => {
    console.error('❌ Verification script failed:', err);
    process.exit(1);
});
