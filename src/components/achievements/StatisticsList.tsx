import { useMemo, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { FixedSizeList as List } from 'react-window';

import type { Achievement, ChangedStats, Statistic } from '@/types';
import { useSearchStore } from '@/stores/searchStore';
import { StatisticButton } from '@/components/achievements/StatisticButton';
import { StatisticsListRow, type RowData } from '@/components/achievements/StatisticsListRow';

interface Props {
  statistics: Statistic[];
  setStatistics: Dispatch<SetStateAction<Statistic[]>>;
  setAchievements: Dispatch<SetStateAction<Achievement[]>>;
  windowInnerHeight: number;
  setRefreshKey?: Dispatch<SetStateAction<number>>;
}

export const StatisticsList = ({
  statistics,
  setStatistics,
  setAchievements,
  windowInnerHeight,
  setRefreshKey,
}: Props) => {
  const { t } = useTranslation();
  const statisticQueryValue = useSearchStore(state => state.statisticQueryValue);
  const [changedStats, setChangedStats] = useState<ChangedStats>({});

  const updateStatistic = (id: string, e: number | ChangeEvent<HTMLInputElement>): void => {
    setStatistics(prevStatistics => {
      const stat = prevStatistics.find(s => s.id === id);
      const originalValue = stat ? stat.value : 0;

      const newValue = typeof e === 'number' ? e : Number(e.target.value);

      if (originalValue !== newValue) {
        setChangedStats(prev => ({
          ...prev,
          [id]: newValue || 0,
        }));
      } else {
        setChangedStats(prev => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-shadow
      return prevStatistics.map(stat =>
        stat.id === id ? { ...stat, value: newValue || 0 } : stat,
      );
    });
  };

  const filteredStatistics = useMemo(
    () =>
      statistics.filter(statistic =>
        statistic.id.toLowerCase().includes(statisticQueryValue.toLowerCase()),
      ),
    [statistics, statisticQueryValue],
  );

  const itemData: RowData = { filteredStatistics, updateStatistic, t };

  return (
    <div className="flex flex-col gap-2 w-full scroll-smooth">
      {statistics.length > 0 ? (
        <>
          <StatisticButton
            statistics={statistics}
            setStatistics={setStatistics}
            changedStats={changedStats}
            setChangedStats={setChangedStats}
            setAchievements={setAchievements}
            setRefreshKey={setRefreshKey}
          />

          <List
            height={windowInnerHeight - 196}
            itemCount={Math.ceil(filteredStatistics.length / 2)}
            itemSize={62}
            width="100%"
            itemData={itemData}
          >
            {StatisticsListRow}
          </List>
        </>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center my-2 bg-tab-panel rounded-lg p-4 mr-10">
          <p>{t('achievementManager.statistics.empty')}</p>
        </div>
      )}
    </div>
  );
};
