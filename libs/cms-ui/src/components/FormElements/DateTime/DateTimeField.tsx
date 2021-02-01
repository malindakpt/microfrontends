import React from 'react';
import { BaseFormElement } from '../Form.models';
import classes from './DateTimeField.scss';

export interface DateTimeFieldProps extends BaseFormElement {
  /** Value to be displayed */
  value?: string | number | Date;
}
/**
 * This component renders a read only field into a form.
 */
export const DateTimeField: React.FC<DateTimeFieldProps> = ({
  id,
  label = '',
  value = '',
}) => {
  const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    navigator.language,
    {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  );

  return (
    <div className={classes.container} id={id}>
      <label>{label}</label>
      <div className={classes.value}>
        {value && dateFormatter.format(new Date(value))}
      </div>
    </div>
  );
};
