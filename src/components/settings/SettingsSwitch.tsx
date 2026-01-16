import type { ChangeEvent } from 'react';
import { cn, Switch } from '@heroui/react';

import type { AchievementUnlockerSettings, CardFarmingSettings, GeneralSettings } from '@/types';
import { useUserStore } from '@/stores/userStore';
import { useAchievementSettings } from '@/hooks/settings/useAchievementSettings';
import { useCardSettings } from '@/hooks/settings/useCardSettings';
import { handleRunAtStartupChange, useGeneralSettings } from '@/hooks/settings/useGeneralSettings';
import { handleCheckboxChange } from '@/hooks/settings/useSettings';
import { antiAwayStatus } from '@/utils/tasks';

interface Props {
  type: 'general' | 'cardFarming' | 'achievementUnlocker';
  name: string;
}

export const SettingsSwitch = ({ type, name }: Props) => {
  const userSummary = useUserStore(state => state.userSummary);
  const userSettings = useUserStore(state => state.userSettings);
  const setUserSettings = useUserStore(state => state.setUserSettings);
  const { startupState, setStartupState } = useGeneralSettings();

  useCardSettings();
  useAchievementSettings();

  const isSettingEnabled = (): boolean => {
    if (!userSettings) return false;

    if (type === 'general') {
      return Boolean(userSettings.general[name as keyof GeneralSettings]);
    }
    if (type === 'cardFarming') {
      return Boolean(userSettings.cardFarming[name as keyof CardFarmingSettings]);
    }
    if (type === 'achievementUnlocker') {
      return Boolean(userSettings.achievementUnlocker[name as keyof AchievementUnlockerSettings]);
    }
    return false;
  };

  if (name === 'antiAway') {
    return (
      <Switch
        size="sm"
        name={name}
        isSelected={isSettingEnabled()}
        classNames={{
          wrapper: cn('group-data-[selected=true]:!bg-dynamic !bg-switch'),
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleCheckboxChange(e, 'general', userSummary?.steamId, setUserSettings);
          antiAwayStatus(isSettingEnabled() ? null : undefined);
        }}
      />
    );
  }

  if (name === 'runAtStartup') {
    return (
      <Switch
        size="sm"
        name={name}
        isSelected={startupState ?? false}
        classNames={{
          wrapper: cn('group-data-[selected=true]:!bg-dynamic !bg-switch'),
        }}
        onChange={() => handleRunAtStartupChange(setStartupState)}
      />
    );
  }

  return (
    <Switch
      size="sm"
      name={name}
      isSelected={isSettingEnabled()}
      classNames={{
        wrapper: cn('group-data-[selected=true]:!bg-dynamic !bg-switch'),
      }}
      onChange={e => {
        if (type === 'general') {
          handleCheckboxChange(e, 'general', userSummary?.steamId, setUserSettings);
        } else if (type === 'cardFarming') {
          handleCheckboxChange(e, 'cardFarming', userSummary?.steamId, setUserSettings);
        } else {
          handleCheckboxChange(e, 'achievementUnlocker', userSummary?.steamId, setUserSettings);
        }
      }}
    />
  );
};
