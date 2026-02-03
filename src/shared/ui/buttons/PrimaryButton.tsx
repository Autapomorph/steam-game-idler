import { type ButtonProps, Button, cn } from '@heroui/react';

export function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn('font-semibold bg-gray-200 text-gray-800 rounded-full', className)}
      {...props}
    />
  );
}
