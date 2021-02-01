/** Current Global State */
export const state: { [key: string]: { [key: string]: unknown } } = {};

/**
 * Stores an object globally
 * @param key Unique identifier
 * @param prop Name of the property to store
 * @param value Value to store
 */
export const storeState = <T>(key: string, prop: string, value: T): void => {
  state[key] = { ...(state[key] ?? {}), [prop]: value };
};

/**
 * @param key Identifier used to store the state
 * @param prop Name of the property to retrieve
 */
export const getState = <T>(key: string, prop: string): T => {
  return state[key]?.[prop] as T;
};
