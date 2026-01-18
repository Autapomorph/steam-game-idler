import { invoke } from '@tauri-apps/api/core';

import { logEvent } from './logEvent';

export async function isPortableCheck(): Promise<boolean> {
  try {
    const portable = await invoke<boolean>('is_portable');
    return portable;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in isPortable:', error);
    logEvent(`[Error] in isPortable: ${error}`);
    return false;
  }
}
