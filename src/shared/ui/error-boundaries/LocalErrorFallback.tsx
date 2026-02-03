import type { FallbackProps } from 'react-error-boundary';

import { ErrorDetails } from './ErrorDetails';

export function LocalErrorFallback({ error }: FallbackProps) {
  return (
    <div className="bg-base h-full w-full flex flex-col items-center justify-center pt-9 pb-8 px-2 text-content">
      <ErrorDetails error={error} />
    </div>
  );
}
