import type { Achievement, CurrentTabType, Statistic } from '@/shared/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn, Tabs } from '@heroui/react';
import Image from 'next/image';
import {
  AchievementsList,
  PageHeader,
  StatisticsList,
  useAchievements,
} from '@/features/achievement-manager';
import { Loader } from '@/shared/components';
import { useNavigationStore, useStateStore } from '@/shared/stores';

export const Achievements = () => {
  const { t } = useTranslation();
  const setCurrentTab = useNavigationStore(state => state.setCurrentTab);
  const appId = useStateStore(state => state.appId);
  const sidebarCollapsed = useStateStore(state => state.sidebarCollapsed);
  const transitionDuration = useStateStore(state => state.transitionDuration);
  const [isLoading, setIsLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [protectedAchievements, setProtectedAchievements] = useState(false);
  const [protectedStatistics, setProtectedStatistics] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fallbackImage, setFallbackImage] = useState('');
  const achievementStates = useAchievements(
    setIsLoading,
    setAchievements,
    setStatistics,
    setProtectedAchievements,
    setProtectedStatistics,
  );

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setFallbackImage(`https://cdn.steamstatic.com/steam/apps/${appId}/header.jpg`);
  };

  return (
    <div
      className={cn(
        'overflow-y-auto overflow-x-hidden mt-9 ease-in-out',
        sidebarCollapsed ? 'w-[calc(100vw-56px)]' : 'w-calc',
      )}
      style={{
        transitionDuration,
        transitionProperty: 'width',
      }}
    >
      <Image
        src={fallbackImage || `https://cdn.steamstatic.com/steam/apps/${appId}/library_hero.jpg`}
        className={cn('absolute top-0 left-0 w-full', !imageLoaded && 'hidden')}
        alt="background"
        width={1920}
        height={1080}
        priority
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)',
        }}
      />
      {imageLoaded && <div className="absolute top-0 left-0 w-full h-screen bg-base/70" />}

      {/* Loader overlay */}
      {(isLoading || (!imageLoaded && !fallbackImage && !isLoading)) && (
        <div
          className={cn('absolute inset-0 flex items-center justify-center w-calc ml-62.5 z-50')}
        >
          <Loader />
        </div>
      )}

      <div className="p-4">
        <PageHeader
          protectedAchievements={protectedAchievements}
          protectedStatistics={protectedStatistics}
        />
      </div>

      <div className="relative flex flex-wrap gap-4 mt-2">
        <div className="flex flex-col w-full">
          <Tabs
            className="max-w-75 ml-5"
            onSelectionChange={e => setCurrentTab(e as CurrentTabType)}
          >
            <Tabs.ListContainer>
              <Tabs.List aria-label="Settings tabs">
                <Tabs.Tab id="achievements">
                  {t($ => $['achievementManager.achievements.title'])}
                  <Tabs.Indicator />
                </Tabs.Tab>

                <Tabs.Tab id="statistics">
                  {t($ => $['achievementManager.statistics.title'])}
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            <Tabs.Panel id="achievements">
              <AchievementsList
                achievements={achievements}
                setAchievements={setAchievements}
                protectedAchievements={protectedAchievements}
                windowInnerHeight={achievementStates.windowInnerHeight}
                setRefreshKey={achievementStates.setRefreshKey}
              />
            </Tabs.Panel>

            <Tabs.Panel id="statistics">
              <StatisticsList
                statistics={statistics}
                setStatistics={setStatistics}
                setAchievements={setAchievements}
                windowInnerHeight={achievementStates.windowInnerHeight}
                setRefreshKey={achievementStates.setRefreshKey}
              />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
