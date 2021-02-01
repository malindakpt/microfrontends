import React from 'react';
import actionButton from './images/arrow.svg';
import classes from './ActionButton.scss';
import { noop } from 'helpers/utils';

export interface ActionButtonProps {
  onItemClicked?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onItemClicked = noop,
}: ActionButtonProps) => {
  return (
    <div className={classes.ActionButton} onClick={onItemClicked}>
      <img src={actionButton} alt="Create New Asset" />
    </div>
  );
};
