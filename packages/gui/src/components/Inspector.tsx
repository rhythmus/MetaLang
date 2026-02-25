import React from 'react';
import type { Concept, LabelSet } from '@metalang/schema';
import { X, ExternalLink, GitBranch, Languages, ChevronRight } from 'lucide-react';

interface InspectorProps {
    concept: Concept | null;
    onClose: () => void;
}

export const Inspector: React.FC<InspectorProps> = ({ concept, onClose }) => {
    if (!concept) return null;

    return (
        <aside className="inspector-panel glass-card">
            <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Concept Inspector</h2>
                <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                    <X size={18} />
                </button>
            </div>

            <div className="p-6 space-y-8 overflow-auto flex-1">
                {/* Header Info */}
                <section>
                    <div className="text-xs font-mono text-blue-400 mb-1">{concept.id}</div>
                    <h1 className="text-2xl font-bold mb-4">{concept.labels.en?.full || 'Untitled Concept'}</h1>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10">{concept.domain}</span>
                        {concept.externalRefs?.wikidata && (
                            <a
                                href={`https://www.wikidata.org/wiki/${concept.externalRefs.wikidata}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center gap-1.5 hover:bg-blue-500/20 transition-colors"
                            >
                                <ExternalLink size={12} />
                                Wikidata
                            </a>
                        )}
                    </div>
                </section>

                {/* Multilingual Labels */}
                <section className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-tight text-slate-500 flex items-center gap-2">
                        <Languages size={14} />
                        Labels & Localization
                    </h3>
                    <div className="grid gap-3">
                        {Object.entries(concept.labels).map(([lang, l]) => {
                            const labels = l as LabelSet;
                            return (
                                <div key={lang} className="p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold uppercase text-slate-500">{lang}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-500">Full Name</span>
                                            <span className="text-sm">{labels.full || '-'}</span>
                                        </div>
                                        {labels.abbreviation && (
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-slate-500">Abbreviation</span>
                                                <span className="text-sm font-mono">{labels.abbreviation}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Hierarchy */}
                <section className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-tight text-slate-500 flex items-center gap-2">
                        <GitBranch size={14} />
                        Hierarchy (Parents)
                    </h3>
                    <div className="flex flex-col gap-2">
                        {concept.parents?.map((parent: string) => (
                            <div key={parent} className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-sm font-mono text-blue-300 flex items-center gap-2">
                                <ChevronRight size={14} className="text-slate-600" />
                                {parent}
                            </div>
                        ))}
                        {(!concept.parents || concept.parents.length === 0) && (
                            <div className="text-sm text-slate-500 italic">No parent concepts defined.</div>
                        )}
                    </div>
                </section>
            </div>

            <div className="p-4 border-t bg-white/5 mt-auto">
                <button className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium">
                    Edit Metadata
                </button>
            </div>
        </aside>
    );
};
