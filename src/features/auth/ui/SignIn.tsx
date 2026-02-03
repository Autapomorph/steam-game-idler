import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserStore } from '@/shared/stores';
import { openExternalLink } from '@/shared/lib';
import { Hero } from './Hero';
import { UserSelection } from './UserSelection';

// TODO: Add language switcher once implemented

export const SignIn = () => {
  const { t } = useTranslation();
  const fetchUsers = useUserStore(s => s.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRefresh = () => {
    fetchUsers();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="flex gap-4 w-screen h-screen relative z-10">
        {/* User selection */}
        <div className="flex flex-col items-center w-[90%] justify-center h-calc">
          <UserSelection onRefresh={handleRefresh} />
        </div>

        {/* Hero */}
        <div className="relative flex flex-col items-center justify-center w-2/3 h-calc pr-10 select-none">
          <Hero />
        </div>
      </div>

      {/* Language switch and help */}
      <div className="absolute bottom-0 right-0 p-10 z-20 flex items-center gap-4 pointer-events-none">
        <button
          type="button"
          className="text-sm text-altwhite hover:text-altwhite/90 duration-150 cursor-pointer pointer-events-auto"
          onClick={() =>
            openExternalLink('https://steamgameidler.com/docs/get-started/how-to-sign-in')
          }
        >
          {t('common.need_help')}
        </button>

        <p>Language Switch Placeholder</p>
      </div>
    </div>
  );
};
