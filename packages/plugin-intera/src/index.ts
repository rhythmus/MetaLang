import type { PluginManifest } from '@metalang/schema';

/**
 * INTERA Tag-System Plugin Manifest
 * Source: linguistic-meta-terms_core.tsv
 */
export const INTERA_PLUGIN_MANIFEST: PluginManifest = {
    descriptor: {
        id: 'intera',
        name: 'INTERA',
        version: '1.0.0',
        source: {
            title: 'INTERA Linguistic Meta-Terms',
            author: 'MetaLang Project',
            year: 2026,
            url: 'https://metalang.org/ontology/intera'
        }
    },
    mappings: {
        // --- Case ---
        'Nm': ['ML_MORPH-VALUE_CASE-NOMINATIVE', 'ML_POS_NUMERAL'],
        'Vo': ['ML_MORPH-VALUE_CASE-VOCATIVE'],
        'Ge': ['ML_MORPH-VALUE_CASE-GENITIVE'],
        'Da': ['ML_MORPH-VALUE_CASE-DATIVE'],
        'Ac': ['ML_MORPH-VALUE_CASE-ACCUSATIVE'],

        // --- Gender ---
        'Ma': ['ML_MORPH-VALUE_GENDER-MASCULINE'],
        'Fe': ['ML_MORPH-VALUE_GENDER-FEMININE'],
        'Ne': ['ML_MORPH-VALUE_GENDER-NEUTER'],

        // --- Number ---
        'Sg': ['ML_MORPH-VALUE_NUMBER-SINGULAR'],
        'Pl': ['ML_MORPH-VALUE_NUMBER-PLURAL'],

        // --- POS Tags ---
        'No': ['ML_POS_NOUN'],
        'Rg': ['ML_POS_PROPER-NOUN', 'ML_POS_PTCL'],
        'Aj': ['ML_POS_ADJECTIVE', 'ML_POS_NUMERAL-ADJECTIVAL'],
        'Ba': ['ML_POS_ADJECTIVE'],
        'Cp': ['ML_MORPH-VALUE_DEGREE-COMPARATIVE'],
        'Su': ['ML_MORPH-VALUE_DEGREE-SUPERLATIVE'],
        'Cd': ['ML_POS_NUMERAL-CARDINAL'],
        'Od': ['ML_POS_NUMERAL-ORDINAL'],
        'Ml': ['ML_POS_NUMERAL-MULTIPLICATIVE'],
        'An': ['ML_POS_NUMERAL-ANALOGICAL'],
        'Ct': ['ML_POS_NUMERAL-COLLECTIVE'],
        'Ad': ['ML_POS_ADVERB', 'ML_POS_NUMERAL'],

        'Vb': ['ML_POS_VERB', 'ML_POS_VERB-AUX'],
        'Nf': ['ML_MORPH-VALUE_VERBFORM-INFINITIVE'],
        'Id': ['ML_MORPH-VALUE_MOOD-INDICATIVE', 'ML_POS_PRON-IND'],
        'Mp': ['ML_MORPH-VALUE_MOOD-IMPERATIVE'],
        'Sj': ['ML_MORPH-VALUE_MOOD-SUBJUNCTIVE', 'ML_CUSTOM_SUB-PTCL'],
        'Pr': ['ML_MORPH-VALUE_PRESENT'],
        'Pa': ['ML_MORPH-VALUE_PAST', 'ML_POS_VERB-PTCP'],
        'Ip': ['ML_MORPH-VALUE_ASPECT-IMPERFECTIVE'],
        'Pe': ['ML_MORPH-VALUE_ASPECT-PERFECTIVE', 'ML_POS_PERSONAL-PRONOUN'],
        'Fu': ['ML_MORPH-VALUE_FUTURE', 'ML_POS_FUT-PTCL'],
        'St': ['ML_CUSTOM_CONJUG'],
        'We': ['ML_CUSTOM_CONJUG'],

        'Av': ['ML_MORPH-VALUE_VOICE-ACTIVE'],
        'Pv': ['ML_MORPH-VALUE_VOICE-PASSIVE'],
        'Is': ['ML_MORPH-VALUE_VOICE-IMPERSONAL-PASSIVE'],
        'Mn': ['ML_MORPH-VALUE_VOICE'], // fallback

        'Pp': ['ML_POS_VERB-PTCP', 'ML_POS_PREPOSITION'],

        'As': ['ML_POS_ADP'],
        'Sp': ['ML_POS_ADP'],

        'Cj': ['ML_POS_CONJUNCTION'],
        'Co': ['ML_POS_CONJ-COORD'],
        'Sb': ['ML_POS_CONJ-SUB'],

        'At': ['ML_POS_ART'],
        'Df': ['ML_POS_ART-DEF'],

        'Pn': ['ML_POS_PRONOUN', 'ML_POS_PRON-REFL'],
        'Ir': ['ML_POS_PRON-INT'],
        'Po': ['ML_POS_POSSESSIVE-PRONOUN'],
        'Dm': ['ML_POS_DEMONSTRATIVE-PRONOUN'],
        'Re': ['ML_POS_RELATIVE-PRONOUN'],
        'Ri': ['ML_POS_RELATIVE-PRONOUN'],

        'Ij': ['ML_POS_INTERJ'],
        'Pt': ['ML_POS_PTCL'],
        'Ng': ['ML_CUSTOM_NEG-PTCL'],

        'Ab': ['ML_POS_ABBREVIATION'],
        'Tr': ['ML_CUSTOM_TRANSLIT'],
        'Sy': ['ML_RHETORIC_SYMBOL'],
        'DIG': ['ML_CUSTOM_DIG'],
        'PUNCT': ['ML_POS_PUNCT'],
        'P_TERM_P': ['ML_PUNCTUATION_FULL-STOP'],
        'O_PUNCT': ['ML_PUNCTUATION_PARENTHESES'],
        'C_PUNCT': ['ML_PUNCTUATION_CL-PUNCT'],
        'ENUM': ['ML_CUSTOM_ENUM'],
        'DATE': ['ML_CUSTOM_DATUM']
    }
};

export default INTERA_PLUGIN_MANIFEST;
