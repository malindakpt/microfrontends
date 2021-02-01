import { shallow } from 'enzyme';
import React from 'react';
import { Auth, AuthProps } from './Auth';
import { User } from '@ax/core';

const mockProps: AuthProps = {
  user: { name: 'Mock User' } as User,
  logout: jest.fn(),
};

describe('Auth', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<Auth />);

    expect(wrapper).toBeTruthy();
  });

  it('displays a user name', () => {
    const wrapper = shallow(<Auth user={mockProps.user} />);

    const name = wrapper.find('.userName');

    expect(name.text()).toBe(mockProps.user?.name);
  });

  it('defaults user name to an empty string if no user prop is passed in', () => {
    const wrapper = shallow(<Auth />);

    const name = wrapper.find('.userName');

    expect(name.text()).toBe('');
  });
});
