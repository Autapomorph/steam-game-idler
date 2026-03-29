import { Spinner } from '@heroui/react';

export const Loader = ({ label, styles }: { label?: string; styles?: string }) => {
  return (
    <div className={`flex justify-center items-center w-calc h-calc ${styles}`}>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="current" />
        <span className="text-xs">{label}</span>
      </div>
    </div>
  );
};
