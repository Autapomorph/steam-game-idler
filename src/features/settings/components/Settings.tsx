import type { CurrentSettingsTabType } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import { TbX } from 'react-icons/tb';
import { Button, cn, Tabs } from '@heroui/react';

import {
  AchievementSettings,
  CardSettings,
  CustomizationSettings,
  FreeGamesSettings,
  GameSettings,
  GeneralSettings,
  Logs,
  SteamCredentials,
  TradingCardManagerSettings,
  useSettings,
} from '@/features/settings';
import { SocialButtons } from '@/shared/components';
import { useNavigationStore } from '@/shared/stores';

export const Settings = () => {
  const { t } = useTranslation();
  const { version, refreshKey } = useSettings();
  const setActivePage = useNavigationStore(state => state.setActivePage);
  const previousActivePage = useNavigationStore(state => state.previousActivePage);
  const setPreviousActivePage = useNavigationStore(state => state.setPreviousActivePage);
  const currentSettingsTab = useNavigationStore(state => state.currentSettingsTab);
  const setCurrentSettingsTab = useNavigationStore(state => state.setCurrentSettingsTab);

  return (
    <div key={refreshKey} className={cn('min-h-screen min-w-screen bg-gradient-alt')}>
      <div className="absolute top-3 left-3 z-40">
        <Button
          isIconOnly
          className="bg-item-hover text-content rounded-full"
          onPress={() => {
            setActivePage(previousActivePage);
            setCurrentSettingsTab('general');
            setPreviousActivePage('games');
          }}
        >
          <TbX />
        </Button>
      </div>

      <div className="absolute flex flex-col items-center gap-4 bottom-4 left-0 px-6 w-62.5 z-40">
        <SocialButtons />
        <span className="text-xs text-altwhite text-center">Steam Game Idler v{version}</span>
      </div>

      <Tabs
        className="max-w-75 ml-5"
        orientation="vertical"
        selectedKey={currentSettingsTab}
        onSelectionChange={key => setCurrentSettingsTab(key as CurrentSettingsTabType)}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Settings tabs">
            <Tabs.Tab id="general">
              {t($ => $['settings.general.title'])}
              <Tabs.Indicator />
            </Tabs.Tab>

            <Tabs.Tab id="customization">
              {t($ => $['settings.customization.title'])}
              <Tabs.Indicator />
            </Tabs.Tab>

            <Tabs.Tab id="steam-credentials">
              {t($ => $['settings.cardFarming.steamCredentialsTitle'])}
            </Tabs.Tab>

            <Tabs.Tab id="card-farming">{t($ => $['common.cardFarming'])}</Tabs.Tab>

            <Tabs.Tab id="achievement-unlocker">{t($ => $['common.achievementUnlocker'])}</Tabs.Tab>

            <Tabs.Tab id="trading-card-manager">{t($ => $['tradingCards.title'])}</Tabs.Tab>

            <Tabs.Tab id="free-games">{t($ => $['freeGames.title'])}</Tabs.Tab>

            <Tabs.Tab id="game-settings">{t($ => $['common.gameSettings'])}</Tabs.Tab>

            <Tabs.Tab id="debug">{t($ => $['settings.debug.title'])}</Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel id="general">
          <GeneralSettings />
        </Tabs.Panel>

        <Tabs.Panel id="customization">
          <CustomizationSettings />
        </Tabs.Panel>

        <Tabs.Panel id="steam-credentials">
          <SteamCredentials />
        </Tabs.Panel>

        <Tabs.Panel id="card-farming">
          <CardSettings />
        </Tabs.Panel>

        <Tabs.Panel id="achievement-unlocker">
          <AchievementSettings />
        </Tabs.Panel>

        <Tabs.Panel id="trading-card-manager">
          <TradingCardManagerSettings />
        </Tabs.Panel>

        <Tabs.Panel id="free-games">
          <FreeGamesSettings />
        </Tabs.Panel>

        <Tabs.Panel id="game-settings">
          <GameSettings />
        </Tabs.Panel>

        <Tabs.Panel id="debug">
          <Logs />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
