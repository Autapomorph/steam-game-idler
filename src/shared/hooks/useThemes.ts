import type { InvokeSettings } from '@/shared/types';
import { invoke } from '@tauri-apps/api/core';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';

import { showDangerToast } from '@/shared/components';
import { useUserStore } from '@/shared/stores';
import { logEvent } from '@/shared/utils';

export function useThemes() {
  const { t } = useTranslation();
  const { setTheme } = useTheme();
  const userSummary = useUserStore(state => state.userSummary);

  useEffect(() => {
    const applyThemeForUser = async () => {
      try {
        const html = document.documentElement;

        if (!userSummary) {
          return;
        }

        // Themes
        let userTheme = 'dark';

        // Get user settings if available
        const cachedUserSettings = await invoke<InvokeSettings>('get_user_settings', {
          steamId: userSummary.steamId,
        });
        userTheme = cachedUserSettings.settings.general.theme || 'dark';

        // Always reset classes and apply the correct one
        html.className = '';
        html.classList.add(userTheme);
        localStorage.setItem('theme', userTheme);
        setTheme(userTheme);
      } catch (error) {
        showDangerToast(t('common.error'));
        console.error('Error in (applyThemeForUser):', error);
        logEvent(`[Error] in (applyThemeForUser): ${error}`);
      }
    };

    applyThemeForUser();
  }, [userSummary, setTheme, t]);
}
