import { GraphQLErrorExtended } from 'postgraphile';

export declare type GraphQLErrorEnhanced = GraphQLErrorExtended & {
  timestamp: string;
  code: string;
  status?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: { [key: string]: any };
};
