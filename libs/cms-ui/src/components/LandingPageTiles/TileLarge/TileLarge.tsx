import React from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'components/Loaders/Loader/Loader';
import { LandingPageItem } from '../LandingPageTiles.model';
import classes from './TileLarge.scss';
import { useValueOrOnDemand } from 'hooks/useValueOrOnDemand/useValueOrOnDemand';
import clsx from 'clsx';

// TODO: Support for background colors and hover effect

export interface TileLargeProps extends LandingPageItem {
  /** Column span */
  largeTileColumnSpan?: number;
  /** Row span */
  largeTileRowSpan?: number;
}

/**
 * Renders a large tile used in LandingPageTiles component
 * @example
 * <TileLarge
 *  path={'/movies'}
 *  label={'Movies'}
 *  icon={'/images/images.png'}
 *  type={'large'}
 *  subtitle={256}
 *  largeTileColumnSpan={4}
 *  largeTileRowSpan={2}
 * />
 */
export const TileLarge: React.FC<TileLargeProps> = ({
  path,
  label,
  icon,
  disabled,
  subtitle,
  largeTileColumnSpan,
  largeTileRowSpan,
}) => {
  const customStyles = {
    gridColumn: largeTileColumnSpan ? `span ${largeTileColumnSpan}` : undefined,
    gridRow: largeTileRowSpan ? `span ${largeTileRowSpan}` : undefined,
  } as React.CSSProperties;

  const [subtitleValue, isSubtitleLoading] = useValueOrOnDemand(subtitle);

  return (
    <Link
      className={clsx(classes.container, disabled && classes.disabled)}
      to={{
        pathname: disabled ? undefined : path,
      }}
      style={customStyles}
    >
      <img className={classes.icon} src={icon} alt={`${label} icon`} />
      <div className={classes.titlesSection}>
        <span className={classes.label}>{label}</span>
        <span className={classes.subtitle}>
          <Loader showLoader={isSubtitleLoading}>{subtitleValue}</Loader>
        </span>
      </div>
    </Link>
  );
};
