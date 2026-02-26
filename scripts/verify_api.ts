import fs from 'fs';
import path from 'path';
import { defaultRegistry as registry } from '../packages/core/src/registry.js';

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
        'packages/plugin-nl-taalunie/src/manifest.json',
        'packages/plugin-pt/src/manifest.json',
        'packages/plugin-no/src/manifest.json',
        'packages/plugin-cs/src/manifest.json',
        'packages/plugin-fr/src/manifest.json',
        'packages/plugin-br/src/manifest.json',
        'packages/plugin-de/src/manifest.json',
        'packages/plugin-pl/src/manifest.json',
        'packages/plugin-ro/src/manifest.json'
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
    searchResult.slice(0, 3).forEach((r: any) => {
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
    console.log(`   - Children of ML_POS_NOUN: ${children.map((c: any) => c.id).join(', ')}`);

    const parents = registry.getParents('ML_POS_PROPER-NOUN-TOPONYM');
    console.log(`   - Parents of ML_POS_PROPER-NOUN-TOPONYM: ${parents.map((c: any) => c.id).join(', ')}`);

    // 6. External Metadata API
    console.log('\n🌐 Testing External Metadata API:');
    console.log(`   - WikiData ID for ML_POS_NOUN: ${registry.getWikiDataId('ML_POS_NOUN')}`);
    console.log(`   - Wikipedia URL (NL): ${registry.getWikipediaUrl('ML_POS_NOUN', 'nl')}`);
    console.log(`   - Wiktionary URL (EN "noun"): ${registry.getWiktionaryUrl('noun', 'en')}`);

    // 7. System Info API
    console.log('\n📋 Testing System Info API:');
    console.log(`   - Registered Languages: ${registry.getLanguages().join(', ')}`);
    const nlSystems = registry.getSystemsByLanguage('nl');
    console.log(`   - Dutch Plugins: ${nlSystems.map((s: any) => s.id).join(', ')}`);

    const ptSystems = registry.getSystemsByLanguage('pt');
    console.log(`   - Portuguese Plugins: ${ptSystems.map((s: any) => s.id).join(', ')}`);

    const frSystems = registry.getSystemsByLanguage('fr');
    console.log(`   - French Plugins: ${frSystems.map((s: any) => s.id).join(', ')}`);

    const brSystems = registry.getSystemsByLanguage('br');
    console.log(`   - Breton Plugins: ${brSystems.map((s: any) => s.id).join(', ')}`);

    const deSystems = registry.getSystemsByLanguage('de');
    console.log(`   - German Plugins: ${deSystems.map((s: any) => s.id).join(', ')}`);

    const plSystems = registry.getSystemsByLanguage('pl');
    console.log(`   - Polish Plugins: ${plSystems.map((s: any) => s.id).join(', ')}`);

    const roSystems = registry.getSystemsByLanguage('ro');
    console.log(`   - Romanian Plugins: ${roSystems.map((s: any) => s.id).join(', ')}`);

    // 8. Portuguese Specific Verification
    console.log('\n🇵🇹 Testing Portuguese Specific Mappings:');
    const ptTerm = 'oxítona';
    const ptResult = registry.search(ptTerm).filter((r: any) => r.systemId === 'pt-generic');
    if (ptResult.length > 0) {
        console.log(`   - Search "${ptTerm}" in pt-generic: Found ${ptResult[0].conceptId}`);
        const ptForms = registry.getForms(ptResult[0].conceptId, 'pt-generic');
        console.log(`     Singular: ${ptForms?.singular}`);
        console.log(`     Plural:   ${ptForms?.plural}`);
    } else {
        console.log(`   - Search "${ptTerm}" in pt-generic: NOT FOUND`);
    }

    // 9. Norwegian Specific Verification
    console.log('\n🇳🇴 Testing Norwegian Specific Mappings:');
    const noTerm = 'dialekt';
    const noResult = registry.search(noTerm).filter((r: any) => r.systemId === 'no-generic');
    if (noResult.length > 0) {
        console.log(`   - Search "${noTerm}" in no-generic: Found ${noResult[0].conceptId}`);
    } else {
        console.log(`   - Search "${noTerm}" in no-generic: NOT FOUND`);
    }

    // 10. Czech Specific Verification
    console.log('\n🇨🇿 Testing Czech Specific Mappings:');
    const csTerm = 'abessiv';
    const csResult = registry.search(csTerm).filter((r: any) => r.systemId === 'cs-generic');
    if (csResult.length > 0) {
        console.log(`   - Search "${csTerm}" in cs-generic: Found ${csResult[0].conceptId}`);
    } else {
        console.log(`   - Search "${csTerm}" in cs-generic: NOT FOUND`);
    }

    // 11. French Specific Verification
    console.log('\n🇫🇷 Testing French Specific Mappings:');
    const frTerm = 'passé simple';
    const frResult = registry.search(frTerm).filter((r: any) => r.systemId === 'fr-generic');
    if (frResult.length > 0) {
        console.log(`   - Search "${frTerm}" in fr-generic: Found ${frResult[0].conceptId}`);
    } else {
        console.log(`   - Search "${frTerm}" in fr-generic: NOT FOUND`);
    }

    // 12. Breton Specific Verification
    console.log('\n🇧🇷 Testing Breton Specific Mappings:');
    const brTerm = 'anadiplozenn';
    const brResult = registry.search(brTerm).filter((r: any) => r.systemId === 'br-generic');
    if (brResult.length > 0) {
        console.log(`   - Search "${brTerm}" in br-generic: Found ${brResult[0].conceptId}`);
    } else {
        console.log(`   - Search "${brTerm}" in br-generic: NOT FOUND`);
    }

    // 13. German Specific Verification
    console.log('\n🇩🇪 Testing German Specific Mappings:');
    const deTerm = 'akrostichon';
    const deResult = registry.search(deTerm).filter((r: any) => r.systemId === 'de-generic');
    if (deResult.length > 0) {
        console.log(`   - Search "${deTerm}" in de-generic: Found ${deResult[0].conceptId}`);
    } else {
        console.log(`   - Search "${deTerm}" in de-generic: NOT FOUND`);
    }

    // 14. Polish Specific Verification
    console.log('\n🇵🇱 Testing Polish Specific Mappings:');
    const plTerm = 'alegoria';
    const plResult = registry.search(plTerm).filter((r: any) => r.systemId === 'pl-generic');
    if (plResult.length > 0) {
        console.log(`   - Search "${plTerm}" in pl-generic: Found ${plResult[0].conceptId}`);
    } else {
        console.log(`   - Search "${plTerm}" in pl-generic: NOT FOUND`);
    }

    // 15. Romanian Specific Verification
    console.log('\n🇷🇴 Testing Romanian Specific Mappings:');
    const roTerm = 'acumulare';
    const roResult = registry.search(roTerm).filter((r: any) => r.systemId === 'ro-generic');
    if (roResult.length > 0) {
        console.log(`   - Search "${roTerm}" in ro-generic: Found ${roResult[0].conceptId}`);
    } else {
        console.log(`   - Search "${roTerm}" in ro-generic: NOT FOUND`);
    }

    // 16. Dutch Rhetorical Verification
    console.log('\n🇳🇱 Testing Dutch Rhetorical Mappings:');
    const nlTerm = 'eufemisme';
    const nlResult = registry.search(nlTerm).filter((r: any) => r.systemId === 'nl-generic');
    if (nlResult.length > 0) {
        console.log(`   - Search "${nlTerm}" in nl-generic: Found ${nlResult[0].conceptId}`);
    } else {
        console.log(`   - Search "${nlTerm}" in nl-generic: NOT FOUND`);
    }

    console.log('\n-------------------------------------------');
    console.log('✅ All API tests completed successfully!');
}

main().catch(err => {
    console.error('❌ API Verification Failed:', err);
    process.exit(1);
});
