import { Button, cn } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { type FallbackProps } from 'react-error-boundary';

import { ExtLink } from '@/shared/components';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { t } = useTranslation();

  const stack = error instanceof Error ? error.stack : undefined;

  const issueTitle = String(error) || 'Error in Steam Game Idler';
  const issueBody = `### Description
<give a brief description of what you were doing when the error occurred>

### Steps to reproduce
<give a step-by-step description of how to reproduce the error>

### Stack
\`\`\`
${stack}
\`\`\``;

  const encodedIssueTitle = encodeURIComponent(issueTitle);
  const encodedIssueBody = encodeURIComponent(issueBody);

  return (
    <div className="bg-base h-screen w-screen">
      <div
        className={cn(
          'absolute top-0 left-0 w-full h-12 select-none',
          'flex justify-center items-center bg-sidebar',
        )}
        data-tauri-drag-region
      >
        <p className="text-content font-bold">{t($ => $['errorBoundary.title'])}</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 h-full text-content">
        <div
          className={cn(
            'flex flex-col justify-center gap-4 h-[65%] w-[80%]',
            'bg-tab-panel rounded-lg border border-border p-4',
          )}
        >
          <p className="text-sm">{t($ => $['errorBoundary.subtitle'])}</p>

          <div className="flex flex-col">
            <p className="font-bold">{t($ => $['errorBoundary.error.title'])}</p>
            <p className="text-sm font-mono text-danger font-semibold">
              {String(error).replace('Error: ', '')}
            </p>
          </div>

          <div className="flex flex-col overflow-hidden">
            <p className="font-bold">{t($ => $['errorBoundary.stack.title'])}</p>
            <div className="bg-base border border-border rounded-lg h-full w-full p-1 overflow-hidden">
              <div className="overflow-y-scroll h-full">
                <pre className="text-xs text-altwhite font-semibold text-left text-wrap p-1">
                  {stack}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <ExtLink
            href={`https://github.com/Autapomorph/steam-game-idler/issues/new?title=${encodedIssueTitle}&body=${encodedIssueBody}`}
          >
            <div className="bg-warning p-2 font-semibold rounded-lg">
              <p className="text-xs">{t($ => $['errorBoundary.report'])}</p>
            </div>
          </ExtLink>

          <Button
            size="sm"
            className="font-semibold rounded-lg bg-dynamic"
            onPress={() => {
              resetErrorBoundary();
              window.location.reload();
            }}
          >
            {t($ => $['errorBoundary.reload'])}
          </Button>
        </div>
      </div>
    </div>
  );
}
