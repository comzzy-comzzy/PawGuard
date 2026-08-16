/**
 * Time and Date formatting utilities for PawGuard
 */

/**
 * Returns a human-friendly relative time string (e.g., "Just now", "4 mins ago", "2 hours ago", "Yesterday")
 */
export const getRelativeTime = (timestamp?: string | number | Date | null): string => {
  if (!timestamp) return 'Just now';

  let date: Date;
  if (typeof timestamp === 'number') {
    date = new Date(timestamp);
  } else if (typeof timestamp === 'string') {
    // If it is already a legacy string like "Just now" or "Recent"
    if (timestamp === 'Just now' || timestamp === 'Recent' || timestamp === 'Recently') {
      return timestamp;
    }
    const parsed = Date.parse(timestamp);
    if (isNaN(parsed)) {
      return timestamp;
    }
    date = new Date(parsed);
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    return 'Just now';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 0) {
    return 'Just now';
  }

  if (diffInSeconds < 45) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes === 1) {
    return '1 min ago';
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) {
    return '1 hour ago';
  }
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'Yesterday';
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) {
    return '1 week ago';
  }
  if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  }

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};

/**
 * Returns a full detailed date and time string (e.g. "Aug 16, 2026, 10:54 AM")
 */
export const formatExactDateTime = (timestamp?: string | number | Date | null): string => {
  if (!timestamp) return new Date().toLocaleString();

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
    return new Date().toLocaleString();
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

/**
 * Returns a composite label showing relative time with exact time in tooltip/subtitle
 * e.g., "5 mins ago (10:54 AM)"
 */
export const formatTimeWithRelative = (timestamp?: string | number | Date | null): string => {
  const relative = getRelativeTime(timestamp);
  const exact = formatExactDateTime(timestamp);
  if (relative === 'Just now') {
    return 'Just now';
  }
  return `${relative} • ${exact}`;
};
