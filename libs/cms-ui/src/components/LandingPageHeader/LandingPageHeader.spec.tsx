import React from 'react';
import { shallow } from 'enzyme';
import { LandingPageHeader } from './LandingPageHeader';

describe('LandingPageHeader', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(
      <LandingPageHeader title={'test-title'} subtitle={'test-title'} />,
    );

    expect(wrapper).toBeTruthy();
  });

  it('renders a title and subtitle', () => {
    const mockTitle = 'test-title';
    const mockSubtitle = 'test-subtitle';
    const wrapper = shallow(
      <LandingPageHeader title={mockTitle} subtitle={mockSubtitle} />,
    );

    const title = wrapper.find('.title');
    const subtitle = wrapper.find('.subtitle');

    expect(title.text()).toBe(mockTitle);
    expect(subtitle.text()).toBe(mockSubtitle);
  });
});
