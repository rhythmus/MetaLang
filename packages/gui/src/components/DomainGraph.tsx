import React, { useMemo } from 'react';
import type { Domain, Concept } from '@metalang/schema';
import { Network, Database } from 'lucide-react';

interface DomainGraphProps {
    domains: Domain[];
    concepts: Concept[];
}

interface GraphNode {
    id: string;
    name: string;
    children: GraphNode[];
    conceptCount: number;
    level: number;
}

export const DomainGraph: React.FC<DomainGraphProps> = ({ domains, concepts }) => {
    const tree = useMemo(() => {
        // 1. Build hierarchy based on dot notation ID (e.g. pos, pos.adj)
        const nodes: Record<string, GraphNode> = {};

        // Sort domains by ID length to process parents before children
        const sortedDomains = [...domains].sort((a, b) => a.id.length - b.id.length);

        const root: GraphNode = { id: 'root', name: 'MetaLang Ontology', children: [], conceptCount: 0, level: 0 };

        sortedDomains.forEach(d => {
            const parts = d.id.split('.');
            const parentId = parts.length > 1 ? parts.slice(0, -1).join('.') : 'root';

            const node: GraphNode = {
                id: d.id,
                name: d.name,
                children: [],
                conceptCount: concepts.filter(c => c.domain === d.id).length,
                level: parts.length
            };

            nodes[d.id] = node;

            const parent = nodes[parentId] || root;
            parent.children.push(node);
        });

        return root;
    }, [domains, concepts]);

    // Recursively render tree branches as SVG
    const renderNode = (node: GraphNode, x: number, y: number, width: number) => {
        const childWidth = width / (node.children.length || 1);
        const itemHeight = 120;

        return (
            <g key={node.id}>
                {/* Connection lines to children */}
                {node.children.map((child, i) => (
                    <line
                        key={`${node.id}-${child.id}-line`}
                        x1={x} y1={y + 35}
                        x2={x - width / 2 + childWidth / 2 + i * childWidth}
                        y2={y + itemHeight - 35}
                        stroke="var(--border-glass)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity="0.5"
                    />
                ))}

                {/* Node Card */}
                <g transform={`translate(${x - 80}, ${y - 30})`}>
                    <rect
                        width="160" height="70" rx="12"
                        fill="var(--bg-surface)"
                        stroke="var(--border-glass)"
                        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}
                    />
                    <text x="50%" y="30" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" style={{ fontFamily: 'var(--font-heading)' }}>
                        {node.name}
                    </text>
                    <g transform="translate(15, 45)">
                        <rect width="130" height="16" rx="8" fill="rgba(59, 130, 246, 0.1)" />
                        <text x="65" y="11" textAnchor="middle" fill="var(--accent-blue)" fontSize="9" fontWeight="bold">
                            {node.conceptCount} CONCEPTS
                        </text>
                    </g>
                </g>

                {/* Render children */}
                {node.children.map((child, i) => (
                    renderNode(child, x - width / 2 + childWidth / 2 + i * childWidth, y + itemHeight, childWidth)
                ))}
            </g>
        );
    };

    return (
        <div className="glass-card" style={{ height: '70vh', padding: '0', overflow: 'hidden', position: 'relative' }}>
            <div className="p-4 border-b flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2 text-slate-400">
                    <Network size={16} />
                    <span className="text-xs font-semibold uppercase tracking-wider">Hierarchy Visualizer</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-500">
                    <div className="flex items-center gap-1">
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                        Active Domains
                    </div>
                    <div className="flex items-center gap-1">
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--border-glass)' }} />
                        Empty
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', height: 'calc(100% - 50px)', overflow: 'auto', background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)' }}>
                <svg width="100%" height="800" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMin meet">
                    <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <g transform="translate(0, 80)">
                        {renderNode(tree, 500, 0, 800)}
                    </g>
                </svg>
            </div>

            <div className="absolute bottom-4 left-4 p-3 rounded-lg bg-black/40 border border-white/5 backdrop-blur-md max-w-xs">
                <div className="flex items-center gap-2 mb-1 text-white text-xs font-semibold">
                    <Database size={14} className="text-blue-400" />
                    Domain Statistics
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                    This view shows the taxanomic structure of the MetaLang ontology based on the official specification.
                </p>
            </div>
        </div>
    );
};
