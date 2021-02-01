import React from 'react';
import classes from './CreateButton.scss';
import { noop } from 'helpers/utils';

export interface CreateButtonProps {
  onCreateAction?: () => void;
}

export const CreateButton: React.FC<CreateButtonProps> = ({
  onCreateAction = noop,
}) => {
  return (
    <div className={classes.container} onClick={onCreateAction}>
      <svg viewBox="0 0 29.95 29.95">
        <path d="M15,30A15,15,0,1,1,30,15,15,15,0,0,1,15,30ZM15,2.5A12.48,12.48,0,1,0,27.45,15,12.5,12.5,0,0,0,15,2.5Z" />
        <polygon points="22.37 13.6 16.31 13.6 16.31 7.3 13.36 7.3 13.36 13.6 7.09 13.6 7.09 16.56 13.36 16.56 13.36 22.58 16.31 22.58 16.31 16.56 22.37 16.56 22.37 13.6" />
      </svg>
    </div>
  );
};
