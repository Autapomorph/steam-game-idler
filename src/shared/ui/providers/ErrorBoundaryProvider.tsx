import { ErrorBoundary } from 'react-error-boundary';

import { GlobalErrorFallback } from '../error-boundaries/GlobalErrorFallback';

type Props = React.PropsWithChildren;

interface ErrorInfo {
  componentStack?: string | null;
}

function onError(_: unknown, info: ErrorInfo) {
  window.lastComponentStack = info.componentStack ?? '';
}

export function ErrorBoundaryProvider({ children }: Props) {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
}
