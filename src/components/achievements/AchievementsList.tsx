import { useMemo, type Dispatch, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { List } from 'react-window';

import type { Achievement } from '@/types';
import { useSearchStore } from '@/stores/searchStore';
import { useStateStore } from '@/stores/stateStore';
import { useUserStore } from '@/stores/userStore';
import { AchievementButtons } from '@/components/achievements/AchievementButtons';
import { AchievementsListRow, type RowData } from '@/components/achievements/AchievementsListRow';

interface Props {
  achievements: Achievement[];
  setAchievements: Dispatch<SetStateAction<Achievement[]>>;
  protectedAchievements: boolean;
  windowInnerHeight: number;
  setRefreshKey: Dispatch<SetStateAction<number>>;
}

export const AchievementsList = ({
  achievements,
  setAchievements,
  protectedAchievements,
  windowInnerHeight,
  setRefreshKey,
}: Props) => {
  const { t } = useTranslation();
  const userSummary = useUserStore(state => state.userSummary);
  const achievementQueryValue = useSearchStore(state => state.achievementQueryValue);
  const appId = useStateStore(state => state.appId);
  const appName = useStateStore(state => state.appName);

  const updateAchievement = (achievementId: string, newAchievedState: boolean): void => {
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
    t,
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
          <p>{t('achievementManager.achievements.empty')}</p>
        </div>
      )}
    </div>
  );
};
