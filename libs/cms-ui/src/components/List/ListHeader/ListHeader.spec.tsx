import { mount, shallow } from 'enzyme';
import React from 'react';
import { Column, SortData } from '../List.model';
import { ListCheckBox } from '../ListCheckBox/ListCheckBox';
import { CreateButton } from './CreateButton/CreateButton';
import { ListHeader, ListHeaderProps } from './ListHeader';
import { ColumnLabel } from './ColumnLabel/ColumnLabel';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const mockListColumns: Column[] = [
  {
    propertyName: 'desc',
    size: '1fr',
    label: 'Description',
    sortable: false,
  },
  {
    propertyName: 'id',
    size: '1fr',
    label: 'Id',
  },
  {
    propertyName: 'title',
    size: '1fr',
    label: 'Title',
  },
];

const mockProps: ListHeaderProps = {
  columns: mockListColumns,
  columnSizes: '1fr',
  columnGap: '5px',
  rowHeight: '44px',
  horizontalTextAlign: 'left',
  verticalTextAlign: 'center',
};

describe('ListHeader', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<ListHeader {...mockProps} />);

    expect(wrapper).toBeTruthy();
  });

  it('renders a column for each object in the columns props', () => {
    const wrapper = shallow(<ListHeader {...mockProps} />);

    const columns = wrapper.find(ColumnLabel);

    expect(columns).toHaveLength(mockListColumns.length);
  });

  it('renders the columns in the correct order', () => {
    const wrapper = shallow(<ListHeader {...mockProps} />);

    // const columns = wrapper.find('.List-header-items');
    const columns = wrapper.find('div').filterWhere(item => {
      return item.prop('className') === 'headerItem';
    });

    columns.forEach((column, idx) => {
      expect(column.key()).toEqual(mockListColumns[idx].propertyName);
      expect(column.childAt(0).text()).toEqual(mockListColumns[idx].label);
    });
  });

  it('raises onCreateAction event', () => {
    const spy = jest.fn();
    const wrapper = mount(<ListHeader {...mockProps} onCreateAction={spy} />);

    const btn = wrapper.find(CreateButton);
    btn.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('raises onCheckboxToggled event', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <ListHeader {...mockProps} onCheckboxToggled={spy} />,
    );

    const chk = wrapper.find(ListCheckBox);
    chk.prop('onCheckBoxToggled')!(true);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('renders no Checkbox if told', () => {
    const wrapper = shallow(
      <ListHeader {...mockProps} showItemCheckbox={false} />,
    );

    expect(wrapper.find(ListCheckBox)).toHaveLength(0);
  });

  it('renders CreateButton component by default', () => {
    const wrapper = shallow(<ListHeader {...mockProps} />);

    const create = wrapper.find(CreateButton);

    expect(create.exists()).toBe(true);
  });

  it('hides CreateButton component when showCreateButton is false', () => {
    const wrapper = shallow(
      <ListHeader {...mockProps} showCreateButton={false} />,
    );

    const create = wrapper.find(CreateButton);

    expect(create.exists()).toBe(false);
  });

  it('raises onSortChanged event with sort data', () => {
    const spy = jest.fn();
    const mockSortData: SortData = {
      column: 'mock-property',
      direction: 'asc',
    };
    const wrapper = mount(<ListHeader {...mockProps} onSortChanged={spy} />);

    const chk = wrapper.find(ListHeader);
    chk.prop('onSortChanged')!(mockSortData);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockSortData);
  });

  it('renders ColumnLabels with correct "sortable" settings', () => {
    const wrapper = shallow(<ListHeader {...mockProps} />);

    const columnLabel = wrapper.find(ColumnLabel);

    expect(columnLabel.length).toBe(3);

    expect(columnLabel.at(0).prop('sortable')).toEqual(false);
    expect(columnLabel.at(1).prop('sortable') ?? true).toBe(true);
  });

  it.todo('reacts meaningfully when the columns are empty');
});
