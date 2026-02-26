import type { PluginManifest } from '@metalang/schema';
import manifestData from './manifest.json' with { type: 'json' };

export const manifest: PluginManifest = manifestData as any;
export default manifest;
