import { cn } from '@heroui/react';
import { type RowComponentProps } from 'react-window';
import { useTranslation } from 'react-i18next';

import type { Game } from '@/shared/types';
import { GameCard } from '@/shared/components';
import { RecommendedGamesCarousel } from './RecommendedGamesCarousel';
import { RecentGamesCarousel } from './RecentGamesCarousel';
import { useGamesList } from '../hooks/useGamesList';

export interface RowData {
  rows: ('recommended' | 'recent' | 'header' | number)[];
  games: Game[];
  columnCount: number;
}

type Props = RowComponentProps<{ data: RowData }>;

export const GamesListRow = ({ index, style, data }: Props) => {
  const { t } = useTranslation();
  const gamesContext = useGamesList();
  const { rows, games, columnCount } = data;
  const rowType = rows[index];

  if (rowType === 'recommended') {
    return (
      <div style={style}>
        <RecommendedGamesCarousel gamesContext={gamesContext} />
      </div>
    );
  }

  if (rowType === 'recent') {
    return (
      <div style={style}>
        <RecentGamesCarousel gamesContext={gamesContext} />
      </div>
    );
  }

  if (rowType === 'header') {
    return (
      <div style={style}>
        <p className="text-lg font-black px-6">{t('gamesList.allGames')}</p>
      </div>
    );
  }

  if (typeof rowType === 'number') {
    return (
      <div
        style={style}
        className={cn(
          'grid gap-x-5 gap-y-4 px-6',
          columnCount === 7 ? 'grid-cols-7' : 'grid-cols-5',
          columnCount === 8 ? 'grid-cols-8' : '',
          columnCount === 10 ? 'grid-cols-10' : '',
          columnCount === 12 ? 'grid-cols-12' : '',
        )}
      >
        {games.slice(rowType * columnCount, (rowType + 1) * columnCount).map(item => (
          <GameCard key={item.appid} item={item} />
        ))}
      </div>
    );
  }

  return null;
};
