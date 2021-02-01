import { shallow } from 'enzyme';
import React from 'react';
import { TileSmall, TileSmallProps } from './TileSmall';

const mockProps: TileSmallProps = {
  path: 'test-path',
  label: 'test-label',
  icon: '/images/test-icon.png',
  type: 'small',
};

describe('TileSmall', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<TileSmall {...mockProps} />);

    expect(wrapper).toBeTruthy();
  });

  it('renders the tile label', () => {
    const wrapper = shallow(<TileSmall {...mockProps} />);

    const label = wrapper.find('.label');

    expect(label.text()).toBe(mockProps.label);
  });

  it('renders an icon', () => {
    const wrapper = shallow(<TileSmall {...mockProps} />);
    const iconUrl = wrapper.find('.icon').prop('src');

    expect(iconUrl).toBe(`${mockProps.icon}`);
  });

  it('to attrubute is not exists disabled class should be applied when disabled', () => {
    const wrapper = shallow(
      <TileSmall {...{ ...mockProps, disabled: true }} />,
    );
    const tile = wrapper.find('.container');
    const toAttr = tile.prop('to');

    expect(tile.hasClass('disabled')).toEqual(true);
    expect(toAttr).toStrictEqual({ pathname: undefined });
  });

  it('creates a hyperlink using the path prop', () => {
    const wrapper = shallow(<TileSmall {...mockProps} />);

    const navLink = wrapper.find('.container').prop('to');

    expect(navLink).toEqual({ pathname: mockProps.path });
  });

  it('sets row and column spans from props', () => {
    const mockColumnSpan = 3;
    const mockRowSpan = 1;
    const wrapper = shallow(
      <TileSmall
        {...mockProps}
        smallTileColumnSpan={mockColumnSpan}
        smallTileRowSpan={mockRowSpan}
      />,
    );

    const navStyles = wrapper
      .find('.container')
      .prop('style') as React.CSSProperties;

    expect(navStyles.gridColumn).toBe(`span ${mockColumnSpan}`);
    expect(navStyles.gridRow).toBe(`span ${mockRowSpan}`);
  });
});
