import React from 'react';
import { Action } from './Action/Action';
import { ActionData } from './Actions.models';
import classes from './Actions.scss';
import { noop } from 'helpers/utils';

export interface ActionsProps {
  /** Array of Actions to be rendered */
  actions?: ActionData[];
  /** Width of the container */
  width?: string;
  /**
   * Callback to emit when a user clicks on an Action
   * The actionId is supplied as an argument
   */
  onActionSelected?: (action: string) => void;
}

/**
 * Renders an array of actions
 * @example
 * <Actions
 *  actions={[{ actionId: 'actionId', label: 'Action Label'}]}
 *  onActionSelected={actionSelectedHandler}
 * />
 */
export const Actions: React.FC<ActionsProps> = ({
  actions = [],
  width = '300px',
  onActionSelected = noop,
}) => {
  const customStyles = {
    width: width,
  } as React.CSSProperties;

  return (
    <div className={classes.container} style={customStyles}>
      {actions.map(action => (
        <Action
          key={action.actionId}
          action={action}
          onActionSelected={onActionSelected}
        />
      ))}
    </div>
  );
};
