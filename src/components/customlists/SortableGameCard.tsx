import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { Game } from '@/types';
import { GameCard } from '@/components/ui/GameCard';

export type CustomListType =
  | 'cardFarmingList'
  | 'achievementUnlockerList'
  | 'autoIdleList'
  | 'favoritesList';

interface Props {
  item: Game;
  type: CustomListType;
  onOpen: () => void;
}

export const SortableGameCard = ({ item, type, onOpen }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.appid,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="cursor-grab" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <GameCard
        item={item}
        isAchievementUnlocker={type === 'achievementUnlockerList'}
        onOpen={onOpen}
      />
    </div>
  );
};
