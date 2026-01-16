import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { invoke } from '@tauri-apps/api/core';
import type { TimeInputValue } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import type { InvokeSettings, UserSettings, UserSummary } from '@/types';
import { useUserStore } from '@/stores/userStore';
import { logEvent } from '@/utils/tasks';
import { showDangerToast, t } from '@/utils/toasts';

interface AchievementSettingsHook {
  sliderLabel: string;
  setSliderLabel: Dispatch<SetStateAction<string>>;
}

export const useAchievementSettings = (): AchievementSettingsHook => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { t } = useTranslation();
  const userSettings = useUserStore(state => state.userSettings);
  const [sliderLabel, setSliderLabel] = useState('');

  // Sync local settings with global settings when they change
  useEffect(() => {
    const interval = userSettings.achievementUnlocker?.interval;
    setSliderLabel(
      t('settings.achievementUnlocker.interval', {
        min: interval[0],
        max: interval[1],
      }),
    );
  }, [userSettings.achievementUnlocker?.interval, setSliderLabel, t]);

  return { sliderLabel, setSliderLabel };
};

// Handle changes to the slider in the settings
export const handleSliderChange = async (
  newInterval: [number, number] | number[] | number,
  userSummary: UserSummary,
  setUserSettings: Dispatch<SetStateAction<UserSettings>>,
): Promise<void> => {
  try {
    const response = await invoke<InvokeSettings>('update_user_settings', {
      steamId: userSummary?.steamId,
      key: 'achievementUnlocker.interval',
      value: newInterval,
    });
    setUserSettings(response.settings);
    logEvent(`[Settings - Achievement Unlocker] Changed 'interval' to '${String(newInterval)}'`);
  } catch (error) {
    showDangerToast(t('common.error'));
    // eslint-disable-next-line no-console
    console.error('Error in (handleSliderChange - Achievement Unlocker):', error);
    logEvent(`[Error] in (handleSliderChange - Achievement Unlocker): ${error}`);
  }
};

// Handle changes to the schedule in the settings
export const handleScheduleChange = async (
  value: TimeInputValue | null,
  type: 'scheduleFrom' | 'scheduleTo',
  userSummary: UserSummary,
  setUserSettings: Dispatch<SetStateAction<UserSettings>>,
): Promise<void> => {
  try {
    const response = await invoke<InvokeSettings>('update_user_settings', {
      steamId: userSummary?.steamId,
      key: `achievementUnlocker.${type}`,
      value,
    });
    setUserSettings(response.settings);
    logEvent(`[Settings - Achievement Unlocker] Changed '${type}' to '${String(value)}'`);
  } catch (error) {
    showDangerToast(t('common.error'));
    // eslint-disable-next-line no-console
    console.error('Error in (handleScheduleChange):', error);
    logEvent(`[Error] in (handleScheduleChange): ${error}`);
  }
};

export const handleNextTaskChange = async (
  currentKey: string,
  userSummary: UserSummary,
  setUserSettings: Dispatch<SetStateAction<UserSettings>>,
): Promise<void> => {
  const response = await invoke<InvokeSettings>('update_user_settings', {
    steamId: userSummary?.steamId,
    key: 'achievementUnlocker.nextTask',
    value: currentKey,
  });

  setUserSettings(response.settings);
};
