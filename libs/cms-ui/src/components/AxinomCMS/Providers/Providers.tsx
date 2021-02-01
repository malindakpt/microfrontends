import React from 'react';
import { AppStateProvider } from './AppState/AppState';

/**
 * @deprecated This component is deprecated and will be removed in future versions.
 */
export const Providers: React.FC = ({ children }) => {
  return <AppStateProvider>{children}</AppStateProvider>;
};
