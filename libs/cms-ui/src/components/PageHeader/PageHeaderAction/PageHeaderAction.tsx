import React from 'react';
import classes from './PageHeaderAction.scss';

export interface PageHeaderActionProps {
  icon: string;
  alt: string;
  onClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

export const PageHeaderAction: React.FC<PageHeaderActionProps> = ({
  icon,
  onClick,
  alt,
}) => {
  return (
    <img className={classes.action} src={icon} alt={alt} onClick={onClick} />
  );
};
