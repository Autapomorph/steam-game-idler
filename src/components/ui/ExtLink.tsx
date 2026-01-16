import type { MouseEvent, PropsWithChildren } from 'react';
import { open } from '@tauri-apps/plugin-shell';

interface Props extends PropsWithChildren {
  href: string;
  className?: string;
}

export const ExtLink = ({ children, href, className = '' }: Props) => {
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>): Promise<void> => {
    e.preventDefault();
    try {
      await open(href);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to open link:', error);
    }
  };

  return (
    <a className={`w-fit h-fit cursor-pointer ${className}`} href={href} onClick={handleClick}>
      {children}
    </a>
  );
};
