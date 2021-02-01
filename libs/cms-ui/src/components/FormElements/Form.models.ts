import { FormEvent } from 'react';

export interface BaseFormElement {
  /** Form control id */
  id?: string;
  /** Form control label */
  label?: string;
}

export interface BaseFormControl extends BaseFormElement {
  /** Name of form control, required and must be unique from other form control names. This name should match the the name of the object corresponding to this control. */
  name: string;
  /** If set, indicates the control has an error and will display this prop as the error message */
  error?: string | undefined;
  /** Whether or not the control is disabled (default: false) */
  disabled?: boolean;
}

export interface BaseInputEvents {
  /** Raised when the value has changed */
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
  /** Raised when the element has been selected */
  onBlur?: (event: FormEvent<HTMLInputElement>) => void;
  /** Raised when the element has been de-selected */
  onFocus?: (event: FormEvent<HTMLInputElement>) => void;
}

export interface BaseSelectEvents {
  /** Raised when the value has changed */
  onChange?: (event: FormEvent<HTMLSelectElement>) => void;
  /** Raised when the element has been selected */
  onBlur?: (event: FormEvent<HTMLSelectElement>) => void;
  /** Raised when the element has been de-selected */
  onFocus?: (event: FormEvent<HTMLSelectElement>) => void;
}
