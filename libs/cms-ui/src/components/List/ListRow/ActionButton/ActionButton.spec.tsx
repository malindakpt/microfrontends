import React from 'react';
import { shallow } from 'enzyme';
import { ActionButton } from './ActionButton';

describe('ActionButton', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<ActionButton />);

    expect(wrapper).toBeTruthy();
  });

  it('raises the onItemClicked event', () => {
    const spy = jest.fn();
    const wrapper = shallow(<ActionButton onItemClicked={spy} />);

    wrapper.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
