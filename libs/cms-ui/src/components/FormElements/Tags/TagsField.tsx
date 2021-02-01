import React, { FormEvent, useCallback } from 'react';
import { useFormikError } from '../useFormikError';
import { useFormikContext } from 'formik';
import { TagsProps, Tags } from './Tags';
export const TagsField: React.FC<Omit<
  TagsProps,
  'error' | 'onChange'
>> = props => {
  const { name } = props;
  const error = useFormikError(name);
  const { setFieldValue } = useFormikContext();
  const onChange = useCallback(
    (e: FormEvent<HTMLSelectElement>) => {
      setFieldValue(name, e.currentTarget.value);
    },
    [name, setFieldValue],
  );
  return <Tags {...props} error={error} onChange={onChange} />;
};
