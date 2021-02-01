import { IncomingMessage } from 'http';

import { IAuthenticatedUser } from './authenticated-user.interface';
import { AxGuardErrorInfo } from './guard.error';

export interface IAuthenticationRequestContext extends IncomingMessage {
  user?: IAuthenticatedUser;
  authErrorInfo?: AxGuardErrorInfo;
}
