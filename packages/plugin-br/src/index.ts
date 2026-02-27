import type { PluginManifest } from '@metalang/schema';
import manifestData from './manifest.json' with { type: 'json' };

export const manifest = manifestData as unknown as PluginManifest;
export default manifest;
