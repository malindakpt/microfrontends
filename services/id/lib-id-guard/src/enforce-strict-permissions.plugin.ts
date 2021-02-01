import { Plugin } from 'graphile-build';

import { getMappedEndpoints, LogType } from './common';
import { removeProperties } from './common/object.helpers';

export const EnforceStrictPermissionsPlugin: Plugin = (
  builder,
  // eslint-disable-next-line no-console
  { permissionMappings, logger = log => console.warn(log) } = {},
) => {
  const mappedEndpoints = getMappedEndpoints(permissionMappings).concat(
    'query',
  );
  builder.hook('GraphQLObjectType:fields', (fields, _, { Self }) => {
    if (Self.name !== 'Query' && Self.name !== 'Mutation') {
      return fields;
    }

    const allEndpoints = Object.keys(fields);

    const missingEndpoints = allEndpoints.filter(
      endpoint => !mappedEndpoints.includes(endpoint),
    );

    if (missingEndpoints.length) {
      logger(
        {
          message: `Number of disabled ${Self.name} endpoints: ${missingEndpoints.length}`,
          endpoints: missingEndpoints,
        },
        LogType.StrictPermissionWarning,
      );
    }

    return removeProperties(fields, missingEndpoints);
  });
};
