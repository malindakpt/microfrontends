import React from 'react';

import classes from './PageHeader.scss';

export interface PageHeaderProps {
  /** Title shown in page header */
  title?: string;
  /** Subtitle shown in page header */
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title = '',
  subtitle = '',
  children,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.titles}>
        <div className={classes.title}>{title}</div>
        <div className={classes.subtitle}>{subtitle}</div>
      </div>
      <div className={classes.actionsRoot}>{children}</div>
    </div>
  );
};
