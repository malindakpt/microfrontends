/**
 * This method only targets strings.
 * objects and arrays, even if empty, are considered as not null or whitespace
 */
export const isNullOrWhitespace = (str: string): boolean => {
  return (
    str === null ||
    str === undefined ||
    (typeof str === 'string' && str.trim().length === 0)
  );
};
