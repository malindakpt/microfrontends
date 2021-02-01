import React from 'react';
import classes from './ListCheckBox.scss';
import { noop } from 'helpers/utils';

export interface ListCheckBoxProps {
  /** Whether or not the checkbox is currently checked (default: false) */
  isChecked?: boolean;
  /** Whether or not it needs to prevent the click event on the container element from propagating upwards (default: false)*/
  containerClickEvent?: boolean;
  /** Callback to emit when the checkbox is toggled */
  onCheckBoxToggled?: (checked: boolean) => void;
  /** Whether or not the checkbox needs to be disabled (default: false) */
  isDisabled?: boolean;
}

export const ListCheckBox: React.FC<ListCheckBoxProps> = ({
  isDisabled = false,
  isChecked = false,
  containerClickEvent = false,
  onCheckBoxToggled = noop,
}) => {
  // Prevents the click event on the container element from propagating upwards.
  function containerHandler(event: React.SyntheticEvent): void {
    if (containerClickEvent) {
      return;
    } else {
      event.stopPropagation();
    }
  }

  return (
    <div className={classes.container} onClick={containerHandler}>
      <input
        disabled={isDisabled}
        type="checkbox"
        checked={isChecked}
        onChange={event => onCheckBoxToggled(event.currentTarget.checked)}
      />
    </div>
  );
};
