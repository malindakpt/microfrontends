import { shallow } from 'enzyme';
import React from 'react';
import { SortData } from '../../List.model';
import { ColumnLabel } from './ColumnLabel';

describe('ColumnLabel', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<ColumnLabel propertyName={'test-prop'} />);

    expect(wrapper).toBeTruthy();
  });

  it('renders a label', () => {
    const mockLabel = 'test-label';
    const wrapper = shallow(
      <ColumnLabel propertyName={'test-prop'} label={mockLabel} />,
    );

    const label = wrapper.find('.label');

    expect(label.text()).toBe(mockLabel);
  });

  it('defaults to the property name if no label prop is passed in', () => {
    const mockPropName = 'test-prop';
    const wrapper = shallow(<ColumnLabel propertyName={mockPropName} />);

    const label = wrapper.find('.label');

    expect(label.text()).toBe(mockPropName);
  });

  it('renders the directional arrows by default', () => {
    const wrapper = shallow(<ColumnLabel propertyName={'test-prop'} />);

    const dirArrows = wrapper.find('svg');
    const container = wrapper.find('.container');

    expect(dirArrows.exists()).toBe(true);
    expect(container.hasClass('sortable')).toEqual(true);
  });

  it('renders a label and no directional arrows if sorting is disabled', () => {
    const mockLabel = 'test-label';
    const wrapper = shallow(
      <ColumnLabel
        propertyName={'test-prop'}
        label={mockLabel}
        sortable={false}
      />,
    );

    const label = wrapper.find('.label');
    const dirArrows = wrapper.find('svg');
    const container = wrapper.find('.container');

    expect(label.text()).toBe(mockLabel);
    expect(dirArrows.exists()).toBe(false);
    expect(container.hasClass('sortable')).toEqual(false);
  });

  it(`sorts by 'ascending' order on initial sort`, () => {
    const spy = jest.fn();
    const mockColumnName = 'test-prop';
    const wrapper = shallow(
      <ColumnLabel
        propertyName={mockColumnName}
        sortData={undefined}
        onSortChanged={spy}
      />,
    );

    const columnTitle = wrapper.find('.container');
    columnTitle.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      column: mockColumnName,
      direction: 'asc',
    });
  });

  it(`sorts by 'ascending' order when sorting by another column`, () => {
    const spy = jest.fn();
    const mockSortData: SortData = {
      column: 'test-prop-1',
      direction: 'asc',
    };
    const mockColumnName = 'test-prop-2';
    const wrapper = shallow(
      <ColumnLabel
        propertyName={mockColumnName}
        onSortChanged={spy}
        sortData={mockSortData}
      />,
    );

    const columnTitle = wrapper.find('.container');
    columnTitle.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      column: mockColumnName,
      direction: 'asc',
    });
  });

  it(`toggles sorting to 'descending' when sorting by 'ascending' in the same column`, () => {
    const spy = jest.fn();
    const mockSortData: SortData = {
      column: 'test-prop',
      direction: 'asc',
    };
    const wrapper = shallow(
      <ColumnLabel
        propertyName={mockSortData.column}
        onSortChanged={spy}
        sortData={mockSortData}
      />,
    );

    const columnTitle = wrapper.find('.container');
    columnTitle.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      column: mockSortData.column,
      direction: 'desc',
    });
  });

  it(`toggles sorting to 'ascending' when sorting by 'descending' in the same column`, () => {
    const spy = jest.fn();
    const mockSortData: SortData = {
      column: 'test-prop',
      direction: 'desc',
    };
    const wrapper = shallow(
      <ColumnLabel
        propertyName={mockSortData.column}
        onSortChanged={spy}
        sortData={mockSortData}
      />,
    );

    const columnTitle = wrapper.find('.container');
    columnTitle.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      column: mockSortData.column,
      direction: 'asc',
    });
  });

  it(`highlights up arrow when sort direction is 'ascending'`, () => {
    const mockSortData: SortData = {
      column: 'test-prop',
      direction: 'asc',
    };
    const wrapper = shallow(
      <ColumnLabel
        propertyName={mockSortData.column}
        sortData={mockSortData}
      />,
    );

    const upArrow = wrapper.find('polygon').first();

    expect(upArrow.hasClass('sorted')).toBe(true);
  });

  it(`highlights up arrow when sort direction is 'descending'`, () => {
    const mockSortData: SortData = {
      column: 'test-prop',
      direction: 'desc',
    };
    const wrapper = shallow(
      <ColumnLabel
        propertyName={mockSortData.column}
        sortData={mockSortData}
      />,
    );

    const downArrow = wrapper.find('polygon').last();

    expect(downArrow.hasClass('sorted')).toBe(true);
  });
});
