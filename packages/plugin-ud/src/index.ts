import type { PluginManifest } from '@metalang/schema';

/**
 * Universal Dependencies (UD) v2 Plugin Manifest
 * Source: https://universaldependencies.org/u/pos/ and https://universaldependencies.org/u/feat/
 */
export const UD_PLUGIN_MANIFEST: PluginManifest = {
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
    },
    mappings: {
        // --- POS Tags ---
        'ADJ': ['ML_POS_ADJECTIVE'],
        'ADP': ['ML_POS_ADP'],
        'ADV': ['ML_POS_ADVERB'],
        'AUX': ['ML_POS_V_AUX'],
        'CCONJ': ['ML_POS_CONJ_COORD'],
        'DET': ['ML_POS_DET'],
        'INTJ': ['ML_POS_INTERJ'],
        'NOUN': ['ML_POS_NOUN'],
        'NUM': ['ML_POS_NUMERAL'],
        'PART': ['ML_POS_PTCL'],
        'PRON': ['ML_POS_PRON'],
        'PROPN': ['ML_POS_NOUN_PROP'],
        'PUNCT': ['ML_POS_PUNCT'],
        'SCONJ': ['ML_POS_CONJ_SUB'],
        'SYM': ['ML_POS_SYMB'],
        'VERB': ['ML_POS_VERB'],
        'X': ['ML_POS_X'],

        // --- Core Features (Sample mappings) ---
        // Gender
        'Gender=Fem': ['ML_MORPH_VAL_FEMALE'],
        'Gender=Masc': ['ML_MORPH_VAL_MALE'],
        'Gender=Neut': ['ML_MORPH_VAL_NEUTER'],

        // Number
        'Number=Sing': ['ML_MORPH_VAL_SINGULAR'],
        'Number=Plur': ['ML_MORPH_VAL_PLURAL'],
        'Number=Dual': ['ML_MORPH_VAL_DUAL'],

        // Case
        'Case=Nom': ['ML_MORPH_VAL_NOMINATIVE'],
        'Case=Acc': ['ML_MORPH_VAL_ACCUSATIVE'],
        'Case=Gen': ['ML_MORPH_VAL_GENITIVE'],
        'Case=Dat': ['ML_MORPH_VAL_DATIVE'],
        'Case=Voc': ['ML_MORPH_VAL_VOCATIVE'],

        // Person
        'Person=1': ['ML_MORPH_VAL_1ST_PERSON'],
        'Person=2': ['ML_MORPH_VAL_2ND_PERSON'],
        'Person=3': ['ML_MORPH_VAL_3RD_PERSON'],

        // Tense
        'Tense=Pres': ['ML_MORPH_VAL_PRESENT'],
        'Tense=Past': ['ML_MORPH_VAL_PAST'],
        'Tense=Fut': ['ML_MORPH_VAL_FUTURE'],

        // Mood
        'Mood=Ind': ['ML_MORPH_VAL_INDICATIVE'],
        'Mood=Imp': ['ML_MORPH_VAL_IMPERATIVE'],
        'Mood=Sub': ['ML_MORPH_VAL_SUBJUNCTIVE'],
        'Mood=Cnd': ['ML_MORPH_VAL_CONDITIONAL']
    }
};

export default UD_PLUGIN_MANIFEST;
