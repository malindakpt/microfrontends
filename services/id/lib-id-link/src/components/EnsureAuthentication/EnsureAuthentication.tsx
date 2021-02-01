import React, { ReactElement, useEffect, useState } from 'react';
import {
  ConfigStatusResponseCode,
  TokenResponseCode,
  TokenResponse,
} from '@ax/id-link-utils';
import { useIdentityService } from '../IdentityServiceProvider/IdentityServiceProvider';
import { ConfigurationInvalidError } from '../ConfigurationInvalidError/ConfigurationInvalidError';
import { AccountInactiveError } from '../AccountInactiveError/AccountInactiveError';
import { Login, BrandingOptions } from '../Login/Login';
import { IdServiceConfiguration } from '../../IdentityServiceClient/IdentityServiceClient';

export interface EnsureAuthenticationProps {
  brandingOptions?: BrandingOptions;
}
/**
 * Ensures that the user is authenticated with a valid account.
 * If not, the login form or an error is shown.
 *
 * The content passed as children will be rendered only if authentication is successful.
 * @props brandingOptions: Includes companyLogo: image, background: colorCode|image to customize the login view
 */
export const EnsureAuthentication: React.FC<EnsureAuthenticationProps> = ({
  children,
  brandingOptions,
}) => {
  const {
    getToken,
    getConfiguration,
    addTokenChangedHandler,
  } = useIdentityService();

  const [loading, setLoading] = useState(true);

  const [
    configuration,
    setConfiguration,
  ] = useState<IdServiceConfiguration | null>();

  const [tokenResponse, setTokenResponse] = useState<TokenResponse | null>(
    null,
  );

  useEffect(() => {
    const initialize = async () => {
      addTokenChangedHandler(token => {
        // React on token changes (e.g. logout)
        setTokenResponse(token);
      });
      try {
        setConfiguration(await getConfiguration());
        setTokenResponse(await getToken());
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [addTokenChangedHandler, getConfiguration, getToken]);

  let content: ReactElement;

  if (loading) {
    content = <>Loading...</>;
  } else if (
    configuration?.status !== ConfigStatusResponseCode.SUCCESS ||
    (configuration?.status === ConfigStatusResponseCode.SUCCESS &&
      !configuration?.providers.find(i => i.enabled))
  ) {
    content = <ConfigurationInvalidError />;
  } else if (tokenResponse?.code === TokenResponseCode.ACCOUNT_NOT_ACTIVE) {
    content = <AccountInactiveError />;
  } else if (!tokenResponse?.user) {
    content = (
      <Login
        providers={configuration.providers}
        brandingOptions={brandingOptions}
      />
    );
  } else {
    content = <>{children}</>;
  }
  return content;
};
