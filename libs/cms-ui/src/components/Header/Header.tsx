import React from 'react';
import { Auth, AuthProps } from './Auth/Auth';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';
import { Breadcrumb } from './Header.models';
import classes from './Header.scss';

export interface HeaderProps {
  crumbs: Breadcrumb[];
  auth: AuthProps;
}

/**
 * Displays user
 * @example
 * <Header
 *  crumbs={[{label: 'Movies', url: '/movies', params: []}]}
 *  auth={ userName: 'User Name', logout: () => null }>
 *  <div>CHILD ELEMENTS</div>
 * </Header>
 */
export const Header: React.FC<HeaderProps> = ({ crumbs, auth, children }) => {
  return (
    <div className={classes.container}>
      <Breadcrumbs crumbs={crumbs} />
      {children}
      <Auth {...auth} />
    </div>
  );
};
