import { type SyntheticEvent } from 'react';
import Image from 'next/image';
import { cn } from '@heroui/react';
import { type RowComponentProps } from 'react-window';

import type { Game } from '@/types';

export interface RowData {
  filteredGamesList: Game[];
  selectedGame: Game | null;
  onGameSelect: (game: Game) => void;
}

type Props = RowComponentProps<{ data: RowData }>;

export const GameSettingsRow = ({ index, style, data }: Props) => {
  const { filteredGamesList, selectedGame, onGameSelect } = data;
  const item = filteredGamesList[index];

  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>): void => {
    // eslint-disable-next-line no-param-reassign
    (event.target as HTMLImageElement).src = '/fallback.webp';
  };

  const isSelected = selectedGame?.appid === item.appid;

  return (
    <button
      type="button"
      style={style}
      className={cn(
        'flex justify-between items-center gap-2',
        'hover:bg-item-hover cursor-pointer px-3 py-1',
        'duration-150 select-none',
        isSelected && 'bg-item-hover border-l-2 border-blue-500',
      )}
      onClick={() => onGameSelect(item)}
    >
      <div className="flex items-center gap-3 max-w-[90%]">
        <Image
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${item.appid}/header.jpg`}
          className="aspect-62/29 rounded-sm"
          width={62}
          height={29}
          alt={`${item.name} image`}
          priority
          onError={handleImageError}
        />
        <p className="text-sm truncate mr-8">{item.name}</p>
      </div>
    </button>
  );
};
