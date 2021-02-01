import React from 'react';
import { AlertButton } from './AlertButton/AlertButton';
import { AlertAction } from './AlertAction.model';
import { PageHeader } from '@ax/cms-ui';
import classes from './Alert.module.scss';

export interface AlertProps {
  /** Title shown in page header */
  title?: string;
  /** Subtitle shown in page header */
  subtitle?: string;
  /** Message to be displayed to the user */
  message: string;
  /** An array of the actions that should be executable on the page */
  actions?: AlertAction[];
  /**
   * Callback emitted when a user clicks on an Action.
   * The actionId is supplied as an argument.
   */
  onActionSelected?: (action: string) => void;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  subtitle,
  message,
  actions = [],
  onActionSelected = () => {},
  children,
}) => {
  return (
    <div className={classes.container}>
      <PageHeader title={title} subtitle={subtitle}></PageHeader>
      <div className={classes.outer}>
        <div className={classes.inner}>
          <h3>{message}</h3>
          <div>{children}</div>
          {actions.map(action => (
            <AlertButton
              key={action.actionId}
              action={action}
              onActionSelected={onActionSelected}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
