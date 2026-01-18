import type { LatestData } from '@/types';
import { logEvent } from './logEvent';

// Fetch the latest.json for tauri updater
export async function fetchLatest(): Promise<LatestData | null> {
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/Autapomorph/steam-game-idler/main/latest.json',
    );
    const data = await res.json();
    return data as LatestData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in (fetchLatest):', error);
    logEvent(`[Error] in (fetchLatest): ${error}`);
    return null;
  }
}
