import type { Dispatch, SetStateAction } from 'react';
import { invoke } from '@tauri-apps/api/core';

import type { Achievement, InvokeAchievementData, InvokeStatUpdate, StatValue } from '@/types';
import { logEvent } from '@/utils/tasks';

// Update statistics for a game
export async function updateStats(
  steamId: string | undefined,
  appId: number | null,
  appName: string | null,
  valuesArr: StatValue[],
  setAchievements: Dispatch<SetStateAction<Achievement[]>>,
): Promise<boolean> {
  try {
    const response = await invoke<InvokeStatUpdate>('update_stats', {
      appId,
      statsArr: JSON.stringify(valuesArr),
    });

    const statusStr = String(response).split(/(?<=})\s*(?={)/)[0];

    const status = JSON.parse(statusStr) as InvokeStatUpdate;

    const newData = await invoke<InvokeAchievementData>('get_achievement_data', {
      steamId,
      appId,
      refetch: true,
    });

    setAchievements(newData?.achievement_data?.achievements);

    if (status.success) {
      logEvent(`[Statistics Manager] Updated ${valuesArr.length} stats for ${appName} (${appId})`);
      return true;
    }
    logEvent(`[Error] [Statistics Manager] Failed to update stats for ${appName} (${appId})`);
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in updateStats util: ', error);
    logEvent(`[Error] in (updateStats) util: ${error}`);
    return false;
  }
}
