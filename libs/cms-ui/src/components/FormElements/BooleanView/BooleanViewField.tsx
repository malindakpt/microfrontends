import React from 'react';
import classes from './BooleanViewField.scss';
import { BaseFormElement } from '..';

export interface BooleanViewFieldProps extends BaseFormElement {
  /** Value to be displayed */
  value?: boolean;
  /** text to be displayed when value is true */
  trueLabel?: string;
  /** text to be displayed when value is true */
  falseLabel?: string;
}

export const BooleanViewField: React.FC<BooleanViewFieldProps> = ({
  id,
  label = '',
  value = false,
  trueLabel = 'True',
  falseLabel = 'False',
}) => {
  return (
    <div className={classes.container} id={id}>
      <label>{label}</label>
      <div className={classes.value}>
        <div className={value ? classes.green : classes.red}></div>
        <div className={classes.text}>{value ? trueLabel : falseLabel}</div>
      </div>
    </div>
  );
};
