import React from 'react';
import { useFormikError } from '../useFormikError';
import { SelectProps, Select } from './Select';
export const SelectField: React.FC<Omit<SelectProps, 'error'>> = props => {
  const error = useFormikError(props.name);
  return <Select {...props} error={error} />;
};
