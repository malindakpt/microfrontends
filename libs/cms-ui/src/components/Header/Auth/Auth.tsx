import { User } from '@ax/core';
import { useExpand } from 'hooks/useExpand/useExpand';
import React from 'react';
import classes from './Auth.scss';

export interface AuthProps {
  user?: User;
  logout?: () => unknown;
}

/**
 * Displays user
 */
export const Auth: React.FC<AuthProps> = ({ user, logout }) => {
  const { isExpanded, expand, collapse } = useExpand();

  return (
    <div
      className={classes.container}
      onMouseEnter={expand}
      onMouseLeave={collapse}
    >
      <div
        className={classes.profileContainer}
        title={`${user?.name} (${user?.email ?? ''})`}
      >
        <img src={user?.profilePictureUrl} className={classes.profilePicture} />
        <span className={classes.userName}>{user?.name}</span>
      </div>
      {isExpanded && (
        <div className={classes.menu}>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};
