import { useTranslation } from 'react-i18next';

import { getRuntimeConfig } from '@/shared/config';
import { useUserStore } from '@/shared/stores';
import { PrimaryButton } from '@/shared/ui';

export const DashboardPage = () => {
  const { t } = useTranslation();
  const signOut = useUserStore(state => state.signOut);
  const { isPortable, appVersion } = getRuntimeConfig();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="bg-black h-screen w-screen">
      <p>{`v${String(appVersion)}${isPortable ? ' (portable)' : ''}`}</p>
      <p>{t('sample')}</p>
      <PrimaryButton className="mt-20" onPress={handleSignOut}>
        Sign Out
      </PrimaryButton>
    </div>
  );
};
