import { invoke } from '@tauri-apps/api/core';

import type { InvokeIdle } from '@/types';
import type { GameForFarming } from '@/hooks/automation/useCardFarming';
import { checkSteamStatus, logEvent } from '@/utils/tasks';
import { showAccountMismatchToast } from '@/utils/toasts';

// Start farming idle
export async function startFarmIdle(gamesSet: Set<GameForFarming>): Promise<boolean> {
  try {
    // Make sure Steam client is running
    const isSteamRunning = await checkSteamStatus(true);
    if (!isSteamRunning) return false;

    const gamesList = Array.from(gamesSet).map(game => ({
      app_id: Number(game.appid),
      name: game.name,
    }));

    const response = await invoke<InvokeIdle>('start_farm_idle', { gamesList });
    if (response.success) {
      logEvent(`[Card Farming] Started idling ${gamesSet.size} games`);
      return true;
    }
    showAccountMismatchToast('danger');
    // eslint-disable-next-line no-console
    console.error('Error starting farm idle: ', response.error);
    logEvent('[Error] [Card Farming] Failed to idle one or more games - possible account mismatch');
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in startFarmIdle util: ', error);
    logEvent(`[Error] in (startFarmIdle) util: ${error}`);
    return false;
  }
}
