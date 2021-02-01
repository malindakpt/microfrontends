export interface IAuthenticatedUser {
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
  name: string;
  permissions: {
    [key: string]: string[];
  };
  tags?: string[];
  [key: string]: any;
}
