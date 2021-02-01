import React, { ErrorInfo } from 'react';
import classes from './ErrorStation.module.scss';
import { useLabeledCrumb } from 'hooks/useLabeledCrumb/useLabeledCrumb';

interface ErrorStationProps {
  error: Error;
  errorInfo: ErrorInfo;
}

/**
 * @deprecated This component is deprecated and will be removed in future versions.
 */
export const ErrorStation: React.FC<ErrorStationProps> = ({
  error,
  errorInfo,
}) => {
  useLabeledCrumb('Error');

  return (
    <div className={classes.container}>
      <h1>
        <span role="img" aria-label="went-wrong">
          ⚠️
        </span>
        Something went wrong.
      </h1>
      <p>An error occurred while rendering this station.</p>
      {process.env.NODE_ENV !== 'production' && (
        <div className={classes.details}>
          <h2>Debug Information</h2>
          <p>{error.toString()}</p>
          <h3>Stack Trace</h3>
          {error?.stack}
          <h3>Component Stack</h3>
          {errorInfo?.componentStack}
        </div>
      )}
    </div>
  );
};
