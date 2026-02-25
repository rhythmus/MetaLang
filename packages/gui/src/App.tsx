import React, { useState, useMemo } from 'react';
import { LayoutGrid, Binary, Info, Settings, Search, GitBranch } from 'lucide-react';
import { Registry } from '@metalang/core';
import type { Concept } from '@metalang/schema';
import seedData from '../../../data/metalang_seed_v1_1.json';
import { Workspace } from './components/Workspace';
import { Inspector } from './components/Inspector';
import { ExportPanel } from './components/ExportPanel';
import { DomainGraph } from './components/DomainGraph';
import './index.css';

export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [modifiedConcepts, setModifiedConcepts] = useState<Map<string, Concept>>(new Map());
  const [isExporting, setIsExporting] = useState(false);
  const [activeView, setActiveView] = useState<'workspace' | 'graph'>('workspace');

  const [registry] = useState(() => {
    const r = new Registry();
    r.loadSeed(seedData as any);
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
          <div
            className={`sidebar-link ${activeView === 'workspace' ? 'active' : ''}`}
            onClick={() => setActiveView('workspace')}
          >
            <LayoutGrid size={18} />
            <span>Workspace</span>
          </div>
          <div
            className={`sidebar-link ${activeView === 'graph' ? 'active' : ''}`}
            onClick={() => setActiveView('graph')}
          >
            <GitBranch size={18} />
            <span>Domain Graph</span>
          </div>
          <div className="sidebar-link">
            <Binary size={18} />
            <span>Plugin Mappings</span>
          </div>
          <div className="sidebar-link">
            <Settings size={18} />
            <span>Settings</span>
          </div>
        </nav>

        <div className="p-4" style={{ borderTop: '1px solid var(--border-glass)' }}>
          <div className="sidebar-link">
            <Info size={18} />
            <span>Help & Docs</span>
          </div>
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
                    {activeView === 'workspace' ? 'Concept Workspace' : 'Domain Hierarchy'}
                  </h1>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {activeView === 'workspace'
                      ? 'Manage your canonical ontology and cross-standard mappings.'
                      : 'Visualize the hierarchical structure of linguistic domains.'}
                  </p>
                </div>
                {modifiedConcepts.size > 0 && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '4px 12px', borderRadius: '40px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                    {modifiedConcepts.size} modified
                  </div>
                )}
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)', background: 'var(--border-glass)', padding: '4px 12px', borderRadius: '40px' }}>
                  v1.1.0-alpha
                </div>
              </div>

              {activeView === 'workspace' ? (
                <Workspace
                  concepts={concepts}
                  searchTerm={searchTerm}
                  onSelectConcept={setSelectedConceptId}
                  selectedId={selectedConceptId}
                />
              ) : (
                <DomainGraph
                  domains={registry.listDomains()}
                  concepts={concepts}
                />
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

export default App;
