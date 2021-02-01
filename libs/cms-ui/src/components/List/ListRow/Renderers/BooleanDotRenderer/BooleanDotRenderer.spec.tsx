import { shallow } from 'enzyme';
import { createBooleanDotRenderer } from './BooleanDotRenderer';
import React from 'react';
import { Data } from 'components';

interface RendererWrapperProps {
  /** Column data */
  value: unknown;
  /** Row data */
  data: Data;
}

const RendererWrapper: React.FC<RendererWrapperProps> = ({ value }) => {
  return <>{createBooleanDotRenderer()(value, [])}</>;
};

const defaultProps: RendererWrapperProps = {
  value: '',
  data: {},
};

describe('BooleanDotRenderer', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<RendererWrapper {...defaultProps} />);
    expect(wrapper).toBeTruthy();
  });

  it('renders the red dot when false is passed', () => {
    const wrapper = shallow(
      <RendererWrapper {...defaultProps} value={false} />,
    );
    const dot = wrapper.find('.red');
    expect(dot).toHaveLength(1);
  });

  it('renders the green dot when true is passed', () => {
    const wrapper = shallow(<RendererWrapper {...defaultProps} value={true} />);
    const dot = wrapper.find('.green');
    expect(dot).toHaveLength(1);
  });
});
