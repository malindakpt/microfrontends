import { ImageLoader } from 'components/Loaders';
import { shallow } from 'enzyme';
import { Data } from 'index';
import React from 'react';
import { createThumbnailRenderer } from './ThumbnailRenderer';

interface RendererWrapperProps {
  /** Column data */
  value: unknown;
  /** Row data */
  data: Data;
}

const defaultProps: RendererWrapperProps = {
  value: '',
  data: {},
};

const RendererWrapper: React.FC<RendererWrapperProps> = ({ value, data }) => {
  return <>{createThumbnailRenderer()(value, data)}</>;
};

describe('ThumbnailRenderer', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<RendererWrapper {...defaultProps} />);
    expect(wrapper).toBeTruthy();
  });

  it('renders an image using the imgSrc prop', () => {
    const mockUrl = '/location/image.png';

    const wrapper = shallow(
      <RendererWrapper {...defaultProps} value={mockUrl} />,
    );

    const imageUrl = wrapper.find(ImageLoader).prop('imgSrc');

    expect(imageUrl).toBe(mockUrl);
  });

  it('falls back to explorer-row-thumbnail-bg-color if no imgSrc value', () => {
    const wrapper = shallow(
      <RendererWrapper {...defaultProps} value={undefined} />,
    );

    const background = wrapper.find('div');
    const imageUrl = wrapper.find('img');

    expect(background.hasClass('noImage')).toBe(true);
    expect(imageUrl.exists()).toBe(false);
  });
});
