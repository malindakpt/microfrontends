import { shallow } from 'enzyme';
import React from 'react';
import { ReadOnlyField } from './ReadOnlyField';

describe('ReadOnlyField', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<ReadOnlyField />);

    expect(wrapper).toBeTruthy();
  });

  it('displays a label', () => {
    const mockLabel = 'mockLabel';
    const wrapper = shallow(<ReadOnlyField label={mockLabel} />);

    const label = wrapper.find('label');

    expect(label.text()).toBe(mockLabel);
  });

  it('renders the value', () => {
    const mockValue = 'mockLabel';
    const wrapper = shallow(<ReadOnlyField value={mockValue} />);

    const value = wrapper.find('.value');

    expect(value.text()).toBe(mockValue);
  });

  it('defaults to empty strings for label and value', () => {
    const mockDefaults = '';
    const wrapper = shallow(<ReadOnlyField />);

    const label = wrapper.find('label');
    const value = wrapper.find('.value');

    expect(label.text()).toBe(mockDefaults);
    expect(value.text()).toBe(mockDefaults);
  });
});
