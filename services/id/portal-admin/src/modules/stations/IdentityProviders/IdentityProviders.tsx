import React from 'react';
import { LandingPageTiles, LandingPageItem } from '@ax/cms-ui';
import classes from './IdentityProviders.module.scss';
import { useParams } from 'react-router-dom';
import {
  IdentityProvider,
  IdpConfigurationsCountQuery,
  IdpConfigurationsCountDocument,
} from '../../../generated/graphql';
import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { useAppStateIDS } from 'AppStateIDS';

export const IdentityProviders: React.FC = () => {
  const { envId, envName } = useParams<{ envId: string; envName: string }>();
  useSetBreadcrumb(envId, envName);
  const apolloClient = useApolloClient();
  const [idProviders, setIdProviders] = useState<LandingPageItem[]>([]);

  useEffect(() => {
    const loadIdpConfigurationsCount = (idp: IdentityProvider) => async () => {
      const result = await apolloClient.query<IdpConfigurationsCountQuery>({
        query: IdpConfigurationsCountDocument,
        fetchPolicy: 'network-only',
        variables: {
          condition: {
            applicationId: envId,
            idpId: idp,
          },
        },
      });
      if (result.data.idpConfigurations?.totalCount) {
        if (result.data.idpConfigurations?.nodes[0]?.enabled) {
          return 'ENABLED';
        } else {
          return 'DISABLED';
        }
      } else {
        return 'NOT CONFIGURED';
      }
    };

    setIdProviders([
      {
        path: `/env/${envId}/${envName}/identityProviders/${IdentityProvider.Google}`,
        label: 'Google',
        icon: require('../../../images/ServicePackages.svg'),
        type: 'large',
        subtitle: loadIdpConfigurationsCount(IdentityProvider.Google),
      },
      {
        path: `/env/${envId}/${envName}/identityProviders/${IdentityProvider.AzureAd}`,
        label: 'Azure AD',
        icon: require('../../../images/ServicePackages.svg'),
        type: 'large',
        subtitle: loadIdpConfigurationsCount(IdentityProvider.AzureAd),
        disabled: true,
      },
      {
        path: `/env/${envId}/${envName}/identityProviders/${IdentityProvider.AxAuth}`,
        label: 'AxAuth',
        icon: require('../../../images/ServicePackages.svg'),
        type: 'large',
        subtitle: loadIdpConfigurationsCount(IdentityProvider.AxAuth),
        disabled: true,
      },
    ]);
  }, [apolloClient, envId, envName]);

  return (
    <div className={classes.container}>
      <LandingPageTiles
        items={idProviders}
        gridTemplateColumns={12}
        gridRowHeight="80px"
        gridGap="5px"
        minWidth="600px"
        maxWidth="900px"
        alignment="center"
        largeTileColumnSpan={4}
        largeTileRowSpan={3}
        smallTileColumnSpan={3}
        smallTileRowSpan={2}
      />
    </div>
  );
};

function useSetBreadcrumb(envId: string, envName: string) {
  const { updateAppStateIDS } = useAppStateIDS();
  useEffect(() => {
    updateAppStateIDS({
      breadcrumbs: [
        {
          label: 'Environments',
          url: '/env',
          params: [],
        },
        { label: `${envName}`, url: `/env/${envId}/${envName}`, params: [] },
        {
          label: `Identity Providers`,
          url: `/env/${envId}/${envName}/identityProviders`,
          params: [],
        },
      ],
    });
  }, [envId, envName, updateAppStateIDS]);
}
