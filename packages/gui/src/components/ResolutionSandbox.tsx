import React, { useState, useMemo } from 'react';
import { Registry, Locale } from '@metalang/core';
import { Search, Zap, Info, CheckCircle2, AlertCircle } from 'lucide-react';

interface ResolutionSandboxProps {
    registry: Registry;
}

export const ResolutionSandbox: React.FC<ResolutionSandboxProps> = ({ registry }) => {
    const [tag, setTag] = useState('');
    const [context, setContext] = useState('');

    const resolution = useMemo(() => {
        if (!tag || !context) return null;

        try {
            const concepts = registry.resolve(tag, context);
            const mapping = registry.resolveLinguisticMapping(concepts[0]?.id || '', context);

            const ancestry = Locale.getAncestry(context);

            return {
                concepts,
                mapping,
                ancestry
            };
        } catch (e) {
            return { error: String(e) };
        }
    }, [registry, tag, context]);

    return (
        <div className="flex flex-col gap-8 h-full overflow-auto pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Configuration Panel */}
                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                            <Zap size={14} className="text-yellow-400" /> Resolution Context
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Source Tag (External)</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={14} />
                                    <input
                                        type="text"
                                        placeholder="e.g. NN, POS_NOUN, 12:plural"
                                        className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-2 pl-9 text-sm focus:border-cyan-500/50 outline-none transition-colors font-mono"
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Locale / System ID</label>
                                <div className="relative">
                                    <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={14} />
                                    <input
                                        type="text"
                                        placeholder="e.g. nl-BE, en, pt-generic"
                                        className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-2 pl-9 text-sm focus:border-cyan-500/50 outline-none transition-colors font-mono"
                                        value={context}
                                        onChange={(e) => setContext(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-3 text-xs text-blue-300 leading-relaxed">
                            <Info size={16} className="shrink-0" />
                            <p>This tool simulate the hierarchical resolution logic used by the core engine. It checks target systems, regional variants, language fallbacks, and finally the ontology.</p>
                        </div>
                    </div>

                    {resolution && 'ancestry' in resolution && resolution.ancestry && (
                        <div className="glass-card p-6 space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Fallback Path (Ancestry)</h3>
                            <div className="flex flex-col gap-2">
                                {resolution.ancestry.map((a: string, i: number) => (
                                    <div key={a} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                        <span className="text-xs font-mono text-slate-400">{a}</span>
                                        {i === 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 uppercase font-bold">Target</span>}
                                    </div>
                                ))}
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                    <span className="text-xs font-mono text-slate-500 italic">en (Global Fallback)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                    <span className="text-xs font-mono text-slate-500 italic">Ontology Labels</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Panel */}
                <div className="space-y-6">
                    {!resolution && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-40 py-20">
                            <Search size={48} className="mb-4 stroke-1" />
                            <p className="text-sm font-medium">Input a tag and context to begin</p>
                        </div>
                    )}

                    {resolution && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Concept Result */}
                            <div className="glass-card p-6 space-y-4 border-emerald-500/20">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                                        <CheckCircle2 size={14} /> Resolution Successful
                                    </h3>
                                </div>

                                {resolution.concepts && resolution.concepts.length > 0 ? (
                                    <div className="space-y-4">
                                        {resolution.concepts.map(c => (
                                            <div key={c.id} className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold font-mono text-emerald-300">{c.id}</span>
                                                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-black/40 px-2 py-0.5 rounded">{c.domain}</span>
                                                </div>
                                                <p className="text-sm font-medium text-slate-200">{c.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 flex flex-col items-center gap-3 text-rose-400/60 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                                        <AlertCircle size={32} strokeWidth={1.5} />
                                        <span className="text-xs font-medium">No matching concept found</span>
                                    </div>
                                )}
                            </div>

                            {/* Linguistic Mapping Result */}
                            {resolution.mapping && (
                                <div className="glass-card p-6 space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Linguistic Representation</h3>

                                    <div className="space-y-6">
                                        {/* Singular/Plural Forms */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Singular</div>
                                                <div className="text-xl font-bold text-slate-100">
                                                    {Array.isArray(resolution.mapping.singular) ? resolution.mapping.singular[0] : resolution.mapping.singular || '-'}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Plural</div>
                                                <div className="text-xl font-bold text-slate-100 italic">
                                                    {Array.isArray(resolution.mapping.plural) ? resolution.mapping.plural[0] : resolution.mapping.plural || '-'}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Fallback Badge */}
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                            <div className={`w-2 h-2 rounded-full ${resolution.mapping.isFallback ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                                            <div className="flex-1 flex items-center justify-between">
                                                <span className="text-xs text-slate-400">Source: <span className="font-mono text-slate-200">{resolution.mapping.sourceSystemId}</span></span>
                                                {resolution.mapping.isFallback && <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">Fallback</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const GlobeIcon = ({ className, size }: { className?: string, size?: number }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);
