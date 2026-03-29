import { useEffect, useMemo, useState } from 'react';
import { cn, CloseButton, InputGroup, TextField, NumberField, Separator } from '@heroui/react';
import { RiSearchLine } from 'react-icons/ri';
import { TbChevronRight } from 'react-icons/tb';
import { List } from 'react-window';
import { useTranslation } from 'react-i18next';

import type { Game } from '@/shared/types';
import { useUserStore } from '@/shared/stores';
import { GameSettingsRow, type RowData } from './GameSettingsRow';
import { useGameSettings } from '../../hooks/game-settings/useGameSettings';

export const GameSettings = () => {
  const { t } = useTranslation();
  const gamesList = useUserStore(state => state.gamesList);
  const [searchTerm, setSearchTerm] = useState('');
  const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const {
    globalMaxIdleTime,
    maxIdleTime,
    maxCardDrops,
    handleGlobalMaxIdleTimeChange,
    maxAchievementUnlocks,
    handleMaxIdleTimeChange,
    handleMaxCardDropsChange,
    handleMaxAchievementUnlocksChange,
  } = useGameSettings({ appId: selectedGame?.appid });

  const filteredGamesList = useMemo(() => {
    if (!searchTerm) return gamesList;
    return gamesList.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [gamesList, searchTerm]);

  const rowData: RowData = {
    filteredGamesList,
    selectedGame,
    onGameSelect: setSelectedGame,
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowInnerHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative flex flex-col gap-4 mt-9 w-4/5">
      <div className="flex flex-col gap-0 select-none">
        <p className="flex items-center text-xs text-altwhite font-bold">
          {t($ => $['settings.title'])}
          <span>
            <TbChevronRight size={12} />
          </span>
        </p>
        <p className="text-3xl font-black">{t($ => $['common.gameSettings'])}</p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <TextField fullWidth onChange={setSearchTerm}>
          <InputGroup>
            <InputGroup.Prefix>
              <RiSearchLine size={24} className="text-content/60" />
            </InputGroup.Prefix>
            <InputGroup.Input
              className={cn('text-content! placeholder:text-altwhite/50')}
              placeholder={t($ => $['common.search'])}
            />
            <InputGroup.Suffix>
              {searchTerm && (
                <CloseButton
                  className="bg-surface-secondary text-content/60 hover:text-content"
                  aria-label="Close"
                  onPress={() => setSearchTerm('')}
                />
              )}
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>

        <div className="border border-border/70 rounded-lg mb-2 overflow-hidden bg-popover/80">
          <List
            rowComponent={GameSettingsRow}
            rowCount={filteredGamesList.length}
            rowHeight={37}
            style={{
              width: '100%',
              height: windowInnerHeight - 610,
            }}
            rowProps={{
              data: rowData,
            }}
          />
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['gameSettings.globalMaxIdle'])}
            </p>
            <p className="text-xs text-altwhite">{t($ => $['gameSettings.globalMaxIdleSub'])}</p>
          </div>

          <NumberField
            aria-label="max idle time"
            className="w-22.5"
            value={globalMaxIdleTime}
            step={1}
            minValue={0}
            maxValue={99999}
            onChange={handleGlobalMaxIdleTimeChange}
          >
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="text-sm text-content! placeholder:text-altwhite/50" />
              <NumberField.IncrementButton />
            </NumberField.Group>
          </NumberField>
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">{t($ => $['gameSettings.idle'])}</p>
            <p className="text-xs text-altwhite">{t($ => $['gameSettings.idleSub'])}</p>
          </div>

          <NumberField
            aria-label="max idle time"
            className="w-22.5"
            value={maxIdleTime}
            step={1}
            minValue={0}
            maxValue={99999}
            onChange={handleMaxIdleTimeChange}
          >
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="text-sm text-content! placeholder:text-altwhite/50" />
              <NumberField.IncrementButton />
            </NumberField.Group>
          </NumberField>
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">{t($ => $['gameSettings.drops'])}</p>
            <p className="text-xs text-altwhite">{t($ => $['gameSettings.dropsSub'])}</p>
          </div>
          <NumberField
            aria-label="max card drops"
            className="w-22.5"
            value={maxCardDrops}
            step={1}
            minValue={0}
            maxValue={99999}
            onChange={handleMaxCardDropsChange}
          >
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="text-sm text-content! placeholder:text-altwhite/50" />
              <NumberField.IncrementButton />
            </NumberField.Group>
          </NumberField>
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['gameSettings.achievements'])}
            </p>
            <p className="text-xs text-altwhite">{t($ => $['gameSettings.achievementsSub'])}</p>
          </div>

          <NumberField
            aria-label="max achievement unlocks"
            className="w-22.5"
            value={maxAchievementUnlocks}
            step={1}
            minValue={0}
            maxValue={99999}
            onChange={handleMaxAchievementUnlocksChange}
          >
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="text-sm text-content! placeholder:text-altwhite/50" />
              <NumberField.IncrementButton />
            </NumberField.Group>
          </NumberField>
        </div>
      </div>
    </div>
  );
};
