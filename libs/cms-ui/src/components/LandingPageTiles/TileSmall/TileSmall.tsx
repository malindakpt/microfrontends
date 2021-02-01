import React from 'react';
import { Link } from 'react-router-dom';
import { LandingPageItem } from '../LandingPageTiles.model';
import classes from './TileSmall.scss';
import clsx from 'clsx';

// TODO: Support for background colors and hover effect

export interface TileSmallProps extends LandingPageItem {
  /** Column span */
  smallTileColumnSpan?: number;
  /** Row span */
  smallTileRowSpan?: number;
}

/**
 * Renders a small tile used in LandingPageTiles component
 * @example
 * <TileSmall
 *  path={'/liveevents'}
 *  label={'Live Events'}
 *  icon={'/images/images.png'}
 *  type={'small'}
 *  smallTileColumnSpan={3}
 *  smallTileRowSpan={1}
 * />
 */
export const TileSmall: React.FC<TileSmallProps> = ({
  path,
  label,
  icon,
  disabled,
  smallTileColumnSpan,
  smallTileRowSpan,
}) => {
  const customStyles = {
    gridColumn: smallTileColumnSpan ? `span ${smallTileColumnSpan}` : undefined,
    gridRow: smallTileRowSpan ? `span ${smallTileRowSpan}` : undefined,
  } as React.CSSProperties;

  return (
    <Link
      className={clsx(classes.container, disabled && classes.disabled)}
      to={{
        pathname: disabled ? undefined : path,
      }}
      style={customStyles}
    >
      <img className={classes.icon} src={icon} alt={`${label} icon`} />
      <span className={classes.label}>{label}</span>
    </Link>
  );
};
