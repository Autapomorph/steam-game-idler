import { memo, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button, Checkbox, cn, Input } from '@heroui/react';
import { GoGrabber } from 'react-icons/go';
import { FaCheck, FaPlus } from 'react-icons/fa6';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTranslation } from 'react-i18next';

import type { Achievement, Game } from '@/types';

interface Props {
  item: Game;
  achievement: Achievement;
  index: number;
}

export const SortableAchievement = memo(function SortableAchievement({
  item,
  achievement,
  index,
  onToggleSkip,
  onSetDelay,
}: Props & {
  onToggleSkip: (name: string) => void;
  onSetDelay: (name: string, value: number | null) => void;
}) {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: achievement.name,
  });

  const iconUrl = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/';
  const icon = achievement.achieved
    ? `${iconUrl}${item.appid}/${achievement.iconNormal}`
    : `${iconUrl}${item.appid}/${achievement.iconLocked}`;

  const [showDelayInput, setShowDelayInput] = useState(false);
  const [delayValue, setDelayValue] = useState<number | ''>(achievement.delayNextUnlock ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDelayValue(achievement.delayNextUnlock ?? '');
  }, [achievement.delayNextUnlock]);

  useEffect(() => {
    if (showDelayInput && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [showDelayInput]);

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    if (val === '') {
      setDelayValue('');
    } else {
      const num = Math.max(0, Number(val));
      setDelayValue(num);
    }
  };

  const handleShowInput = (): void => setShowDelayInput(true);

  const handleClearInput = (): void => {
    setShowDelayInput(false);
    setDelayValue('');
    onSetDelay(achievement.name, null);
  };

  const handleInputBlur = (): void => {
    setShowDelayInput(false);
    if (delayValue === '' || delayValue === 0) {
      onSetDelay(achievement.name, null);
    } else {
      onSetDelay(achievement.name, Number(delayValue));
    }
  };

  return (
    <div className="grid grid-cols-[40px_1fr] gap-2 items-center duration-150">
      <span className="text-lg font-bold text-altwhite text-center select-none">{index + 1}</span>
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        className={cn(
          'flex items-center gap-3 p-2 bg-card hover:bg-sidebar/70 rounded-lg',
          'group min-w-[98%] max-w-[98%]',
          achievement.skip === true && 'opacity-40',
        )}
      >
        <div className="flex items-center justify-center w-6.5">
          <Checkbox
            isSelected={achievement.skip !== true}
            onValueChange={() => onToggleSkip(achievement.name)}
            onClick={e => e.stopPropagation()}
            className="ml-3"
          />
        </div>
        <Image
          className="rounded-full ml-8 select-none"
          src={icon}
          width={32}
          height={32}
          alt={`${achievement.name} image`}
          priority
        />
        <div className="flex-1 min-w-0 select-none">
          <p className="font-semibold truncate">{achievement.name}</p>
          <p
            className={cn(
              'text-xs text-gray-400 truncate',
              achievement.hidden && 'blur-[3px] group-hover:blur-none transition-all duration-200',
            )}
          >
            {achievement.description}
          </p>

          <div className="">
            {!showDelayInput && (
              <Button
                size="sm"
                className="text-xs max-h-5 bg-transparent p-0 cursor-pointer hover:opacity-80 duration-150"
                type="button"
                onPress={handleShowInput}
                onPointerDown={e => e.stopPropagation()}
              >
                {delayValue !== '' && delayValue !== 0 ? (
                  <p className="flex items-center text-green-400">
                    <FaCheck className="inline-block mr-1" />
                    {t('customLists.achievementUnlocker.editDelay', { minutes: delayValue })}
                  </p>
                ) : (
                  <p className="flex items-center text-blue-400">
                    <FaPlus className="inline-block mr-1" />
                    {t('customLists.achievementUnlocker.addDelay')}
                  </p>
                )}
              </Button>
            )}
            {showDelayInput && (
              <div className="flex items-center gap-2 mt-1">
                <Input
                  ref={inputRef}
                  type="number"
                  min={0}
                  className="w-16 text-xs"
                  value={delayValue.toString() || '0'}
                  onChange={handleDelayChange}
                  size="sm"
                  onPointerDown={e => e.stopPropagation()}
                  onBlur={handleInputBlur}
                />
                <span className="text-xs text-gray-400">{t('common.minutes')}</span>
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  radius="full"
                  className="font-semibold"
                  onPress={handleClearInput}
                  onMouseDown={handleClearInput}
                  onPointerDown={e => e.stopPropagation()}
                >
                  {t('common.clear')}
                </Button>
              </div>
            )}
          </div>
        </div>
        <span
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none' }}
        >
          <GoGrabber
            size={30}
            className="text-altwhite hover:scale-115 hover:text-white duration-150"
          />
        </span>
      </div>
    </div>
  );
});
