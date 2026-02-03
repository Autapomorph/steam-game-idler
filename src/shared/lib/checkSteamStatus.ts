import { invoke } from '@tauri-apps/api/core';

import { logEvent } from './logEvent';

export async function checkSteamStatus() {
  try {
    return await invoke<boolean>('is_steam_running');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Error] in (checkSteamStatus):', error);
    logEvent(`[Error] in (checkSteamStatus): ${error}`);
    return false;
  }
}
