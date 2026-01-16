import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn, Spinner } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { VariableSizeList as List } from 'react-window';

import type { Game } from '@/types';
import { useStateStore } from '@/stores/stateStore';
import { useUserStore } from '@/stores/userStore';
import { PageHeader } from '@/components/gameslist/PageHeader';
import { Private } from '@/components/gameslist/Private';
import { GamesListRow } from '@/components/gameslist/GamesListRow';
import { useGamesList, type GamesListHook } from '@/hooks/gameslist/useGamesList';

interface RowData {
  rows: ('recommended' | 'recent' | 'header' | number)[];
  games: Game[];
  columnCount: number;
  gamesContext: GamesListHook;
  t: (key: string) => string;
}

export const GamesList = () => {
  const gamesContext = useGamesList();
  const sidebarCollapsed = useStateStore(state => state.sidebarCollapsed);
  const transitionDuration = useStateStore(state => state.transitionDuration);
  const showAchievements = useStateStore(state => state.showAchievements);
  const userSettings = useUserStore(state => state.userSettings);
  const { t } = useTranslation();

  const [columnCount, setColumnCount] = useState(5);
  const listRef = useRef<List>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback((): void => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    if (window.innerWidth >= 3200) {
      setColumnCount(12);
    } else if (window.innerWidth >= 2300) {
      setColumnCount(10);
    } else if (window.innerWidth >= 2000) {
      setColumnCount(8);
    } else if (window.innerWidth >= 1500) {
      setColumnCount(7);
    } else {
      setColumnCount(5);
    }
    if (listRef.current) {
      listRef.current.resetAfterIndex(0, true);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const recommendedHeight = 335;
  const recentsHeight = 210;
  const headerHeight = 40;
  const getDynamicRowHeight = useCallback(
    (): number => (sidebarCollapsed ? 175 : 160),
    [sidebarCollapsed],
  );

  const games = useMemo(() => gamesContext.filteredGames || [], [gamesContext.filteredGames]);
  const gameRowCount = useMemo(
    () => Math.ceil(games.length / columnCount),
    [games.length, columnCount],
  );

  const hasRecommended = useMemo(
    () =>
      !gamesContext.isLoading &&
      gamesContext.unplayedGames.length > 0 &&
      userSettings?.general?.showRecommendedCarousel,
    [
      gamesContext.isLoading,
      gamesContext.unplayedGames.length,
      userSettings?.general?.showRecommendedCarousel,
    ],
  );

  const hasRecent = useMemo(
    () =>
      !gamesContext.isLoading &&
      gamesContext.recentGames.length > 0 &&
      userSettings?.general?.showRecentCarousel,
    [
      gamesContext.isLoading,
      gamesContext.recentGames.length,
      userSettings?.general?.showRecentCarousel,
    ],
  );

  const rows = useMemo((): ('recommended' | 'recent' | 'header' | number)[] => {
    const r: ('recommended' | 'recent' | 'header' | number)[] = [];
    if (hasRecommended) r.push('recommended');
    if (hasRecent) r.push('recent');
    r.push('header');
    for (let i = 0; i < gameRowCount; i += 1) r.push(i);
    return r;
  }, [hasRecommended, hasRecent, gameRowCount]);

  // Reset list measurements when rows structure changes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0, true);
    }
  }, [rows]);

  const getRowHeight = useCallback(
    (index: number): number => {
      const rowType = rows[index];
      if (rowType === 'recommended') return recommendedHeight;
      if (rowType === 'recent') return recentsHeight;
      if (rowType === 'header') return headerHeight;
      return getDynamicRowHeight();
    },
    [rows, getDynamicRowHeight],
  );

  const itemData = useMemo<RowData>(
    () => ({
      rows,
      games,
      columnCount,
      gamesContext,
      t,
    }),
    [rows, games, columnCount, gamesContext, t],
  );

  if (!gamesContext.isLoading && gamesContext.gamesList.length === 0)
    return (
      <div className={cn('w-calc min-h-calc max-h-calc overflow-x-hidden')}>
        <Private setRefreshKey={gamesContext.setRefreshKey} />
      </div>
    );

  return (
    <div
      key={gamesContext.refreshKey}
      className={cn(
        'mt-9 ease-in-out',
        sidebarCollapsed ? 'w-[calc(100vw-56px)]' : 'w-[calc(100vw-250px)]',
      )}
      style={{
        transitionDuration,
        transitionProperty: 'width',
      }}
    >
      {!showAchievements && (
        <PageHeader
          sortStyle={gamesContext.sortStyle}
          setSortStyle={gamesContext.setSortStyle}
          filteredGames={gamesContext.filteredGames}
          visibleGames={gamesContext.visibleGames}
          setRefreshKey={gamesContext.setRefreshKey}
        />
      )}

      {!gamesContext.isLoading ? (
        <List
          key={
            sidebarCollapsed
              ? `collapsed-${windowSize.width}x${windowSize.height}`
              : `expanded-${windowSize.width}x${windowSize.height}`
          }
          height={windowSize.height - 168}
          itemCount={rows.length}
          itemSize={getRowHeight}
          width="100%"
          style={{
            overflowX: 'hidden',
          }}
          ref={listRef}
          itemData={itemData}
        >
          {GamesListRow}
        </List>
      ) : (
        <div className="flex justify-center items-center w-calc h-[calc(100vh-168px)]">
          <Spinner variant="simple" />
        </div>
      )}
    </div>
  );
};
