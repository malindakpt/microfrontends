import { mount, ReactWrapper, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { TileLarge, TileLargeProps } from './TileLarge';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const mockProps: TileLargeProps = {
  path: 'test-path',
  label: 'test-label',
  icon: '/images/test-icon.png',
  type: 'large',
  subtitle: '48',
};

describe('TileLarge', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<TileLarge {...mockProps} />);
    expect(wrapper).toBeTruthy();
  });

  it('renders the tile label and subtile', () => {
    const wrapper = mount(
      <MemoryRouter>
        <TileLarge {...mockProps} />
      </MemoryRouter>,
    );

    const label = wrapper.find('.label');
    const subtitle = wrapper.find('.subtitle');

    expect(label.text()).toBe(mockProps.label);
    expect(subtitle.text()).toBe(mockProps.subtitle);
  });

  it('renders the tile subtile when a callback function is passed', async () => {
    let wrapper: ReactWrapper;
    await act(async () => {
      wrapper = await mount(
        <MemoryRouter>
          <TileLarge {...mockProps} subtitle={() => Promise.resolve('135')} />
        </MemoryRouter>,
      );
    });

    const realWrapper = wrapper!;

    const subtitle = realWrapper.find('.subtitle');
    expect(subtitle.text()).toBe('135');
  });

  it('does not show a subtitle in case of an error', async () => {
    let wrapper: ReactWrapper;
    await act(async () => {
      wrapper = await mount(
        <MemoryRouter>
          <TileLarge {...mockProps} subtitle={() => Promise.reject('')} />
        </MemoryRouter>,
      );
    });

    const subtitle = wrapper!.find('.subtitle');
    expect(subtitle.text()).toBe('');
  });
  it.todo('does show a loading indicator while the subtitle is loading');

  it('renders an empty string if no subtitle is found', () => {
    const wrapper = mount(
      <MemoryRouter>
        <TileLarge {...mockProps} subtitle={undefined} />
      </MemoryRouter>,
    );

    const subtitle = wrapper.find('.subtitle');

    expect(subtitle.text()).toBe('');
  });

  it('renders an icon', () => {
    const wrapper = shallow(<TileLarge {...mockProps} />);
    const iconUrl = wrapper.find('.icon').prop('src');

    expect(iconUrl).toBe(`${mockProps.icon}`);
  });

  it('to attrubute is not exists disabled class should be applied when disabled', () => {
    const wrapper = shallow(
      <TileLarge {...{ ...mockProps, disabled: true }} />,
    );
    const tile = wrapper.find('.container');
    const toAttr = tile.prop('to');

    expect(tile.hasClass('disabled')).toEqual(true);
    expect(toAttr).toStrictEqual({ pathname: undefined });
  });

  it('creates a hyperlink using the path prop', () => {
    const wrapper = shallow(<TileLarge {...mockProps} />);

    const navLink = wrapper.find('.container').prop('to');

    expect(navLink).toEqual({ pathname: mockProps.path });
  });

  it('sets row and column spans from props', () => {
    const mockColumnSpan = 3;
    const mockRowSpan = 1;
    const wrapper = shallow(
      <TileLarge
        {...mockProps}
        largeTileColumnSpan={mockColumnSpan}
        largeTileRowSpan={mockRowSpan}
      />,
    );

    const navStyles = wrapper
      .find('.container')
      .prop('style') as React.CSSProperties;

    expect(navStyles.gridColumn).toBe(`span ${mockColumnSpan}`);
    expect(navStyles.gridRow).toBe(`span ${mockRowSpan}`);
  });
});
