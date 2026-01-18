import { invoke } from '@tauri-apps/api/core';

import type { InvokeIdle, InvokeRunningProcess, InvokeSettings, UserSummary } from '@/types';
import { checkSteamStatus, logEvent } from '@/utils/tasks';
import { showAccountMismatchToast, showWarningToast, t } from '@/utils/toasts';
import { idleTimeouts, idleIntervals } from './timeouts';
import { stopIdle } from './stopIdle';

// Start idling a game
export async function startIdle(appId: number, appName: string, manual = true): Promise<boolean> {
  try {
    // Make sure Steam client is running
    const isSteamRunning = await checkSteamStatus(true);
    if (!isSteamRunning) return false;

    const userSummary = JSON.parse(localStorage.getItem('userSummary') ?? '{}') as UserSummary;

    const settingsResponse = await invoke<InvokeSettings>('get_user_settings', {
      steamId: userSummary?.steamId,
    });

    const gameSettings = settingsResponse.settings.gameSettings ?? {};
    let maxIdleTime = 0;
    // Check for globalMaxIdleTime first
    const globalMaxIdleTime =
      typeof gameSettings.globalMaxIdleTime === 'number' ? gameSettings.globalMaxIdleTime : 0;
    if (globalMaxIdleTime > 0) {
      maxIdleTime = globalMaxIdleTime;
    } else {
      const perGameSetting = gameSettings[appId];
      if (
        typeof perGameSetting === 'object' &&
        perGameSetting !== null &&
        !Array.isArray(perGameSetting)
      ) {
        maxIdleTime = perGameSetting.maxIdleTime ?? 0;
      }
    }

    // Make sure the game is not already being idled
    const response = await invoke<InvokeRunningProcess>('get_running_processes');
    const processes = response?.processes;
    const runningIdlers = processes.map(p => p.appid);

    if (processes.length === 32) {
      // We already show a warning toast if startIdle returns false in most cases, so just log here
      logEvent(
        `[Error] [Idle] Maximum number of idling processes (32) reached when attempting to idle ${appName} (${appId})`,
      );
      return false;
    }

    if (runningIdlers.includes(appId)) {
      // This is unlikely to happen but worth handling just in case
      showWarningToast(t('toast.startIdle.alreadyIdling', { appName, appId }));
      logEvent(`[Error] [Idle] Attempted to idle already idling game ${appName} (${appId})`);
      return false;
    }

    const idleResponse = await invoke<InvokeIdle>('start_idle', {
      appId: Number(appId),
      appName,
    });

    if (idleResponse.success) {
      // If maxIdleTime is set, stop idling after the specified time
      if (manual && maxIdleTime > 0) {
        idleTimeouts[appId] = setTimeout(() => {
          stopIdle(appId, appName);
        }, maxIdleTime * 60000);

        idleIntervals[appId] = setInterval(async () => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const response = await invoke<InvokeRunningProcess>('get_running_processes');

          // eslint-disable-next-line @typescript-eslint/no-shadow
          const processes = response?.processes;
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const runningIdlers = processes.map(p => p.appid);

          // If the game is no longer being idled, clear the timeout and interval
          if (!runningIdlers.includes(appId)) {
            clearTimeout(idleTimeouts[appId]);
            clearInterval(idleIntervals[appId]);
            delete idleTimeouts[appId];
            delete idleIntervals[appId];
          }
        }, 5000);
      }
      logEvent(`[Idle] Started idling ${appName} (${appId})`);
      return true;
    }
    showAccountMismatchToast('danger');
    // eslint-disable-next-line no-console
    console.error(`Error starting idler for ${appName} (${appId}): ${idleResponse.error}`);
    logEvent(`[Error] [Idle] Failed to idle ${appName} (${appId}) - account mismatch`);
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in startIdle util: ', error);
    logEvent(`[Error] in (startIdle) util: ${error}`);
    return false;
  }
}
