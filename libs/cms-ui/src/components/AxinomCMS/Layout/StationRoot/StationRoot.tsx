import React from 'react';
import clsx, { ClassValue } from 'clsx';
import classes from './StationRoot.scss';

export interface StationRootProps {
  className?: ClassValue;
}

/**
 * @deprecated This component is deprecated and will be removed in future versions.
 */
export const StationRoot: React.FC<StationRootProps> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx(classes.container, 'route-animations', className)}>
      {children}
    </div>
  );
};
