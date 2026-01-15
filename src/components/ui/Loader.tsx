import { Spinner } from '@heroui/react';

interface Props {
  label?: string;
  styles?: string;
}

export default function Loader({ label, styles }: Props) {
  return (
    <div className={`flex justify-center items-center w-calc h-calc ${styles}`}>
      <Spinner
        variant="simple"
        label={label}
        classNames={{
          label: 'text-xs',
        }}
      />
    </div>
  );
}
