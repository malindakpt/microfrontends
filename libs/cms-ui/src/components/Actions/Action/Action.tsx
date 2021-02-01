import React, { useState } from 'react';
import { ActionData } from '../Actions.models';
import classes from './Action.scss';
import { noop } from 'helpers/utils';
import clsx from 'clsx';

interface Props {
  /** Action to perform */
  action: ActionData;
  /**
   * Callback to emit when a user clicks on the Action
   * The actionId is supplied as an argument
   */
  onActionSelected?: (action: string) => void;
}

/**
 * Renders an action a user can click on
 * @example
 * <Action
 *  action: {{
 *    actionId:'actionId',
 *    label: 'Action Label',
 *  }}
 *  onActionSelected={clickHandler}
 * />
 */
export const Action: React.FC<Props> = ({
  action,
  onActionSelected = noop,
}) => {
  const [confirmation, setConfirmation] = useState<boolean>(false);

  return (
    <div
      className={clsx(classes.container, { [classes.confirm]: confirmation })} // Show different bg-color when comfirmation is displayed
      onClick={() => {
        if (action.confirmationRequired && !confirmation) {
          setConfirmation(true);
          return;
        }
        onActionSelected(action.actionId);
        setConfirmation(false);
      }}
      onMouseLeave={() => {
        if (confirmation) {
          setConfirmation(false);
        }
      }}
    >
      {confirmation ? (
        <span>Click again to confirm</span>
      ) : (
        <span>{action.label}</span>
      )}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.43 20.04">
        <polygon points="0 20.04 3.53 20.04 13.43 10.1 3.53 0 0.02 0 9.91 10.08 0 20.04" />
      </svg>
    </div>
  );
};
