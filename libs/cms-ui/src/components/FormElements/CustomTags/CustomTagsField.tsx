import React, { FormEvent, useCallback } from 'react';
import { useFormikError } from '../useFormikError';
import { useFormikContext } from 'formik';
import { CustomTagsProps, CustomTags } from './CustomTags';

export const CustomTagsField: React.FC<Omit<
  CustomTagsProps,
  'error' | 'onChange'
>> = props => {
  const { name } = props;
  const error = useFormikError(props.name);
  const { setFieldValue } = useFormikContext();
  const onChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setFieldValue(name, e.currentTarget.value);
    },
    [name, setFieldValue],
  );

  return <CustomTags {...props} error={error} onChange={onChange} />;
};
