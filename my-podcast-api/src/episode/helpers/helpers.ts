export const parseDuration = (duration: string): number => {
  if (!duration) return 0;

  //handle formats "HH:MM:SS" or "MM:SS"
  const parts = duration.split(':').map((part) => parseInt(part, 10));

  if (parts.some(isNaN)) return 0;

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }

  return parts[0];
};
