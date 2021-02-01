import clsx from 'clsx';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { BaseFormControl, BaseInputEvents } from '../Form.models';
import classes from './SingleLineText.scss';

export interface SingleLineTextProps extends BaseFormControl, BaseInputEvents {
  /** Input element type */
  type?: string;
  /** Current value the form control has */
  value?: string | number | string[] | undefined;
  /** Input placeholder */
  placeholder?: string;
  /** Whether or not the control should start focused (default: false) */
  autoFocus?: boolean;
  /** Whether or not the control supports auto complete */
  autoComplete?: 'on' | 'off';
}

/**
 * This component can be used to display a text input inside a form.
 * If you run your form in a Formik context, consider using the `SingleLineTextField` component instead.
 */
export const SingleLineText: React.FC<SingleLineTextProps> = ({
  name,
  id,
  type,
  label,
  value,
  disabled = false,
  placeholder,
  error = undefined,
  autoFocus = false,
  autoComplete,
  onChange,
  onBlur,
  onFocus,
}) => {
  const errorMsg: string | undefined = error;
  const [val, setVal] = useState(value || '');
  const [isDirty, setDirty] = useState(false);
  const DUMMY_PWD = '0000000000';
  const isPasswordField = type === 'password' ? true : false;

  useEffect(() => {
    // For password type, display dummy val at intial rendering and allow user to change it
    if (isPasswordField) {
      if (isDirty) {
        setVal(value as string);
      } else if (!value || value === '') {
        setVal('');
      } else {
        setVal(DUMMY_PWD);
      }
    } else {
      setVal(value as string);
    }
  }, [isDirty, isPasswordField, label, type, value]);

  const handlePwdChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // For type === password, once user changed the pwd, show the actual value entered by the user.
    setDirty(true);
    setVal(e.target.value);
    onChange && onChange(e);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setVal(e.target.value);
    onChange && onChange(e);
  };

  return (
    <div className={classes.container}>
      <label>{label}</label>
      <input
        className={clsx({ [classes.hasError]: errorMsg })}
        id={id}
        name={name}
        type={type}
        value={val || ''}
        disabled={disabled}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={isPasswordField ? handlePwdChange : handleTextChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {errorMsg && <small>{errorMsg}</small>}
    </div>
  );
};
