import React from 'react';
import {
  LandingPageHeader,
  LandingPageTiles,
  LandingPageItem,
} from '@ax/cms-ui';
import { useState, useEffect } from 'react';
import classes from './Home.module.scss';
import { BreadcrumbResolver } from 'frontend-host';

export const Home: React.FC = () => {
  const useLandingPageData = () => {
    const [landingPageData, setLandingPageData] = useState<LandingPageItem[]>(
      [],
    );

    useEffect(() => {
      setLandingPageData([
        {
          path: 'accessManagement/users',
          label: 'Users',
          icon: require('./images/ServicePackages.svg'),
          type: 'large',
        },
        {
          path: 'accessManagement/userRoles',
          label: 'User Roles',
          icon: require('./images/ServicePackages.svg'),
          type: 'large',
        },
        {
          path: 'accessManagement/serviceAccounts',
          label: 'Service Accounts',
          icon: require('./images/ServicePackages.svg'),
          type: 'large',
        },
        {
          path: 'accessManagement/userRoleTags',
          label: 'User Role Tags',
          icon: require('./images/ServicePackages.svg'),
          type: 'large',
        },
      ]);
    }, []);

    return landingPageData;
  };

  const landingPageData = useLandingPageData();
  return (
    <div className={classes.mainContainer}>
      <LandingPageHeader title="Access Management Portal" subtitle="" />
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

export const HomeBreadCrumb: BreadcrumbResolver = () => 'Access Management';
