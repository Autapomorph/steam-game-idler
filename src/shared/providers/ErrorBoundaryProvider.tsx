import { type PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '../error-boundaries/GlobalFallback';

type Props = PropsWithChildren;

export function ErrorBoundaryProvider({ children }: Props) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error('Client side error caught by ErrorBoundary:', error, info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
