import { shallow } from 'enzyme';
import React from 'react';
import { DateTimeField } from './DateTimeField';

const mockDateFormatter = new Intl.DateTimeFormat(navigator.language, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

describe('DateTimeField', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<DateTimeField />);

    expect(wrapper).toBeTruthy();
  });

  it('displays a label', () => {
    const mockLabel = 'mockLabel';
    const wrapper = shallow(<DateTimeField label={mockLabel} />);

    const label = wrapper.find('label');

    expect(label.text()).toBe(mockLabel);
  });

  it('renders the value from string', () => {
    const mockValue = '2020-04-27T15:28:38.050419+05:30';
    const formattedVal = mockDateFormatter.format(new Date(mockValue));
    const wrapper = shallow(<DateTimeField value={mockValue} />);

    const value = wrapper.find('.value');
    expect(value.text()).toBe(formattedVal);
  });

  it('renders the value from number', () => {
    const mockValue = 1587981518050;
    const formattedVal = mockDateFormatter.format(new Date(mockValue));
    const wrapper = shallow(<DateTimeField value={mockValue} />);

    const value = wrapper.find('.value');
    expect(value.text()).toBe(formattedVal);
  });

  it('renders the value from Date', () => {
    const mockValue = new Date(1587981518050);
    const formattedVal = mockDateFormatter.format(mockValue);
    const wrapper = shallow(<DateTimeField value={mockValue} />);

    const value = wrapper.find('.value');
    expect(value.text()).toBe(formattedVal);
  });

  it('defaults to empty strings for label and value', () => {
    const mockDefaults = '';
    const wrapper = shallow(<DateTimeField />);

    const label = wrapper.find('label');
    const value = wrapper.find('.value');

    expect(label.text()).toBe(mockDefaults);
    expect(value.text()).toBe(mockDefaults);
  });
});
