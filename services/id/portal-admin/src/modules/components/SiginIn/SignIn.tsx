import React from 'react';
import classes from './SignIn.module.scss';
import logo from '../../../images/AxinomLogo.png';
import arrow from '../../../images/ArrowRight.svg';
import { useApolloClient } from '@apollo/react-hooks';
import { extractErrorString } from '../../../util/helper';
import { useAuthenticateTenantAdminMutation } from '../../../generated/graphql';
import { useState, useEffect } from 'react';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import { useAppStateIDS } from '../../../AppStateIDS';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

interface TenantEntry {
  id: string;
  name: string;
}
export const SignIn: React.FC = () => {
  const apolloClient = useApolloClient();
  const TENANTS_STORE_KEY = 'TENANTS_STORE';

  const { updateAppStateIDS } = useAppStateIDS();
  const history = useHistory();
  const { tId } = useParams<{ tId: string }>();

  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [error, setError] = React.useState('');
  const [tenantId, setTenantId] = React.useState<string>(
    tId && tId.length > 20 ? tId : '',
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const [storedTenents, setStoredTenants] = useState<TenantEntry[]>([]);

  useEffect(() => {
    const storedTenants = JSON.parse(
      localStorage.getItem(TENANTS_STORE_KEY) || '[]',
    ) as TenantEntry[];
    setStoredTenants(storedTenants);
  }, []);

  const saveTenant = (newTenant: TenantEntry): void => {
    const tEntryIdx = storedTenents.findIndex(t => t.id === newTenant.id);
    if (tEntryIdx === -1) {
      const newTenants = [...storedTenents, newTenant];
      localStorage.setItem(TENANTS_STORE_KEY, JSON.stringify(newTenants));
      setStoredTenants(newTenants);
    }
  };

  const [loginUser] = useAuthenticateTenantAdminMutation({
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });

  const handleLogin = async (): Promise<void> => {
    setError('');
    setBusy(true);
    try {
      const res = await loginUser({
        variables: {
          input: {
            email,
            password,
            tenantId,
          },
        },
      });
      setBusy(false);
      const authResponse = res.data?.authenticateTenantAdmin;
      saveTenant({
        id: tenantId as string,
        name: authResponse?.tenantName as string,
      });

      const validity = authResponse?.expiresIn as number;
      const expiryInfo = `${new Date(
        new Date().getTime() + validity * 1000,
      ).toUTCString()}`;

      // TODO Fix: temporary, tenantName and adminName store as a cookie until backend supports refresh token
      document.cookie = `tenantName=${authResponse?.tenantName}; expires= ${expiryInfo}`;
      document.cookie = `tenantAdminName=${authResponse?.tenantAdminName}; expires= ${expiryInfo}`;
      document.cookie = `token=${authResponse?.accessToken}; expires= ${expiryInfo}`;
      document.cookie = `requirePasswordChange=${!authResponse?.passwordChanged}; expires= ${expiryInfo}`;

      updateAppStateIDS({
        isLoggedIn: authResponse?.passwordChanged as boolean,
        tenantAdminName: authResponse?.tenantAdminName,
        tenantName: authResponse?.tenantName,
        tenantId: tenantId,
        accessToken: authResponse?.accessToken,
      });

      if (authResponse?.passwordChanged) {
        history.push('/');
      } else {
        setShowChangePassword(true);
      }
    } catch (err) {
      setBusy(false);
      setError(extractErrorString(err));
    }
  };

  const handleClearSuggestions = (): void => {
    localStorage.removeItem(TENANTS_STORE_KEY);
    setStoredTenants([]);
    setShowSuggestions(false);
  };

  const handleTenantSelection = (tenantId: string): void => {
    setShowSuggestions(false);
    setTenantId(tenantId);
  };

  const [showSuggestions, setShowSuggestions] = useState(false);

  return showChangePassword ? (
    <ChangePassword isFirstTime={true} currentPwd={password} />
  ) : (
    <>
      <form className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.logo}>
            <img src={logo} alt="Axinom Logo" />
          </div>
          <div className={classes.box}>
            <div className={classes.login}>Login</div>
            <div className={classes.subText}>Please login to proceed</div>
            <span>{error}</span>
            <input
              type="text"
              placeholder="Tenant Id"
              value={tenantId}
              onChange={e => {
                setTenantId(e.target.value);
                setShowSuggestions(false);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() =>
                setTimeout(() => {
                  setShowSuggestions(false);
                }, 300)
              }
            />
            {showSuggestions && (
              <div className={classes.suggestions}>
                {storedTenents.map((ten, idx) => (
                  <div key={ten.id} className={classes.tenant}>
                    <div
                      className={classes.name}
                      onClick={() => handleTenantSelection(ten.id)}
                    >
                      {ten.name}
                    </div>
                    <div
                      className={classes.id}
                      onClick={() => handleTenantSelection(ten.id)}
                    >
                      {ten.id}
                    </div>
                    {idx === storedTenents.length - 1 && (
                      <div
                        className={classes.clear}
                        onClick={handleClearSuggestions}
                      >
                        clear
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
            <div>
              <div
                className={clsx(classes.submit, { [classes.disabled]: busy })}
                onClick={handleLogin}
              >
                <div className={classes.text}>Login</div>
                <div className={classes.icon}>
                  <img src={arrow} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
