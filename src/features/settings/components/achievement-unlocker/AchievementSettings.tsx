import { useTranslation } from 'react-i18next';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { TbChevronRight } from 'react-icons/tb';
import { Button, Separator, Select, Slider, TimeField, ListBox } from '@heroui/react';
import {
  handleIntervalChange,
  handleScheduleChange,
  useAchievementSettings,
} from '@/features/settings';
import { SettingsSwitch } from '@/shared/components';
import { useUserStore } from '@/shared/stores';
import { handleNextTaskChange } from '@/shared/utils';

export const AchievementSettings = () => {
  const { t } = useTranslation();
  const userSummary = useUserStore(state => state.userSummary);
  const userSettings = useUserStore(state => state.userSettings);
  const setUserSettings = useUserStore(state => state.setUserSettings);
  const { sliderLabel, setSliderLabel } = useAchievementSettings();

  const taskOptions = [
    {
      key: 'cardFarming',
      label: t($ => $['common.cardFarming']),
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
        <p className="text-3xl font-black">{t($ => $['common.achievementUnlocker'])}</p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['settings.achievementUnlocker.idle'])}
            </p>
            <p className="text-xs text-altwhite">
              {t($ => $['settings.achievementUnlocker.idle.description'])}
            </p>
          </div>
          <SettingsSwitch type="achievementUnlocker" name="idle" />
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['settings.achievementUnlocker.hidden'])}
            </p>
            <p className="text-xs text-altwhite">
              {t($ => $['settings.achievementUnlocker.hidden.description'])}
            </p>
          </div>
          <SettingsSwitch type="achievementUnlocker" name="hidden" />
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">{t($ => $['common.nextTask'])}</p>
            <p className="text-xs text-altwhite">
              {t($ => $['settings.achievementUnlocker.nextTask.description'])}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              aria-label="nextTask"
              className="w-50"
              placeholder={t($ => $['common.nextTask.selectPlaceholder'])}
              defaultValue={userSettings.achievementUnlocker.nextTask}
              isDisabled={!userSettings.achievementUnlocker.nextTaskCheckbox}
              onChange={v => {
                handleNextTaskChange(
                  'achievementUnlocker',
                  String(v),
                  userSummary,
                  setUserSettings,
                );
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

            <SettingsSwitch type="achievementUnlocker" name="nextTaskCheckbox" />
          </div>
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['settings.achievementUnlocker.scheduleLabel'])}
            </p>
            <p className="text-xs text-altwhite">
              {t($ => $['settings.achievementUnlocker.schedule.description'])}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <TimeField
              aria-label="schedule-from"
              isDisabled={!userSettings?.achievementUnlocker?.schedule}
              value={userSettings?.achievementUnlocker?.scheduleFrom}
              className="w-23.75"
              onChange={value =>
                handleScheduleChange(value, 'scheduleFrom', userSummary, setUserSettings)
              }
            >
              <TimeField.Group>
                <TimeField.Input>
                  {segment => <TimeField.Segment segment={segment} />}
                </TimeField.Input>
              </TimeField.Group>
            </TimeField>

            <p className="text-sm">{t($ => $['settings.achievementUnlocker.scheduleTo'])}</p>

            <TimeField
              aria-label="schedule-to"
              isDisabled={!userSettings?.achievementUnlocker?.schedule}
              value={userSettings?.achievementUnlocker?.scheduleTo}
              className="w-23.75"
              onChange={value =>
                handleScheduleChange(value, 'scheduleTo', userSummary, setUserSettings)
              }
            >
              <TimeField.Group>
                <TimeField.Input>
                  {segment => <TimeField.Segment segment={segment} />}
                </TimeField.Input>
              </TimeField.Group>
            </TimeField>

            <SettingsSwitch type="achievementUnlocker" name="schedule" />
          </div>
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['settings.achievementUnlocker.unlockInterval'])}
            </p>
            <p className="text-xs text-altwhite">{sliderLabel}</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Slider
              step={1}
              minValue={1}
              maxValue={2880}
              defaultValue={userSettings?.achievementUnlocker?.interval}
              formatOptions={{ style: 'currency', currency: 'USD' }}
              className="mt-2 w-87.5"
              onChangeEnd={e => handleIntervalChange(e, userSummary, setUserSettings)}
              onChange={e => {
                if (Array.isArray(e)) {
                  setSliderLabel(
                    t($ => $['settings.achievementUnlocker.interval'], {
                      min: e[0],
                      max: e[1],
                    }),
                  );
                }
              }}
            >
              <Slider.Track>
                <Slider.Fill />
                <Slider.Thumb />
              </Slider.Track>
            </Slider>

            <div className="flex w-full justify-between">
              <div>
                <Button
                  isIconOnly
                  className="rounded-full"
                  size="sm"
                  variant="ghost"
                  onPress={() => {
                    const [min, max] = userSettings?.achievementUnlocker?.interval ?? [];
                    const newValue = [Math.max(1, min - 1), max];
                    handleIntervalChange(newValue, userSummary, setUserSettings);
                  }}
                >
                  <FaMinus />
                </Button>
                <Button
                  isIconOnly
                  className="rounded-full"
                  size="sm"
                  variant="ghost"
                  onPress={() => {
                    const [min, max] = userSettings?.achievementUnlocker?.interval ?? [];
                    const newValue = [Math.min(max, min + 1), max];
                    handleIntervalChange(newValue, userSummary, setUserSettings);
                  }}
                >
                  <FaPlus />
                </Button>
              </div>

              <div>
                <Button
                  isIconOnly
                  className="rounded-full"
                  size="sm"
                  variant="ghost"
                  onPress={() => {
                    const [min, max] = userSettings?.achievementUnlocker?.interval ?? [];
                    const newValue = [min, Math.max(min, max - 1)];
                    handleIntervalChange(newValue, userSummary, setUserSettings);
                  }}
                >
                  <FaMinus />
                </Button>
                <Button
                  isIconOnly
                  className="rounded-full"
                  size="sm"
                  variant="ghost"
                  onPress={() => {
                    const [min, max] = userSettings?.achievementUnlocker?.interval ?? [];
                    const newValue = [min, Math.min(2880, max + 1)];
                    handleIntervalChange(newValue, userSummary, setUserSettings);
                  }}
                >
                  <FaPlus />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
