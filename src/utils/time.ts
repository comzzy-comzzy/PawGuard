/**
 * Time and Date formatting utilities for PawGuard
 * Always outputs the real calendar date and clock time (e.g., "Aug 16, 2026, 10:59 AM")
 * Never displays "Just now".
 */

export const formatAdminTime = (timestamp?: string | number | Date | null): string => {
  if (!timestamp || timestamp === 'Just now' || timestamp === 'Recent' || timestamp === 'Recently') {
    return new Date().toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  let date: Date;
  if (typeof timestamp === 'number') {
    date = new Date(timestamp);
  } else if (typeof timestamp === 'string') {
    const parsed = Date.parse(timestamp);
    if (isNaN(parsed)) {
      return timestamp;
    }
    date = new Date(parsed);
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    date = new Date();
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
