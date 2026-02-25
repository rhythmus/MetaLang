import type { PluginManifest } from '@metalang/schema';

export const UD_PLUGIN_MANIFEST: PluginManifest = {
    id: 'universal-dependencies',
    name: 'Universal Dependencies (UD)',
    version: '2.1.0',
    mappings: {
        // These are sample mappings; in a real scenario, these could be loaded from a JSON file.
        'ADJ': ['ML_POS_ADJECTIVE'],
        'NOUN': ['ML_POS_NOUN'],
        'VERB': ['ML_POS_VERB'],
        'ADV': ['ML_POS_ADVERB'],
        'ADP': ['ML_POS_ADP'],
        'AUX': ['ML_POS_V_AUX'],
        'DET': ['ML_POS_DET'],
        'PRON': ['ML_POS_PRON'],
        'NUM': ['ML_POS_NUMERAL'],
        'PART': ['ML_POS_PTCL'],
        'PUNCT': ['ML_POS_PUNCT'],
        'SYM': ['ML_POS_SYMB'],
        'X': ['ML_POS_X']
    }
};

export default UD_PLUGIN_MANIFEST;
