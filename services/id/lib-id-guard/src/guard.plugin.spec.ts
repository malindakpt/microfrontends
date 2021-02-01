import {
  buildSchema,
  MutationPayloadQueryPlugin,
  MutationPlugin,
  QueryPlugin,
  StandardTypesPlugin,
} from 'graphile-build';
import { gql, makeExtendSchemaPlugin } from 'graphile-utils';
import { graphql, GraphQLSchema } from 'graphql';

import { ErrorCode, ErrorMessage } from './common';
import { AxGuardPlugin } from './guard.plugin';

const request = ' { echo(message: "Hello") } ';

const makeSchemaWithSpyAndPlugins = async (
  spy,
  options = {},
): Promise<GraphQLSchema> =>
  buildSchema(
    [
      StandardTypesPlugin,
      QueryPlugin,
      MutationPlugin,
      MutationPayloadQueryPlugin,
      makeExtendSchemaPlugin(() => ({
        typeDefs: gql`
          extend type Query {
            echo(message: String!): String
          }
        `,
        resolvers: {
          Query: {
            echo: spy,
          },
        },
      })),
      AxGuardPlugin,
    ],
    {
      optionKey: 'optionValue',
      serviceId: 'test-service',
      permissionMappings: { ANONYMOUS: [] },
      ...options,
    },
  );

const makeEchoSpy = () =>
  jest.fn((parent, args) => {
    return args.message;
  });

describe('AxGuardPlugin', () => {
  it('No user without originalError -> error from context', async () => {
    // Arrange
    const spy = makeEchoSpy();
    const schema = await makeSchemaWithSpyAndPlugins(spy);
    const jwtContext = {
      authErrorInfo: {
        code: ErrorCode.AccessTokenRequired,
        message: ErrorMessage.AccessTokenRequired,
      },
      user: null,
    };

    // Act
    const result = await graphql(schema, request, null, jwtContext);

    // Assert
    expect(result.data.echo).toBe(null);
    expect(spy).toHaveBeenCalledTimes(0);
    expect(result.errors.length).toBe(1);

    const error = result.errors[0].originalError as any;
    expect(error.message).toBe(ErrorMessage.AccessTokenRequired);
    expect(error.code).toBe(ErrorCode.AccessTokenRequired);
    expect(error.details).toBeFalsy();
  });

  it('No user with originalError -> original error message is included in stack trace', async () => {
    // Arrange
    const spy = makeEchoSpy();
    const schema = await makeSchemaWithSpyAndPlugins(spy);
    const originalErrorMessage =
      'Custom error caused authentication to fail and user to be null';
    const jwtContext = {
      authErrorInfo: {
        code: ErrorCode.AccessTokenInvalid,
        message: ErrorMessage.AccessTokenInvalid,
        originalError: new Error(originalErrorMessage),
      },
      user: null,
    };

    // Act
    const result = await graphql(schema, request, null, jwtContext);

    // Assert
    expect(result.data.echo).toBe(null);
    expect(spy).toHaveBeenCalledTimes(0);
    expect(result.errors.length).toBe(1);

    const error = result.errors[0].originalError as any;
    expect(error.message).toBe(ErrorMessage.AccessTokenInvalid);
    expect(error.code).toBe(ErrorCode.AccessTokenInvalid);
    expect(error.stack).toContain(ErrorMessage.AccessTokenInvalid);
    expect(error.stack).toContain(originalErrorMessage);
    expect(error.details).toBeFalsy();
  });

  it('Not Authorized by service -> error', async () => {
    // Arrange
    const spy = makeEchoSpy();
    const schema = await makeSchemaWithSpyAndPlugins(spy, {
      serviceId: 'test-service',
      permissionMappings: { ANONYMOUS: [], Administrator: ['echo'] },
    });
    const jwtContext = {
      user: {
        sub: 'test-user',
        permissions: { 'another-test-service': ['Administrator'] },
      },
    };

    // Act
    const result = await graphql(schema, request, null, jwtContext);

    // Assert
    expect(result.data.echo).toBe(null);
    expect(spy).toHaveBeenCalledTimes(0);
    expect(result.errors.length).toBe(1);

    const error = result.errors[0].originalError as any;
    expect(error.message).toBe(ErrorMessage.UserNotAuthorized);
    expect(error.code).toBe(ErrorCode.UserNotAuthorized);
    expect(Object.keys(error.details).length).toBe(2);
    expect(error.details.user).toBe('test-user');
    expect(error.details.serviceId).toBe('test-service');
  });

  it('Not Authorized by privilege -> error', async () => {
    // Arrange
    const spy = makeEchoSpy();
    const schema = await makeSchemaWithSpyAndPlugins(spy, {
      serviceId: 'test-service',
      permissionMappings: {
        ANONYMOUS: [],
        Editor: ['otherEndpoint'],
        Visitor: ['echo', 'otherEndpoint'],
      },
    });
    const jwtContext = {
      user: {
        sub: 'test-user',
        permissions: { 'test-service': ['Editor'] },
      },
    };

    // Act
    const result = await graphql(schema, request, null, jwtContext);

    // Assert
    expect(result.data.echo).toBe(null);
    expect(spy).toHaveBeenCalledTimes(0);
    expect(result.errors.length).toBe(1);

    const error = result.errors[0].originalError as any;
    expect(error.message).toBe(ErrorMessage.UserNotAuthorized);
    expect(error.code).toBe(ErrorCode.UserNotAuthorized);
    expect(Object.keys(error.details).length).toBe(2);
    expect(error.details.user).toBe('test-user');
    expect(error.details.serviceId).toBe('test-service');
  });

  it('Anonymous endpoint -> no error', async () => {
    // Arrange
    const spy = makeEchoSpy();
    const schema = await makeSchemaWithSpyAndPlugins(spy, {
      serviceId: 'test-service',
      permissionMappings: {
        ANONYMOUS: ['echo'],
      },
    });
    const jwtContext = {
      user: {
        sub: 'test-user',
        permissions: {},
      },
    };

    // Act
    const result = await graphql(schema, request, null, jwtContext);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.errors).toBeFalsy();
    expect(result.data.echo).toBe('Hello');
  });

  it('Authorized user -> no error', async () => {
    // Arrange
    const spy = makeEchoSpy();
    const schema = await makeSchemaWithSpyAndPlugins(spy, {
      serviceId: 'test-service',
      permissionMappings: {
        ANONYMOUS: [],
        Editor: ['otherEndpoint', 'echo'],
      },
    });
    const jwtContext = {
      user: {
        sub: 'test-user',
        permissions: { 'test-service': ['Editor'] },
      },
    };

    // Act
    const result = await graphql(schema, request, null, jwtContext);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.errors).toBeFalsy();
    expect(result.data.echo).toBe('Hello');
  });
});
