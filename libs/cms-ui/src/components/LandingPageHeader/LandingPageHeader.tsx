import React from 'react';
import classes from './LandingPageHeader.scss';

export interface LandingPageHeaderProps {
  title: string;
  subtitle: string;
}

export const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.subtitle}>{subtitle}</div>
    </div>
  );
};
