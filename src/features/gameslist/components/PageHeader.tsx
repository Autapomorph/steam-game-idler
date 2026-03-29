import type { Game, SortOption } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import { TbX } from 'react-icons/tb';
import { Button, cn, Separator, Tabs } from '@heroui/react';
import { handleSortingChange } from '@/features/gameslist';
import { handleRefreshGamesList } from '@/features/gameslist/utils/handleRefreshGamesList';
import { useSearchStore, useUserStore } from '@/shared/stores';

interface PageHeaderProps {
  sortStyle: string;
  setSortStyle: React.Dispatch<React.SetStateAction<string>>;
  filteredGames: Game[];
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

export const PageHeader = ({
  sortStyle,
  setSortStyle,
  filteredGames,
  setRefreshKey,
}: PageHeaderProps) => {
  const { t } = useTranslation();
  const userSummary = useUserStore(state => state.userSummary);
  const gameQueryValue = useSearchStore(state => state.gameQueryValue);
  const setGameQueryValue = useSearchStore(state => state.setGameQueryValue);

  const sortOptions: SortOption[] = [
    { key: '1-0', label: t($ => $['gamesList.sort.playtimeDesc']) },
    { key: '0-1', label: t($ => $['gamesList.sort.playtimeAsc']) },
    { key: 'a-z', label: t($ => $['gamesList.sort.titleAsc']) },
    { key: 'z-a', label: t($ => $['gamesList.sort.titleDesc']) },
  ];

  return (
    <div className={cn('relative w-[calc(100vw-227px)] pl-6 pt-2')}>
      <div className="flex justify-between items-center pb-3">
        <div className="flex items-center gap-1 select-none">
          <div className="flex flex-col justify-center">
            <p className="text-3xl font-black">{t($ => $['gamesList.title'])}</p>

            <p className="text-xs text-altwhite my-2">
              {t($ => $['common.showing'], {
                total: filteredGames.length,
              })}
            </p>

            <div className="flex items-center gap-2 mt-1">
              <Button
                className="bg-btn-secondary text-btn-text font-bold rounded-full"
                onPress={() => handleRefreshGamesList(userSummary?.steamId, setRefreshKey, true)}
              >
                {t($ => $['common.refresh'])}
              </Button>

              <Separator orientation="vertical" className="mx-2 h-8 bg-border" />

              <p className="text-sm text-altwhite font-bold">{t($ => $['common.sortBy'])}</p>

              <Tabs
                selectedKey={sortStyle}
                onSelectionChange={key => {
                  handleSortingChange(key as string, setSortStyle);
                }}
              >
                <Tabs.ListContainer>
                  <Tabs.List aria-label="sort options">
                    {sortOptions.map(option => (
                      <Tabs.Tab key={option.key} id={option.key}>
                        {option.label}
                        <Tabs.Indicator />
                      </Tabs.Tab>
                    ))}
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>

              {gameQueryValue && (
                <div className="flex items-center gap-2">
                  <Separator orientation="vertical" className="mx-2 h-8 bg-border" />
                  <p className="text-sm text-altwhite font-bold">{t($ => $['common.search'])}</p>
                  <div className="flex items-center gap-2 text-sm text-altwhite p-2 bg-item-active rounded-full max-w-64">
                    <p className="text-content truncate">{gameQueryValue}</p>
                    <div
                      className="flex items-center justify-center cursor-pointer bg-item-hover hover:bg-item-hover/80 rounded-full p-1 duration-150"
                      onClick={() => setGameQueryValue('')}
                    >
                      <TbX />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
