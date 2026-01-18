import { logEvent } from './tasks';

export const handleError = (functionName: string, error: unknown): void => {
  if (!error) {
    return;
  }

  // eslint-disable-next-line no-console
  console.error(`Error in (${functionName}):`, error);
  logEvent(`[Error] in (${functionName}) ${error}`);
};
