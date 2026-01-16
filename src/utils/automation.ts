import { invoke } from '@tauri-apps/api/core';
import type { TimeInputValue } from '@heroui/react';
import { Time } from '@internationalized/date';

import type { GameWithRemainingDrops, InvokeDropsRemaining, InvokeGamesWithDrops } from '@/types';
// eslint-disable-next-line import-x/no-cycle
import { decrypt, logEvent } from '@/utils/tasks';
import { showMissingCredentialsToast } from '@/utils/toasts';

// Check remaining card drops for a game
export async function checkDrops(
  steamId: string | undefined,
  appId: number,
  sid: string | undefined,
  sls: string | undefined,
  sma: string | undefined,
): Promise<number> {
  try {
    if (!sid || !sls) {
      showMissingCredentialsToast();
      return 0;
    }

    const res = await invoke<InvokeDropsRemaining>('get_drops_remaining', {
      sid: decrypt(sid),
      sls: decrypt(sls),
      sma,
      steamId,
      appId,
    });

    if (res?.remaining) {
      return res.remaining;
    }
    return 0;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in checkDrops util: ', error);
    logEvent(`[Error] in (checkDrops) util: ${error}`);
    return 0;
  }
}

// Get all games with remaining card drops
export async function getAllGamesWithDrops(
  steamId: string | undefined,
  sid: string | undefined,
  sls: string | undefined,
  sma: string | undefined,
): Promise<GameWithRemainingDrops[]> {
  try {
    if (!sid || !sls) {
      showMissingCredentialsToast();
      return [];
    }

    const res = await invoke<InvokeGamesWithDrops>('get_games_with_drops', {
      sid: decrypt(sid),
      sls: decrypt(sls),
      sma,
      steamid: steamId,
    });

    if (res.gamesWithDrops && res.gamesWithDrops.length > 0) {
      return res.gamesWithDrops;
    }
    return [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in getAllGamesWithDrops util: ', error);
    logEvent(`[Error] in (getAllGamesWithDrops) util: ${error}`);
    return [];
  }
}

// Check if the current time is within the specified schedule
export function isWithinSchedule(
  scheduleFrom: TimeInputValue,
  scheduleTo: TimeInputValue,
): boolean {
  const now = new Date();
  const currentTime = new Time(now.getHours(), now.getMinutes());
  const scheduleFromTime = new Time(scheduleFrom.hour, scheduleFrom.minute);
  const scheduleToTime = new Time(scheduleTo.hour, scheduleTo.minute);
  if (scheduleToTime.compare(scheduleFromTime) < 0) {
    return currentTime.compare(scheduleFromTime) >= 0 || currentTime.compare(scheduleToTime) < 0;
  }
  return currentTime.compare(scheduleFromTime) >= 0 && currentTime.compare(scheduleToTime) < 0;
}
