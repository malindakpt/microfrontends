import React from 'react';
import {
  LandingPageHeader,
  LandingPageTiles,
  LandingPageItem,
} from '@ax/cms-ui';
import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import {
  ApplicationsQuery,
  ApplicationsDocument,
} from '../../../generated/graphql';
import classes from './Home.module.scss';
import { useAppStateIDS } from 'AppStateIDS';

export const Home: React.FC = () => {
  const apolloClient = useApolloClient();
  const { tenantName } = useAppStateIDS();

  useUpdateBreadcrumb();
  const useLandingPageData = () => {
    const [landingPageData, setLandingPageData] = useState<LandingPageItem[]>(
      [],
    );

    useEffect(() => {
      const loadApplicationCount = async () => {
        const result = await apolloClient.query<ApplicationsQuery>({
          query: ApplicationsDocument,
          fetchPolicy: 'network-only',
        });

        return result.data.applications?.totalCount;
      };

      setLandingPageData([
        {
          path: '/env',
          label: 'Environments',
          icon: require('../../../images/ServicePackages.svg'),
          type: 'large',
          subtitle: loadApplicationCount,
        },
      ]);
    }, []);

    return landingPageData;
  };

  const landingPageData = useLandingPageData();
  return (
    <div className={classes.mainContainer}>
      <LandingPageHeader
        title="Enviroment Administration Portal"
        subtitle={tenantName}
      />
      <div className={classes.container}>
        <LandingPageTiles
          items={landingPageData}
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
    </div>
  );
};

function useUpdateBreadcrumb() {
  const { updateAppStateIDS } = useAppStateIDS();

  useEffect(() => {
    updateAppStateIDS({
      breadcrumbs: [],
    });
  }, [updateAppStateIDS]);
}
