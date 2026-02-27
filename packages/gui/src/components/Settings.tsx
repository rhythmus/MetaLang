import React from 'react';
import { Package, Info, History, Trash2, Cpu, Globe, Database, Layers } from 'lucide-react';

interface SettingsProps {
    stats: {
        concepts: number;
        domains: number;
        plugins: number;
        modified: number;
        clusters: number;
    };
    onReset: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ stats, onReset }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 h-full overflow-auto pb-12">
            <div>
                <h2 className="text-2xl font-bold mb-2">Settings</h2>
                <p className="text-slate-400">Manage your MetaLang workspace and registry configuration.</p>
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <StatCard icon={<Database size={18} />} label="Concepts" value={stats.concepts} />
                <StatCard icon={<Cpu size={18} />} label="Domains" value={stats.domains} />
                <StatCard icon={<Layers size={18} />} label="Clusters" value={stats.clusters} />
                <StatCard icon={<Package size={18} />} label="Plugins" value={stats.plugins} />
                <StatCard
                    icon={<History size={18} />}
                    label="Modified"
                    value={stats.modified}
                    highlight={stats.modified > 0}
                />
            </div>

            {/* Configuration */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Registry Workspace</h3>

                <div className="glass-card divide-y divide-white/5 p-0">
                    <div className="p-6 flex items-center justify-between">
                        <div className="flex gap-4 items-start">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-200">Multilingual Seed</h4>
                                <p className="text-sm text-slate-400">Current seed data version: v1.2.0-modular</p>
                            </div>
                        </div>
                        <button className="sidebar-link w-auto px-4" style={{ background: 'var(--border-glass)' }}>
                            Check for Updates
                        </button>
                    </div>

                    <div className="p-6 flex items-center justify-between">
                        <div className="flex gap-4 items-start">
                            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                                <Trash2 size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-200">Reset Workspace</h4>
                                <p className="text-sm text-slate-400">Clear all pending modifications and revert to seed state.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to clear all pending changes?')) {
                                    onReset();
                                }
                            }}
                            className="px-4 py-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:bg-rose-500/30 transition-colors text-sm font-semibold"
                        >
                            Reset Cache
                        </button>
                    </div>
                </div>
            </div>

            {/* GitHub Settings */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">GitHub Integration</h3>
                <div className="glass-card p-6 space-y-6">
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Configure your GitHub credentials to enable automated Pull Request creation from the Export panel.
                        Your Personal Access Token (PAT) is stored securely in your browser's local storage.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Repository Owner</label>
                            <input
                                type="text"
                                className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-2 text-sm focus:border-blue-500/50 outline-none transition-colors"
                                placeholder="e.g. woutersoudan"
                                defaultValue={localStorage.getItem('gh_owner') || 'woutersoudan'}
                                onChange={(e) => localStorage.setItem('gh_owner', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Repository Name</label>
                            <input
                                type="text"
                                className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-2 text-sm focus:border-blue-500/50 outline-none transition-colors"
                                placeholder="e.g. metalang"
                                defaultValue={localStorage.getItem('gh_repo') || 'metalang'}
                                onChange={(e) => localStorage.setItem('gh_repo', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Personal Access Token (PAT)</label>
                        <input
                            type="password"
                            className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-2 text-sm focus:border-blue-500/50 outline-none transition-colors"
                            placeholder="ghp_xxxxxxxxxxxx"
                            defaultValue={localStorage.getItem('gh_token') || ''}
                            onChange={(e) => localStorage.setItem('gh_token', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="p-8 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex gap-6 items-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Info size={32} />
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-blue-300">Advanced Authoring</h4>
                    <p className="text-sm text-blue-400/80 leading-relaxed mb-4">
                        The MetaLang GUI is currently in alpha. Experimental features like real-time collaboration and direct Git integration are coming soon.
                    </p>
                    <button className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors">
                        Read Roadmap →
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, highlight = false }: { icon: React.ReactNode, label: string, value: number, highlight?: boolean }) => (
    <div className={`glass-card p-4 flex flex-col gap-2 ${highlight ? 'border-cyan-500/30' : ''}`}>
        <div className="text-slate-500">{icon}</div>
        <div className="text-2xl font-bold font-mono">{highlight ? '+' : ''}{value}</div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</div>
    </div>
);
