import { shallow } from 'enzyme';
import React, { ReactNode } from 'react';
import ContentLoader from 'react-content-loader';
import { Loader } from './Loader';

describe('Loader component', () => {
  it('renders the container div if showLoader is set to true', () => {
    const wrapper = shallow(<Loader showLoader={true} />);
    expect(wrapper.exists('.container')).toBe(true);
  });

  it('container div should not be rendered if showLoader is set to false', () => {
    const wrapper = shallow(<Loader showLoader={false} />);
    expect(wrapper.exists('.container')).toBe(false);
  });

  it('container is styled with default styles if no optional styles are provided', () => {
    const wrapper = shallow(<Loader showLoader={true} />);
    const gridStyles = wrapper
      .find('.container')
      .prop('style') as React.CSSProperties;
    expect(gridStyles.width).toBe(100);
  });

  it('container is styled with the custom width if width is provided with props', () => {
    const width = 120;
    const wrapper = shallow(<Loader showLoader={true} width={width} />);
    const gridStyles = wrapper
      .find('.container')
      .prop('style') as React.CSSProperties;
    expect(gridStyles.width).toBe(width);
  });

  it('replaces default loading SVG with a custom SVG', () => {
    const mockId = 'mock-id';
    const mockSVG: ReactNode = (
      <svg id={mockId}>
        <circle r="50" />
      </svg>
    );

    const wrapper = shallow(
      <Loader showLoader={true} loadingSkeleton={mockSVG} />,
    );

    const svg = wrapper.find(`#${mockId}`);

    expect(svg.exists()).toBe(true);
  });

  it('passes svg viewbox, animation speed, color props to ContentLoader', () => {
    const mockSpeed = 1;
    const mockPrimaryColor = '#CCC';
    const mockSecondaryColor = '#FFF';
    const mockViewbox = '75 75 75 75';
    const wrapper = shallow(
      <Loader
        showLoader={true}
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

  // Height attr is not tested here since its set inside the SVG image
});
