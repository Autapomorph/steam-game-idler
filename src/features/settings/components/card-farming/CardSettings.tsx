import { useTranslation } from 'react-i18next';
import { TbChevronRight } from 'react-icons/tb';
import { Alert, Separator, Select, ListBox } from '@heroui/react';
import { useCardSettings } from '@/features/settings';
import { SettingsSwitch } from '@/shared/components';
import { useUserStore } from '@/shared/stores';
import { handleNextTaskChange } from '@/shared/utils';

export const CardSettings = () => {
  const { t } = useTranslation();
  const userSummary = useUserStore(state => state.userSummary);
  const userSettings = useUserStore(state => state.userSettings);
  const setUserSettings = useUserStore(state => state.setUserSettings);
  const cardSettings = useCardSettings();

  const taskOptions = [
    {
      key: 'achievementUnlocker',
      label: t($ => $['common.achievementUnlocker']),
    },
    {
      key: 'autoIdle',
      label: t($ => $['customLists.autoIdle.title']),
    },
  ];

  return (
    <div className="relative flex flex-col gap-4 mt-9 pb-16 w-4/5">
      <div className="flex flex-col gap-0 select-none">
        <p className="flex items-center text-xs text-altwhite font-bold">
          {t($ => $['settings.title'])}
          <span>
            <TbChevronRight size={12} />
          </span>
        </p>
        <p className="text-3xl font-black">{t($ => $['common.cardFarming'])}</p>

        {!cardSettings.cardFarmingUser && (
          <div className="mt-4">
            <Alert className="bg-dynamic/30! text-dynamic border-dynamic/40!">
              <Alert.Indicator className="bg-dynamic/30! border-dynamic/40 rounded-full" />
              <Alert.Content>
                <Alert.Title className="font-bold text-xs">
                  {t($ => $['settings.cardFarming.alert'])}
                </Alert.Title>
              </Alert.Content>
            </Alert>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['settings.cardFarming.listGames'])}
            </p>
            <p className="text-xs text-altwhite">
              {t($ => $['settings.cardFarming.listGames.description'])}
            </p>
          </div>
          <SettingsSwitch type="cardFarming" name="listGames" />
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['settings.cardFarming.allGames'])}
            </p>
            <p className="text-xs text-altwhite">
              {t($ => $['settings.cardFarming.allGames.description'])}
            </p>
          </div>
          <SettingsSwitch type="cardFarming" name="allGames" />
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['settings.cardFarming.skipNoPlaytime'])}
            </p>
            <p className="text-xs text-altwhite">
              {t($ => $['settings.cardFarming.skipNoPlaytime.description'])}
            </p>
          </div>
          <SettingsSwitch type="cardFarming" name="skipNoPlaytime" />
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">{t($ => $['common.nextTask'])}</p>
            <p className="text-xs text-altwhite">
              {t($ => $['settings.cardFarming.nextTask.description'])}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              aria-label="nextTask"
              className="w-50"
              placeholder={t($ => $['common.nextTask.selectPlaceholder'])}
              defaultValue={userSettings.cardFarming.nextTask}
              isDisabled={!userSettings.cardFarming.nextTaskCheckbox}
              onChange={v => {
                handleNextTaskChange('cardFarming', String(v), userSummary, setUserSettings);
              }}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox disallowEmptySelection>
                  {taskOptions.map(option => (
                    <ListBox.Item key={option.key} id={option.key}>
                      {option.label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <SettingsSwitch type="cardFarming" name="nextTaskCheckbox" />
          </div>
        </div>
      </div>
    </div>
  );
};
