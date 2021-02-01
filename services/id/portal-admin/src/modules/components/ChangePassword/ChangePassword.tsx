import React from 'react';
import { useChangeTenantAdminPasswordMutation } from '../../../generated/graphql';
import { useApolloClient } from '@apollo/react-hooks';
import { useState, useEffect } from 'react';
import { extractErrorString } from '../../../util/helper';
import classes from './ChangePassword.module.scss';
import { useHistory } from 'react-router-dom';
import logo from '../../../images/AxinomLogo.png';
import arrow from '../../../images/ArrowRight.svg';
import { useAppStateIDS } from '../../../AppStateIDS';
import clsx from 'clsx';

export interface Props {
  isFirstTime?: boolean;
  currentPwd?: string;
}
export const ChangePassword: React.FC<Props> = ({
  isFirstTime,
  currentPwd,
}) => {
  const apolloClient = useApolloClient();
  const history = useHistory();
  useUpdateBreadcrumb();
  const appState = useAppStateIDS();
  const { updateAppStateIDS } = useAppStateIDS();
  const [changePwd] = useChangeTenantAdminPasswordMutation({
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });
  const [error, setError] = React.useState('');
  const [password, setPassword] = useState(currentPwd || '');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [busy, setBusy] = useState(false);

  const validatePasswords = (): boolean => {
    if (newPassword !== newPassword2) {
      setError('Confirmation password should match with the password');
      return false;
    }
    if (newPassword.length < 10) {
      setError('Password length should be more than 10');
      return false;
    }
    const hasUpperCase = Number(/[A-Z]/.test(newPassword));
    const hasLowerCase = Number(/[a-z]/.test(newPassword));
    const hasNumbers = Number(/\d/.test(newPassword));
    const hasNonalphas = Number(/\W/.test(newPassword));

    if (hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas < 3) {
      setError('Password must satisfy atleast 3 conditions from above');
      return false;
    }
    return true;
  };

  const handleChangePassword = async (): Promise<void> => {
    if (busy) {
      return;
    }

    setError('');

    if (isFirstTime) {
      setPassword(currentPwd as string);
    }

    if (!validatePasswords()) {
      return;
    }

    try {
      setBusy(true);
      const res = await changePwd({
        variables: {
          dto: {
            password: isFirstTime ? (currentPwd as string) : password,
            newPassword,
          },
        },
      });
      setBusy(false);

      const authResponse = res.data?.changeTenantAdminPassword;
      if (authResponse) {
        if (isFirstTime) {
          // let SignIn component to update cookies
          document.cookie = `requirePasswordChange=; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
          updateAppStateIDS({
            isLoggedIn: true,
          });
          history.push('/');
        } else {
          history.goBack();
        }
      } else {
        setError('Unexpected error occured while login');
      }
    } catch (err) {
      setBusy(false);
      setError(extractErrorString(err));
    }
  };

  return (
    <form className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.logo}>
          <img src={logo} alt="Axinom Logo" />
        </div>
        <div className={classes.box}>
          <div className={classes.login}>New Password</div>
          {isFirstTime && (
            <div className={classes.subText}>
              Welcome {appState.tenantAdminName}. Please set a new password to
              proceed
            </div>
          )}
          <div className={classes.subText}>Password policy</div>

          <div className={classes.policy}>
            <div>- Atleast 10 characters long</div>
            <div>
              - Password must contain atleast 10 characters from three of the
              following categories
            </div>
            <div className={classes.conditions}>Uppercase letters</div>
            <div className={classes.conditions}>Lowercase letters</div>
            <div className={classes.conditions}>Digits</div>
            <div className={classes.conditions}>
              Non-alphanumeric characters
            </div>
          </div>
          <span>{error}</span>

          {!isFirstTime && (
            <input
              type="password"
              autoComplete="off"
              placeholder="Current Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          )}
          <input
            type="password"
            autoComplete="off"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            autoComplete="off"
            placeholder="New Password Confirmation"
            value={newPassword2}
            onChange={e => setNewPassword2(e.target.value)}
          />
          <div>
            <div
              className={clsx(classes.submit, { [classes.disabled]: busy })}
              onClick={handleChangePassword}
            >
              <div className={classes.text}>Confirm</div>
              <div className={classes.icon}>
                <img src={arrow} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

function useUpdateBreadcrumb(): void {
  const { updateAppStateIDS } = useAppStateIDS();

  useEffect(() => {
    updateAppStateIDS({
      breadcrumbs: [
        {
          label: 'Change Password',
          url: '/changePassword',
          params: [],
        },
      ],
    });
  }, [updateAppStateIDS]);
}
