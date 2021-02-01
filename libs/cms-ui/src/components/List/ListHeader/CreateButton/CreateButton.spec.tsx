import React from 'react';
import { shallow } from 'enzyme';
import { CreateButton } from './CreateButton';

describe('CreateButton', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<CreateButton />);

    expect(wrapper).toBeTruthy();
  });

  it('raises the onCreateAction event', () => {
    const spy = jest.fn();
    const wrapper = shallow(<CreateButton onCreateAction={spy} />);

    wrapper.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
