import { Ono } from 'ono';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const startupError: any = new Ono(Error, {
  concatMessages: false,
});
