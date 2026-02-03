import { getVersion } from '@tauri-apps/api/app';

import { isPortableInstall } from '../lib/isPortableInstall';

export interface RuntimeConfig {
  appVersion: string;
  isPortable: boolean;
}

let runtimeConfig: RuntimeConfig | null = null;
let initPromise: Promise<RuntimeConfig> | null = null;

async function init(): Promise<RuntimeConfig> {
  const [appVersion, isPortable] = await Promise.all([getVersion(), isPortableInstall()]);

  return {
    appVersion,
    isPortable,
  };
}

export async function initRuntimeConfig() {
  if (runtimeConfig || initPromise) {
    return;
  }

  initPromise = init();
  runtimeConfig = await initPromise;
}

export function getRuntimeConfig(): RuntimeConfig {
  if (!runtimeConfig) {
    throw new Error('Runtime config is not initialized. Call initRuntimeConfig() first');
  }

  return runtimeConfig;
}
