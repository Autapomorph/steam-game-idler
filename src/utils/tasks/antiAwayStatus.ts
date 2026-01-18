import { invoke } from '@tauri-apps/api/core';

import type { InvokeSettings, UserSummary } from '@/types';
import { logEvent } from './logEvent';

// Manage the anti-away status
let antiAwayInterval: ReturnType<typeof setTimeout> | null = null;

export async function antiAwayStatus(active: boolean | null = null): Promise<void> {
  try {
    const steamRunning = await invoke('is_steam_running');
    if (!steamRunning) return;

    const userSummary = JSON.parse(localStorage.getItem('userSummary') ?? '{}') as UserSummary;

    const response = await invoke<InvokeSettings>('get_user_settings', {
      steamId: userSummary?.steamId,
    });

    const { settings } = response;

    const { antiAway } = settings?.general || {};

    const shouldRun = active ?? antiAway;

    if (shouldRun) {
      await invoke('anti_away');
      antiAwayInterval ??= setInterval(
        async () => {
          await invoke('anti_away');
        },
        3 * 60 * 1000,
      );
    } else if (antiAwayInterval) {
      clearInterval(antiAwayInterval);
      antiAwayInterval = null;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in (antiAwayStatus):', error);
    logEvent(`[Error] in (antiAwayStatus): ${error}`);
  }
}
