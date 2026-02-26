import type { PluginManifest } from '@metalang/schema';

/**
 * Universal Dependencies (UD) v2 Plugin Manifest
 * Source: https://universaldependencies.org/u/pos/ and https://universaldependencies.org/u/feat/
 */
export const UD_PLUGIN_MANIFEST: PluginManifest = {
    descriptor: {
        id: 'universal-dependencies',
        name: 'Universal Dependencies (UD)',
        version: '2.1.0',
        source: {
            title: 'Universal Dependencies v2: An Evergrowing Multilingual Treebank Collection',
            author: 'Nivre, Joakim; de Marneffe, Marie-Catherine; Ginter, Filip; Hajic, Jan; Manning, Christopher D.; Pyysalo, Sampo; Sarkar, Anoop; Tyers, Francis M.; Zeman, Daniel',
            year: 2020,
            url: 'https://universaldependencies.org/u/pos/',
            retrievedAt: '2026-02-25T12:00:00Z',
            bibtex: `@inproceedings{nivre2020universal,
  title={Universal Dependencies v2: An Evergrowing Multilingual Treebank Collection},
  author={Nivre, Joakim and de Marneffe, Marie-Catherine and Ginter, Filip and Hajic, Jan and Manning, Christopher D and Pyysalo, Sampo and Sarkar, Anoop and Tyers, Francis M and Zeman, Daniel},
  booktitle={Proceedings of the 12th Language Resources and Evaluation Conference},
  pages={4034--4043},
  year={2020}
}`
        }
    },
    mappings: {
        // --- POS Tags ---
        'ADJ': ['ML_POS_ADJECTIVE'],
        'ADP': ['ML_POS_ADP'],
        'ADV': ['ML_POS_ADVERB'],
        'AUX': ['ML_POS_VERB-AUX'],
        'CCONJ': ['ML_POS_CONJ-COORD'],
        'DET': ['ML_POS_DET'],
        'INTJ': ['ML_POS_INTERJ'],
        'NOUN': ['ML_POS_NOUN'],
        'NUM': ['ML_POS_NUMERAL'],
        'PART': ['ML_POS_PTCL'],
        'PRON': ['ML_POS_PRON'],
        'PROPN': ['ML_POS_PROPER-NOUN'],
        'PUNCT': ['ML_POS_PUNCT'],
        'SCONJ': ['ML_POS_CONJ-SUB'],
        'SYM': ['ML_POS_SYMB'],
        'VERB': ['ML_POS_VERB'],
        'X': ['ML_POS_X'],

        // --- Core Features (Sample mappings) ---
        // Gender
        'Gender=Fem': ['ML_MORPH-VALUE_GENDER-FEMININE'],
        'Gender=Masc': ['ML_MORPH-VALUE_GENDER-MASCULINE'],
        'Gender=Neut': ['ML_MORPH-VALUE_GENDER-NEUTER'],

        // Number
        'Number=Sing': ['ML_MORPH-VALUE_NUMBER-SINGULAR'],
        'Number=Plur': ['ML_MORPH-VALUE_NUMBER-PLURAL'],
        'Number=Dual': ['ML_MORPH-VALUE_NUMBER-DUAL'],

        // Case
        'Case=Nom': ['ML_MORPH-VALUE_CASE-NOMINATIVE'],
        'Case=Acc': ['ML_MORPH-VALUE_CASE-ACCUSATIVE'],
        'Case=Gen': ['ML_MORPH-VALUE_CASE-GENITIVE'],
        'Case=Dat': ['ML_MORPH-VALUE_CASE-DATIVE'],
        'Case=Voc': ['ML_MORPH-VALUE_CASE-VOCATIVE'],

        // Person
        'Person=1': ['ML_MORPH-VALUE_PERSON-FIRST'],
        'Person=2': ['ML_MORPH-VALUE_PERSON-SECOND'],
        'Person=3': ['ML_MORPH-VALUE_PERSON-THIRD'],

        // Tense
        'Tense=Pres': ['ML_MORPH-VALUE_PRESENT'],
        'Tense=Past': ['ML_MORPH-VALUE_PAST'],
        'Tense=Fut': ['ML_MORPH-VALUE_FUTURE'],

        // Mood
        'Mood=Ind': ['ML_MORPH-VALUE_MOOD-INDICATIVE'],
        'Mood=Imp': ['ML_MORPH-VALUE_MOOD-IMPERATIVE'],
        'Mood=Sub': ['ML_MORPH-VALUE_MOOD-SUBJUNCTIVE'],
        'Mood=Cnd': ['ML_MORPH-VALUE_MOOD-CONDITIONAL']
    }
};

export default UD_PLUGIN_MANIFEST;
