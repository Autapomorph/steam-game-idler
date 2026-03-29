import type {
  AchievementUnlockerSettings,
  CardFarmingSettings,
  GeneralSettings,
} from '@/shared/types';
import { Switch } from '@heroui/react';

import {
  handleCheckboxChange,
  handleRunAtStartupChange,
  useAchievementSettings,
  useCardSettings,
  useGeneralSettings,
} from '@/features/settings';
import { useUserStore } from '@/shared/stores';
import { antiAwayStatus } from '@/shared/utils';

interface SettingsCheckboxProps {
  type: 'general' | 'cardFarming' | 'achievementUnlocker';
  name: string;
}

export const SettingsSwitch = ({ type, name }: SettingsCheckboxProps) => {
  const userSummary = useUserStore(state => state.userSummary);
  const userSettings = useUserStore(state => state.userSettings);
  const setUserSettings = useUserStore(state => state.setUserSettings);
  const { startupState, setStartupState } = useGeneralSettings();

  useCardSettings();
  useAchievementSettings();

  const isSettingEnabled = () => {
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
        onChange={isChecked => {
          handleCheckboxChange(
            {
              target: {
                name,
                checked: isChecked,
              },
            },
            'general',
            userSummary?.steamId,
            setUserSettings,
          );
          antiAwayStatus(isSettingEnabled() ? null : undefined);
        }}
      >
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>
    );
  }

  if (name === 'runAtStartup') {
    return (
      <Switch
        size="sm"
        name={name}
        isSelected={startupState || false}
        onChange={() => handleRunAtStartupChange(setStartupState)}
      >
        <Switch.Control>
          <Switch.Thumb onChange={w => w} />
        </Switch.Control>
      </Switch>
    );
  }

  return (
    <Switch
      size="sm"
      name={name}
      isSelected={isSettingEnabled()}
      onChange={isChecked => {
        if (type === 'general') {
          handleCheckboxChange(
            {
              target: {
                name,
                checked: isChecked,
              },
            },
            'general',
            userSummary?.steamId,
            setUserSettings,
          );
        } else if (type === 'cardFarming') {
          handleCheckboxChange(
            {
              target: {
                name,
                checked: isChecked,
              },
            },
            'cardFarming',
            userSummary?.steamId,
            setUserSettings,
          );
        } else {
          handleCheckboxChange(
            {
              target: {
                name,
                checked: isChecked,
              },
            },
            'achievementUnlocker',
            userSummary?.steamId,
            setUserSettings,
          );
        }
      }}
    >
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch>
  );
};
