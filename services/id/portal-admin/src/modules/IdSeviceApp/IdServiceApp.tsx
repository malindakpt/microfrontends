import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Header } from '../components/Header/Header';
import { Breadcrumb } from '@ax/cms-ui';
import { Switch, useLocation, Route, BrowserRouter } from 'react-router-dom';
import classes from './IdServiceApp.module.scss';
import { Routes as routes } from '../routes';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../apolloClient';
import { getCookie } from '../../util/helper';
import { SignIn } from 'modules/components/SiginIn/SignIn';
import { NotFoundStation } from 'modules/components/NotFoundStation/NotFoundStation';
import { ErrorBoundary } from 'modules/components/ErrorBoundary/ErrorBoundary';
import { StationRoot } from 'modules/components/StationRoot/StationRoot';
import { useAppStateIDS } from 'AppStateIDS';
import { Slide } from 'modules/components/Slide/Slide';

export const IdServiceApp: React.FC = () => {
  const { updateAppStateIDS, isLoggedIn } = useAppStateIDS();
  const { breadcrumbs } = useAppStateIDS();

  useEffect(() => {
    const token = getCookie('token');
    // TODO Remove: Reading auth info from cookies until backend support is provided
    updateAppStateIDS({
      accessToken: token,
      tenantName: getCookie('tenantName'),
      tenantAdminName: getCookie('tenantAdminName'),
      isLoggedIn: token !== '',
    });
  }, [updateAppStateIDS]);

  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient()}>
        <div className={clsx(classes.container)}>
          {isLoggedIn && <Header />}
          <div className={classes.main}>
            <SwitchWithTransition breadcrumbs={breadcrumbs}>
              {routes?.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  render={renderComponent(
                    getCookie('token') !== '' &&
                      getCookie('requirePasswordChange') !== 'true'
                      ? route.component
                      : SignIn,
                  )}
                  exact
                />
              ))}
              <Route render={renderComponent(NotFoundStation)} />
            </SwitchWithTransition>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
};

const SwitchWithTransition: React.FC<{ breadcrumbs: Breadcrumb[] }> = ({
  breadcrumbs,
  children,
}) => {
  const location = useLocation();

  return (
    <Slide breadcrumbs={breadcrumbs}>
      <Switch location={location}>{children}</Switch>
    </Slide>
  );
};

const renderComponent = (Component: React.FC): (() => JSX.Element) => {
  const renderFn = (): JSX.Element => (
    <StationRoot>
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </StationRoot>
  );
  return renderFn;
};
