import { invoke } from '@tauri-apps/api/core';

import { showDangerToast, t } from '@/utils/toasts';
import { logEvent } from './logEvent';

// Clear local/session storage but preserving important keys
export const preserveKeysAndClearData = async (): Promise<void> => {
  try {
    const keysToPreserve = [
      'theme',
      'minToTrayNotified',
      'seenNotifications',
      'hasUpdated',
      'isFirstTimeUser',
    ];

    const preservedData: Record<string, string> = keysToPreserve.reduce<Record<string, string>>(
      (acc, key) => {
        const value = localStorage.getItem(key);
        if (value) acc[key] = value;
        return acc;
      },
      {},
    );

    localStorage.clear();
    sessionStorage.clear();

    await invoke('delete_all_cache_files');

    Object.entries(preservedData).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  } catch (error) {
    showDangerToast(t('common.error'));
    // eslint-disable-next-line no-console
    console.error('Error in (preserveKeysAndClearData):', error);
    logEvent(`[Error] in (preserveKeysAndClearData): ${error}`);
  }
};
