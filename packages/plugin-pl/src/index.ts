import { Registry, PluginManifest } from '@metalang/core';
import manifest from './manifest.json';

export const PL_PLUGIN_MANIFEST: PluginManifest = manifest as any;

export function register(registry: Registry) {
    registry.registerPlugin(PL_PLUGIN_MANIFEST);
}

export default register;
