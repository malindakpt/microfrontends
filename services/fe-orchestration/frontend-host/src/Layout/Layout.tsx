import React, { useEffect, useState } from 'react';
import { LayoutProps, PiralError, PiralRoutes } from 'piral-core';
import { useIdentityService, User } from '@ax/id-link';
import { Header, Breadcrumb } from '@ax/cms-ui';

import classNames from './Layout.module.scss';

import { useBreadcrumb } from '../hooks/useBreadcrumb';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { Slide } from '../components/Slide';

export interface AnimatedRouteProps {
  breadcrumbs: Breadcrumb[];
}

//TODO: Error boundary needs to be added.

//TODO: Simple NotFound component in place. This needs a proper component or station.
const NotFound: React.FC<RouteComponentProps> = props => (
  <PiralError type="not_found" {...props} />
);

const AnimatedRoutes: React.FC<AnimatedRouteProps> = ({ breadcrumbs }) => {
  const location = useLocation();

  return (
    <Slide breadcrumbs={breadcrumbs}>
      <PiralRoutes location={location} NotFound={NotFound} />
    </Slide>
  );
};

export const Layout: React.FC<LayoutProps> = () => {
  const { getToken, logoutUser } = useIdentityService();
  const bc = useBreadcrumb();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setUser(token.user);
    })();
  }, [getToken]);

  return (
    <>
      <div className={classNames.root}>
        <header className={classNames.header}>
          <Header
            crumbs={bc}
            auth={{
              user: user,
              logout: logoutUser,
            }}
          />
        </header>
        <main className={classNames.main}>
          <AnimatedRoutes breadcrumbs={bc} />
        </main>
      </div>
    </>
  );
};
