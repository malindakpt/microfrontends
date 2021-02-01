import clsx from 'clsx';
import React from 'react';
import { BaseFormControl, BaseSelectEvents } from '../Form.models';
import classes from './Select.scss';

export interface SelectProps extends BaseFormControl, BaseSelectEvents {
  /** Current value the form control has */
  value?: string | number | string[] | undefined;
  /** Array of options that can be selected from */
  options?: { value: string | number; label: string | number }[];
  /** Whether or not the control should start focused (default: false) */
  autoFocus?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  name,
  id,
  label,
  value = undefined,
  options = [],
  disabled = false,
  error = undefined,
  autoFocus = false,
  onChange,
  onBlur,
  onFocus,
}) => {
  const errorMsg: string | undefined = error;

  return (
    <div className={classes.container}>
      <label>{label}</label>
      <select
        className={clsx({ [classes.hasError]: errorMsg })}
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        autoFocus={autoFocus}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMsg && <small>{errorMsg}</small>}
    </div>
  );
};
