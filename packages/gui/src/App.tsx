import React, { useState, useMemo, useEffect } from 'react';
import {
  Binary,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Zap,
  LayoutDashboard,
  Network,
  Package,
  ArrowUpRight
} from 'lucide-react';
import { Registry } from '@metalang/core';
import type { Concept } from '@metalang/schema';
import domainsTsv from '../../../ontology/domains.tsv?raw';

// Dynamically load all concept clusters
const conceptFiles = import.meta.glob('../../../ontology/concepts/*.tsv', { query: '?raw', import: 'default', eager: true });
// Dynamically load all plugin manifests
const pluginFiles = import.meta.glob('../../../packages/plugin-*/src/manifest.json', { eager: true });

import { Workspace } from './components/Workspace';
import { Inspector } from './components/Inspector';
import { ExportPanel } from './components/ExportPanel';
import { DomainGraph } from './components/DomainGraph';
import { PluginMappings } from './components/PluginMappings';
import { Settings } from './components/Settings';
import { Help } from './components/Help';
import { ResolutionSandbox } from './components/ResolutionSandbox';
import './index.css';

type ViewMode = 'workspace' | 'graph' | 'plugins' | 'settings' | 'help' | 'sandbox';

export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [modifiedConcepts, setModifiedConcepts] = useState<Map<string, Concept>>(new Map());
  const [isExporting, setIsExporting] = useState(false);
  const [activeView, setActiveView] = useState<ViewMode>('workspace');

  const [registry] = useState(() => {
    const r = new Registry();

    // Load domains and concepts
    const conceptContents = Object.values(conceptFiles) as string[];
    r.loadTSVData(domainsTsv, conceptContents);

    // Register all discovered plugins
    Object.values(pluginFiles).forEach((mod: any) => {
      const manifest = mod.default || mod;
      if (manifest && manifest.descriptor) {
        r.registerTagSystem(manifest);
      }
    });

    return r;
  });

  const concepts = useMemo(() => {
    const base = registry.listConcepts();
    return base.map(c => modifiedConcepts.get(c.id) || c);
  }, [registry, modifiedConcepts]);

  const selectedConcept = useMemo(() =>
    selectedConceptId ? modifiedConcepts.get(selectedConceptId) || registry.getConcept(selectedConceptId) || null : null
    , [selectedConceptId, registry, modifiedConcepts]);

  const handleUpdateConcept = (updated: Concept) => {
    setModifiedConcepts(prev => {
      const next = new Map(prev);
      next.set(updated.id, updated);
      return next;
    });
    // Optional: sync to localStorage if we want persistence across reloads
    // Note: Registry itself isn't persisted here, so we only persist IDs/labels
  };

  const handleResetWorkspace = () => {
    if (window.confirm('Are you sure you want to clear all pending changes?')) {
      setModifiedConcepts(new Map());
      localStorage.removeItem('modified_concepts');
      window.location.reload();
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[placeholder*="(⌘K)"]')?.focus();
      }
      if (e.key === 'Escape') {
        setSelectedConceptId(null);
        setIsExporting(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const stats = {
    concepts: registry.listConcepts().length,
    domains: registry.listDomains().length,
    plugins: registry.listTagSystems().length,
    modified: modifiedConcepts.size,
    clusters: Object.keys(conceptFiles).length
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col z-30">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap size={18} className="text-white fill-white/20" />
            </div>
            <div>
              <h1 className="font-bold tracking-tight text-white leading-none">MetaLang</h1>
              <span className="text-[10px] uppercase tracking-widest text-cyan-500/70 font-bold">Studio v1.2</span>
            </div>
          </div>

          <nav className="space-y-1">
            <SidebarLink
              active={activeView === 'workspace'}
              onClick={() => setActiveView('workspace')}
              icon={<LayoutDashboard size={18} />}
              label="Workspace"
            />
            <SidebarLink
              active={activeView === 'graph'}
              onClick={() => setActiveView('graph')}
              icon={<Network size={18} />}
              label="Graph View"
            />
            <SidebarLink
              active={activeView === 'plugins'}
              onClick={() => setActiveView('plugins')}
              icon={<Package size={18} />}
              label="Plugins"
            />
            <SidebarLink
              active={activeView === 'settings'}
              onClick={() => setActiveView('settings')}
              icon={<SettingsIcon size={18} />}
              label="Settings"
            />
            <SidebarLink
              active={activeView === 'sandbox'}
              onClick={() => setActiveView('sandbox')}
              icon={<Binary size={18} className="text-cyan-400" />}
              label="Resolution Sandbox"
            />
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Active Registry</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Concepts</span>
                <span className="font-mono text-slate-200">{stats.concepts}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Domains</span>
                <span className="font-mono text-slate-200">{stats.domains}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/5 bg-slate-900/20 backdrop-blur-md flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                {activeView === 'workspace' && 'Concept Workspace'}
                {activeView === 'graph' && 'Domain Hierarchy'}
                {activeView === 'plugins' && 'Plugin Mappings'}
                {activeView === 'sandbox' && 'Resolution Sandbox'}
                {activeView === 'settings' && 'System Settings'}
                {activeView === 'help' && 'Documentation'}
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">
                {activeView === 'workspace' && 'Manage your canonical ontology and cross-standard mappings.'}
                {activeView === 'graph' && 'Visualize the hierarchical structure of linguistic domains.'}
                {activeView === 'plugins' && 'Inspect cross-standard tag resolutions.'}
                {activeView === 'sandbox' && 'Test BCP 47 hierarchical fallback and resolution logic.'}
                {activeView === 'settings' && 'Configure registry and workspace preferences.'}
                {activeView === 'help' && 'Learn how to use the MetaLang authoring system.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={14} />
              <input
                type="text"
                placeholder="Quick search (⌘K)..."
                className="bg-slate-900/50 border border-white/5 rounded-full py-1.5 pl-9 pr-4 text-xs w-64 focus:outline-none focus:border-cyan-500/30 focus:bg-slate-900/80 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => setIsExporting(true)}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold px-4 py-1.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              <ArrowUpRight size={14} />
              Export
              {modifiedConcepts.size > 0 && (
                <span className="bg-slate-900 text-cyan-400 px-1.5 py-0.5 rounded-full text-[9px]">
                  {modifiedConcepts.size}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-hidden p-8">
          <div className="h-full flex flex-col">
            {activeView === 'workspace' && (
              <Workspace
                concepts={concepts}
                searchTerm={searchTerm}
                selectedId={selectedConceptId}
                onSelectConcept={setSelectedConceptId}
              />
            )}
            {activeView === 'graph' && (
              <DomainGraph
                domains={registry.listDomains()}
                concepts={concepts}
              />
            )}
            {activeView === 'plugins' && (
              <PluginMappings
                manifests={registry.listTagSystems()}
                concepts={registry.listConcepts()}
              />
            )}
            {activeView === 'settings' && (
              <Settings
                stats={stats}
                onReset={handleResetWorkspace}
              />
            )}
            {activeView === 'sandbox' && (
              <ResolutionSandbox registry={registry} />
            )}
            {activeView === 'help' && (
              <Help />
            )}
          </div>
        </div>

        {/* Inspector Panel */}
        <Inspector
          concept={selectedConcept}
          onClose={() => setSelectedConceptId(null)}
          onUpdate={handleUpdateConcept}
        />

        {/* Export Panel Overlay */}
        {isExporting && (
          <ExportPanel
            original={registry.listConcepts()}
            updated={concepts}
            onClose={() => setIsExporting(false)}
          />
        )}
      </main>
    </div>
  );
};

const SidebarLink = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${active
      ? 'bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_12px_rgba(6,182,212,0.1)] border border-cyan-500/20'
      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
      }`}
    onClick={onClick}
  >
    <div className={`${active ? 'text-cyan-400' : 'text-slate-500'}`}>
      {icon}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default App;
