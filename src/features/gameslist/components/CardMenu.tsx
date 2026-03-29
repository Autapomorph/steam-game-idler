import type { Game } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import { FaSteam } from 'react-icons/fa';
import { TbAwardFilled, TbDotsVertical, TbPlayerPlayFilled } from 'react-icons/tb';
import { Dropdown, Label } from '@heroui/react';
import { useStateStore } from '@/shared/stores';
import { handleIdle, openExternalLink, viewAchievments } from '@/shared/utils';

export const CardMenu = ({ item }: { item: Game }) => {
  const { t } = useTranslation();
  const setAppId = useStateStore(state => state.setAppId);
  const setAppName = useStateStore(state => state.setAppName);
  const setShowAchievements = useStateStore(state => state.setShowAchievements);

  const viewStorePage = async (item: Game) => {
    try {
      await openExternalLink(`https://store.steampowered.com/app/${item.appid}`);
    } catch (error) {
      console.error('Failed to open link:', error);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className="p-1 bg-black/50 hover:bg-black hover:bg-opacity-80 cursor-pointer rounded-md duration-200">
          <TbDotsVertical />
        </div>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <Dropdown.Menu aria-label="actions">
          <Dropdown.Item
            className="rounded-xl"
            key="idle"
            onPress={() => handleIdle(item)}
            textValue="Idle game"
          >
            <TbPlayerPlayFilled size={16} className="text-content" />
            <Label className="text-sm text-content">{t($ => $['cardMenu.idle'])}</Label>
          </Dropdown.Item>

          <Dropdown.Item
            className="rounded-xl"
            key="achievements"
            onPress={() => viewAchievments(item, setAppId, setAppName, setShowAchievements)}
            textValue="View achievements"
          >
            <TbAwardFilled size={16} className="text-content" />
            <Label className="text-sm text-content">{t($ => $['cardMenu.achievements'])}</Label>
          </Dropdown.Item>

          <Dropdown.Item
            className="rounded-xl"
            key="store"
            onPress={() => viewStorePage(item)}
            textValue="View store page"
          >
            <FaSteam fontSize={16} className="text-content" />
            <Label className="text-sm text-content">{t($ => $['cardMenu.store'])}</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
