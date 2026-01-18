export const delay = (ms: number, abortController: AbortController) => {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(resolve, ms);

    const abortHandler = () => {
      clearTimeout(timeoutId);
      reject(new Error('aborted'));
    };

    abortController.signal.addEventListener('abort', abortHandler, { once: true });
  });
};

// Get a random delay between a minimum and maximum value
export function getRandomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * ((max - min) * 60 * 1000 + 1)) + min * 60 * 1000;
}
