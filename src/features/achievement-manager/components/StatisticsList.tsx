import { useMemo, useState } from 'react';
import { List } from 'react-window';
import { useTranslation } from 'react-i18next';

import type { Achievement, ChangedStats, Statistic } from '@/shared/types';
import { useSearchStore } from '@/shared/stores';
import { StatisticButtons } from './StatisticButtons';
import { StatisticsListRow, type RowData } from './StatisticsListRow';

interface StatisticsListProps {
  statistics: Statistic[];
  setStatistics: React.Dispatch<React.SetStateAction<Statistic[]>>;
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  windowInnerHeight: number;
  setRefreshKey?: React.Dispatch<React.SetStateAction<number>>;
}

export const StatisticsList = ({
  statistics,
  setStatistics,
  setAchievements,
  windowInnerHeight,
  setRefreshKey,
}: StatisticsListProps) => {
  const { t } = useTranslation();
  const statisticQueryValue = useSearchStore(state => state.statisticQueryValue);
  const [changedStats, setChangedStats] = useState<ChangedStats>({});

  const updateStatistic = (id: string, e: number | React.ChangeEvent<HTMLInputElement>) => {
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

  const rowData: RowData = { filteredStatistics, updateStatistic };

  return (
    <div className="flex flex-col gap-2 w-full scroll-smooth">
      {statistics.length > 0 ? (
        <>
          <StatisticButtons
            statistics={statistics}
            setStatistics={setStatistics}
            changedStats={changedStats}
            setChangedStats={setChangedStats}
            setAchievements={setAchievements}
            setRefreshKey={setRefreshKey}
          />

          <List
            rowComponent={StatisticsListRow}
            rowCount={Math.ceil(filteredStatistics.length / 2)}
            rowHeight={62}
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
          <p>{t($ => $['achievementManager.statistics.empty'])}</p>
        </div>
      )}
    </div>
  );
};
