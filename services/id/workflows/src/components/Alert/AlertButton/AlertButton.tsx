import React from 'react';
import { AlertAction } from '../AlertAction.model';

interface Props {
  /** Action to perform */
  action: AlertAction;
  /**
   * Callback to emit when a user clicks on the Action
   * The actionId is supplied as an argument
   */
  onActionSelected?: (action: string) => void;
}

/**
 * Renders an AlertButton that a user can click on
 * @example
 * <AlertButton
 *  action: {{
 *    actionId:'actionId',
 *    label: 'Action Label',
 *  }}
 *  onActionSelected={clickHandler}
 * />
 */
export const AlertButton: React.FC<Props> = ({
  action,
  onActionSelected = () => {},
}) => {
  return (
    <button onClick={() => onActionSelected(action.actionId)}>
      {action.label}
    </button>
  );
};
