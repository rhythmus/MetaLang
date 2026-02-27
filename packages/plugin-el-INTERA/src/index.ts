import type { PluginManifest } from '@metalang/schema';

/**
 * INTERA Tag-System Plugin Manifest
 * Source: linguistic-meta-terms_core.tsv
 */
export const manifest: PluginManifest = {
    descriptor: {
        id: 'el-INTERA',
        name: 'el-INTERA',
        version: '1.0.0',
        source: {
            title: 'Greek INTERA part-of-speech tagset',
            author: 'Sketch Engine',
            year: 2026,
            url: 'https://www.sketchengine.eu/greek-intera-part-of-speech-tagset/'
        }
    },
    mappings: {
        // --- Noun Type ---
        'Cm': ['ML_POS_NOUN-COMMON'],
        'Pr': ['ML_POS_PROPER-NOUN', 'ML_MORPH-VALUE_PRESENT'],

        // --- Verb Type ---
        'Mn': ['ML_POS_VERB'],
        'Is': ['ML_MORPH-VALUE_VOICE-IMPERSONAL-PASSIVE'],

        // --- Residual Type ---
        'Fw': ['ML_POS_FOREIGN-WORD'],
        'Ab': ['ML_POS_ABBREVIATION'],
        'An': ['ML_POS_ACRONYM', 'ML_POS_NUMERAL-ANALOGICAL'],
        'Sy': ['ML_RHETORIC_SYMBOL'],

        // --- Particle Type ---
        'Fu': ['ML_POS_FUT-PTCL', 'ML_MORPH-VALUE_FUTURE'],
        'Ng': ['ML_CUSTOM_NEG-PTCL'],
        'Sj': ['ML_CUSTOM_SUB-PTCL'],
        'Ot': ['ML_POS_PTCL'],

        // --- Case ---
        'Nm': ['ML_MORPH-VALUE_CASE-NOMINATIVE'],
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
        'Rg': ['ML_RHETORIC_SYMBOL'], // Residual
        'Aj': ['ML_POS_ADJECTIVE'],
        'Ba': ['ML_POS_ADJECTIVE'],
        'Cp': ['ML_MORPH-VALUE_DEGREE-COMPARATIVE'],
        'Su': ['ML_MORPH-VALUE_DEGREE-SUPERLATIVE'],
        'Cd': ['ML_POS_NUMERAL-CARDINAL'],
        'Od': ['ML_POS_NUMERAL-ORDINAL'],
        'Ml': ['ML_POS_NUMERAL-MULTIPLICATIVE'],
        'Ct': ['ML_POS_NUMERAL-COLLECTIVE'],
        'Ad': ['ML_POS_ADVERB'],

        'Vb': ['ML_POS_VERB'],
        'Nf': ['ML_MORPH-VALUE_VERBFORM-INFINITIVE'],
        'Id': ['ML_MORPH-VALUE_MOOD-INDICATIVE'],
        'Mp': ['ML_MORPH-VALUE_MOOD-IMPERATIVE'],
        'Pp': ['ML_POS_VERB-PTCP'],
        'Pa': ['ML_MORPH-VALUE_PAST'],
        'Ip': ['ML_MORPH-VALUE_ASPECT-IMPERFECTIVE'],
        'Pe': ['ML_MORPH-VALUE_ASPECT-PERFECTIVE'],
        'St': ['ML_CUSTOM_CONJUG'],
        'We': ['ML_CUSTOM_CONJUG'],

        'Av': ['ML_MORPH-VALUE_VOICE-ACTIVE'],
        'Pv': ['ML_MORPH-VALUE_VOICE-PASSIVE'],

        'As': ['ML_POS_ADP'],
        'Sp': ['ML_POS_ADP'],

        'Cj': ['ML_POS_CONJUNCTION'],
        'Co': ['ML_POS_CONJ-COORD'],
        'Sb': ['ML_POS_CONJ-SUB'],

        'At': ['ML_POS_ART'],
        'Df': ['ML_POS_ART-DEF'],

        'Pn': ['ML_POS_PRONOUN'],
        'Ir': ['ML_POS_PRON-INT'],
        'Po': ['ML_POS_POSSESSIVE-PRONOUN'],
        'Dm': ['ML_POS_DEMONSTRATIVE-PRONOUN'],
        'Re': ['ML_POS_RELATIVE-PRONOUN'],
        'Ri': ['ML_POS_RELATIVE-PRONOUN'],

        'Ij': ['ML_POS_INTERJ'],
        'Pt': ['ML_POS_PTCL'],

        'ABBR': ['ML_POS_ABBREVIATION'],
        'NBABBR': ['ML_POS_ABBREVIATION'], // Not Breaking Abbreviation
        'INIT': ['ML_POS_INITIALS'],
        'Tr': ['ML_CUSTOM_TRANSLIT'],
        'DIG': ['ML_CUSTOM_DIG'],
        'PUNCT': ['ML_POS_PUNCT'],
        'P_TERM_P': ['ML_PUNCTUATION_FULL-STOP'],
        'O_PUNCT': ['ML_PUNCTUATION_PARENTHESES'],
        'C_PUNCT': ['ML_PUNCTUATION_CL-PUNCT'],
        'ENUM': ['ML_CUSTOM_ENUM'],
        'DATE': ['ML_CUSTOM_DATUM'],
        'aor': ['ML_MORPH-VALUE_TENSE-AORIST'], // Row 64
        'Or': ['ML_CUSTOM_ORIGINAL-SCRIPT'], // Row 115
        'Xx': ['ML_POS_X'] // Row 127
    }
};

export default manifest;
