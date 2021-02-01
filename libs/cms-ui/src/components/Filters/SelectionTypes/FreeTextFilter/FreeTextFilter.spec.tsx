import { shallow } from 'enzyme';
import React from 'react';
import { FreeTextFilter } from './FreeTextFilter';

const spy = jest.fn();
const sampleText = 'test';
// const filterObj = { $regex: sampleText, $options: 'i' };

describe('FreeTextFilter', () => {
  it('Filter input is rendered', () => {
    const wrapper = shallow(<FreeTextFilter onSelect={spy} />);
    expect(wrapper.find('.inputValue').exists()).toBeTruthy();
  });

  it('Entered text on filter should be popped', () => {
    const wrapper = shallow(<FreeTextFilter onSelect={spy} />);
    const input = wrapper.shallow().find('.inputValue');

    input.simulate('keydown', { key: 'Enter', target: { value: sampleText } });
    expect(spy).toHaveBeenCalledWith(sampleText);
  });
});
