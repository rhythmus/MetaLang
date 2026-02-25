import React, { useState, useMemo } from 'react';
import type { PluginManifest, Concept } from '@metalang/schema';
import { Search, ExternalLink, ShieldCheck, ShieldAlert } from 'lucide-react';

interface PluginMappingsProps {
    manifests: PluginManifest[];
    concepts: Concept[];
}

export const PluginMappings: React.FC<PluginMappingsProps> = ({ manifests, concepts }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const conceptMap = useMemo(() => new Map(concepts.map(c => [c.id, c])), [concepts]);

    const flattenedMappings = useMemo(() => {
        const rows: { system: string; tag: string; guid: string; exists: boolean }[] = [];
        manifests.forEach(m => {
            Object.entries(m.mappings).forEach(([tag, ids]) => {
                const idList = Array.isArray(ids) ? ids : [ids];
                idList.forEach(id => {
                    rows.push({
                        system: m.descriptor.name,
                        tag: tag,
                        guid: id,
                        exists: conceptMap.has(id)
                    });
                });
            });
        });
        return rows;
    }, [manifests, conceptMap]);

    const filteredMappings = useMemo(() => {
        return flattenedMappings.filter(m =>
            m.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.guid.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.system.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [flattenedMappings, searchTerm]);

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-1">Plugin Mappings</h2>
                    <p className="text-sm text-slate-400">Inspect how external tag systems map to MetaLang canonical GUIDs.</p>
                </div>
                <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={14} />
                    <input
                        type="text"
                        placeholder="Filter tags or GUIDs..."
                        className="search-input py-2 pl-9 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-hidden glass-card p-0 flex flex-col">
                <div className="overflow-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-slate-900/80 backdrop-blur-md z-10">
                            <tr className="border-b border-white/5">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">System</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Source Tag</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">MetaLang GUID</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredMappings.map((row, i) => (
                                <tr key={`${row.system}-${row.tag}-${i}`} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium text-slate-300">{row.system}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="text-xs px-2 py-1 rounded bg-white/5 text-blue-300 font-mono">
                                            {row.tag}
                                        </code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[11px] text-slate-400">{row.guid}</span>
                                            <ExternalLink size={10} className="opacity-0 group-hover:opacity-40 transition-opacity cursor-pointer" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            {row.exists ? (
                                                <div title="Valid Mapping" className="text-emerald-400">
                                                    <ShieldCheck size={16} />
                                                </div>
                                            ) : (
                                                <div title="Broken Link (Concept missing)" className="text-rose-400">
                                                    <ShieldAlert size={16} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-white/5 bg-white/5 flex justify-between items-center text-[10px] text-slate-500 font-medium">
                    <div>SHOWING {filteredMappings.length} MAPPINGS</div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> VALID
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-400" /> BROKEN
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
