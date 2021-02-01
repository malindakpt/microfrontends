/**
 * This method only targets strings.
 * objects and arrays, even if empty, are considered as not null or whitespace.
 */
export const isNullOrWhitespace = (str: unknown): boolean => {
  return (
    str === null ||
    str === undefined ||
    (typeof str === 'string' && str.trim().length === 0)
  );
};

/**
 * Takes an URL string, trims `/` character at the end, splits result by `/` character and returns the last element of resulting array.
 */
export const popUrlSegment = (url: string): string => {
  return url
    .replace(/\/+$/g, '')
    .split('/')
    .pop();
};

/**
 * Takes a duration string in format 'HH:MM:SS' and converts it to seconds.
 * Milliseconds component is ignored.
 * Returns 0 if input string is incorrect
 */
export const durationToSeconds = (duration: string): number => {
  const result = 0;

  if (!duration) return result;

  const parts = duration.split(':').map(part => parseInt(part, 10));

  if (parts.length < 3) return result;

  return parts[0] * 60 * 60 + parts[1] * 60 + parts[2];
};
