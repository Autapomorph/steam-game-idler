import { ErrorBoundary } from 'react-error-boundary';

import { LocalErrorFallback } from '../error-boundaries/LocalErrorFallback';

type Props = React.PropsWithChildren;

interface ErrorInfo {
  componentStack?: string | null;
}

function onError(_: unknown, info: ErrorInfo) {
  window.lastComponentStack = info.componentStack ?? '';
}

export function LocalErrorBoundaryProvider({ children }: Props) {
  return (
    <ErrorBoundary FallbackComponent={LocalErrorFallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
}
