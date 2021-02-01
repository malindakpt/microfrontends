import { ColumnMap, Data, ColumnRenderer } from 'components/List/List.model';
import React from 'react';
import classes from './StateRenderer.scss';

/**
 * Renders a state icon for an item.
 *
 * To be used as `Column.render` value.
 *
 * @param map An object of key/value pairs mapping column values to CSS colors.
 * @example
 * <List
 *   {...otherProps}
 *   columns=[{
 *     propertyName: 'state'
 *     render: createStateRenderer({ changed: 'lightblue' })
 * }]/>
 */
export const createStateRenderer = (map: ColumnMap = {}): ColumnRenderer => {
  const StateRenderer = (value: unknown) => (
    <div
      className={classes.container}
      style={{ backgroundColor: map[value as string] }}
      title={String(value)}
    ></div>
  );
  return StateRenderer;
};
