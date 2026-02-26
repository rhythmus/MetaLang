import { Registry } from '@metalang/core';
import * as manifest from './manifest.json';

export const activate = () => {
    Registry.registerTagSystem(manifest as any);
};
