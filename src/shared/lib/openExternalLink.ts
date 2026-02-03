import { openUrl } from '@tauri-apps/plugin-opener';

export async function openExternalLink(url: string) {
  try {
    await openUrl(url);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to open external link:', error);
  }
}
