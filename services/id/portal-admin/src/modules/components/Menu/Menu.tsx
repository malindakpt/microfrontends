import React, { useState } from 'react';
import classes from './Menu.module.scss';
import arrowIcon from '../../../images/ArrowMenu.svg';
import { useHistory } from 'react-router-dom';
import { useAppStateIDS } from 'AppStateIDS';
import clsx from 'clsx';

enum AuthActionType {
  ChangePassword = 'Change Password',
  Logout = 'Logout',
}

export const Menu: React.FC = () => {
  const { updateAppStateIDS, tenantAdminName, tenantName } = useAppStateIDS();
  const history = useHistory();
  const [menuVisibility, setMenuVisbility] = useState(false);

  const handleActionClick = (action: string): void => {
    setMenuVisbility(false);
    switch (action) {
      case AuthActionType.ChangePassword:
        history.push('/changePassword');
        break;
      case AuthActionType.Logout:
        updateAppStateIDS({
          tenantAdminName: '',
          tenantId: '',
          tenantName: '',
          isLoggedIn: false,
        });
        document.cookie = 'token=';
        document.cookie = 'tenantName=';
        document.cookie = 'tenantAdminName=';
        history.push('/');
        break;
    }
  };
  const authActionsList = [
    AuthActionType.ChangePassword,
    AuthActionType.Logout,
  ];

  return (
    <>
      <div className={classes.container}>
        <div className={classes.tenantInfo}>
          <div
            className={classes.tenantName}
            onClick={() => {
              setMenuVisbility(!menuVisibility);
            }}
          >
            {tenantName} - {tenantAdminName}
            <img alt="" src={arrowIcon} />
          </div>
        </div>
        <div
          className={clsx(
            menuVisibility ? [classes.expanded] : [classes.collapsed],
          )}
        >
          {authActionsList.map(item => (
            <span
              className={classes.menuItem}
              key={item}
              onClick={() => handleActionClick(item)}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
