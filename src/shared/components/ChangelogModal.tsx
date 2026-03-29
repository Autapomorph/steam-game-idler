import { useEffect, useState } from 'react';
import { Button, Modal, Spinner, useOverlayState } from '@heroui/react';
import 'github-markdown-css/github-markdown-light.css';
import { getVersion } from '@tauri-apps/api/app';
import { useTranslation } from 'react-i18next';
import { FaStar } from 'react-icons/fa6';
import { useUpdateStore } from '@/shared/stores';

import { openExternalLink } from '@/shared/utils';

export const ChangelogModal = () => {
  const { t } = useTranslation();
  const showChangelog = useUpdateStore(state => state.showChangelog);
  const setShowChangelog = useUpdateStore(state => state.setShowChangelog);
  const { isOpen, open, toggle } = useOverlayState();
  const [appVersion, setAppVersion] = useState('');
  const [isVersionLoaded, setIsVersionLoaded] = useState(false);

  useEffect(() => {
    if (showChangelog && isVersionLoaded) {
      open();
      setShowChangelog(false);
    }
  }, [open, showChangelog, setShowChangelog, isVersionLoaded]);

  useEffect(() => {
    (async () => {
      try {
        const version = await getVersion();
        setAppVersion(version);
        setIsVersionLoaded(true);
      } catch (error) {
        console.error('Failed to get app version:', error);
        setAppVersion('latest');
        setIsVersionLoaded(true);
      }
    })();
  }, []);

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={toggle}>
      <Modal.Container
        size="lg"
        className="text-content bg-transparent border border-border rounded-4xl"
      >
        <Modal.Dialog>
          <Modal.Body className="p-0">
            {isVersionLoaded ? (
              <iframe
                title="changelog"
                src={`https://steamgameidler.com/changelog/${appVersion}`}
                className="min-h-125"
              />
            ) : (
              <div className="flex items-center justify-center min-h-125">
                <Spinner className="m-10" />
              </div>
            )}
          </Modal.Body>

          <Modal.Footer className="border-t border-border justify-between">
            <Button
              size="sm"
              variant="tertiary"
              className="bg-github-star text-github-star-foreground hover:bg-github-star-hover hover:text-github-star-foreground-hover font-semibold rounded-full"
              onPress={() => openExternalLink('https://github.com/Autapomorph/steam-game-idler')}
            >
              <FaStar size={20} />
              {t($ => $['changelog.star'])}
            </Button>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-danger hover:bg-danger-soft font-semibold rounded-full"
                onPress={toggle}
              >
                {t($ => $['common.close'])}
              </Button>
              <Button
                size="sm"
                className="bg-white text-black font-semibold rounded-full"
                onPress={() =>
                  openExternalLink(`https://steamgameidler.com/changelog#${appVersion}`)
                }
              >
                {t($ => $['menu.changelog'])}
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};
