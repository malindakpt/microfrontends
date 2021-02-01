import clsx from 'clsx';
import { ColumnRenderer, Data } from 'components/List/List.model';
import { ImageLoader } from 'components/Loaders';
import React from 'react';
import classes from './ThumbnailRenderer.scss';

/**
 * Renders a thumbail for an item.
 * 
 * To be used as `Column.render` value of the column containing the state.

 * @example
 * <List
 *   {...otherProps}
 *   columns=[{
 *     propertyName: 'state'
 *     render: createThumbnailRenderer()
 * }]/>
 */
export const createThumbnailRenderer = (): ColumnRenderer => {
  const ThumbnailRenderer = (
    imgSrc: unknown,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: Data,
  ): React.ReactNode => (
    <div className={clsx(classes.container, { [classes.noImage]: !imgSrc })}>
      {imgSrc && <ImageLoader imgSrc={String(imgSrc)} />}
    </div>
  );
  return ThumbnailRenderer;
};
