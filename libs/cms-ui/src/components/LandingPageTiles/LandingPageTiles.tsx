import React, { useMemo } from 'react';
import { LandingPageItem } from './LandingPageTiles.model';
import classes from './LandingPageTiles.scss';
import { TileLarge } from './TileLarge';
import { TileSmall } from './TileSmall';

export interface LandingPageTilesProps {
  /** Data for all tiles */
  items: LandingPageItem[];
  /** Number of columns */
  gridTemplateColumns?: number;
  /** Height of Rows. Rows are automatically created. */
  gridRowHeight?: string;
  /** Spacing between tiles */
  gridGap?: string;
  /** The minimum width the grid can shrink down to */
  minWidth?: string;
  /** The maximum width the grid can expand to */
  maxWidth?: string;
  /** Alignment of the whole grid in the view */
  alignment?: 'left' | 'center' | 'right';
  /** Column span for the large tile */
  largeTileColumnSpan?: number;
  /** Row span for the large tile */
  largeTileRowSpan?: number;
  /** Column span for the small tile */
  smallTileColumnSpan?: number;
  /** Row span for the small tile */
  smallTileRowSpan?: number;
}

// TODO: Determine if we really need to keep have two seperate tile components(large/small)
// or can they be combined into the same component since they share a lot of the same props/logic

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
function assertUnreachable(i: never): void {}

const useTiles = (
  items: LandingPageItem[],
): [LandingPageItem[], LandingPageItem[]] => {
  return useMemo<[LandingPageItem[], LandingPageItem[]]>(() => {
    const small: LandingPageItem[] = [];
    const large: LandingPageItem[] = [];

    items.forEach(i => {
      switch (i.type) {
        case 'large':
          large.push(i);
          break;
        case 'small':
          small.push(i);
          break;
        default:
          // Adding this assert to get a compile error when new types are added and this switch is not adjusted
          assertUnreachable(i.type);
      }
    });

    return [large, small];
  }, [items]);
};

/**
 * Grid system for the home station
 * @example
 * <LandingPageTiles
 *  items={[{}]}
 *  gridTemplateColumns={12}
 *  gridRowHeight={'150px'}
 *  gridGap={'5px'}
 *  minWidth={'600px'}
 *  maxWidth={'900px'}
 *  alignment={'center'}
 *  largeTileColumnSpan={4}
 *  largeTileRowSpan={2}
 *  smallTileColumnSpan={3}
 *  smallTileRowSpan={1}
 * />
 */
export const LandingPageTiles: React.FC<LandingPageTilesProps> = ({
  children,
  items = [],
  gridTemplateColumns,
  gridGap,
  gridRowHeight,
  minWidth,
  maxWidth,
  alignment,
  largeTileColumnSpan = 4,
  smallTileColumnSpan = 3,
  largeTileRowSpan = 2,
  smallTileRowSpan = 1,
}) => {
  const [largeTiles, smallTiles] = useTiles(items);

  const customStyles = {
    gridTemplateColumns: gridTemplateColumns
      ? `repeat(${gridTemplateColumns}, 1fr)`
      : undefined,
    gridAutoRows: gridRowHeight,
    gridGap: gridGap,
    minWidth: minWidth,
    maxWidth: maxWidth,
    justifySelf: alignment,
  } as React.CSSProperties; // todo pass in things like width height

  return (
    <div className={classes.container} style={customStyles}>
      {largeTiles.map((nav, index) => (
        <TileLarge
          key={index}
          path={nav.path}
          label={nav.label}
          icon={nav.icon}
          type={nav.type}
          subtitle={nav.subtitle}
          disabled={nav.disabled}
          largeTileColumnSpan={largeTileColumnSpan}
          largeTileRowSpan={largeTileRowSpan}
        />
      ))}
      {smallTiles.map((nav, index) => (
        <TileSmall
          key={index}
          path={nav.path}
          label={nav.label}
          icon={nav.icon}
          type={nav.type}
          disabled={nav.disabled}
          smallTileColumnSpan={smallTileColumnSpan}
          smallTileRowSpan={smallTileRowSpan}
        />
      ))}
      {children}
    </div>
  );
};
