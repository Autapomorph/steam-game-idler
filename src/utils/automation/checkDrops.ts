import { invoke } from '@tauri-apps/api/core';

import type { InvokeDropsRemaining } from '@/types';
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
