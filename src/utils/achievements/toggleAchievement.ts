import { invoke } from '@tauri-apps/api/core';

import type { InvokeAchievementUnlock } from '@/types';
import { logEvent } from '@/utils/tasks';
import { showDangerToast, showSuccessToast, t } from '@/utils/toasts';

// Toggle the state of a single achievement for a game
export async function toggleAchievement(
  steamId: string | undefined,
  appId: number,
  achievementName: string,
  appName: string,
  type: string,
): Promise<boolean> {
  try {
    const response = await invoke<InvokeAchievementUnlock>('toggle_achievement', {
      appId,
      achievementId: achievementName,
    });

    await invoke('get_achievement_data', { steamId, appId, refetch: true });

    const status = JSON.parse(String(response)) as InvokeAchievementUnlock;

    if (status.success) {
      showSuccessToast(t('toast.toggle.success', { type, achievementName, appName }));
      logEvent(`[Achievement Manager] ${type} ${achievementName} for ${appName} (${appId})`);
      return true;
    }
    showDangerToast(
      t('toast.toggle.error', {
        type: type.replace('ed', '').toLowerCase(),
        achievementName,
        appName,
      }),
    );
    logEvent(
      `[Error] [Achievement Manager] Failed to ${type.replace('ed', '').toLowerCase()} ${achievementName} for ${appName} (${appId})`,
    );
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in toggleAchievement util: ', error);
    logEvent(`[Error] in (toggleAchievement) util: ${error}`);
    return false;
  }
}
