import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Registry } from '../packages/core/src/registry.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verify() {
    console.log('--- Rich Punctuation Support Verification ---');
    const registry = new Registry();

    // Load Ontology
    const punctTsv = fs.readFileSync(path.resolve(__dirname, '../ontology/concepts/punctuation.tsv'), 'utf8');
    const posTsv = fs.readFileSync(path.resolve(__dirname, '../ontology/concepts/pos.tsv'), 'utf8');
    registry.loadTSVData('', [posTsv, punctTsv]);

    const plugins = [
        'en', 'nl', 'es', 'it', 'ru', 'el', 'de', 'fr', 'pt', 'br', 'cs', 'no', 'pl', 'ro'
    ];

    for (const lang of plugins) {
        const manifestPath = path.resolve(__dirname, `../packages/plugin-${lang}/src/manifest.json`);
        if (fs.existsSync(manifestPath)) {
            const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
            registry.registerTagSystem(manifest);
            const systemId = manifest.descriptor.id;

            console.log(`\n🔍 Testing [${lang.toUpperCase()}] (${systemId}):`);

            // 1. Normalization (Glyph -> ID) (registry can now find the ID from symbol!)
            const testGlyphs = ['.', ',', '?', '!'];
            if (lang === 'es') testGlyphs.push('¿', '¡');
            if (lang === 'el') testGlyphs.push(';', '·');

            for (const glyph of testGlyphs) {
                const ids = registry.resolveTag(glyph, systemId);
                const status = ids.length > 0 ? '✅' : '❌';
                console.log(`   ${status} Normalization: "${glyph}" -> ${ids.join(', ')}`);
            }

            // 2. Localization (ID -> Label/Symbol)
            const testIds = ['ML_PUNCTUATION_FULL-STOP', 'ML_PUNCTUATION_COMMA', 'ML_PUNCTUATION_QUESTION-MARK'];
            if (lang === 'es') testIds.push('ML_PUNCTUATION_QUESTION-MARK-OPEN');
            if (lang === 'el') testIds.push('ML_PUNCTUATION_INTERPUNCT');

            for (const id of testIds) {
                const mapping = registry.getLinguisticMapping(id, systemId);
                const label = mapping?.singular || (mapping as any)?.symbols?.[0] || 'N/A';
                const status = label !== 'N/A' ? '✅' : '❌';
                console.log(`   ${status} Localization: ${id} -> "${label}"`);
            }
        }
    }
}

verify().catch(console.error);
