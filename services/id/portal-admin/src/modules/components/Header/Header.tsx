import React from 'react';
import classes from './Header.module.scss';
import { Menu } from '../Menu/Menu';
import { Breadcrumbs } from '@ax/cms-ui';
import { useAppStateIDS } from 'AppStateIDS';

/**
 * Displays user
 * @example
 * <Header
 *  crumbs={[{label: 'Movies', url: '/movies', params: []}]}
 *  user={ userName: 'User Name' }>
 *  <div>CHILD ELEMENTS</div>
 * </Header>
 */
export const Header: React.FC = () => {
  const { breadcrumbs } = useAppStateIDS();
  return (
    <div className={classes.container}>
      <Breadcrumbs crumbs={breadcrumbs} />
      <Menu />
    </div>
  );
};
