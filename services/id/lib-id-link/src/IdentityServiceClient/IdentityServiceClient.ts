import {
  IdentityProvider,
  IdentityProviderInfo,
  IdentityServiceConfig,
  ConfigStatusResponse,
  LogoutResponse,
  LogoutResponseCode,
  TokenResponse,
  ConfigStatusResponseCode,
} from '@ax/id-link-utils';

export type IdServiceConfiguration =
  | {
      status: ConfigStatusResponseCode.SUCCESS;
      providers: IdentityProviderInfo[];
    }
  | {
      status:
        | ConfigStatusResponseCode.ERROR
        | ConfigStatusResponseCode.MISCONFIGURATION;
    };

export interface IdentityServiceClient {
  getConfiguration: () => Promise<IdServiceConfiguration>;
  getToken: () => Promise<TokenResponse>;
  logoutUser: () => Promise<boolean>;
  getIdpAuthUrl: (idpId: IdentityProvider, originUrl: string) => string;
  addTokenChangedHandler: (callback: TokenChangedCallback) => void;
  removeTokenChangedHandler: (callback: TokenChangedCallback) => void;
}

export type TokenChangedCallback = (token: TokenResponse | null) => void;

/**
 * Creates a configuration service client. For performance reasons there should only be a single client instance created by an application
 * @param config The configuration values for the identity service that should be used.
 */
export const createIdentityServiceClient = (
  config: IdentityServiceConfig,
): IdentityServiceClient => {
  const token = (() => {
    let _response: TokenResponse | null = null;

    return {
      set response(value: TokenResponse | null) {
        _response = value;
        if (value !== null) {
          // In case the token is just nulled (e.g. by the setTimeout that clears the token once it's about to expire)
          // we won't emit the token changed event. So the user will not be considered logged out.
          emitTokenChanged(value);
        }
      },
      get response() {
        return _response;
      },
    };
  })();

  let tokenChangedHandlers: TokenChangedCallback[] = [];

  async function invokeIdentityServiceMethod<T = any>(
    method: string,
  ): Promise<T> {
    const idServiceTokenUrl = `${config.idServiceAuthEndpointUrl}/${config.tenantId}/${config.applicationId}/${method}`;

    return (
      await fetch(idServiceTokenUrl, {
        cache: 'no-cache',
        credentials: 'include',
        redirect: 'follow',
        referrerPolicy: 'origin',
      })
    ).json() as Promise<T>;
  }

  const emitTokenChanged = (token: TokenResponse | null): void => {
    tokenChangedHandlers.forEach(h => h(token));
  };

  const loadTokenFromService = async () => {
    token.response = await invokeIdentityServiceMethod<TokenResponse>('token');

    if (token.response.user) {
      setTimeout(async () => {
        // Clear tokenResponse if the token expires, so the next call will retrieve a new one.
        token.response = null;
      }, (token.response.user.token.expiresIn - 60) * 1000);
    }
    return token.response;
  };
  let tokenLoadingPromise: Promise<TokenResponse> | null = null;

  return {
    /**
     * Adds an event handler that will be raised whenever a new token response is loaded from the backend.
     *
     * Please note, that it is not recommended to remember the token for later use. When in need of a token,
     * please use the `getToken` method, which will make sure that a valid token is returned.
     */
    addTokenChangedHandler(callback: TokenChangedCallback) {
      tokenChangedHandlers.push(callback);
    },

    /**
     * Removes an event handler for the TokenChanged event.
     */
    removeTokenChangedHandler(callback: TokenChangedCallback) {
      tokenChangedHandlers = tokenChangedHandlers.filter(c => c !== callback);
    },

    /**
     * Loads the configuration data from the service.
     */
    async getConfiguration(): Promise<IdServiceConfiguration> {
      const configStatusResponse = await invokeIdentityServiceMethod<
        ConfigStatusResponse
      >('id-config-status');

      if (configStatusResponse.code === ConfigStatusResponseCode.SUCCESS) {
        const rawProviders = [
          {
            idpId: IdentityProvider.GOOGLE,
            title: 'Google',
            icon: '',
            enabled: false,
          },
          {
            idpId: IdentityProvider.AZURE_AD,
            title: 'Azure AD',
            icon: '',
            enabled: false,
          },
          {
            idpId: IdentityProvider.AX_AUTH,
            title: 'AxAuth',
            icon: '',
            enabled: false,
          },
        ];

        const providers = rawProviders.map(idpInfo => {
          idpInfo.enabled = configStatusResponse.enabledIdentityProviders.includes(
            idpInfo.idpId,
          );
          return idpInfo;
        });

        return { status: configStatusResponse.code, providers };
      } else {
        return { status: configStatusResponse.code };
      }
    },

    /**
     * Returns a token.
     */
    async getToken() {
      if (token.response) {
        // we already have a (still) valid token
        return Promise.resolve(token.response);
      }

      if (tokenLoadingPromise === null) {
        // if no request for a new token is currently running, we create a new one
        tokenLoadingPromise = loadTokenFromService().then(response => {
          tokenLoadingPromise = null;
          return response;
        });
      }
      // returning the loading promise
      return tokenLoadingPromise;
    },

    /**
     * Logs out the user.
     */
    async logoutUser() {
      // TODO: Handle autoNavigation on login redirect and clear on logout
      // sessionStorage.removeItem('lastProtectedRoute');
      // sessionStorage.removeItem('autoNavigateOnRedirect');

      token.response = null;
      // We want the user to be considered logged out, so we throw emit the TokenChanged here using 'null'.
      emitTokenChanged(null);

      const logoutResult = await invokeIdentityServiceMethod<LogoutResponse>(
        'logout',
      );

      if (logoutResult && logoutResult.code === LogoutResponseCode.SUCCESS) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * Returns the authentication url of the given identity provider. To start the sign in, the application should open/forward to that url.
     */
    // Function to be used with onClick event for idp-buttons
    getIdpAuthUrl(idpId: IdentityProvider, originUrl: string) {
      const { idServiceAuthEndpointUrl, tenantId, applicationId } = config;

      const idpName = IdentityProvider[idpId];

      return `${idServiceAuthEndpointUrl}/${tenantId}/${applicationId}/auth?providerId=${idpName}&originUrl=${originUrl}`;
    },
  };
};
