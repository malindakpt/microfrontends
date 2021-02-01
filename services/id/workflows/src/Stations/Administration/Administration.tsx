import React from 'react';
import {
  LandingPageHeader,
  LandingPageTiles,
  LandingPageItem,
  useAppState,
} from '@ax/cms-ui';
import { useState, useEffect } from 'react';
import classes from './Administration.module.scss';

export const Administration: React.FC = () => {
  useUpdateBreadcrumb();

  const useLandingPageData = () => {
    const [landingPageData, setLandingPageData] = useState<LandingPageItem[]>(
      [],
    );

    useEffect(() => {
      setLandingPageData([
        {
          path: '/accessManagement',
          label: 'Access Management Portal',
          icon: require('../../../images/ServicePackages.svg'),
          type: 'large',
          subtitle: '',
        },
      ]);
    }, []);

    return landingPageData;
  };

  const landingPageData = useLandingPageData();
  return (
    <div className={classes.mainContainer}>
      <LandingPageHeader title="Administration" subtitle="" />
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
  const { updateAppState } = useAppState();
  useEffect(() => {
    updateAppState({
      breadcrumbs: [],
    });
  }, [updateAppState]);
}
