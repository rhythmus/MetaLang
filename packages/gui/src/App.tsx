import React, { useState, useMemo, useEffect } from 'react';
import { LayoutGrid, Binary, Settings as SettingsIcon, Search, GitBranch, HelpCircle } from 'lucide-react';
import { Registry } from '@metalang/core';
import type { Concept } from '@metalang/schema';
import seedData from '../../../data/metalang_seed_v1_1.json';
import pluginData from '../../../data/metalang_plugins_v1_1.json';
import { Workspace } from './components/Workspace';
import { Inspector } from './components/Inspector';
import { ExportPanel } from './components/ExportPanel';
import { DomainGraph } from './components/DomainGraph';
import { PluginMappings } from './components/PluginMappings';
import { Settings } from './components/Settings';
import { Help } from './components/Help';
import './index.css';

type ViewMode = 'workspace' | 'graph' | 'plugins' | 'settings' | 'help';

export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [modifiedConcepts, setModifiedConcepts] = useState<Map<string, Concept>>(new Map());
  const [isExporting, setIsExporting] = useState(false);
  const [activeView, setActiveView] = useState<ViewMode>('workspace');

  const [registry] = useState(() => {
    const r = new Registry();
    r.loadSeed(seedData as any);
    // Load plugins
    if (Array.isArray(pluginData)) {
      pluginData.forEach(p => r.registerTagSystem(p as any));
    }
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
  };

  const handleResetWorkspace = () => {
    setModifiedConcepts(new Map());
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('.search-input')?.focus();
      }
      if (e.key === 'Escape') {
        setSelectedConceptId(null);
        setIsExporting(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg" style={{ background: 'var(--gradient-primary)', borderRadius: '8px' }}>
            <Binary size={18} color="white" />
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>MetaLang</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarLink
            active={activeView === 'workspace'}
            onClick={() => setActiveView('workspace')}
            icon={<LayoutGrid size={18} />}
            label="Workspace"
          />
          <SidebarLink
            active={activeView === 'graph'}
            onClick={() => setActiveView('graph')}
            icon={<GitBranch size={18} />}
            label="Domain Graph"
          />
          <SidebarLink
            active={activeView === 'plugins'}
            onClick={() => setActiveView('plugins')}
            icon={<Binary size={18} />}
            label="Plugin Mappings"
          />
          <SidebarLink
            active={activeView === 'settings'}
            onClick={() => setActiveView('settings')}
            icon={<SettingsIcon size={18} />}
            label="Settings"
          />
        </nav>

        <div className="p-4" style={{ borderTop: '1px solid var(--border-glass)' }}>
          <SidebarLink
            active={activeView === 'help'}
            onClick={() => setActiveView('help')}
            icon={<HelpCircle size={18} />}
            label="Help & Docs"
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="workspace-main">
          {/* Header */}
          <header className="header">
            <div className="flex items-center gap-4 flex-1" style={{ maxWidth: '600px' }}>
              <div className="relative w-full">
                <Search className="absolute" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} size={16} />
                <input
                  type="text"
                  placeholder="Search concepts, domains or GUIDs..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="btn-primary"
                onClick={() => setIsExporting(true)}
              >
                Export Patch ({modifiedConcepts.size})
              </button>
            </div>
          </header>

          {/* Content Area */}
          <section className="content-area">
            <div style={{ maxWidth: '1200px', margin: '0 auto', height: '100%' }}>
              <div className="flex items-end justify-between" style={{ marginBottom: '2rem' }}>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {activeView === 'workspace' && 'Concept Workspace'}
                    {activeView === 'graph' && 'Domain Hierarchy'}
                    {activeView === 'plugins' && 'Plugin Mappings'}
                    {activeView === 'settings' && 'System Settings'}
                    {activeView === 'help' && 'Documentation'}
                  </h1>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {activeView === 'workspace' && 'Manage your canonical ontology and cross-standard mappings.'}
                    {activeView === 'graph' && 'Visualize the hierarchical structure of linguistic domains.'}
                    {activeView === 'plugins' && 'Inspect cross-standard tag resolutions.'}
                    {activeView === 'settings' && 'Configure registry and workspace preferences.'}
                    {activeView === 'help' && 'Learn how to use the MetaLang authoring system.'}
                  </p>
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)', background: 'var(--border-glass)', padding: '4px 12px', borderRadius: '40px' }}>
                  v1.1.0-alpha
                </div>
              </div>

              {activeView === 'workspace' && (
                <Workspace
                  concepts={concepts}
                  searchTerm={searchTerm}
                  onSelectConcept={setSelectedConceptId}
                  selectedId={selectedConceptId}
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
                  concepts={concepts}
                />
              )}
              {activeView === 'settings' && (
                <Settings
                  stats={{
                    concepts: registry.listConcepts().length,
                    domains: registry.listDomains().length,
                    plugins: registry.listTagSystems().length,
                    modified: modifiedConcepts.size
                  }}
                  onReset={handleResetWorkspace}
                />
              )}
              {activeView === 'help' && (
                <Help />
              )}
            </div>
          </section>
        </div>

        {/* Inspector Panel */}
        <Inspector
          concept={selectedConcept}
          onClose={() => setSelectedConceptId(null)}
          onUpdate={handleUpdateConcept}
        />

        {/* Export Overlay */}
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
  <div
    className={`sidebar-link ${active ? 'active' : ''}`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default App;
