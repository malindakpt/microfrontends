import clsx from 'clsx';
import { noop } from 'helpers/utils';
import React, { ReactNode, useCallback, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { SquareOutlineSkeleton } from '../skeletons';
import classes from './ImageLoader.scss';

export interface ImageLoaderProps {
  /** Image's url */
  imgSrc: string;
  /** Image's alt attribute */
  alt?: string;
  /** Image loader's height (default: '50px') */
  height?: string | number;
  /** Image loader's width (default: '50px') */
  width?: string | number;
  /** SVGRectElement used as the loading animation. If set, will replace the default SVGRectElement */
  loadingSkeleton?: ReactNode;
  /** Animation speed (default: 2) */
  speed?: number;
  /** Loader's primary color (default: '#CCCCCC') */
  primaryColor?: string;
  /** Loader's secondary color (default: '#EEECEC') */
  secondaryColor?: string;
  /** SVG's viewbox (default: '0 0 100 100'), adjust this change the skeleton's rendering*/
  viewBox?: string;
  /** Fallback image url to load in case of load failure. If not set, a fallback background color will be used */
  fallbackSrc?: string;
  /** Callback emitted after the image has successfully loaded. Img src is sent back */
  onLoad?: (src: string) => void;
  /** Callback emitted after the image has failed to load. Img src is sent back */
  onError?: (src: string) => void;
}

/**
 * Renders a loading animation while an image is being fetched
 * @example
 * <ImageLoader imgSrc="/location/thumb.png" />
 */
export const ImageLoader: React.FC<ImageLoaderProps> = ({
  imgSrc,
  alt,
  height = '50px',
  width = '50px',
  loadingSkeleton = SquareOutlineSkeleton,
  speed = 2,
  primaryColor = '#CCCCCC',
  secondaryColor = '#EEECEC',
  viewBox = '0 0 100 100',
  fallbackSrc,
  onLoad = noop,
  onError = noop,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fallBack, setFallBack] = useState<boolean>(false);

  const customStyles = {
    height: height,
    width: width,
  } as React.CSSProperties;

  const onLoadHandler = useCallback(() => {
    setIsLoading(false);
    onLoad(imgSrc);
  }, [imgSrc, onLoad]);

  const onErrorHandler = useCallback(() => {
    setIsLoading(false);
    setFallBack(true);
    onError(imgSrc);
  }, [imgSrc, onError]);

  return (
    <>
      {isLoading && (
        <div className={classes.container} style={customStyles}>
          <ContentLoader
            speed={speed}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            viewBox={viewBox}
          >
            {loadingSkeleton}
          </ContentLoader>
        </div>
      )}
      <img
        src={String(imgSrc)}
        width={width}
        height={height}
        alt={alt}
        onLoad={onLoadHandler}
        onError={onErrorHandler}
        style={{ display: isLoading ? 'none' : fallBack ? 'none' : 'block' }}
      />
      {fallBack &&
        (!fallbackSrc ? (
          <div
            className={clsx(classes.container, classes.fallback)}
            style={customStyles}
          ></div>
        ) : (
          <img src={String(fallbackSrc)} width={width} height={height} />
        ))}
    </>
  );
};
