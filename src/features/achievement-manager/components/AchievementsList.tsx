import { useMemo } from 'react';
import { List } from 'react-window';
import { useTranslation } from 'react-i18next';

import type { Achievement } from '@/shared/types';
import { useSearchStore, useStateStore, useUserStore } from '@/shared/stores';
import { AchievementButtons } from './AchievementButtons';
import { type RowData, AchievementsListRow } from './AchievementsListRow';

interface AchievementsListProps {
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  protectedAchievements: boolean;
  windowInnerHeight: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

export const AchievementsList = ({
  achievements,
  setAchievements,
  protectedAchievements,
  windowInnerHeight,
  setRefreshKey,
}: AchievementsListProps) => {
  const { t } = useTranslation();
  const userSummary = useUserStore(state => state.userSummary);
  const achievementQueryValue = useSearchStore(state => state.achievementQueryValue);
  const appId = useStateStore(state => state.appId);
  const appName = useStateStore(state => state.appName);

  const updateAchievement = (achievementId: string, newAchievedState: boolean) => {
    setAchievements(prevAchievements => {
      return prevAchievements.map(achievement =>
        achievement.id === achievementId
          ? { ...achievement, achieved: newAchievedState }
          : achievement,
      );
    });
  };

  const filteredAchievements = useMemo(
    () =>
      achievements.filter(achievement =>
        achievement.name.toLowerCase().includes(achievementQueryValue.toLowerCase()),
      ),
    [achievements, achievementQueryValue],
  );

  const rowData: RowData = {
    userSummary,
    appId: appId as number,
    appName: appName as string,
    filteredAchievements,
    updateAchievement,
  };

  return (
    <div className="flex flex-col gap-2 w-full scroll-smooth">
      {achievements.length > 0 ? (
        <>
          <AchievementButtons
            achievements={achievements}
            setAchievements={setAchievements}
            protectedAchievements={protectedAchievements}
            setRefreshKey={setRefreshKey}
          />

          <List
            rowComponent={AchievementsListRow}
            defaultHeight={windowInnerHeight - 196}
            rowCount={filteredAchievements.length}
            rowHeight={110}
            style={{
              width: '100%',
              height: windowInnerHeight - 196,
            }}
            rowProps={{
              data: rowData,
            }}
          />
        </>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center my-2 bg-tab-panel rounded-lg p-4 mr-10">
          <p>{t($ => $['achievementManager.achievements.empty'])}</p>
        </div>
      )}
    </div>
  );
};
