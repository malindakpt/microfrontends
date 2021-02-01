import { Ono } from 'ono';

export const startupError = new Ono(Error, {
  concatMessages: false,
});
