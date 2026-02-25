import type { PluginManifest } from '@metalang/schema';

/**
 * EAGLES / MULTEXT-East Plugin Manifest
 * Source: http://nl.ijs.si/ME/V4/msd/html/
 * Note: MULTEXT-East uses positional tags (MSDs). 
 * This manifest maps the most common first-position (category) characters.
 */
export const EAGLES_PLUGIN_MANIFEST: PluginManifest = {
    id: 'eagles-multext-east',
    name: 'EAGLES / MULTEXT-East',
    version: '4.0.0',
    mappings: {
        // --- Major Categories (First position of MSD) ---
        'N': ['ML_POS_NOUN'],
        'V': ['ML_POS_VERB'],
        'A': ['ML_POS_ADJECTIVE'],
        'P': ['ML_POS_PRON'],
        'D': ['ML_POS_DET'],
        'R': ['ML_POS_ADVERB'],
        'S': ['ML_POS_ADP'],
        'C': ['ML_CUSTOM_CONJ'],
        'M': ['ML_POS_NUMERAL'],
        'I': ['ML_POS_INTERJ'],
        'Q': ['ML_POS_PTCL'],
        'Y': ['ML_CUSTOM_ABBR'],
        'X': ['ML_POS_X'],
        'Z': ['ML_POS_PUNCT'],

        // --- Specific Mappings for common sub-categories ---
        'Np': ['ML_POS_NOUN_PROP'],
        'Nc': ['ML_POS_NOUN'],
        'Vm': ['ML_POS_VERB'], // main verb
        'Va': ['ML_POS_V_AUX'], // auxiliary verb
        'Cc': ['ML_POS_CONJ_COORD'],
        'Cs': ['ML_POS_CONJ_SUB'],

        // --- Features (Positional samples) ---
        // Note: In mapping logic, we might need a parser for MSD strings 
        // to handle full 'Ncmsn' (Noun, common, masculine, singular, nominative)
        'Gender=m': ['ML_MORPH_VAL_MALE'],
        'Gender=f': ['ML_MORPH_VAL_FEMALE'],
        'Gender=n': ['ML_MORPH_VAL_NEUTER'],

        'Number=s': ['ML_MORPH_VAL_SINGULAR'],
        'Number=p': ['ML_MORPH_VAL_PLURAL'],
        'Number=d': ['ML_MORPH_VAL_DUAL'],

        'Case=n': ['ML_MORPH_VAL_NOMINATIVE'],
        'Case=g': ['ML_MORPH_VAL_GENITIVE'],
        'Case=d': ['ML_MORPH_VAL_DATIVE'],
        'Case=a': ['ML_MORPH_VAL_ACCUSATIVE'],
        'Case=v': ['ML_MORPH_VAL_VOCATIVE']
    }
};

export default EAGLES_PLUGIN_MANIFEST;
