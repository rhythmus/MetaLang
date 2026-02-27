import type { PluginManifest } from '@metalang/schema';

/**
 * Lexilogio Tag-System Plugin Manifest
 * Source: linguistic-meta-terms_core.tsv
 */
export const LEXILOGIO_PLUGIN_MANIFEST: PluginManifest = {
    descriptor: {
        id: 'lexilogio',
        name: 'Lexilogio',
        version: '1.0.0',
        source: {
            title: 'Lexilogio Linguistic Meta-Terms',
            author: 'MetaLang Project',
            year: 2026,
            url: 'https://metalang.org/ontology/lexilogio'
        }
    },
    mappings: {
        // --- Sentence and Struct ---
        'q': ['ML_MORPH-VALUE_MOOD-INTERROGATIVE'],
        'prov': ['ML_LEX-STRUCT_PROVERB'],
        'phras': ['ML_LEX-STRUCT_PHRASE'],
        'expr': ['ML_LEX-STRUCT_EXPRESSION'],

        // --- Case ---
        'nom': ['ML_MORPH-VALUE_CASE-NOMINATIVE'],
        'voc': ['ML_MORPH-VALUE_CASE-VOCATIVE'],
        'gen': ['ML_MORPH-VALUE_CASE-GENITIVE'],
        'dat': ['ML_MORPH-VALUE_CASE-DATIVE'],
        'acc': ['ML_MORPH-VALUE_CASE-ACCUSATIVE'],
        'abl': ['ML_MORPH-VALUE_CASE-ABLATIVE'],

        // --- Gender ---
        '♂': ['ML_MORPH-VALUE_GENDER-MASCULINE'],
        '♀': ['ML_MORPH-VALUE_GENDER-FEMININE'],
        '⚲': ['ML_MORPH-VALUE_GENDER-NEUTER'],

        // --- Number ---
        'sg': ['ML_MORPH-VALUE_NUMBER-SINGULAR'],
        'pl': ['ML_MORPH-VALUE_NUMBER-PLURAL'],

        // --- POS Tags ---
        'n': ['ML_POS_NOUN'],
        'n.gr': ['ML_CUSTOM_V-GR'], // linguistic-meta-terms_core.tsv row 29: parent n, tag n.gr, Q1401131
        'com.n': ['ML_POS_NOUN-COMMON'],
        'prop.n': ['ML_POS_PROPER-NOUN'],
        'topo': ['ML_POS_PROPER-NOUN-TOPONYM'],
        'adj': ['ML_POS_ADJECTIVE'],
        'dim': ['ML_DERIVATION_DIMINUTIVE'],
        'adj.comp': ['ML_MORPH-VALUE_DEGREE-COMPARATIVE'],
        'adj.sup': ['ML_MORPH-VALUE_DEGREE-SUPERLATIVE'],
        'num': ['ML_POS_NUMERAL'],
        'num.card': ['ML_POS_NUMERAL-CARDINAL'],
        'num.ord': ['ML_POS_NUMERAL-ORDINAL'],
        'num.mult': ['ML_POS_NUMERAL-MULTIPLICATIVE'],
        'num.anal': ['ML_POS_NUMERAL-ANALOGICAL'],
        'num.sing': ['ML_POS_NUMERAL-SINGULATIVE'],
        'num.coll': ['ML_POS_NUMERAL-COLLECTIVE'],
        'num.adj': ['ML_POS_NUMERAL-ADJECTIVAL'],
        'num.nom': ['ML_POS_NUMERAL-NOMINAL'],
        'num.adv': ['ML_POS_NUMERAL'], // fallback

        'v': ['ML_POS_VERB'],
        'inf': ['ML_MORPH-VALUE_VERBFORM-INFINITIVE'],
        'ind': ['ML_MORPH-VALUE_MOOD-INDICATIVE'],
        'imp': ['ML_MORPH-VALUE_MOOD-IMPERATIVE'],
        'subj': ['ML_MORPH-VALUE_MOOD-SUBJUNCTIVE'],
        'cond': ['ML_MORPH-VALUE_MOOD-CONDITIONAL'],
        'praes': ['ML_MORPH-VALUE_PRESENT'],
        'past': ['ML_MORPH-VALUE_PAST'],
        'imperf': ['ML_MORPH-VALUE_ASPECT-IMPERFECTIVE'],
        'perfect': ['ML_MORPH-VALUE_ASPECT-PERFECTIVE'],
        'fut': ['ML_MORPH-VALUE_FUTURE'],
        'aor': ['ML_MORPH-VALUE_TENSE-AORIST'],

        'act': ['ML_MORPH-VALUE_VOICE-ACTIVE'],
        'pass': ['ML_MORPH-VALUE_VOICE-PASSIVE'],
        'impers': ['ML_MORPH-VALUE_VOICE-IMPERSONAL-PASSIVE'],

        'v.aux': ['ML_POS_VERB-AUX'],
        'v.gr': ['ML_CUSTOM_V-GR'],
        'v.ptcp': ['ML_POS_VERB-PTCP'],

        'adv': ['ML_POS_ADVERB'],
        'adv.gr': ['ML_POS_ADV-GR'],
        'mult.adv': ['ML_CUSTOM_MULT-ADV'],

        'adp': ['ML_POS_ADP'],
        'prep': ['ML_POS_PREPOSITION'],
        'postp': ['ML_CUSTOM_POSTP'],

        'conj': ['ML_POS_CONJUNCTION'],
        'conj.coord': ['ML_POS_CONJ-COORD'],
        'conj.sub': ['ML_POS_CONJ-SUB'],

        'art': ['ML_POS_ART'],
        'art.def': ['ML_POS_ART-DEF'],
        'art.ind': ['ML_POS_ART-IND'],

        'pron': ['ML_POS_PRONOUN'],
        'pron.int': ['ML_POS_PRON-INT'],
        'pron.pers': ['ML_POS_PERSONAL-PRONOUN'],
        'pron.poss': ['ML_POS_POSSESSIVE-PRONOUN'],
        'pron.dem': ['ML_POS_DEMONSTRATIVE-PRONOUN'],
        'pron.rel': ['ML_POS_RELATIVE-PRONOUN'],
        'pron.refl': ['ML_POS_PRON-REFL'],
        'pron.ind': ['ML_POS_PRON-IND'],
        'pron.rel.ind': ['ML_POS_RELATIVE-PRONOUN'],

        'interj': ['ML_POS_INTERJ'],
        'ptcl': ['ML_POS_PTCL'],
        'fut.ptcl': ['ML_POS_FUT-PTCL'],
        'neg.ptcl': ['ML_CUSTOM_NEG-PTCL'],
        'sub.ptcl': ['ML_CUSTOM_SUB-PTCL'],

        'abbr': ['ML_POS_ABBREVIATION'],
        'init': ['ML_POS_INITIALS'],
        'acro': ['ML_POS_ACRONYM'],
        'translit': ['ML_CUSTOM_TRANSLIT'],
        'symb': ['ML_RHETORIC_SYMBOL'],
        'dig': ['ML_CUSTOM_DIG'],
        'punct': ['ML_POS_PUNCT'],
        'enum': ['ML_CUSTOM_ENUM'],
        'datum': ['ML_CUSTOM_DATUM']
    }
};

export default LEXILOGIO_PLUGIN_MANIFEST;
