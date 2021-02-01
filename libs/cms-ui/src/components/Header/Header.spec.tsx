import { shallow } from 'enzyme';
import React from 'react';
import { Auth, AuthProps } from './Auth/Auth';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';
import { Header } from './Header';
import { Breadcrumb } from './Header.models';
import { User } from '@ax/core';

const mockBreadcrumbs: Breadcrumb[] = [];
const mockAuthProps: AuthProps = {
  user: { name: 'Mock User Name' } as User,
  logout: () => null,
};

describe('Header', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(
      <Header crumbs={mockBreadcrumbs} auth={mockAuthProps} />,
    );

    expect(wrapper).toBeTruthy();
  });

  it('passes props to Breadcrumbs and Auth components', () => {
    const wrapper = shallow(
      <Header crumbs={mockBreadcrumbs} auth={mockAuthProps} />,
    );

    const breadcrumbs = wrapper.find(Breadcrumbs).prop('crumbs');
    const authProps = wrapper.find(Auth).props();

    expect(breadcrumbs).toBe(mockBreadcrumbs);
    expect(authProps).toEqual(mockAuthProps);
  });

  it('supports child elements', () => {
    const wrapper = shallow(
      <Header crumbs={mockBreadcrumbs} auth={mockAuthProps}>
        <div id="test-child"></div>
      </Header>,
    );

    const child = wrapper.find('#test-child');

    expect(child).toHaveLength(1);
  });
});
