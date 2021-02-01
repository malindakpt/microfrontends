import React, { PropsWithChildren } from 'react';
import { FormStation, FormStationProps } from '../FormStation';

export type DetailsProps<T> = Omit<FormStationProps<T>, 'canCancel'>;

/**
 * This component is the basic building block for 'details' stations in the CMS.
 *
 * You can specify the form you want to show in the children prop. The form will run inside a Formik context.
 *
 * To create the form, it's usually the easiest to use Formik's `<Field/>` component and using one of the
 * `*Field` components coming from this library in the `as` prop like this:
 *
 * `<Field name="title" label="Title" as={TextField} />`
 *
 * In addition, it allows the definition of `actions`, which will be presented to the user in the appropriate panel.
 * The component uses the `onActionSelected` callback to notify the application when an action needs to be executed by the application.
 */
export const Details = <T,>(
  props: PropsWithChildren<DetailsProps<T>>,
): JSX.Element => <FormStation {...props} canCancel={false} />;
