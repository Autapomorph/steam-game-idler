import { invoke } from '@tauri-apps/api/core';

import type { InvokeIdle } from '@/types';
import { logEvent } from '@/utils/tasks';
import { idleTimeouts, idleIntervals } from './timeouts';

// Stop idling a game
export async function stopIdle(
  appId: number | undefined,
  appName: string | undefined,
): Promise<boolean> {
  try {
    if (!appId || !appName) {
      return false;
    }

    if (idleTimeouts[appId]) {
      clearTimeout(idleTimeouts[appId]);
      delete idleTimeouts[appId];
    }
    if (idleIntervals[appId]) {
      clearInterval(idleIntervals[appId]);
      delete idleIntervals[appId];
    }
    const response = await invoke<InvokeIdle>('stop_idle', {
      appId: Number(appId),
    });
    if (response.success) {
      logEvent(`[Idle] Stopped idling ${appName} (${appId})`);
      return true;
    }
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in stopIdle util (these errors can often be ignored): ', error);
    return false;
  }
}
