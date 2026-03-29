import type { Achievement, SortOption } from '@/shared/types';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TbLock, TbLockOpen, TbSortDescending2 } from 'react-icons/tb';
import { Button, Select, ListBox, useOverlayState } from '@heroui/react';
import {
  handleLockAllAchievements,
  handleSortingChange,
  handleUnlockAllAchievements,
} from '@/features/achievement-manager';
import { CustomModal } from '@/shared/components';
import { useStateStore } from '@/shared/stores';

interface AchievementButtonsProps {
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  protectedAchievements: boolean;
  setRefreshKey?: React.Dispatch<React.SetStateAction<number>>;
}

export const AchievementButtons = ({
  achievements,
  setAchievements,
  protectedAchievements,
  setRefreshKey,
}: AchievementButtonsProps) => {
  const { t } = useTranslation();
  const appId = useStateStore(state => state.appId);
  const appName = useStateStore(state => state.appName);
  const { isOpen, open, close, toggle } = useOverlayState();
  const [state, setState] = useState('');

  const sortOptions: SortOption[] = [
    {
      key: 'percent',
      label: t($ => $['achievementManager.achievements.sort.percent']),
    },
    {
      key: 'title',
      label: t($ => $['achievementManager.achievements.sort.title']),
    },
    {
      key: 'unlocked',
      label: t($ => $['achievementManager.achievements.sort.unlocked']),
    },
    {
      key: 'locked',
      label: t($ => $['achievementManager.achievements.sort.locked']),
    },
    {
      key: 'unprotected',
      label: t($ => $['achievementManager.achievements.sort.unprotected']),
    },
    {
      key: 'protected',
      label: t($ => $['achievementManager.achievements.sort.protected']),
    },
  ];

  const unAchieved = achievements.filter(achievement => !achievement.achieved);
  const achieved = achievements.filter(achievement => achievement.achieved);

  const getTranslatedState = (state: string) => {
    if (state === 'unlock') return t($ => $['achievementManager.achievements.unlock']);
    if (state === 'lock') return t($ => $['achievementManager.achievements.lock']);
    return state;
  };

  const handleShowModal = (onOpen: () => void, state: string) => {
    setState(state);
    onOpen();
  };

  return (
    <div className="absolute top-0 right-0 flex gap-2 mt-4 px-10">
      <Button
        className="bg-btn-secondary text-btn-text font-bold rounded-full"
        onPress={() => {
          if (setRefreshKey) setRefreshKey(prev => prev + 1);
        }}
      >
        {t($ => $['common.refresh'])}
      </Button>

      <Button
        className="bg-btn-secondary text-btn-text font-bold rounded-full"
        isDisabled={protectedAchievements || unAchieved.length === 0}
        onPress={() => handleShowModal(open, 'unlock')}
      >
        <TbLockOpen size={20} />
        {t($ => $['achievementManager.achievements.unlockAll'])}
      </Button>

      <Button
        className="font-bold rounded-full"
        variant="danger"
        isDisabled={protectedAchievements || achieved.length === 0}
        onPress={() => handleShowModal(open, 'lock')}
      >
        <TbLock size={20} />
        {t($ => $['achievementManager.achievements.lockAll'])}
      </Button>

      <Select
        aria-label="sort"
        className="w-57.5 rounded-none"
        defaultValue="percent"
        onChange={v => {
          handleSortingChange(v ? String(v) : undefined, achievements, setAchievements);
        }}
      >
        <Select.Trigger className="flex items-center">
          <TbSortDescending2 fontSize={26} />
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox disallowEmptySelection>
            {sortOptions.map(option => (
              <ListBox.Item key={option.key} id={option.key}>
                {option.label}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      <CustomModal
        isOpen={isOpen}
        onOpenChange={toggle}
        title={t($ => $['common.confirm'])}
        body={
          <p className="text-sm">
            <Trans
              i18nKey={$ => $['achievementManager.achievements.modal']}
              values={{
                state: getTranslatedState(state).toLowerCase(),
              }}
            >
              Are you sure you want to <strong>{state}</strong> all achievements?
            </Trans>
          </p>
        }
        buttons={
          <>
            <Button
              size="sm"
              variant="ghost"
              className="font-semibold text-danger hover:bg-danger-soft rounded-full"
              onPress={toggle}
            >
              {t($ => $['common.cancel'])}
            </Button>
            <Button
              size="sm"
              className="bg-btn-secondary text-btn-text font-bold rounded-full"
              onPress={() => {
                if (state === 'unlock') {
                  if (appId && appName) {
                    handleUnlockAllAchievements(
                      appId,
                      appName,
                      achievements,
                      setAchievements,
                      close,
                    );
                  }
                } else if (appId && appName) {
                  handleLockAllAchievements(appId, appName, achievements, setAchievements, close);
                }
              }}
            >
              {t($ => $['common.confirm'])}
            </Button>
          </>
        }
      />
    </div>
  );
};
