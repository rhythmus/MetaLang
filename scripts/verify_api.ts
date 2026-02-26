import fs from 'fs';
import path from 'path';
import { defaultRegistry as registry } from '../packages/core/src/registry.ts';

async function main() {
    console.log('--- MetaLang Public API Comprehensive Verification ---');

    // 1. Setup
    const ontologyPath = './ontology';
    const domainsTsv = fs.readFileSync(path.join(ontologyPath, 'domains.tsv'), 'utf8');
    const conceptsDir = path.join(ontologyPath, 'concepts');
    const conceptFiles = fs.readdirSync(conceptsDir).filter(f => f.endsWith('.tsv'));
    const conceptsTsvs = conceptFiles.map(f => fs.readFileSync(path.join(conceptsDir, f), 'utf8'));

    registry.loadTSVData(domainsTsv, conceptsTsvs);

    const plugins = [
        'packages/plugin-nl/src/manifest.json',
        'packages/plugin-en/src/manifest.json',
        'packages/plugin-el/src/manifest.json',
        'packages/plugin-nl-taalunie/src/manifest.json'
    ];

    for (const p of plugins) {
        if (fs.existsSync(p)) {
            registry.registerTagSystem(JSON.parse(fs.readFileSync(p, 'utf8')));
        }
    }
    console.log('✅ Registry initialized with core data and plugins.\n');

    // 2. Search API
    console.log('🔍 Testing Search API:');
    const searchResult = registry.search('znw');
    console.log(`   - Search "znw": Found ${searchResult.length} matches.`);
    searchResult.slice(0, 3).forEach(r => {
        console.log(`     [${r.systemId}] "${r.tag}" -> ${r.conceptId} (${r.matchType})`);
    });

    // 3. Conversion API
    console.log('\n🔄 Testing Conversion API:');
    const nlTag = 'znw';
    const elTags = registry.translateTag(nlTag, 'nl-generic', 'el-generic');
    console.log(`   - Translate "znw" (nl-generic) to el-generic: [${elTags.join(', ')}]`);

    const conceptId = 'ML_POS_NOUN';
    const enTags = registry.translateConcept(conceptId, 'en-generic');
    console.log(`   - Tags for ${conceptId} in en-generic: [${enTags.join(', ')}]`);

    // 4. Linguistic Forms API
    console.log('\n🗣️ Testing Linguistic Forms API:');
    const forms = registry.getForms('ML_EDITORIAL_eg', 'nl-taalunie');
    console.log(`   - Forms for ML_EDITORIAL_eg in nl-taalunie (via fallback):`);
    console.log(`     Singular: ${registry.getSingular('ML_EDITORIAL_eg', 'nl-taalunie').join(' | ')}`);
    console.log(`     Abbrs:    ${registry.getAbbreviations('ML_EDITORIAL_eg', 'nl-taalunie').join(', ')}`);
    console.log(`     Source:   ${forms?.sourceSystemId} (Fallback: ${forms?.isFallback})`);

    // 5. Ontology Navigation API
    console.log('\n🌳 Testing Ontology Navigation API:');
    const posConcept = registry.getConcept('ML_POS_NOUN');
    const children = registry.getChildren('ML_POS_NOUN');
    console.log(`   - Children of ML_POS_NOUN: ${children.map(c => c.id).join(', ')}`);

    const parents = registry.getParents('ML_POS_PROPER-NOUN-TOPONYM');
    console.log(`   - Parents of ML_POS_PROPER-NOUN-TOPONYM: ${parents.map(c => c.id).join(', ')}`);

    // 6. External Metadata API
    console.log('\n🌐 Testing External Metadata API:');
    console.log(`   - WikiData ID for ML_POS_NOUN: ${registry.getWikiDataId('ML_POS_NOUN')}`);
    console.log(`   - Wikipedia URL (NL): ${registry.getWikipediaUrl('ML_POS_NOUN', 'nl')}`);
    console.log(`   - Wiktionary URL (EN "noun"): ${registry.getWiktionaryUrl('noun', 'en')}`);

    // 7. System Info API
    console.log('\n📋 Testing System Info API:');
    console.log(`   - Registered Languages: ${registry.getLanguages().join(', ')}`);
    const nlSystems = registry.getSystemsByLanguage('nl');
    console.log(`   - Dutch Plugins: ${nlSystems.map(s => s.id).join(', ')}`);

    console.log('\n-------------------------------------------');
    console.log('✅ All API tests completed successfully!');
}

main().catch(err => {
    console.error('❌ API Verification Failed:', err);
    process.exit(1);
});
