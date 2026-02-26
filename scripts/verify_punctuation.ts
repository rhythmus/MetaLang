import { Registry } from '../packages/core/src/registry.ts';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadManifest(pluginDir: string) {
    const manifestPath = path.join(__dirname, `../packages/${pluginDir}/src/manifest.json`);
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

async function verifyPunctuation() {
    const registry = new Registry();

    console.log('--- MetaLang Punctuation Support Verification (Standalone) ---');

    // 1. Load Core Data
    const ontologyPath = path.join(__dirname, '../ontology');
    const domainsPath = path.join(ontologyPath, 'domains.tsv');
    const domainsTsv = fs.readFileSync(domainsPath, 'utf8');

    const conceptsDir = path.join(ontologyPath, 'concepts');
    const conceptFiles = fs.readdirSync(conceptsDir).filter(f => f.endsWith('.tsv'));
    const conceptsTsvs = conceptFiles.map(f => fs.readFileSync(path.join(conceptsDir, f), 'utf8'));

    registry.loadTSVData(domainsTsv, conceptsTsvs);
    console.log(`✅ Core data loaded from TSVs (${conceptFiles.length} files).`);

    // 2. Register Plugins (Direct JSON load)
    const plugins = ['plugin-en', 'plugin-es', 'plugin-el', 'plugin-it', 'plugin-fr', 'plugin-nl'];
    for (const p of plugins) {
        try {
            const manifest = loadManifest(p);
            registry.registerTagSystem(manifest);
            console.log(`✅ Registered ${p}`);
        } catch (e) {
            console.error(`❌ Failed to load ${p}:`, e.message);
        }
    }

    // 3. Test Punctuation Resolution (Tag -> Concept)
    const normalizationTests = [
        { systemId: 'en-generic', tag: '.', expected: ['ML_PUNCTUATION_FULL-STOP'] },
        { systemId: 'es-generic', tag: '¿', expected: ['ML_PUNCTUATION_OPEN-QUESTION'] },
        { systemId: 'es-generic', tag: '¡', expected: ['ML_PUNCTUATION_OPEN-EXCLAMATION'] },
        { systemId: 'el-generic', tag: ';', expected: ['ML_PUNCTUATION_QUESTION-MARK'] },
        { systemId: 'el-generic', tag: '·', expected: ['ML_PUNCTUATION_GREEK-SEMICOLON'] },
        { systemId: 'nl-generic', tag: '?', expected: ['ML_PUNCTUATION_QUESTION-MARK'] }
    ];

    console.log('\n🔍 Testing Punctuation Normalization (Tag -> Concept ID):');
    for (const t of normalizationTests) {
        const result = registry.resolveTag(t.tag, t.systemId);
        const success = result.length > 0 && t.expected.every(e => result.includes(e));
        const status = success ? '✅' : '❌';
        console.log(`   ${status} [${t.systemId}] "${t.tag}" -> ${result.join(', ') || '[NONE]'}`);
    }

    // 4. Test Concept Translation (Concept ID -> Glyph)
    const translationTests = [
        { conceptId: 'ML_PUNCTUATION_FULL-STOP', systemId: 'en-generic', expected: '.' },
        { conceptId: 'ML_PUNCTUATION_OPEN-QUESTION', systemId: 'es-generic', expected: '¿' },
        { conceptId: 'ML_PUNCTUATION_QUESTION-MARK', systemId: 'el-generic', expected: ';' },
        { conceptId: 'ML_PUNCTUATION_GREEK-SEMICOLON', systemId: 'el-generic', expected: '·' }
    ];

    console.log('\n🔍 Testing Punctuation Translation (Concept ID -> Glyph):');
    for (const test of translationTests) {
        const tags = registry.translateConcept(test.conceptId, test.systemId);
        const success = tags.includes(test.expected);
        const status = success ? '✅' : '❌';
        console.log(`   ${status} [${test.systemId}] ${test.conceptId} -> ${tags.join(', ') || '[NONE]'}`);
    }

    console.log('\n--- Verification Complete ---');
}

verifyPunctuation().catch(err => {
    console.error('❌ Verification script failed:', err);
    process.exit(1);
});
