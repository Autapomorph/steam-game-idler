import { getVersion } from '@tauri-apps/api/app';
import { invoke } from '@tauri-apps/api/core';

export async function logEvent(message: string): Promise<void> {
  try {
    const version = await getVersion();
    await invoke('log_event', { message: `[v${version}] ${message}` });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in logEvent util: ', error);
  }
}
