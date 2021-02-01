import { IEndpointsToPermissionMappings } from '@ax/id-guard';
import { Endpoints as EP } from './endpoints';

export const EndpointsToPermissionMappings: IEndpointsToPermissionMappings = {
  //TODO: This is a temporary measure to disable authentication. Shall be modified when connection to id-service is established
  ANONYMOUS: Object.keys(EP),
};
