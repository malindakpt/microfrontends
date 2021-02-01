import React from 'react';
import { Link } from 'react-router-dom';
import { useLabeledCrumb } from '../../../../hooks/useLabeledCrumb/useLabeledCrumb';
import classes from './NotFoundStation.scss';

/**
 * @deprecated This component is deprecated and will be removed in future versions.
 */
export const NotFoundStation: React.FC = () => {
  useLabeledCrumb('Not found');

  return (
    <div className={classes.container}>
      <h1>Page not found 😧</h1>
      <p>
        We tried very hard, but unfortunately we couldn&apos;t find a page
        satisfying your request.
      </p>
      <p>
        Navigate to{' '}
        <Link to="/" className={classes.link}>
          Home
        </Link>{' '}
        instead?
      </p>
    </div>
  );
};
