import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { List } from './List';
import { Column, Data, SortData } from './List.model';
import { ListHeader } from './ListHeader/ListHeader';
import { ListRow } from './ListRow/ListRow';
import { ListRowLoader } from './ListRow/ListRowLoader';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const mockListColumns: Column[] = [
  {
    propertyName: 'desc',
    size: '1fr',
    label: 'Description',
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

const mockListData: Data[] = [
  {
    id: '1',
    desc: 'Description 1',
    title: 'Item 1',
  },
  {
    id: '2',
    title: 'Item 2',
    desc: 'Description 2',
  },
  {
    title: 'Item 3',
    desc: 'Description 3',
    id: '3',
  },
];

describe('List', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(
      <List columns={mockListColumns} data={mockListData} />,
    );

    expect(wrapper).toBeTruthy();
  });

  it('passes down the right props to the header (default props)', () => {
    const wrapper = shallow(
      <List columns={mockListColumns} data={mockListData} />,
    );

    const header = wrapper.find(ListHeader);

    expect(header).toHaveLength(1);

    const props = header.first().props();
    expect(props.columns).toEqual(mockListColumns);
    expect(props.columnSizes).toEqual('20px 1fr 1fr 1fr 51px');
  });

  it('does not add an extra column if there is no create and action buttons', () => {
    const wrapper = mount(
      <List
        columns={mockListColumns}
        data={mockListData}
        showActionButton={false}
        showItemCheckbox={false}
      />,
    );

    const rows = wrapper.find(ListRow);
    const props = rows.first().props();

    expect(props.columnSizes).toEqual('1fr 1fr 1fr');
  });

  it.each`
    data                                                                   | count
    ${[{ row: 'one' }, { row: 'two' }, { row: 'three' }]}                  | ${3}
    ${[{ row: 'one' }, { row: 'two' }, { row: 'three' }, { row: 'four' }]} | ${4}
    ${[]}                                                                  | ${0}
  `(
    'creates the right amount of rows and sends down the right props when given $count rows',
    ({ data }: { data: Data[] }) => {
      const wrapper = mount(
        <List columns={mockListColumns} data={data} keyProperty="row" />,
      );

      const rows = wrapper.find(ListRow);

      expect(rows).toHaveLength(data.length);
      rows.forEach((row, idx) => {
        const props = row.props();
        expect(props.columns).toBe(mockListColumns);
        expect(props.columnSizes).toEqual('20px 1fr 1fr 1fr 51px');
        expect(props.data).toBe(data[idx]);
      });
    },
  );

  it("raises 'itemClicked' with correct data", () => {
    const spy = jest.fn();
    const wrapper = mount(
      <List
        columns={mockListColumns}
        data={mockListData}
        onItemClicked={spy}
      />,
    );

    const rows = wrapper.find(ListRow);

    const clickProp = rows.first().props().onItemClicked as (
      data: Data,
    ) => void;
    expect(clickProp).not.toBeNull();

    clickProp(mockListData[0]);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith(mockListData[0]);
  });

  it("renders a 'no data' message and no rows if data is an empty array", () => {
    const wrapper = shallow(<List columns={mockListColumns} data={[]} />);

    expect(wrapper.find('.NoData')).toHaveLength(1);
    expect(wrapper.find(ListRow)).toHaveLength(0);
  });

  it('raises onCreateAction event', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <List
        columns={mockListColumns}
        data={mockListData}
        onCreateAction={spy}
      />,
    );

    const header = wrapper.find(ListHeader);
    header.prop('onCreateAction')!();

    expect(header.prop('showCreateButton')).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not show create button when no handler given', () => {
    const wrapper = mount(
      <List columns={mockListColumns} data={mockListData} />,
    );

    const header = wrapper.find(ListHeader);

    expect(header.prop('showCreateButton')).toBeFalsy();
  });

  it('updates all list items when header checkbox is toggled', () => {
    const wrapper = mount(
      <List columns={mockListColumns} data={mockListData} />,
    );
    const headerRow = wrapper.find(ListHeader);
    act(() => {
      headerRow.prop('onCheckboxToggled')!(true);
    });
    wrapper.update();
    wrapper.find(ListRow).forEach(row => {
      expect(row.prop('isCheckBoxDisabled')).toBeTruthy();
    });

    act(() => {
      headerRow.prop('onCheckboxToggled')!(false);
    });
    wrapper.update();
    wrapper.find(ListRow).forEach(row => {
      expect(row.prop('isCheckBoxDisabled')).toBeFalsy();
    });
  });

  it('onItemSelected callback is called with SINGLE_ITEMS arguments when an item checkbox is clicked', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <List
        columns={mockListColumns}
        data={mockListData}
        onItemSelected={spy}
      />,
    );
    const listRow = wrapper.find(ListRow).get(0);
    act(() => {
      listRow.props.onItemSelected!(true);
    });
    expect(spy).toBeCalledWith({
      mode: 'SINGLE_ITEMS',
      items: [mockListData[0]],
    });
  });

  it('onItemSelected callback is called with SELECT_ALL arguments when the header checkbox is clicked', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <List
        columns={mockListColumns}
        data={mockListData}
        onItemSelected={spy}
      />,
    );
    const headerRow = wrapper.find(ListHeader);
    act(() => {
      headerRow.prop('onCheckboxToggled')!(true);
    });
    expect(spy).toBeCalledWith({ mode: 'SELECT_ALL' });
  });

  it('header checkbox checked state should be applied to newly fetched paginated data', () => {
    const mockNewPaginatedData: Data = [
      {
        id: '1',
        desc: 'Description 1',
        title: 'Item 1',
      },
      {
        id: '2',
        title: 'Item 2',
        desc: 'Description 2',
      },
      {
        title: 'Item 3',
        desc: 'Description 3',
        id: '3',
      },
      {
        id: '4',
        desc: 'Description 4',
        title: 'Item 4',
      },
      {
        id: '5',
        title: 'Item 5',
        desc: 'Description 5',
      },
      {
        title: 'Item 6',
        desc: 'Description 6',
        id: '6',
      },
    ];

    const wrapper = mount(
      <List columns={mockListColumns} data={mockListData} />,
    );
    const headerRow = wrapper.find(ListHeader);
    act(() => {
      headerRow.prop('onCheckboxToggled')!(true);
    });
    wrapper.update();
    wrapper.setProps({ data: mockNewPaginatedData });
    wrapper.update();

    wrapper.find(ListRow).forEach(row => {
      expect(row.prop('isCheckBoxDisabled')).toBeTruthy();
    });
  });

  it('raises onItemSelected', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <List
        columns={mockListColumns}
        data={mockListData}
        onItemSelected={spy}
      />,
    );

    const rows = wrapper.find(ListRow);
    act(() => {
      rows.at(0).prop('onItemSelected')!(true);
      rows.at(1).prop('onItemSelected')!(true);
      rows.at(1).prop('onItemSelected')!(false);
    });

    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(1, {
      mode: 'SINGLE_ITEMS',
      items: [mockListData[0]],
    });
    expect(spy).toHaveBeenNthCalledWith(2, {
      mode: 'SINGLE_ITEMS',
      items: [mockListData[0], mockListData[1]],
    });
    expect(spy).toHaveBeenNthCalledWith(3, {
      mode: 'SINGLE_ITEMS',
      items: [mockListData[0]],
    });
  });

  it('raises onRequestMoreData', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <List
        columns={mockListColumns}
        data={mockListData}
        onRequestMoreData={spy}
      />,
    );

    const onTriggered = wrapper
      .find(ListRow)
      .first()
      .prop('onTriggered');
    onTriggered!();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('loader component is rendered when isLoading = true', () => {
    const wrapper = shallow(
      <List columns={mockListColumns} data={mockListData} isLoading={true} />,
    );
    const loaderRow = wrapper.find(ListRowLoader);
    expect(loaderRow.exists()).toBe(true);
  });

  it('loader component is not rendered when isLoading = false', () => {
    const wrapper = shallow(
      <List columns={mockListColumns} data={mockListData} isLoading={false} />,
    );
    const loaderRow = wrapper.find(ListRowLoader);
    expect(loaderRow.exists()).toBe(false);
  });

  it('raises onSortChanged event with sort data', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <List
        columns={mockListColumns}
        data={mockListData}
        onSortChanged={spy}
      />,
    );

    const header = wrapper.find(ListHeader);
    const mockSortData: SortData = {
      column: 'mock-property',
      direction: 'asc',
    };

    act(() => {
      header.prop('onSortChanged')!(mockSortData);
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockSortData);
  });

  it('shows a retry button when isError is true and allows reload', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <List columns={mockListColumns} data={[]} isError={true} onRetry={spy} />,
    );

    const button = wrapper.find('button');
    button.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('displays the create button if a createAction is defined', () => {
    const wrapper = shallow(
      <List columns={mockListColumns} data={[]} onCreateAction={() => null} />,
    );
    const header = wrapper.find(ListHeader);

    expect(header.prop('showCreateButton')).toBeTruthy();
  });

  it('does not display the create button if no createAction is defined', () => {
    const wrapper = shallow(<List columns={mockListColumns} data={[]} />);
    const header = wrapper.find(ListHeader);

    expect(header.prop('showCreateButton')).toBeFalsy();
  });
});
