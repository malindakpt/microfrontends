import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { Option } from '../../Filters.model';
import { OptionsFilter } from './OptionsFilter';

const options: Option[] = [
  {
    label: 'option 1',
    value: 'value 1',
  },
  {
    label: 'option 2',
    value: 'value 2',
  },
];

const spy = jest.fn();

describe('OptionsFilter', () => {
  it('Empty options array for options param will not render any options to select', () => {
    const wrapper = shallow(<OptionsFilter options={[]} onSelect={spy} />);
    expect(wrapper.find('.option')).toHaveLength(0);
  });

  it('Provided options for filter are rendered', () => {
    const wrapper = shallow(<OptionsFilter options={options} onSelect={spy} />);
    expect(wrapper.find('.option')).toHaveLength(2);
  });

  it('selected option on filter is poped when click on it', () => {
    const wrapper = shallow(<OptionsFilter options={options} onSelect={spy} />);
    const selectableOption: ShallowWrapper = wrapper
      .shallow()
      .find('.option')
      .first();
    selectableOption.simulate('click');
    expect(spy).toHaveBeenCalledWith(options[0].value);
  });
});
