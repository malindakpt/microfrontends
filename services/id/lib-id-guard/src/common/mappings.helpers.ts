import { IEndpointsToPermissionMappings } from './endpoints-to-permission-mappings.interface';

export const getPermissionsForEndpoint = (
  endpoint: string,
  mappings: IEndpointsToPermissionMappings,
): string[] => {
  return Object.keys(mappings).filter(key => mappings[key].includes(endpoint));
};

export const getMappedEndpoints = (
  mappings: IEndpointsToPermissionMappings,
): string[] => {
  const mappedEndpointArrays = Object.keys(mappings).map(key => mappings[key]);
  return [...new Set([].concat(...mappedEndpointArrays))];
};
