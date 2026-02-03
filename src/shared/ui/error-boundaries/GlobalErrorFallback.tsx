import { useTranslation } from 'react-i18next';
import type { FallbackProps } from 'react-error-boundary';

import { ErrorDetails } from './ErrorDetails';

export function GlobalErrorFallback({ error }: FallbackProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-base min-h-screen w-screen flex flex-col">
      <div
        className="fixed top-0 left-0 w-full h-12 select-none flex justify-center items-center bg-sidebar z-10"
        data-tauri-drag-region
      >
        <p className="text-content font-bold text-lg flex items-center gap-2">
          {t($ => $.error_boundary.title)}
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 pt-16 pb-8 px-2 text-content">
        <ErrorDetails error={error} />
      </div>
    </div>
  );
}
