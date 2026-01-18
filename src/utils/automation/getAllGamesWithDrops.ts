import { invoke } from '@tauri-apps/api/core';

import type { GameWithRemainingDrops, InvokeGamesWithDrops } from '@/types';
// eslint-disable-next-line import-x/no-cycle
import { decrypt, logEvent } from '@/utils/tasks';
import { showMissingCredentialsToast } from '@/utils/toasts';

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
