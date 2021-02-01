import { action } from '@storybook/addon-actions';
import React, { ReactNode } from 'react';
import { ImageLoader, ImageLoaderProps } from './ImageLoader';

const actions: Partial<ImageLoaderProps> = {
  onLoad: action('onLoad'),
  onError: action('onError'),
};

export default {
  title: `Other Components/ImageLoader`,
};

export const Default = (): ReactNode => {
  const url = 'https://picsum.photos/300';

  return (
    <div>
      <ImageLoader imgSrc={url} {...actions} />
    </div>
  );
};

export const WithDimensions = (): ReactNode => {
  const url = 'https://picsum.photos/300';

  return <ImageLoader imgSrc={url} height="300px" width="300px" {...actions} />;
};

export const ImageFetchFailure = (): ReactNode => {
  const url = 'failed-url';

  return (
    <div>
      <ImageLoader imgSrc={url} {...actions} />
    </div>
  );
};

export const FallbackImage = (): ReactNode => {
  const url = 'failed-url';

  return (
    <div>
      <ImageLoader
        imgSrc={url}
        fallbackSrc={'/images/images.png'}
        {...actions}
      />
    </div>
  );
};

export const CustomLoader = (): ReactNode => {
  const url = 'https://picsum.photos/300';
  const customSkeleton = <circle cx="50" cy="50" r="50" />;

  return (
    <ImageLoader
      imgSrc={url}
      {...actions}
      loadingSkeleton={customSkeleton}
      speed={1}
      height="100px"
      width="100px"
      primaryColor={'#333'}
      secondaryColor={'#999'}
      viewBox="0 0 100 100"
    />
  );
};
