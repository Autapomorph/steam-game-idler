import { invoke } from '@tauri-apps/api/core';

import { getRuntimeConfig } from '@/shared/config';

// Log all types of events to a local log file
export async function logEvent(message: string): Promise<void> {
  try {
    const { appVersion } = getRuntimeConfig();
    await invoke('log_event', { message: `[v${appVersion}] ${message}` });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in logEvent: ', error);
  }
}
