import { invoke } from '@tauri-apps/api/core';

import type { InvokeAchievementData, InvokeAchievementUnlock } from '@/types';
import { logEvent } from '@/utils/tasks';

// Unlock a single achievement for a game
export async function unlockAchievement(
  steamId: string | undefined,
  appId: number,
  achievementName: string,
  appName: string,
): Promise<boolean> {
  try {
    const response = await invoke<InvokeAchievementUnlock>('unlock_achievement', {
      appId,
      achievementId: achievementName,
    });

    await invoke<InvokeAchievementData>('get_achievement_data', {
      steamId,
      appId,
      refetch: true,
    });

    const status = JSON.parse(String(response)) as InvokeAchievementUnlock;

    if (status.success) {
      logEvent(`[Achievement Manager] Unlocked ${achievementName} for ${appName} (${appId})`);
      return true;
    }
    logEvent(
      `[Error] [Achievement Manager] Failed to unlock ${achievementName} for ${appName} (${appId})`,
    );
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in unlockAchievement util: ', error);
    logEvent(`[Error] in (unlockAchievement) util: ${error}`);
    return false;
  }
}
