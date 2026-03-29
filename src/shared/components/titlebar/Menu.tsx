import { invoke } from '@tauri-apps/api/core';
import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TbBookFilled,
  TbBugFilled,
  TbBulbFilled,
  TbDownload,
  TbListCheck,
  TbSquareRoundedChevronDown,
} from 'react-icons/tb';
import { cn, Dropdown, Label, Separator } from '@heroui/react';

import { CustomTooltip, showDangerToast, showPrimaryToast } from '@/shared/components';
import { useUpdateStore } from '@/shared/stores';
import {
  fetchLatest,
  isPortableCheck,
  logEvent,
  openExternalLink,
  preserveKeysAndClearData,
} from '@/shared/utils';

export const Menu = () => {
  const { t } = useTranslation();
  const setShowChangelog = useUpdateStore(state => state.setShowChangelog);
  const [showMenu, setShowMenu] = useState(false);
  const [isPortable, setIsPortable] = useState(false);

  const githubIssueUrl =
    'https://github.com/Autapomorph/steam-game-idler/issues/new?assignees=Autapomorph&labels=';

  useEffect(() => {
    (async () => {
      const portable = await isPortableCheck();
      setIsPortable(portable);
    })();
  }, []);

  const handleUpdate = async () => {
    try {
      const update = await check();
      if (update) {
        localStorage.setItem('hasUpdated', 'true');
        await invoke('kill_all_steamutil_processes');
        const latest = await fetchLatest();
        await update.downloadAndInstall();
        if (latest?.major) {
          await preserveKeysAndClearData();
        }
        await relaunch();
      } else {
        showPrimaryToast(t($ => $['toast.checkUpdate.none']));
      }
    } catch (error) {
      showDangerToast(t($ => $['toast.checkUpdate.error']));
      console.error('Error in (handleUpdate):', error);
      logEvent(`Error in (handleUpdate): ${error}`);
    }
  };

  return (
    <CustomTooltip content={t($ => $['common.menu'])}>
      <div>
        <Dropdown aria-label="Settings actions" onOpenChange={() => setShowMenu(!showMenu)}>
          <Dropdown.Trigger>
            <div
              className={cn(
                'flex items-center justify-center text-content hover:bg-header-hover/10',
                'h-9 w-12 cursor-pointer active:scale-90 relative duration-150',
              )}
            >
              <TbSquareRoundedChevronDown fontSize={18} />
            </div>
          </Dropdown.Trigger>

          <Dropdown.Popover>
            <Dropdown.Menu aria-label="Settings actions">
              <Dropdown.Section>
                <Dropdown.Item
                  key="help"
                  textValue="Help"
                  className="rounded-xl text-content"
                  onPress={() => openExternalLink('https://steamgameidler.com/docs/')}
                >
                  <TbBookFilled size={18} />
                  <Label>{t($ => $['menu.guide'])}</Label>
                </Dropdown.Item>
              </Dropdown.Section>

              <Separator />

              <Dropdown.Section>
                <Dropdown.Item
                  key="report"
                  textValue="Report an issue"
                  className="rounded-xl text-content"
                  onPress={() =>
                    openExternalLink(
                      `${githubIssueUrl}bug%2Cinvestigating&projects=&template=issue_report.yml`,
                    )
                  }
                >
                  <TbBugFilled size={18} />
                  <Label>{t($ => $['menu.issue'])}</Label>
                </Dropdown.Item>

                <Dropdown.Item
                  key="feature"
                  textValue="Feature request"
                  className="rounded-xl text-content"
                  onPress={() =>
                    openExternalLink(
                      `${githubIssueUrl}feature+request&projects=&template=feature_request.yml`,
                    )
                  }
                >
                  <TbBulbFilled size={18} />
                  <Label>{t($ => $['menu.feature'])}</Label>
                </Dropdown.Item>
              </Dropdown.Section>

              <Separator />

              <Dropdown.Section>
                <Dropdown.Item
                  key="changelog"
                  textValue="Changelog"
                  className="rounded-xl text-content"
                  onPress={() => setShowChangelog(true)}
                >
                  <TbListCheck size={18} />
                  <Label>{t($ => $['menu.changelog'])}</Label>
                </Dropdown.Item>

                {!isPortable ? (
                  <Dropdown.Item
                    key="updates"
                    textValue="Check for updates"
                    className="rounded-xl text-content"
                    onPress={handleUpdate}
                  >
                    <TbDownload size={18} />
                    <Label>{t($ => $['menu.update'])}</Label>
                  </Dropdown.Item>
                ) : null}
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </CustomTooltip>
  );
};
