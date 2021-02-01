import { GraphQLErrorExtended } from 'postgraphile';

export declare type GraphQLErrorEnhanced = GraphQLErrorExtended & {
  timestamp: string;
  code: string;
  details: { [key: string]: any };
};
