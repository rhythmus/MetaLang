import type { Concept, LabelSet } from '@metalang/schema';
import { ChevronRight } from 'lucide-react';

interface WorkspaceProps {
    concepts: Concept[];
    searchTerm: string;
    onSelectConcept: (id: string) => void;
    selectedId: string | null;
}

export const Workspace: React.FC<WorkspaceProps> = ({ concepts, searchTerm, onSelectConcept, selectedId }) => {
    const filteredConcepts = Array.from(concepts).filter(c =>
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(c.labels).some((l) => {
            const labelSet = l as LabelSet;
            return labelSet.full?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                labelSet.abbreviation?.toLowerCase().includes(searchTerm.toLowerCase());
        })
    );

    return (
        <div className="workspace-container">
            <div className="glass-card overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b bg-white/5">
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Concept GUID</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Domain</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Default Label (EN)</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Mappings</th>
                            <th className="p-4 w-10"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredConcepts.map((concept) => (
                            <tr
                                key={concept.id}
                                onClick={() => onSelectConcept(concept.id)}
                                className={`border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer ${selectedId === concept.id ? 'bg-blue-500/5' : ''}`}
                                style={{ background: selectedId === concept.id ? 'rgba(59, 130, 246, 0.05)' : undefined }}
                            >
                                <td className="p-4">
                                    <span className="font-mono text-sm text-blue-400">{concept.id}</span>
                                </td>
                                <td className="p-4">
                                    <span className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                                        {concept.domain}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="text-sm">{concept.labels.en?.full || '-'}</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        {Object.keys(concept.systemMappings || {}).map(sys => (
                                            <span key={sys} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                                                {sys.toUpperCase()}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-4 text-slate-600 group-hover:text-blue-400 transition-colors">
                                    <ChevronRight size={18} />
                                </td>
                            </tr>
                        ))}
                        {filteredConcepts.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-slate-500">
                                    No concepts found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
