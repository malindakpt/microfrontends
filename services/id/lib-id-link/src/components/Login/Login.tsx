import React from 'react';
import classes from './Login.module.scss';
import axinom from '../../resources/images/axauth_login.svg';
import azure from '../../resources/images/azure_login.svg';
import google from '../../resources/images/google_login.svg';
import axinomFullLogo from '../../resources/images/ax_logo_blue.svg';
import clsx from 'clsx';
import { useIdentityService } from 'components/IdentityServiceProvider/IdentityServiceProvider';
import { IdentityProvider, IdentityProviderInfo } from '@ax/id-link-utils';

const DEFAULT_BG_COLOR = `#01477D`;

const AUTH_LOGOS = {
  [IdentityProvider.AX_AUTH]: axinom,
  [IdentityProvider.AZURE_AD]: azure,
  [IdentityProvider.GOOGLE]: google,
};

const AUTH_BACKGROUNDS = {
  [IdentityProvider.AX_AUTH]: clsx(classes.ax, classes.tile),
  [IdentityProvider.AZURE_AD]: clsx(classes.azure, classes.tile),
  [IdentityProvider.GOOGLE]: clsx(classes.google, classes.tile),
};

export interface BrandingOptions {
  /**
   * Sets the company logo used in the Login dialog. The value must be a valid url or image resource variable.
   *
   * @example
   * companyLogo: 'http://company.com/logo.svg'
   *
   * @example
   * companyLogo: imageResourceVariable
   */
  companyLogo?: string;

  /**
   * Sets the background style for the Login dialog container. The value can either be a valid url, local image resource or a colour code.
   *
   * @example <caption>Background url (will cover entire area)</caption>
   * background: 'http://company.com/background-pattern.svg'
   *
   * @example <caption>Background image variable (will cover entire area)</caption>
   * background: imageResourceVariable
   *
   * @example <caption>Background colour</caption>
   * background: '#01477d'
   */
  background?: string;
}

export interface LoginProps {
  providers: IdentityProviderInfo[];
  brandingOptions?: BrandingOptions;
}

/**
 * Renders the login component
 */
export const Login: React.FC<LoginProps> = ({ providers, brandingOptions }) => {
  const { getIdpAuthUrl } = useIdentityService();
  const originUrl = window.location.href;
  const background = brandingOptions?.background ?? DEFAULT_BG_COLOR;

  const backgroundStyles = {
    background: background?.includes('/') ? `url(${background})` : background,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
  };

  return (
    <div className={classes.container} style={backgroundStyles}>
      <div className={classes.whiteBox}>
        <div className={classes.logo}>
          <img
            alt="Customer logo"
            src={brandingOptions?.companyLogo ?? axinomFullLogo}
          />
        </div>
        <div className={classes.header}>Login</div>
        <div className={classes.authTitle}>
          Please login using one of the following providers
        </div>
        {providers.map(
          idp =>
            idp.enabled && (
              <div
                className={AUTH_BACKGROUNDS[idp.idpId]}
                key={idp.title}
                onClick={() => {
                  window.location.assign(getIdpAuthUrl(idp.idpId, originUrl));
                }}
              >
                <div className={classes.image}>
                  <img alt={idp.title} src={AUTH_LOGOS[idp.idpId]} />
                </div>

                <div className={classes.text}>{idp.title}</div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};
