import { shallow } from 'enzyme';
import React from 'react';
import { FilterType, FilterTypes } from '../Filters.model';
import { FreeTextFilter } from '../SelectionTypes/FreeTextFilter/FreeTextFilter';
import { OptionsFilter } from '../SelectionTypes/OptionsFilter/OptionsFilter';
import { Filter } from './Filter';

const freeTextFilter: FilterType = {
  label: 'Created At',
  property: 'createdAt',
  type: FilterTypes.FreeText,
};

const optionFilter: FilterType = {
  label: 'Service Type',
  property: 'serviceType',
  type: FilterTypes.Options,
  options: [
    {
      label: 'CREW',
      value: 'CREW',
    },
  ],
};

const sampleText = 'sample text';
const spy = jest.fn();

describe.only('Filter', () => {
  it('FreeTextFilter is rendered only if click on filter title', () => {
    const wrapper = shallow(
      <Filter options={freeTextFilter} onFilterChange={spy} />,
    );
    expect(wrapper.find(FreeTextFilter).exists()).toBe(false);

    wrapper.find('.title').simulate('click');
    expect(wrapper.find(FreeTextFilter).exists()).toBe(true);
  });

  it('OptionsFilter is rendered only if click on filter title', () => {
    const wrapper = shallow(
      <Filter options={optionFilter} onFilterChange={spy} />,
    );
    expect(wrapper.find(OptionsFilter).exists()).toBe(false);

    wrapper.find('.title').simulate('click');
    expect(wrapper.find(OptionsFilter).exists()).toBe(true);
  });

  it('Selected filter value is displayed when a value is passed in', () => {
    const wrapper = shallow(
      <Filter
        options={freeTextFilter}
        value={sampleText}
        onFilterChange={spy}
      />,
    );

    expect(wrapper.find('.selectedValue').exists()).toBe(true);
    expect(wrapper.find('.selectedValue').text()).toEqual(sampleText);
  });

  it('Selected filter value is not displayed when no value is present', () => {
    const wrapper = shallow(
      <Filter options={freeTextFilter} onFilterChange={spy} />,
    );

    expect(wrapper.find('.selectedValue').exists()).toBe(false);
  });

  it('Raises onFilterChange with prop name and new undefined value when fliter is closed', () => {
    const mockValue = 'test-value';
    const wrapper = shallow(
      <Filter
        options={freeTextFilter}
        value={mockValue}
        onFilterChange={spy}
      />,
    );
    const closeBtn = wrapper.find('.closeBtn');

    closeBtn.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(freeTextFilter.property, undefined);
  });
});
