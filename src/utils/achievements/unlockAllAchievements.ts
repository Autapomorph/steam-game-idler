import { invoke } from '@tauri-apps/api/core';

import type { Achievement, InvokeAchievementData, InvokeAchievementUnlock } from '@/types';
import { logEvent } from '@/utils/tasks';

// Unlock all achievements for a game
export async function unlockAllAchievements(
  steamId: string | undefined,
  appId: number,
  achievementsArr: Achievement[],
  appName: string,
): Promise<boolean> {
  try {
    const response = await invoke<InvokeAchievementUnlock>('unlock_all_achievements', { appId });

    await invoke<InvokeAchievementData>('get_achievement_data', {
      steamId,
      appId,
      refetch: true,
    });

    const status = JSON.parse(String(response)) as InvokeAchievementUnlock;

    if (status.success) {
      logEvent(
        `[Achievement Manager] Unlocked ${achievementsArr.length} achievements for ${appName} (${appId})`,
      );
      return true;
    }
    logEvent(
      `[Error] [Achievement Manager] Failed to unlock all achievements for ${appName} (${appId})`,
    );
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in unlockAllAchievements util: ', error);
    logEvent(`[Error] in (unlockAllAchievements) util: ${error}`);
    return false;
  }
}
