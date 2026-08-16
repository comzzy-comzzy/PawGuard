/**
 * Time and Date formatting utilities for PawGuard
 * Pure timestamp formatting function that NEVER mutates or creates moving times.
 */

export const formatAdminTime = (timestamp?: string | number | Date | null): string => {
  if (!timestamp) return 'No Date Recorded';

  let date: Date;
  if (typeof timestamp === 'number') {
    date = new Date(timestamp);
  } else if (typeof timestamp === 'string') {
    if (timestamp === 'Just now' || timestamp === 'Recent' || timestamp === 'Recently') {
      return 'Recorded Submission';
    }
    const parsed = Date.parse(timestamp);
    if (isNaN(parsed)) {
      return timestamp;
    }
    date = new Date(parsed);
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    return 'No Date Recorded';
  }

  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
