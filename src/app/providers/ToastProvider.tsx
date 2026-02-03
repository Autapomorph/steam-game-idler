import { ToastProvider as HeroUIToastProvider } from '@heroui/react';
import { TbX } from 'react-icons/tb';

export const ToastProvider = () => {
  return (
    <HeroUIToastProvider
      toastProps={{
        radius: 'sm',
        variant: 'flat',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        closeIcon: <TbX size={16} className="text-content" />,
        classNames: {
          base: ['bg-sidebar border-none cursor-default'],
          description: ['text-content text-sm font-medium'],
          closeButton: ['opacity-100 absolute right-1 top-1 hover:bg-item-hover'],
        },
      }}
    />
  );
};
