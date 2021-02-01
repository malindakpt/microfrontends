import React from 'react';
import { BaseFormElement } from '../Form.models';
import classes from './ReadOnlyField.scss';

export interface ReadOnlyFieldProps extends BaseFormElement {
  /** Value to be displayed */
  value?: string | number;
}
/**
 * This component renders a read only field into a form.
 */
export const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({
  id,
  label = '',
  value = '',
}) => {
  return (
    <div className={classes.container} id={id}>
      <label>{label}</label>
      <div className={classes.value}>{value}</div>
    </div>
  );
};
