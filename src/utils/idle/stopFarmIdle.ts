import { invoke } from '@tauri-apps/api/core';

import type { GameForFarming } from '@/hooks/automation/useCardFarming';
import { logEvent } from '@/utils/tasks';

// Stop farming idle
export async function stopFarmIdle(gamesSet: Set<GameForFarming>): Promise<boolean> {
  try {
    await invoke('stop_farm_idle');
    logEvent(`[Card Farming] Stopped idling ${gamesSet.size} games`);
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in stopFarmIdle util (these errors can often be ignored): ', error);
    return false;
  }
}
