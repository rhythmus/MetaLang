/**
 * Valid domains for MetaLang concepts as defined in the taxonomy.
 */
export type DomainID =
  | 'pos'
  | 'morph_feature'
  | 'morph_value'
  | 'syntactic_relation'
  | 'semantic_relation'
  | 'semantic_class'
  | 'register'
  | 'field'
  | 'geo'
  | 'language_label'
  | 'lex_struct'
  | 'derivation'
  | 'etymology'
  | 'phonology'
  | 'discourse'
  | 'orthography'
  | 'editorial'
  | 'other';

export interface Domain {
  id: DomainID;
  name: string;
  description?: string;
}

export interface LabelSet {
  full: string | null;
  abbreviation: string | null;
}

export interface MultiLingualLabels {
  [locale: string]: LabelSet;
}

export interface ExternalRefs {
  wikidata?: string;
  [key: string]: string | undefined;
}

export interface SystemMappings {
  [systemId: string]: string[];
}

/**
 * A canonical MetaLang concept.
 */
export interface Concept {
  /**
   * The globally unique identifier for the concept.
   * Format: ML_[DOMAIN]_[TERM] or ML_CUSTOM_[TERM] (ASCII, ALL_CAPS).
   */
  id: string;

  /**
   * The domain this concept belongs to.
   */
  domain: DomainID;

  /**
   * Multilingual labels and abbreviations.
   */
  labels: MultiLingualLabels;

  /**
   * Links to external ontologies or databases (e.g., Wikidata).
   */
  externalRefs: ExternalRefs;

  /**
   * Mappings from external tag systems (e.g., "ud", "eagles").
   */
  systemMappings: SystemMappings;

  /**
   * Parent concept IDs to support DAG hierarchy.
   */
  parents?: string[];

  /**
   * Sources or references for the concept definition.
   */
  sources?: string[];
}

export interface SeedFile {
  metalangVersion: string;
  generatedFrom?: string[];
  domains: Domain[];
  concepts: Concept[];
}

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  mappings: {
    [externalTag: string]: string[]; // maps to concept IDs
  };
}
