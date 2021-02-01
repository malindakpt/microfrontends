import React, { PropsWithChildren } from 'react';
import { FormStation, FormStationProps } from '../FormStation';

export type CreateProps<T> = Omit<
  FormStationProps<T>,
  'alwaysShowActionsPanel' | 'defaultTitle' | 'titleProperty' | 'canCancel'
> & {
  /** The title of the station */
  title: string;
};

/**
 * This component is the basic building block for 'create' stations in the CMS.
 *
 * You can specify the form you want to show in the children prop. The form will run inside a Formik context.
 *
 * To create the form, it's usually the easiest to use Formik's `<Field/>` component and using one of the
 * `*Field` components coming from this library in the `as` prop like this:
 *
 * `<Field name="title" label="Title" as={TextField} />`
 */
export const Create = <T,>(
  props: PropsWithChildren<CreateProps<T>>,
): JSX.Element => (
  <FormStation {...props} defaultTitle={props.title} canCancel={true} />
);
