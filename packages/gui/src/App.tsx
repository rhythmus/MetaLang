import React, { useState, useMemo } from 'react';
import { LayoutGrid, Binary, Info, Settings, Search } from 'lucide-react';
import { Registry } from '@metalang/core';
import seedData from '../../../data/metalang_seed_v1_1.json';
import { Workspace } from './components/Workspace';
import { Inspector } from './components/Inspector';
import './index.css';

export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);

  const [registry] = useState(() => {
    const r = new Registry();
    r.loadSeed(seedData as any);
    return r;
  });

  const concepts = useMemo(() => registry.listConcepts(), [registry]);
  const selectedConcept = useMemo(() =>
    selectedConceptId ? registry.getConcept(selectedConceptId) || null : null
    , [selectedConceptId, registry]);

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
          <div className="sidebar-link active">
            <LayoutGrid size={18} />
            <span>Workspace</span>
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
              <button className="btn-primary">
                Export Patch
              </button>
            </div>
          </header>

          {/* Content Area */}
          <section className="content-area">
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="flex items-end justify-between" style={{ marginBottom: '2rem' }}>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Concept Workspace</h1>
                  <p style={{ color: 'var(--text-secondary)' }}>Manage your canonical ontology and cross-standard mappings.</p>
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)', background: 'var(--border-glass)', padding: '4px 12px', borderRadius: '40px' }}>
                  v1.1.0-alpha
                </div>
              </div>

              <Workspace
                concepts={concepts}
                searchTerm={searchTerm}
                onSelectConcept={setSelectedConceptId}
                selectedId={selectedConceptId}
              />
            </div>
          </section>
        </div>

        {/* Inspector Panel */}
        <Inspector
          concept={selectedConcept}
          onClose={() => setSelectedConceptId(null)}
        />
      </main>
    </div>
  );
};

export default App;
