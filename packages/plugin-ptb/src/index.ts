import type { PluginManifest } from '@metalang/schema';

/**
 * Penn Treebank (PTB) Tag-System Plugin Manifest
 * Source: linguistic-meta-terms_core.tsv and standard PTB tagset
 */
export const PTB_PLUGIN_MANIFEST: PluginManifest = {
    descriptor: {
        id: 'penn-treebank',
        name: 'Penn Treebank (PTB)',
        version: '3.0.0',
        source: {
            title: 'The Penn Treebank: Annotating Predicate Argument Structure',
            author: 'Mitchell P. Marcus, Beatrice Santorini, Mary Ann Marcinkiewicz',
            year: 1993,
            url: 'https://catalog.ldc.upenn.edu/LDC99T42'
        }
    },
    mappings: {
        // --- Nouns ---
        'NN': ['ML_POS_NOUN', 'ML_MORPH-VALUE_NUMBER-SINGULAR'],
        'NNS': ['ML_POS_NOUN', 'ML_MORPH-VALUE_NUMBER-PLURAL'],
        'NNP': ['ML_POS_PROPER-NOUN', 'ML_MORPH-VALUE_NUMBER-SINGULAR'],
        'NNPS': ['ML_POS_PROPER-NOUN', 'ML_MORPH-VALUE_NUMBER-PLURAL'],
        'NP': ['ML_CUSTOM_V-GR'], // Noun Phrase (MetaLang maps phrases to V-GR or similar if needed, but NN is better)

        // --- Verbs ---
        'VB': ['ML_POS_VERB'],
        'VBD': ['ML_MORPH-VALUE_PAST'],
        'VBG': ['ML_POS_VERB-PTCP', 'ML_MORPH-VALUE_VERBFORM-PARTICIPLE-PRESENT'],
        'VBN': ['ML_POS_VERB-PTCP', 'ML_MORPH-VALUE_VERBFORM-PARTICIPLE-PAST'],
        'VBP': ['ML_MORPH-VALUE_PRESENT'],
        'VBZ': ['ML_MORPH-VALUE_PRESENT', 'ML_MORPH-VALUE_PERSON-THIRD', 'ML_MORPH-VALUE_NUMBER-SINGULAR'],
        'MD': ['ML_POS_VERB-AUX'],

        // --- Adjectives ---
        'JJ': ['ML_POS_ADJECTIVE'],
        'JJR': ['ML_POS_ADJECTIVE', 'ML_MORPH-VALUE_DEGREE-COMPARATIVE'],
        'JJS': ['ML_POS_ADJECTIVE', 'ML_MORPH-VALUE_DEGREE-SUPERLATIVE'],

        // --- Adverbs ---
        'RB': ['ML_POS_ADVERB'],
        'RBR': ['ML_POS_ADVERB', 'ML_MORPH-VALUE_DEGREE-COMPARATIVE'],
        'RBS': ['ML_POS_ADVERB', 'ML_MORPH-VALUE_DEGREE-SUPERLATIVE'],
        'ADVP': ['ML_POS_ADV-GR'],

        // --- Numerals ---
        'CD': ['ML_POS_NUMERAL-CARDINAL'],

        // --- Functional ---
        'DT': ['ML_POS_DET'],
        'IN': ['ML_POS_ADP', 'ML_POS_CONJ-SUB'],
        'CC': ['ML_POS_CONJ-COORD'],
        'PRP': ['ML_POS_PERSONAL-PRONOUN'],
        'PRP$': ['ML_POS_POSSESSIVE-PRONOUN'],
        'UH': ['ML_POS_INTERJ'],
        'RP': ['ML_POS_PTCL'],

        // --- Wh-words ---
        'WDT': ['ML_POS_DET', 'ML_POS_PRON-INT'],
        'WP': ['ML_POS_PRON-INT'],
        'WP$': ['ML_POS_POSSESSIVE-PRONOUN', 'ML_POS_PRON-INT'],
        'WRB': ['ML_POS_ADVERB', 'ML_POS_PRON-INT'],

        // --- Symbols & Punctuation ---
        'SYM': ['ML_RHETORIC_SYMBOL'],
        'PUNCT': ['ML_POS_PUNCT']
    }
};

export default PTB_PLUGIN_MANIFEST;
