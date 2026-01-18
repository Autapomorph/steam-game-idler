import { invoke } from '@tauri-apps/api/core';

import type { Achievement, InvokeAchievementData, InvokeAchievementUnlock } from '@/types';
import { logEvent } from '@/utils/tasks';

// Lock all achievements for a game
export async function lockAllAchievements(
  steamId: string | undefined,
  appId: number,
  achievementsArr: Achievement[],
  appName: string,
): Promise<boolean> {
  try {
    const response = await invoke<InvokeAchievementUnlock>('lock_all_achievements', { appId });

    await invoke<InvokeAchievementData>('get_achievement_data', {
      steamId,
      appId,
      refetch: true,
    });

    const status = JSON.parse(String(response)) as InvokeAchievementUnlock;

    if (status.success) {
      logEvent(
        `[Achievement Manager] Locked ${achievementsArr.length} achievements for ${appName} (${appId})`,
      );
      return true;
    }
    logEvent(
      `[Error] [Achievement Manager] Failed to lock all achievements for ${appName} (${appId})`,
    );
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in lockAllAchievements util: ', error);
    logEvent(`[Error] in (lockAllAchievements) util: ${error}`);
    return false;
  }
}
