import { open } from '@tauri-apps/plugin-shell';

export const handleOpenExtLink = async (href: string): Promise<void> => {
  try {
    await open(href);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to open link:', error);
  }
};
