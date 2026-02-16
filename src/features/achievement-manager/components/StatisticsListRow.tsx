import { cn, NumberInput } from '@heroui/react';
import { type RowComponentProps } from 'react-window';
import { useTranslation } from 'react-i18next';

import type { Statistic } from '@/shared/types';

export interface RowData {
  filteredStatistics: Statistic[];
  updateStatistic: (id: string, e: number | React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = RowComponentProps<{ data: RowData }>;

export const StatisticsListRow = ({ index, style, data }: Props) => {
  const { t } = useTranslation();
  const { filteredStatistics, updateStatistic } = data;
  const item1 = filteredStatistics[index * 2];
  const item2 = filteredStatistics[index * 2 + 1];

  if (!item1 && !item2) {
    return null;
  }

  const protectedStatisticOne = item1?.protected_stat || false;
  const protectedStatisticTwo = item2?.protected_stat || false;

  return (
    <div style={style} className="grid grid-cols-2 gap-3 pr-6">
      {item1 && (
        <div key={item1.id} className="flex flex-col gap-4">
          <div
            className={cn(
              'flex justify-between items-center max-h-12',
              'bg-achievement-main p-2 rounded-lg',
            )}
          >
            <div className="flex flex-col">
              <p className="text-sm font-bold w-full truncate">{item1.id}</p>
              <p
                className={`text-[10px] ${protectedStatisticOne ? 'text-warning' : 'text-altwhite'}`}
              >
                {t($ => $['achievementManager.statistics.flags'])}: {item1.flags}
              </p>
            </div>
            <NumberInput
              hideStepper
              isDisabled={protectedStatisticOne}
              size="sm"
              value={item1.value}
              maxValue={99999}
              formatOptions={{ useGrouping: false }}
              onChange={e => updateStatistic(item1.id, e)}
              aria-label="statistic value"
              className="w-30"
              classNames={{
                inputWrapper: cn(
                  'bg-stats-input data-[hover=true]:!bg-stats-inputhover',
                  'group-data-[focus-visible=true]:ring-transparent',
                  'group-data-[focus-visible=true]:ring-offset-transparent',
                  'group-data-[focus-within=true]:!bg-stats-inputhover h-8',
                ),
                input: ['text-sm !text-content'],
              }}
            />
          </div>
        </div>
      )}
      {item2 && (
        <div key={item2.id} className="flex flex-col gap-4">
          <div
            className={cn(
              'flex justify-between items-center max-h-12',
              'bg-achievement-main p-2 rounded-lg',
            )}
          >
            <div className="flex flex-col">
              <p className="text-sm font-bold w-full truncate">{item2.id}</p>
              <p
                className={`text-[10px] ${protectedStatisticTwo ? 'text-warning' : 'text-altwhite'}`}
              >
                {t($ => $['achievementManager.statistics.flags'])}: {item2.flags}
              </p>
            </div>
            <NumberInput
              hideStepper
              isDisabled={protectedStatisticTwo}
              size="sm"
              value={item2.value}
              maxValue={99999}
              formatOptions={{ useGrouping: false }}
              onChange={e => updateStatistic(item2.id, e)}
              aria-label="statistic value"
              className="w-30"
              classNames={{
                inputWrapper: cn(
                  'bg-stats-input data-[hover=true]:!bg-stats-inputhover',
                  'group-data-[focus-visible=true]:ring-transparent',
                  'group-data-[focus-visible=true]:ring-offset-transparent',
                  'group-data-[focus-within=true]:!bg-stats-inputhover h-8',
                ),
                input: ['text-sm !text-content'],
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
