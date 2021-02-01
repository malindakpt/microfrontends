import { mount, shallow } from 'enzyme';
import React from 'react';
import { Filter } from './Filter/Filter';
import { Filters } from './Filters';
import { FilterType, FilterTypes, FilterValues } from './Filters.model';
import { FreeTextFilter } from './SelectionTypes/FreeTextFilter/FreeTextFilter';
import { OptionsFilter } from './SelectionTypes/OptionsFilter/OptionsFilter';

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

const spy = jest.fn();

describe('Filters', () => {
  it('Filter is rendered and FreeTextFilter is not rendered', () => {
    const wrapper = shallow(
      <Filters options={[freeTextFilter]} onFiltersChange={spy} />,
    );
    expect(wrapper.find(Filter).exists()).toBe(true);
    expect(wrapper.find(FreeTextFilter).exists()).toBe(false);
  });

  it('Filter is rendered and OptionsFilter is not rendered', () => {
    const wrapper = shallow(
      <Filters options={[optionFilter]} onFiltersChange={spy} />,
    );
    expect(wrapper.find(Filter).exists()).toBe(true);
    expect(wrapper.find(OptionsFilter).exists()).toBe(false);
  });

  it(`renders the Filter container's styles when there are filters `, () => {
    const wrapper = shallow(
      <Filters options={[optionFilter]} onFiltersChange={spy} />,
    );
    expect(wrapper.find('.container').exists()).toBe(true);
  });

  it(`does not render the Filter container's styles when there are no filters `, () => {
    const wrapper = shallow(<Filters />);
    expect(wrapper.find('.container').exists()).toBe(false);
  });

  it(`renders active filters when the component is loaded`, () => {
    const mockActiveFilters: FilterValues = {
      serviceType: 'CREW',
      createdAt: 'entered-value',
    };
    const wrapper = mount(
      <Filters
        options={[optionFilter, freeTextFilter]}
        onFiltersChange={spy}
        defaultValues={mockActiveFilters}
      />,
    );
    const activeFilters = wrapper.find('.selectedValue>span');

    activeFilters.forEach((filterLabel, index) => {
      expect(filterLabel.text()).toBe(Object.values(mockActiveFilters)[index]);
    });
  });
});
