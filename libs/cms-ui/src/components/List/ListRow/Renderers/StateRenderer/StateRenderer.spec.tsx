import { ColumnMap, Data } from 'components/List/List.model';
import { shallow } from 'enzyme';
import React from 'react';
import { createStateRenderer } from './StateRenderer';

const stateMap: ColumnMap = {
  success: '#68a357',
  failure: 'red',
  warning: 'rgba(255, 165, 0, 1)',
};

interface RendererWrapperProps {
  /** Column data */
  value: unknown;
  /** Row data */
  data: Data;
  map: {};
}

const defaultProps: RendererWrapperProps = {
  value: '',
  data: {},
  map: stateMap,
};

const RendererWrapper: React.FC<RendererWrapperProps> = ({
  value = '',
  data,
  map = {},
}) => {
  return <>{createStateRenderer(map)(value, data)}</>;
};

describe('StateRenderer', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<RendererWrapper {...defaultProps} />);
    expect(wrapper).toBeTruthy();
  });

  it('renders a background color', () => {
    const stateValues = Object.keys(stateMap);
    const mockState =
      stateValues[Math.floor(Math.random() * stateValues.length)];

    const wrapper = shallow(
      <RendererWrapper {...defaultProps} value={mockState} />,
    );

    const container = wrapper
      .find('.container')
      .prop('style') as React.CSSProperties;

    expect(container.backgroundColor).toBe(stateMap[mockState]);
  });

  it('does not render a background color if mapping fails', () => {
    const mockState = 'pending';
    const wrapper = shallow(
      <RendererWrapper {...defaultProps} value={mockState} />,
    );
    expect(wrapper).toBeTruthy();

    const container = wrapper
      .find('.container')
      .prop('style') as React.CSSProperties;

    expect(container.backgroundColor).toBe(undefined);
  });
});
