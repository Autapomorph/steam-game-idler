import { invoke } from '@tauri-apps/api/core';

import { showSteamNotRunningToast } from '@/utils/toasts';
import { logEvent } from './logEvent';

export async function checkSteamStatus(showToast = false): Promise<boolean> {
  try {
    const isSteamRunning = await invoke<boolean>('is_steam_running');
    if (!isSteamRunning && showToast) showSteamNotRunningToast();
    return isSteamRunning;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in (isSteamRunning):', error);
    logEvent(`[Error] in (isSteamRunning): ${error}`);
    return false;
  }
}
