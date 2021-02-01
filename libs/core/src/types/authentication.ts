export type User = {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  token: UserToken;
};

export type UserToken = {
  accessToken: string;
  expiresIn: number;
  permissions: { [serviceId: string]: string[] };
  tags: string[];
};
