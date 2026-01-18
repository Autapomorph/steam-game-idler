import type { Dispatch, SetStateAction } from 'react';
import { invoke } from '@tauri-apps/api/core';

import type {
  InvokeSettings,
  InvokeSteamCredentials,
  InvokeValidateSession,
  UserSettings,
  UserSummary,
} from '@/types';
// eslint-disable-next-line import-x/no-cycle
import { fetchUserSummary } from '@/hooks/settings/useCardSettings';
import {
  showAccountMismatchToast,
  showDangerToast,
  showIncorrectCredentialsToast,
  t,
} from '@/utils/toasts';
import { encrypt } from './encrypt';
import { logEvent } from './logEvent';

// Automatically revalidate Steam credentials
export async function autoRevalidateSteamCredentials(
  setUserSettings: Dispatch<SetStateAction<UserSettings>>,
): Promise<{ credentials: { sid: string; sls: string } | null } | void> {
  try {
    const result = await invoke<InvokeSteamCredentials>('open_steam_login_window');

    if (!result?.success) {
      showDangerToast(t('common.error'));
      logEvent(`[Error] in (handleShowSteamLoginWindow): ${result?.message ?? 'Unknown error'}`);
      return;
    }

    if (result.success && result.sessionid.length > 0 && result.steamLoginSecure.length > 0) {
      const userSummary = JSON.parse(localStorage.getItem('userSummary') ?? '{}') as UserSummary;

      const cachedUserSettings = await invoke<InvokeSettings>('get_user_settings', {
        steamId: userSummary?.steamId,
      });

      // Verify steam cookies are valid
      const validate = await invoke<InvokeValidateSession>('validate_session', {
        sid: result.sessionid,
        sls: result.steamLoginSecure,
        sma: result.steamMachineAuth ?? result.steamParental ?? undefined,
        steamid: userSummary?.steamId,
      });

      if (validate.user) {
        const steamId = result.steamLoginSecure.slice(0, 17);
        const { apiKey } = cachedUserSettings.settings.general;

        // Wait for user info first, which should be faster
        const cardFarmingUser = await fetchUserSummary(steamId, apiKey);

        // Make sure user isn't trying to farm cards with different account than they're logged in with
        if (cardFarmingUser.steamId !== userSummary?.steamId) {
          showAccountMismatchToast('danger');
          // eslint-disable-next-line consistent-return
          return await logEvent('[Error] in (handleSave) Account mismatch between Steam and SGI');
        }

        // Save valid cookies and update UI state
        await invoke<InvokeSettings>('update_user_settings', {
          steamId: userSummary?.steamId,
          key: 'cardFarming.credentials',
          value: {
            sid: encrypt(result.sessionid),
            sls: encrypt(result.steamLoginSecure),
            sma: null,
          },
        });

        // Save card farming user and update UI state
        const updatedUserSettings = await invoke<InvokeSettings>('update_user_settings', {
          steamId: userSummary?.steamId,
          key: 'cardFarming.userSummary',
          value: cardFarmingUser,
        });

        setUserSettings(updatedUserSettings.settings);

        logEvent(
          `[Auto Revalidate] Steam credentials were automatically revalidated for ${validate.user}`,
        );

        // eslint-disable-next-line consistent-return
        return {
          credentials: updatedUserSettings.settings.cardFarming.credentials,
        };
      }
      showIncorrectCredentialsToast();
      logEvent('[Error] [Settings - Card Farming] Incorrect card farming credentials');
    }
  } catch (error) {
    showDangerToast(t('common.error'));
    // eslint-disable-next-line no-console
    console.error('Error in (autoRevalidateSteamCredentials):', error);
    logEvent(`[Error] in (autoRevalidateSteamCredentials): ${error}`);
  }
}
