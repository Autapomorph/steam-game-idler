import type { Achievement, ChangedStats, Statistic } from '@/shared/types';
import { Trans, useTranslation } from 'react-i18next';
import { TbRotateClockwise, TbUpload } from 'react-icons/tb';
import { Button, useOverlayState } from '@heroui/react';
import { handleResetAllStats, handleUpdateAllStats } from '@/features/achievement-manager';
import { CustomModal } from '@/shared/components';

interface StatisticButtonsProps {
  statistics: Statistic[];
  setStatistics: React.Dispatch<React.SetStateAction<Statistic[]>>;
  changedStats: ChangedStats;
  setChangedStats: React.Dispatch<React.SetStateAction<ChangedStats>>;
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  setRefreshKey?: React.Dispatch<React.SetStateAction<number>>;
}

export const StatisticButtons = ({
  statistics,
  setStatistics,
  changedStats,
  setChangedStats,
  setAchievements,
  setRefreshKey,
}: StatisticButtonsProps) => {
  const { t } = useTranslation();
  const { isOpen, open, close, toggle } = useOverlayState();

  const changedCount = Object.keys(changedStats).length;
  const hasChanges = changedCount > 0;

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
        onPress={() => handleUpdateAllStats(changedStats, setChangedStats, setAchievements)}
        isDisabled={!hasChanges}
      >
        <TbUpload size={19} />
        {t($ => $['achievementManager.statistics.saveChanges'])} {hasChanges && `(${changedCount})`}
      </Button>

      <Button className="font-bold rounded-full" variant="danger" onPress={open}>
        <TbRotateClockwise className="rotate-90" size={20} />
        {t($ => $['achievementManager.statistics.resetAll'])}
      </Button>

      <CustomModal
        isOpen={isOpen}
        onOpenChange={toggle}
        title={t($ => $['common.confirm'])}
        body={
          <p className="text-sm">
            <Trans i18nKey={$ => $['confirmation.resetStatistics']}>
              Are you sure you want to <strong>reset</strong> all statistics?
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
              onPress={() => handleResetAllStats(statistics, setStatistics, setChangedStats, close)}
            >
              {t($ => $['common.confirm'])}
            </Button>
          </>
        }
      />
    </div>
  );
};
