import { invoke } from '@tauri-apps/api/core';
import { TrayIcon } from '@tauri-apps/api/tray';

import { logEvent } from './logEvent';

export async function updateTrayIcon(tooltip?: string, runningStatus?: boolean): Promise<void> {
  try {
    const trayIcon = await TrayIcon.getById('1');
    if (trayIcon) {
      if (tooltip) {
        await trayIcon.setTooltip(tooltip);
      } else {
        await trayIcon.setTooltip('Steam Game Idler');
      }

      if (runningStatus) {
        // Get icon as base64 from backend
        const base64Icon = await invoke<string>('get_tray_icon', { default: false });
        const iconBuffer = Uint8Array.from(atob(base64Icon), c => c.charCodeAt(0));
        await trayIcon.setIcon(iconBuffer);
      } else {
        const base64Icon = await invoke<string>('get_tray_icon', { default: true });
        const iconBuffer = Uint8Array.from(atob(base64Icon), c => c.charCodeAt(0));
        await trayIcon.setIcon(iconBuffer);
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in updateTrayIcon:', error);
    logEvent(`[Error] in updateTrayIcon: ${error}`);
  }
}
