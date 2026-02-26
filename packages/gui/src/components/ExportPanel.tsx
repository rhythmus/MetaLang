import React, { useMemo } from 'react';
import type { Concept } from '@metalang/schema';
import { X, Copy, Download, GitBranch } from 'lucide-react';
import { generatePatch } from '../utils/patch';

interface ExportPanelProps {
    original: Concept[];
    updated: Concept[];
    onClose: () => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ original, updated, onClose }) => {
    const patch = useMemo(() => generatePatch(original, updated), [original, updated]);
    const patchJson = useMemo(() => JSON.stringify(patch, null, 2), [patch]);

    const handleCopy = () => {
        navigator.clipboard.writeText(patchJson);
    };

    const handleDownload = () => {
        const blob = new Blob([patchJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `metalang_patch_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-card" style={{ width: '800px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Export JSON Patch</h2>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                            {patch.length} operations
                        </span>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-hidden flex flex-col gap-4">
                    <p className="text-sm text-slate-400">
                        This patch contains the changes made to the canonical ontology. You can apply this patch to any MetaLang registry to replicate your edits.
                    </p>

                    <div className="flex-1 overflow-auto rounded-xl bg-black/40 border border-white/5 p-4 font-mono text-[13px] leading-relaxed">
                        <pre className="text-blue-300">
                            {patchJson}
                        </pre>
                    </div>
                </div>

                <div className="p-4 border-t bg-white/5 flex items-center justify-end gap-3">
                    <button
                        onClick={handleCopy}
                        className="sidebar-link"
                        style={{ width: 'auto', background: 'var(--border-glass)' }}
                    >
                        <Copy size={16} />
                        Copy to Clipboard
                    </button>
                    <button
                        onClick={handleDownload}
                        className="btn-primary"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        <Download size={16} />
                        Download .json
                    </button>
                    <GitHubSubmitButton content={patchJson} />
                </div>
            </div>
        </div>
    );
};

const GitHubSubmitButton: React.FC<{ content: string }> = ({ content }) => {
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [prUrl, setPrUrl] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async () => {
        const owner = localStorage.getItem('gh_owner') || 'woutersoudan';
        const repo = localStorage.getItem('gh_repo') || 'metalang';
        const auth = localStorage.getItem('gh_token');

        if (!auth) {
            alert('Please configure your GitHub Personal Access Token (PAT) in Settings.');
            return;
        }

        setStatus('loading');
        setError(null);

        try {
            const { GitHubService } = await import('@metalang/core');
            const service = new GitHubService({ owner, repo, auth });

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            const branchName = `patch-${timestamp}`;

            const url = await service.createPullRequest({
                title: `Ontology Update: ${timestamp}`,
                body: `This PR contains an automated ontology patch generated from the MetaLang Authoring GUI.\n\n### Summary\n- Branch: \`${branchName}\`\n- Generated at: ${new Date().toLocaleString()}`,
                branchName,
                filePath: 'data/metalang_seed_v1_1.json',
                content,
                commitMessage: `feat(ontology): apply patch ${timestamp}`
            });

            setPrUrl(url);
            setStatus('success');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to create PR');
            setStatus('error');
        }
    };

    if (status === 'success' && prUrl) {
        return (
            <a
                href={prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 bg-green-500/20 text-green-400 border-green-500/20 hover:bg-green-500/30"
            >
                <GitBranch size={16} />
                View PR on GitHub
            </a>
        );
    }

    return (
        <div className="flex flex-col items-end gap-1">
            <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className="btn-primary flex items-center gap-2"
            >
                <GitBranch size={16} />
                {status === 'loading' ? 'Creating PR...' : 'Submit as PR'}
            </button>
            {status === 'error' && error && (
                <span className="text-[10px] text-rose-400 font-medium">
                    {error}
                </span>
            )}
        </div>
    );
};
