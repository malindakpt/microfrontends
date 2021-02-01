export const removeProperties = (obj: any, keysToRemove: string[]): any => {
  const result = { ...obj };
  for (const key of keysToRemove) {
    delete result[key];
  }
  return result;
};
