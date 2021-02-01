import React, { ReactNode } from 'react';
import ContentLoader from 'react-content-loader';
import { SingleLineSkeleton } from '../skeletons';
import classes from './Loader.scss';

export interface LoaderProps {
  /** Whether to show or hide the loader animation */
  showLoader: boolean;
  /** SVGRectElement used as the loading animation. If set, will replace the default SVGRectElement */
  loadingSkeleton?: ReactNode;
  /** Loader's height (default: 100) */
  height?: string | number;
  /** Loader's width (default: 5) */
  width?: string | number;
  /** Animation speed (default: 2) */
  speed?: number;
  /** Loader's primary color (default: '#CCCCCC') */
  primaryColor?: string;
  /** Loader's secondary color (default: '#EEECEC') */
  secondaryColor?: string;
  /** SVG's viewbox (default: '0 0 100 5'), adjust this change the skeleton's rendering*/
  viewBox?: string;
}

/**
 * Render a loader animation if showLoader is true, else show children of <Loader>
 * @param boolean showLoader - whether to show or hide the loader animation
 * @param ReactNode [loadingSkeleton = SingleLineSkeleton] - loading animation svg
 * @param number [width = 100] - width of Loader
 * @param number [height = 5] - height of Loader
 * @example
 * <Loader showLoader={true}>{children}</Loader>
 * <Loader showLoader={true}></Loader>
 */
export const Loader: React.FC<LoaderProps> = ({
  children,
  showLoader,
  width = 100,
  height = 5,
  loadingSkeleton = SingleLineSkeleton,
  speed = 2,
  primaryColor = '#CCCCCC',
  secondaryColor = '#EEECEC',
  viewBox = '0 0 100 5',
}) => {
  const customStyles = {
    height: height,
    width: width,
  } as React.CSSProperties;

  if (showLoader) {
    return (
      <div style={customStyles} className={classes.container}>
        <ContentLoader
          speed={speed}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          viewBox={viewBox}
        >
          {loadingSkeleton}
        </ContentLoader>
      </div>
    );
  }
  return <>{children}</>;
};
