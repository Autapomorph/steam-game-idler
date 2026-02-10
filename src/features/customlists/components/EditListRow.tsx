import { type SyntheticEvent } from 'react';
import Image from 'next/image';
import { Button, cn } from '@heroui/react';
import { TbCheck } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { type RowComponentProps } from 'react-window';

import type { Game } from '@/shared/types';

export interface RowData {
  filteredGamesList: Game[];
  list: Game[];
  handleAddGame: (game: Game) => void;
  handleRemoveGame: (game: Game) => void;
  type?: string;
  handleBlacklistGame?: (game: Game) => void;
  blacklist: number[];
}

type Props = RowComponentProps<{ data: RowData }>;

export const EditListRow = ({ index, style, data }: Props) => {
  const { t } = useTranslation();
  const {
    filteredGamesList,
    list,
    handleAddGame,
    handleRemoveGame,
    type,
    handleBlacklistGame,
    blacklist,
  } = data;
  const item = filteredGamesList[index];

  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>): void => {
    (event.target as HTMLImageElement).src = '/fallback.webp';
  };

  return (
    <button
      type="button"
      style={style}
      className={cn(
        'flex justify-between items-center gap-2',
        'hover:bg-item-hover cursor-pointer px-3 py-1',
        'duration-150 select-none',
        list.some(game => game.appid === item.appid) && 'opacity-50',
      )}
      onClick={() =>
        list.some(game => game.appid === item.appid) ? handleRemoveGame(item) : handleAddGame(item)
      }
    >
      <div className="flex items-center gap-3 max-w-[90%]">
        {type === 'cardFarmingList' && handleBlacklistGame && (
          <Button
            size="sm"
            className={cn(
              'min-w-6 h-6',
              blacklist.includes(item.appid) ? 'bg-danger/20 text-danger' : 'mr-3.5',
            )}
            onPress={() => {
              handleBlacklistGame(item);
            }}
          >
            {blacklist.includes(item.appid)
              ? t('customLists.blacklisted')
              : t('customLists.blacklist')}
          </Button>
        )}
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
      <div className="flex justify-center items-center">
        {list.some(game => game.appid === item.appid) && (
          <TbCheck fontSize={20} className="text-success" />
        )}
      </div>
    </button>
  );
};
