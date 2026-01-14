import type { PropsWithChildren, ReactNode } from 'react';
import { Tooltip } from '@heroui/react';

import { useUserStore } from '@/stores/userStore';

interface Props extends PropsWithChildren {
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | undefined;
  className?: string;
  important?: boolean;
}

export default function CustomTooltip({
  children,
  content,
  placement = 'bottom',
  className,
  important = false,
}: Props) {
  const userSettings = useUserStore(state => state.userSettings);

  if (!important && userSettings.general.disableTooltips) {
    return children;
  }

  return (
    <Tooltip
      showArrow
      content={content}
      placement={placement}
      className={`font-semibold bg-[#0a0a0a] text-content ${className}`}
      delay={250}
      closeDelay={100}
      classNames={{
        base: 'pointer-events-none before:bg-[#0a0a0a]!',
        content: 'shadow-none',
      }}
    >
      {children}
    </Tooltip>
  );
}
