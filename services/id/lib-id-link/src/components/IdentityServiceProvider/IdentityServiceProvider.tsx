import * as React from 'react';
import { useContext } from 'react';
import { IdentityServiceClient } from '../../IdentityServiceClient/IdentityServiceClient';

export const IdentityServiceContext = React.createContext<IdentityServiceClient | null>(
  null,
);

export interface IdentityServiceProviderProps {
  /**
   * The  Identity Service Client that should be provided.
   */
  client: IdentityServiceClient;
}
/**
 * Provides the Identity Service Client that can be retrieved using the `useIdentityService` hook.
 */
export const IdentityServiceProvider: React.FC<IdentityServiceProviderProps> = ({
  children,
  client,
}) => {
  return (
    <IdentityServiceContext.Provider value={{ ...client }}>
      {children}
    </IdentityServiceContext.Provider>
  );
};

/**
 * Retrieves the Identity Service Client
 */
export const useIdentityService = (): IdentityServiceClient => {
  const context = useContext(IdentityServiceContext);

  if (!context) {
    throw new Error(
      'to use `useIdentityService` your component must be located within an <IdentityServiceProvider/>',
    );
  }

  return context;
};
