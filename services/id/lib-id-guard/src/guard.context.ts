import { Request } from 'express';

import { IAuthenticationRequestContext } from './common';

export const getAuthenticationContext = (
  req: Request,
): IAuthenticationRequestContext => {
  return req as IAuthenticationRequestContext;
};
