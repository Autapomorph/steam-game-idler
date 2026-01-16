import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useTranslation } from 'react-i18next';

import { useNavigationStore } from '@/stores/navigationStore';
import { UserSelectionArea } from '@/components/layout/UserSelectionArea';
import { Header } from '@/components/ui/header/Header';
import { LanguageSwitch } from '@/components/ui/i18n/LanguageSwitch';
import { SignInHero } from '@/components/ui/SignInHero';
import { WebviewWindow } from '@/components/ui/WebviewWindow';

export const SignIn = () => {
  const { t } = useTranslation();
  const setActivePage = useNavigationStore(state => state.setActivePage);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setActivePage('setup');
  }, [setActivePage]);

  const handleRefresh = async (): Promise<void> => {
    await invoke('delete_user_summary_file');
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <Header />
      {/* Language switch */}
      <div className="absolute bottom-0 right-0 p-10 z-10 flex items-center gap-4 pointer-events-none">
        <WebviewWindow
          href="https://steamgameidler.com/docs/get-started/how-to-sign-in"
          className="pointer-events-auto"
        >
          <p className="text-sm text-altwhite hover:text-altwhite/90 duration-150">
            {t('setup.help')}
          </p>
        </WebviewWindow>

        <LanguageSwitch
          className="w-45 pointer-events-auto"
          classNames={{
            trigger: [
              'bg-input/80 data-[hover=true]:!bg-inputhover/80 data-[open=true]:!bg-inputhover/80 duration-100 rounded-lg border border-border',
            ],
          }}
        />
      </div>
      <div className="flex gap-4 w-screen h-screen relative overflow-hidden z-1">
        <div className="flex flex-col items-center w-[90%] justify-center h-calc">
          <UserSelectionArea key={refreshKey} onRefresh={handleRefresh} />
        </div>

        <div className="relative flex flex-col items-center justify-center w-2/3 h-calc pr-10 select-none">
          <SignInHero />
        </div>
      </div>
    </>
  );
};
