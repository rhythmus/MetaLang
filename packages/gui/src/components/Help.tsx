import React from 'react';
import { BookOpen, Command, Layers, Share2, HelpCircle } from 'lucide-react';

export const Help: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            <div className="text-center py-12">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 mx-auto flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-6">
                    <HelpCircle size={40} color="white" />
                </div>
                <h1 className="text-4xl font-bold mb-4 tracking-tight">MetaLang Documentation</h1>
                <p className="text-lg text-slate-400">Everything you need to know about the linguistic interoperability layer.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DocSection
                    icon={<BookOpen size={24} className="text-blue-400" />}
                    title="Core Concepts"
                    description="MetaLang uses a GUID-based approach to linguistic tagging. Each concept (e.g., 'Ablative') is a stable identifier mapped across standard."
                />
                <DocSection
                    icon={<Layers size={24} className="text-emerald-400" />}
                    title="Domain Hierarchy"
                    description="Ontology is organized into specific domains like Part-of-Speech, Case, and Tense, allowing for granular filtering and validation."
                />
                <DocSection
                    icon={<Command size={24} className="text-purple-400" />}
                    title="Authoring Workflow"
                    description="Modify concepts in the Workspace, review changes in the Domain Graph, and export them as JSON Patches for integration."
                />
                <DocSection
                    icon={<Share2 size={24} className="text-amber-400" />}
                    title="Plugin Ecosystem"
                    description="External standards like Universal Dependencies (UD) and EAGLES are integrated as plugins that map local tags to MetaLang GUIDs."
                />
            </div>

            <div className="glass-card p-8 border-white/10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-blue-400">#</span> Shortcuts & Navigation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    <Shortcut keyName="⌘ K" description="Focus search bar" />
                    <Shortcut keyName="Esc" description="Close inspector or modals" />
                    <Shortcut keyName="Tab" description="Navigate between concepts" />
                    <Shortcut keyName="Enter" description="Open concept details" />
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 text-slate-500 text-sm">
                <div className="flex gap-8">
                    <span className="cursor-pointer hover:text-white transition-colors">Github</span>
                    <span className="cursor-pointer hover:text-white transition-colors">API Reference</span>
                    <span className="cursor-pointer hover:text-white transition-colors">Community</span>
                </div>
                <span className="opacity-50">© 2026 MetaLang Project. All Rights Reserved.</span>
            </div>
        </div>
    );
};

const DocSection = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="group space-y-3 cursor-default">
        <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">{title}</h3>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
            {description}
        </p>
    </div>
);

const Shortcut = ({ keyName, description }: { keyName: string, description: string }) => (
    <div className="flex items-center justify-between py-2">
        <span className="text-sm text-slate-400">{description}</span>
        <kbd className="px-2 py-1 rounded bg-white/10 border border-white/5 font-mono text-[10px] text-slate-300 min-w-[40px] text-center">
            {keyName}
        </kbd>
    </div>
);
