import { getVersion } from '@tauri-apps/api/app';

import { showDangerToast, t } from '@/utils/toasts';
import { logEvent } from './logEvent';

// Get the app version
// eslint-disable-next-line consistent-return
export const getAppVersion = async (): Promise<string | undefined> => {
  try {
    const appVersion = await getVersion();
    return appVersion;
  } catch (error) {
    showDangerToast(t('common.error'));
    // eslint-disable-next-line no-console
    console.error('Error in (getAppVersion):', error);
    logEvent(`[Error] in (getAppVersion): ${error}`);
  }
};
