import { useCallback, useEffect, useMemo, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Button, Spinner } from '@heroui/react';
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';

import type { Achievement, Game, InvokeAchievementData } from '@/types';
import { useUserStore } from '@/stores/userStore';
import { CustomModal } from '@/components/ui/CustomModal';
import { WebviewWindow } from '@/components/ui/WebviewWindow';
import { checkSteamStatus, logEvent } from '@/utils/tasks';
import { showAccountMismatchToast, showDangerToast } from '@/utils/toasts';
import { SortableAchievement } from '@/components/customlists/SortableAchievement';

export const AchievementOrderModal = ({
  item,
  isOpen,
  onOpenChange,
}: {
  item: Game;
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const { t } = useTranslation();
  const userSummary = useUserStore(state => state.userSummary);
  const [isLoading, setIsLoading] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [originalAchievements, setOriginalAchievements] = useState<Achievement[]>([]);

  const handleDragEnd = useCallback((event: DragEndEvent): void => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setAchievements(items => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const oldIndex = items.findIndex(item => item.name === active.id);
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const newIndex = items.findIndex(item => item.name === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  const handleToggleSkip = useCallback((achievementName: string): void => {
    setAchievements(items =>
      items.map(achievement =>
        achievement.name === achievementName
          ? { ...achievement, skip: achievement.skip !== true }
          : achievement,
      ),
    );
  }, []);

  const handleSetDelay = useCallback((achievementName: string, value: number | null): void => {
    setAchievements(items =>
      items.map(achievement =>
        // eslint-disable-next-line no-nested-ternary
        achievement.name === achievementName
          ? value === null
            ? (() => {
                const { delayNextUnlock, ...rest } = achievement;
                return rest;
              })()
            : { ...achievement, delayNextUnlock: value }
          : achievement,
      ),
    );
  }, []);

  const handleSave = async (): Promise<void> => {
    try {
      await invoke('save_achievement_order', {
        steamId: userSummary?.steamId,
        appId: item.appid,
        achievementOrder: {
          achievements,
        },
      });
      onOpenChange();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving achievement order:', error);
      showDangerToast(t('toast.achievementOrder.error'));
    }
  };

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const getAchievementData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setAchievements([]);
        setOriginalAchievements([]);

        // Make sure Steam client is running
        const isSteamRunning = await checkSteamStatus(true);
        if (!isSteamRunning) return setIsLoading(false);

        // First try to get custom achievement order
        const customOrder = await invoke<{
          achievement_order: { achievements: Achievement[] } | null;
        }>('get_achievement_order', {
          steamId: userSummary?.steamId,
          appId: item.appid,
        });

        // Fetch achievement data to sync states
        const response = await invoke<InvokeAchievementData | string>('get_achievement_data', {
          steamId: userSummary?.steamId,
          appId: item.appid,
          refetch: false,
        });

        // Handle case where Steam API initialization failed
        if (typeof response === 'string' && response.includes('Failed to initialize Steam API')) {
          setIsLoading(false);
          showAccountMismatchToast('danger');
          logEvent(`Error in (getAchievementData): ${response}`);
          // eslint-disable-next-line consistent-return
          return;
        }

        const achievementData = response as InvokeAchievementData;

        // If we have a custom order, update its achievement states and use it
        if (
          customOrder.achievement_order?.achievements &&
          achievementData?.achievement_data?.achievements
        ) {
          const updatedAchievements = customOrder.achievement_order.achievements.map(
            achievement => {
              const currentState = achievementData.achievement_data.achievements.find(
                a => a.name === achievement.name,
              );
              return currentState
                ? { ...achievement, achieved: currentState.achieved }
                : achievement;
            },
          );
          setAchievements(updatedAchievements);
          // Save the default order (from achievementData) for reset
          setOriginalAchievements(
            achievementData.achievement_data.achievements.map(a => ({
              ...a,
              skip: undefined,
              delayNextUnlock: undefined,
            })),
          );
          setIsLoading(false);
          // eslint-disable-next-line consistent-return
          return;
        }

        // Otherwise use achievement data directly
        if (achievementData?.achievement_data?.achievements) {
          if (achievementData.achievement_data.achievements.length > 0) {
            setAchievements(achievementData.achievement_data.achievements);
            setOriginalAchievements(
              achievementData.achievement_data.achievements.map(a => ({
                ...a,
                skip: undefined,
                delayNextUnlock: undefined,
              })),
            );
          }
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        showDangerToast(t('toast.achievementData.error'));
        // eslint-disable-next-line no-console
        console.error('Error in (getAchievementData):', error);
        logEvent(`Error in (getAchievementData): ${error}`);
      }
    };

    if (isOpen && item.appid) {
      getAchievementData();
    }
  }, [t, isOpen, item.appid, userSummary?.steamId]);

  const sensors = useSensors(useSensor(PointerSensor));

  const achievementList = useMemo(
    () => (
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
        <SortableContext items={achievements.map(a => a.name)}>
          <div className="grid grid-cols-1 gap-1">
            {achievements.map((achievement, index) => (
              <SortableAchievement
                item={item}
                key={achievement.name}
                achievement={achievement}
                index={index}
                onToggleSkip={handleToggleSkip}
                onSetDelay={handleSetDelay}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    ),
    [achievements, handleDragEnd, handleToggleSkip, handleSetDelay, item, sensors],
  );

  // Reset handler: restore original order and clear skips/delays
  const handleReset = useCallback(() => {
    setAchievements(
      originalAchievements.map(a => ({
        ...a,
        skip: undefined,
        delayNextUnlock: undefined,
      })),
    );
  }, [originalAchievements]);

  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        body: '!p-0 !max-h-[60vh] !min-h-[60vh]',
        base: 'max-w-xl bg-base/85 backdrop-blur-sm',
      }}
      title={
        <div className="flex justify-between items-center">
          <p className="truncate">{item.name}</p>
        </div>
      }
      body={
        <div className="overflow-x-hidden overflow-y-auto relative ">
          {/* eslint-disable-next-line no-nested-ternary */}
          {isLoading ? (
            <div className="flex justify-center items-center w-full p-4">
              <Spinner />
            </div>
          ) : achievements.length === 0 ? (
            <div className="flex justify-center items-center w-full p-4">
              <p className="text-center text-content">
                {t('achievementManager.achievements.empty')}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-[40px_1fr] gap-2 items-center p-2 mb-2 border-b border-border sticky top-0 bg-sidebar z-50">
                <span className="text-sm font-semibold text-content select-none text-center w-6.5">
                  #
                </span>
                <div className="flex items-center gap-3 pl-0">
                  <span className="text-sm font-semibold text-content text-center">
                    {t('achievementManager.achievements.unlock')}
                  </span>
                  <span className="text-sm font-semibold text-content flex-1 ml-8">
                    {t('achievementManager.achievements.title')}
                  </span>
                </div>
              </div>
              {achievementList}
            </>
          )}
        </div>
      }
      buttons={
        <>
          <WebviewWindow href="https://steamgameidler.com/docs/features/achievement-unlocker#custom-order--unlock-delay">
            <p className="text-xs cursor-pointer hover:text-altwhite duration-150 p-2 rounded-lg">
              {t('setup.help')}
            </p>
          </WebviewWindow>
          <Button
            size="sm"
            color="danger"
            variant="light"
            radius="full"
            className="font-semibold"
            onPress={onOpenChange}
          >
            {t('common.cancel')}
          </Button>
          <Button
            size="sm"
            color="danger"
            variant="light"
            radius="full"
            className="font-semibold"
            onPress={handleReset}
          >
            {t('achievementManager.statistics.resetAll')}
          </Button>
          <Button
            size="sm"
            className="bg-btn-secondary text-btn-text font-bold"
            radius="full"
            onPress={handleSave}
          >
            {t('common.save')}
          </Button>
        </>
      }
    />
  );
};
