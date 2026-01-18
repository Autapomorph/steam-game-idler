// Format time in HH:MM:SS format
export function formatTime(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Convert timestamp to relative time
export const timeAgo = (timestamp: number): string => {
  const now = new Date();
  const secondsPast = Math.floor(now.getTime() / 1000 - timestamp);

  if (secondsPast < 60) {
    return `${secondsPast}s`;
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)}m`;
  }
  if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)}h`;
  }
  if (secondsPast < 2592000) {
    return `${Math.floor(secondsPast / 86400)}d`;
  }
  if (secondsPast < 31536000) {
    return `${Math.floor(secondsPast / 2592000)}mo`;
  }
  return `${Math.floor(secondsPast / 31536000)}y`;
};
