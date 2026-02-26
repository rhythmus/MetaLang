import { Registry, PluginManifest } from '@metalang/core';
import manifest from './manifest.json';

export const DE_PLUGIN_MANIFEST: PluginManifest = manifest as any;

export function register(registry: Registry) {
    registry.registerPlugin(DE_PLUGIN_MANIFEST);
}

export default register;
