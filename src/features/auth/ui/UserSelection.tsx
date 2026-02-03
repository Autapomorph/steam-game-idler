import { useState } from 'react';
import { useNavigate } from 'react-router';
import { cn, Image } from '@heroui/react';
import { TbArrowRight } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

import { useUserStore } from '@/shared/stores';
import {
  Logo,
  PrimaryButton,
  SecondaryButton,
  showAccountMismatchToast,
  showDangerToast,
} from '@/shared/ui';
import { config } from '@/shared/config';
import { checkSteamStatus, logEvent, openExternalLink } from '@/shared/lib';
import type { UserSummary } from '@/shared/types';

interface UserSelectionProps {
  onRefresh: () => void;
}

export const UserSelection = ({ onRefresh }: UserSelectionProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { steamUsers, setUserSummary, isLoading } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);

  const handleSignIn = async () => {
    try {
      const isSteamRunning = await checkSteamStatus();
      const { isDev, devAccountIds } = config;

      // Prevent sign-in if Steam is not running, unless in dev mode with a dev account
      if (!isSteamRunning && !isDev && !devAccountIds.includes(selectedUser?.steamId ?? '')) {
        return;
      }

      // mostRecent !== 1 means this isn't the account that's currently logged in to Steam
      // so show a warning to the user when they log in
      if (selectedUser?.mostRecent !== 1) {
        showAccountMismatchToast('warning');
      }

      setUserSummary(selectedUser);
      logEvent(`[System] Signed in as ${selectedUser?.personaName} (${selectedUser?.steamId})`);

      navigate('/', { replace: true });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[Error] in (handleSignIn):', error);
      logEvent(`[Error] in (handleSignIn): ${error}`);
      showDangerToast(t('common.an_error_occurred'));
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <Logo width={110} height={110} />

      {/* Available Steam accounts */}
      {Boolean(steamUsers.length) && (
        <div className="flex flex-col items-center">
          <p className="text-3xl font-semibold">{t('sign_in.choose_account')}</p>

          <div
            className={cn(
              'grid space-x-2 my-10',
              steamUsers.length === 1
                ? 'grid-cols-1 place-items-center'
                : 'grid-cols-1 sm:grid-cols-2',
            )}
          >
            {steamUsers.map(user => (
              <div
                key={user.steamId}
                className="flex flex-col items-center cursor-pointer hover:scale-105 duration-150 group"
                onClick={() => setSelectedUser(user)}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedUser(user);
                  }
                }}
              >
                {/* Avatar */}
                <Image
                  src={user.avatar}
                  alt={user.personaName}
                  width={128}
                  height={128}
                  className={cn(
                    'rounded-lg p-1',
                    selectedUser?.steamId === user?.steamId
                      ? 'ring-transparent bg-linear-to-tr from-cyan-500 via-blue-500 to-violet-700'
                      : 'ring-transparent bg-transparent',
                  )}
                />

                {/* Persona name */}
                <p className="mt-2 text-lg">{user.personaName}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <SecondaryButton onPress={onRefresh} isDisabled={isLoading}>
              {t('common.refresh')}
            </SecondaryButton>

            <PrimaryButton className="group" isDisabled={!selectedUser} onPress={handleSignIn}>
              {t('common.continue')}
              <TbArrowRight className="group-hover:translate-x-1 duration-150" />
            </PrimaryButton>
          </div>
        </div>
      )}

      {/* No accounts found */}
      {!steamUsers.length && (
        <div className="flex flex-col items-center">
          <p className="text-3xl font-semibold">{t('sign_in.no_accounts_found')}</p>

          <div className="text-center my-10">
            <p className="text-altwhite max-w-md">{t('sign_in.account_instructions')}</p>
          </div>

          <div className="flex space-x-4">
            <SecondaryButton
              onPress={() => {
                openExternalLink(
                  'https://steamgameidler.com/docs/faq#error-messages:~:text=No%20Steam%20users%20found',
                );
              }}
            >
              {t('common.learn_more')}
            </SecondaryButton>

            <PrimaryButton onPress={onRefresh}>{t('common.refresh')}</PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};
