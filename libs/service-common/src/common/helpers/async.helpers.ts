/**
 * Pauses execution for provided amount of milliseconds
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise(res => setTimeout(res, ms));
