/**
 * Valid domains for MetaLang concepts as defined in the taxonomy.
 */
export type DomainID =
  | 'POS'
  | 'MORPHOLOGY'
  | 'MORPH-FEATURE'
  | 'MORPH-VALUE'
  | 'SYNTAX'
  | 'SYNTACTIC-RELATION'
  | 'SEMANTICS'
  | 'SEMANTIC-RELATION'
  | 'SEMANTIC-CLASS'
  | 'REGISTER'
  | 'RHETORIC'
  | 'FIELD'
  | 'GEO'
  | 'LANGUAGE'
  | 'LEX-STRUCT'
  | 'DERIVATION'
  | 'ETYMOLOGY'
  | 'PHONOLOGY'
  | 'DISCOURSE'
  | 'ORTHOGRAPHY'
  | 'PUNCTUATION'
  | 'SYNTACTIC-RELATION'
  | 'EDITORIAL'
  | 'CUSTOM';

export interface Domain {
  wikidata: string; // WikiData QID
  parent: string;   // Parent Domain ID (optional/empty)
  id: string;      // ML_ID (prefix, e.g., POS)
  label: string;   // Internal default label
}

/**
 * A canonical MetaLang concept.
 */
export interface Concept {
  domain: string;  // e.g., POS
  parent: string | string[]; // Comma-separated in TSV, array in memory
  wikidata: string; // WikiData QID
  id: string;      // Full ML_ID (e.g., ML_POS_NOUN)
  label: string;   // English label
  externalRefs?: Record<string, string>;
  systemMappings?: Record<string, string | string[]>;
}

export interface CoreTSVData {
  domains: Domain[];
  concepts: Concept[];
}

export interface BibliographicSource {
  title: string;
  author?: string;
  year?: number;
  url: string;
  lastEditedAt: string; // ISO 8601
  bibtex?: string;
}

/**
 * Rich mapping of a MetaLang concept to linguistic terms in a specific language.
 */
export interface LinguisticMapping {
  id: string;             // ML_ID
  singular?: string | string[];      // Full singular form(s)
  plural?: string | string[];        // Full plural form(s)
  abbreviations?: string[]; // Array of common abbreviations
}

/**
 * Result of a linguistic resolution, including fallback metadata.
 */
export interface ResolvedLinguisticMapping extends LinguisticMapping {
  sourceSystemId: string; // The system that provided the mapping (e.g., 'nl-generic')
  isFallback: boolean;    // True if this result comes from a fallback system or ontology
  isOntologyLabel?: boolean; // True if we fell back to the canonical ontology label
}

export interface PluginManifest {
  descriptor: {
    id: string;
    name: string;
    version?: string;
    language?: string;
    scope?: string;
    domains?: string[];
    publisher?: string;
    authoritative?: boolean;
    source?: BibliographicSource;
  };
  mappings: {
    [externalTag: string]: string | string[] | LinguisticMapping; // Flat or rich mappings
  };
}
