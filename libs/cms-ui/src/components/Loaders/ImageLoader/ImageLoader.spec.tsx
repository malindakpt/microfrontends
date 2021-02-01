/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { shallow } from 'enzyme';
import React, { ReactNode, SyntheticEvent } from 'react';
import ContentLoader from 'react-content-loader';
import { ImageLoader } from './ImageLoader';

describe('ImageLoader', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<ImageLoader imgSrc="" />);

    expect(wrapper).toBeTruthy();
  });

  it(`gives the image element it's src, height, width, and alt attributes`, () => {
    const mockSrc = 'test-src';
    const mockHeight = 'test-height';
    const mockWidth = 'test-width';
    const mockAlt = 'test-alt';

    const wrapper = shallow(
      <ImageLoader
        imgSrc={mockSrc}
        alt={mockAlt}
        height={mockHeight}
        width={mockWidth}
      />,
    );

    const src = wrapper.find('img').prop('src');
    const height = wrapper.find('img').prop('height');
    const width = wrapper.find('img').prop('width');
    const alt = wrapper.find('img').prop('alt');

    expect(src).toBe(mockSrc);
    expect(height).toBe(mockHeight);
    expect(width).toBe(mockWidth);
    expect(alt).toBe(mockAlt);
  });

  it('renders the loading animation while an image is loading', () => {
    const wrapper = shallow(<ImageLoader imgSrc="" />);

    const loader = wrapper.find(ContentLoader);
    const imgDisplay = wrapper.find('img').prop('style')?.display;

    expect(loader.exists()).toBe(true);
    expect(imgDisplay).toBe('none');
  });

  it('renders the image after loading has completed', () => {
    const wrapper = shallow(<ImageLoader imgSrc="" />);

    wrapper.find('img').prop('onLoad')!({} as SyntheticEvent);

    const loader = wrapper.find(ContentLoader);
    const imgDisplay = wrapper.find('img').prop('style')?.display;

    expect(loader.exists()).toBe(false);
    expect(imgDisplay).toBe('block');
  });

  it('emits onLoad callback with img src after successful load', () => {
    const spy = jest.fn();
    const mockUrl = 'mock-url';
    const wrapper = shallow(<ImageLoader imgSrc={mockUrl} onLoad={spy} />);

    wrapper.find('img').prop('onLoad')!({} as SyntheticEvent);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockUrl);
  });

  it('renders the fallback background color when loading has failed', () => {
    const wrapper = shallow(<ImageLoader imgSrc="" />);

    wrapper.find('img').prop('onError')!({} as SyntheticEvent);

    const loader = wrapper.find(ContentLoader);
    const imgDisplay = wrapper.find('img').prop('style')?.display;
    const fallbackContainer = wrapper.find('.container');

    expect(loader.exists()).toBe(false);
    expect(imgDisplay).toBe('none');
    expect(fallbackContainer.hasClass('fallback')).toEqual(true);
  });

  it('renders a fallback image when loading has failed', () => {
    const mockFallbackUrl = 'mock-url';
    const wrapper = shallow(
      <ImageLoader imgSrc="" fallbackSrc={mockFallbackUrl} />,
    );

    wrapper.find('img').prop('onError')!({} as SyntheticEvent);

    const loader = wrapper.find(ContentLoader);
    const imgs = wrapper.find('img');
    const fallbackContainer = wrapper.find('.container');

    expect(loader.exists()).toBe(false);
    expect(imgs.at(0).prop('style')?.display).toBe('none'); // hidden failed image
    expect(fallbackContainer.exists()).toBe(false); // no background color
    expect(imgs.at(1).exists()).toBe(true); // fallback image
    expect(imgs.at(1).prop('src')).toBe(mockFallbackUrl);
    expect(imgs.at(1).prop('height')).toBe('50px');
    expect(imgs.at(1).prop('width')).toBe('50px');
  });

  it('emits onError callback with img src after load failure', () => {
    const spy = jest.fn();
    const mockUrl = 'mock-url';
    const wrapper = shallow(<ImageLoader imgSrc={mockUrl} onError={spy} />);

    wrapper.find('img').prop('onError')!({} as SyntheticEvent);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockUrl);
  });

  it('replaces default loading SVG with a custom SVG', () => {
    const mockId = 'mock-id';
    const mockSVG: ReactNode = (
      <svg id={mockId}>
        <circle r="50" />
      </svg>
    );
    const wrapper = shallow(
      <ImageLoader imgSrc="" loadingSkeleton={mockSVG} />,
    );

    const svg = wrapper.find(`#${mockId}`);

    expect(svg.exists()).toBe(true);
  });

  it('default square skeleton should take up the full space of the loader by default', () => {
    const wrapper = shallow(<ImageLoader imgSrc="" />);

    const loader = wrapper.find(ContentLoader);
    const skeleton = wrapper.find('rect');

    expect(skeleton.prop('width')).toBe('100%');
    expect(skeleton.prop('height')).toBe('100%');
    expect(loader.prop('viewBox')).toBe('0 0 100 100');
  });

  it('passes svg viewbox, animation speed, color props to ContentLoader', () => {
    const mockSpeed = 1;
    const mockPrimaryColor = '#CCC';
    const mockSecondaryColor = '#FFF';
    const mockViewbox = '75 75 75 75';
    const wrapper = shallow(
      <ImageLoader
        imgSrc=""
        speed={mockSpeed}
        primaryColor={mockPrimaryColor}
        secondaryColor={mockSecondaryColor}
        viewBox={mockViewbox}
      />,
    );

    const loader = wrapper.find(ContentLoader);

    expect(loader.prop('speed')).toBe(mockSpeed);
    expect(loader.prop('primaryColor')).toBe(mockPrimaryColor);
    expect(loader.prop('secondaryColor')).toBe(mockSecondaryColor);
    expect(loader.prop('viewBox')).toBe(mockViewbox);
  });

  it(`loader dimensions defaults to '50px' by '50px'`, () => {
    const wrapper = shallow(<ImageLoader imgSrc="" />);

    const container = wrapper
      .find('.container')
      .prop('style') as React.CSSProperties;

    expect(container.height).toBe('50px');
    expect(container.width).toBe('50px');
  });

  it('sets the height and width of the loader', () => {
    const mockHeight = '15px';
    const mockWidth = '75px';
    const wrapper = shallow(
      <ImageLoader imgSrc="" height={mockHeight} width={mockWidth} />,
    );

    const container = wrapper
      .find('.container')
      .prop('style') as React.CSSProperties;

    expect(container.height).toBe(mockHeight);
    expect(container.width).toBe(mockWidth);
  });
});
