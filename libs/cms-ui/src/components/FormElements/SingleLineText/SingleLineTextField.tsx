import React from 'react';
import { useFormikError } from '../useFormikError';
import { SingleLineTextProps, SingleLineText } from './SingleLineText';
/**
 * This component should be used to render a TextBox inside a Formik form.
 *
 * @example
 * <Field name="title" label="Title" as={SingleLineTextField} />
 */
export const SingleLineTextField: React.FC<Omit<
  SingleLineTextProps,
  'error'
>> = props => {
  const error = useFormikError(props.name);
  return <SingleLineText {...props} error={error} />;
};
