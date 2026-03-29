import { Tooltip } from '@heroui/react';
import { useUserStore } from '@/shared/stores';

interface CustomTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | undefined;
  className?: string;
  important?: boolean;
}

export const CustomTooltip = ({
  children,
  content,
  placement = 'bottom',
  className,
  important = false,
}: CustomTooltipProps) => {
  const userSettings = useUserStore(state => state.userSettings);

  if (!important && userSettings.general.disableTooltips) {
    return children;
  }

  return (
    <Tooltip delay={250} closeDelay={100}>
      <Tooltip.Trigger className={`font-semibold text-content ${className}`}>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Content showArrow placement={placement}>
        <Tooltip.Arrow />
        {content}
      </Tooltip.Content>
    </Tooltip>
  );
};
