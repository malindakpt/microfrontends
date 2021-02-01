import React from 'react';
import { Layout } from './Layout/Layout';
import { Providers } from './Providers/Providers';

export interface RouteConfig {
  path: string;
  component: React.FC;
}

export interface AxinomCMSProps {
  homeComponent: React.FC;
  routes?: RouteConfig[];
  notFoundComponent?: React.FC;
}

/**
 * @deprecated This component is deprecated and will be removed in future versions.
 */
export const AxinomCMS: React.FC<AxinomCMSProps> = props => {
  return (
    <Providers>
      <Layout {...props}></Layout>
    </Providers>
  );
};
