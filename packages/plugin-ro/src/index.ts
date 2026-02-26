import { Registry, PluginManifest } from '@metalang/core';
import manifest from './manifest.json';

export const RO_PLUGIN_MANIFEST: PluginManifest = manifest as any;

export function register(registry: Registry) {
    registry.registerPlugin(RO_PLUGIN_MANIFEST);
}

export default register;
