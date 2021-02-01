import { ColumnMap, ColumnRenderer, Data } from 'components/List/List.model';
import React, { ReactNode } from 'react';
import { createStateRenderer } from '../StateRenderer/StateRenderer';
import { createThumbnailRenderer } from '../ThumbnailRenderer/ThumbnailRenderer';
import classes from './StateAndThumbnailRenderer.scss';

/**
 * Renders both a state icon and thumbnail image for an item.
 *
 * To be used as `Column.render` value of the column containing the state.
 *
 * @param stateMap An object of key/value pairs mapping column values to CSS colors.
 * @param thumbnailPropertyName the name of the property in your data containing the thumbnail url.
 *
 * @example
 * <List
 *   {...otherProps}
 *   columns=[{
 *     propertyName: 'state'
 *     render: createStateAndThumbnailRenderer({ changed: 'lightblue' }, 'thumbnailUrl')
 * }]/>
 */
export const createStateAndThumbnailRenderer = (
  stateMap: ColumnMap = {},
  thumbnailPropertyName: string,
): ColumnRenderer => {
  const thumbnailRenderer = createThumbnailRenderer();
  const stateRenderer = createStateRenderer(stateMap);

  const StateAndThumbnailRenderer = (state: unknown, data: Data): ReactNode => {
    const thumbnail = data[thumbnailPropertyName as string];

    return (
      <div className={classes.container}>
        {stateRenderer(state, data)}
        {thumbnailRenderer(thumbnail, data)}
      </div>
    );
  };

  return StateAndThumbnailRenderer;
};
