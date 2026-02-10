import { ChangelogModal, Dashboard, SignIn, SteamWarning } from '@/shared/components';
import {
  useAutoIdleGames,
  useCheckForUpdates,
  useContextMenu,
  useFreeGames,
  useInit,
  useInitSettings,
  useSteamMonitor,
  useThemes,
  useZoomControls,
} from '@/shared/hooks';
import { useLoaderStore, useUserStore } from '@/shared/stores';

const Index = () => {
  const userSummary = useUserStore(state => state.userSummary);
  const { loaderVisible } = useLoaderStore();

  useInit();
  useThemes();
  useInitSettings();
  useCheckForUpdates();
  useAutoIdleGames();
  useFreeGames();
  useZoomControls();
  useContextMenu();
  useSteamMonitor();

  if (loaderVisible) return null;

  if (!userSummary) {
    return (
      <>
        <SignIn />
        <ChangelogModal />
      </>
    );
  }

  return (
    <div className="min-h-calc">
      <Dashboard />
      <SteamWarning />
      <ChangelogModal />
    </div>
  );
};

export default Index;
