import clsx from 'clsx';
import { StationRoot } from 'components/AxinomCMS/Layout/StationRoot';
import { Breadcrumb, Header } from 'components/Header';
import { Slide } from 'components/Slide';
import React from 'react';
import {
  BrowserRouter as Router,
  Route as RouterRoute,
  Switch,
  useLocation,
} from 'react-router-dom';
import { AxinomCMSProps } from '../AxinomCMS';
import { useAppState } from '../Providers/AppState/AppState';
import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';
import css from './Layout.scss';
import { NotFoundStation } from './NotFoundStation/NotFoundStation';

/**
 * @deprecated This component is deprecated and will be removed in future versions.
 */
export const Layout: React.FC<AxinomCMSProps> = ({
  homeComponent,
  routes,
  notFoundComponent = NotFoundStation,
}) => {
  const appState = useAppState();

  return (
    <Router>
      <div className={clsx(css.container)}>
        <Header crumbs={appState.breadcrumbs} auth={appState.user} />
        <div>
          <SwitchWithTransition breadcrumbs={appState.breadcrumbs}>
            <RouterRoute path="/" exact render={render(homeComponent)} />
            {routes?.map(r => (
              <RouterRoute
                key={r.path}
                path={r.path}
                exact
                render={render(r.component)}
              />
            ))}
            <RouterRoute path="" render={render(notFoundComponent)} />
          </SwitchWithTransition>
        </div>
      </div>
    </Router>
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

const render = (Component: React.FC): (() => JSX.Element) => {
  // StationsRoot -> make animations work
  // ErrorBoundary -> catch errors
  // Component -> rendering the actual component
  const renderFn = (): JSX.Element => (
    <StationRoot>
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </StationRoot>
  );
  return renderFn;
};
