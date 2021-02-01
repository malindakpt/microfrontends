import React from 'react';
import classes from './BooleanDotRenderer.scss';
import { ColumnRenderer } from 'components';
import clsx from 'clsx';

/**
 * Renders a red or green color dot to represent a boolean value
 * To be used as `Column.render` value of the column containing the state.
 *
 * @example
 * <List
 *   {...otherProps}
 *   columns=[{
 *     propertyName: 'enabled'
 *     render: createBooleanDotRenderer()
 * }]/>
 *
 */
export const createBooleanDotRenderer = (): ColumnRenderer => (
  val: unknown,
) => <div className={clsx(val ? [classes.green] : [classes.red])}></div>;
