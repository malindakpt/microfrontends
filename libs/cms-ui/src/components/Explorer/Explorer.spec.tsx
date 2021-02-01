import { mount, ReactWrapper, shallow } from 'enzyme';
import {
  actWithReturn,
  createExpectComponentReceivesValue,
} from 'helpers/testing';
import React from 'react';
import { act } from 'react-dom/test-utils';
import * as GS from '../../components/AxinomCMS/State/GlobalState';
import { ActionData, Actions } from '../Actions';
import { Filters } from '../Filters/Filters';
import { FilterTypes, FilterValues } from '../Filters/Filters.model';
import { Column, SortData } from '../List';
import { List } from '../List/List';
import { PageHeader } from '../PageHeader/PageHeader';
import { Explorer, ExplorerProps } from './Explorer';
import { ExplorerDataProvider } from './Explorer.model';

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

const getDataProvider = () => {
  const spy = jest.fn();
  return [
    {
      loadData: spy,
    } as ExplorerDataProvider,
    spy,
  ] as const;
};

describe('Explorer', () => {
  it('renders the component without crashing', () => {
    const [provider] = getDataProvider();
    const wrapper = shallow(
      <Explorer
        columns={mockListColumns}
        dataProvider={provider}
        stationKey="mock-key"
      />,
    );

    expect(wrapper).toBeTruthy();
  });

  describe('Bulk actions', () => {
    it.each([undefined, [] as ActionData[]])(
      'does not render checkboxes if no bulk actions are given',
      option => {
        const [provider] = getDataProvider();

        const wrapper = shallow(
          <Explorer
            columns={mockListColumns}
            dataProvider={provider}
            stationKey="mock-key"
            bulkActions={option}
          />,
        );

        const list = wrapper.find(List);
        expect(list.prop('showItemCheckbox')).toBeFalsy();
      },
    );

    it('does render checkboxes if bulk actions are given', () => {
      const [provider] = getDataProvider();

      const wrapper = shallow(
        <Explorer
          columns={mockListColumns}
          dataProvider={provider}
          stationKey="mock-key"
          bulkActions={[{ actionId: 'something', label: 'Something' }]}
        />,
      );

      const list = wrapper.find(List);
      expect(list.prop('showItemCheckbox')).toBeTruthy();

      // Select an item
      list.prop('onItemSelected')!({ mode: 'SELECT_ALL' });

      expect(wrapper.exists(Actions)).toBeTruthy();

      // Unselect an item
      list.prop('onItemSelected')!({ mode: 'SINGLE_ITEMS', items: [] });

      expect(wrapper.exists(Actions)).toBeFalsy();
    });

    it('triggers SELECT_ALL mode actions', () => {
      const [provider] = getDataProvider();
      const spy = jest.fn();

      const wrapper = shallow(
        <Explorer
          columns={mockListColumns}
          dataProvider={provider}
          stationKey="mock-key"
          bulkActions={[{ actionId: 'something', label: 'Something' }]}
          onBulkActionSelected={spy}
        />,
      );

      const list = wrapper.find(List);

      // Select an item
      list.prop('onItemSelected')!({ mode: 'SELECT_ALL' });

      const actions = wrapper.find(Actions);
      actions.prop('onActionSelected')!('testAction');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('testAction', {
        mode: 'SELECT_ALL',
      });
    });

    it('triggers SINGLE_ITEMS mode actions', () => {
      const [provider] = getDataProvider();
      const spy = jest.fn();

      const wrapper = shallow(
        <Explorer
          columns={mockListColumns}
          dataProvider={provider}
          stationKey="mock-key"
          bulkActions={[{ actionId: 'something', label: 'Something' }]}
          onBulkActionSelected={spy}
        />,
      );

      const list = wrapper.find(List);

      // Select an item
      list.prop('onItemSelected')!({
        mode: 'SINGLE_ITEMS',
        items: [{ item: 'one' }],
      });

      const actions = wrapper.find(Actions);
      actions.prop('onActionSelected')!('testAction');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('testAction', {
        mode: 'SINGLE_ITEMS',
        items: [{ item: 'one' }],
      });
    });
  });

  it('forwards the required props to the sub components', () => {
    const [provider] = getDataProvider();
    const props = {
      title: 'title',
      filterOptions: [
        { type: FilterTypes.FreeText, property: 'test', label: 'Test' },
      ],
      dataProvider: provider,
      stationKey: 'mock-key',
      columns: mockListColumns,
      minimumWidth: 'minimumWidth',
      columnGap: 'columnGap',
      rowGap: 'rowGap',
      headerRowHeight: 'headerRowHeight',
      listRowHeight: 'listRowHeight',
      horizontalTextAlign: 'center',
      verticalTextAlign: 'end',
      keyProperty: 'keyProperty',
      loadingTriggerOffset: 1,
      defaultSortOrder: { column: 'test', direction: 'asc' },
      onCreateAction: () => undefined,
      onItemClicked: () => undefined,
      onBulkActionSelected: () => undefined,
      actionsWidth: 'actionsWidth',
    } as ExplorerProps;

    const expectComponentReceivesValue = createExpectComponentReceivesValue(
      props,
    );

    const wrapper = shallow(<Explorer {...props} />);

    const header = wrapper.find(PageHeader);
    expectComponentReceivesValue(header, 'title');

    const filters = wrapper.find(Filters);
    expectComponentReceivesValue(filters, 'filters');

    const list = wrapper.find(List);
    expect(list.prop('isError')).toEqual(false);
    expectComponentReceivesValue(list, 'columns');
    expectComponentReceivesValue(list, 'minimumWidth');
    expectComponentReceivesValue(list, 'columnGap');
    expectComponentReceivesValue(list, 'rowGap');
    expectComponentReceivesValue(list, 'headerRowHeight');
    expectComponentReceivesValue(list, 'onItemClicked');

    list.prop('onItemSelected')!({ mode: 'SELECT_ALL' });

    const actions = wrapper.find(Actions);
    expectComponentReceivesValue(actions, 'actionsWidth', 'width');
  });

  it('shows actionButton onItemClicked handler is set', () => {
    const [provider] = getDataProvider();

    const wrapper = shallow(
      <Explorer
        columns={mockListColumns}
        dataProvider={provider}
        stationKey="mock-key"
        onItemClicked={() => undefined}
      />,
    );

    const list = wrapper.find(List);
    expect(list.prop('showActionButton')).toBeTruthy();
  });

  it('shows Create Button if onCreateAction handler is set', () => {
    const [provider] = getDataProvider();

    const wrapper = shallow(
      <Explorer
        columns={mockListColumns}
        dataProvider={provider}
        stationKey="mock-key"
        onCreateAction={() => undefined}
      />,
    );
    const createAction = wrapper.find('.createIcon');
    expect(createAction.exists()).toBeTruthy();
  });

  it('shows no actionButton when no onItemClicked handler is set', () => {
    const [provider] = getDataProvider();

    const wrapper = shallow(
      <Explorer
        columns={mockListColumns}
        dataProvider={provider}
        stationKey="mock-key"
      />,
    );

    const list = wrapper.find(List);
    expect(list.prop('showActionButton')).toBeFalsy();
  });

  it('calls onCreateAction handler when click on create button', () => {
    const [provider] = getDataProvider();
    const spy = jest.fn();

    const wrapper = shallow(
      <Explorer
        columns={mockListColumns}
        dataProvider={provider}
        stationKey="mock-key"
        onCreateAction={spy}
      />,
    );
    const createAction = wrapper.find('.createIcon');
    createAction.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('Data handling', () => {
    it('loads initial data', async () => {
      const [provider, spy] = getDataProvider();
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

      spy.mockReturnValue(
        Promise.resolve({
          totalCount: data.length,
          filteredCount: data.length,
          data,
        }),
      );

      const wrapper = await actWithReturn(async () => {
        const wrapper = mount(
          <Explorer
            columns={[{ propertyName: 'id' }]}
            dataProvider={provider}
            stationKey="mock-key"
          />,
        );
        // await wrapper.update();
        return wrapper;
      });

      await act(async () => {
        await wrapper.update();
      });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(undefined, undefined, undefined);

      expect(wrapper.find(List).prop('isLoading')).toBe(false);
      expect(wrapper.find(List).prop('data')).toEqual(data);
    });

    it('loads sorted data', async () => {
      const storeStateSpy = jest
        .spyOn(GS, 'storeState')
        .mockImplementation(() => null);
      const [provider, spy] = getDataProvider();
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const sort: SortData = { column: 'column', direction: 'asc' };

      spy.mockReturnValue(
        Promise.resolve({
          totalCount: data.length,
          filteredCount: data.length,
          data,
        }),
      );

      const wrapper = await actWithReturn(() =>
        mount(
          <Explorer
            columns={[{ propertyName: 'id' }]}
            dataProvider={provider}
            stationKey="mock-key"
          />,
        ),
      );

      await act(async () => {
        await wrapper.update();
        wrapper.find(List).prop('onSortChanged')!(sort);
      });

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(2, undefined, sort, undefined);
    });

    it('loads filtered data', async () => {
      const [provider, spy] = getDataProvider();
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const filter = { test: 'value', something: 'more' };

      spy.mockReturnValue(
        Promise.resolve({
          totalCount: data.length,
          filteredCount: data.length,
          data,
        }),
      );

      const wrapper = await actWithReturn(() =>
        mount(
          <Explorer
            columns={[{ propertyName: 'id' }]}
            dataProvider={provider}
            stationKey="mock-key"
          />,
        ),
      );

      await act(async () => {
        await wrapper.update();
        wrapper.find(Filters).prop('onFiltersChange')!(filter);
      });

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(2, undefined, undefined, filter);
    });

    it('loads all pages for a data source', async () => {
      const [provider, spy] = getDataProvider();
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const data2 = [{ id: 4 }];

      spy.mockReturnValueOnce(
        Promise.resolve({
          totalCount: 4,
          filteredCount: 4,
          data: data,
          hasMoreData: true,
        }),
      );

      spy.mockReturnValueOnce(
        Promise.resolve({
          totalCount: 4,
          filteredCount: 4,
          data: data2,
          hasMoreData: false,
        }),
      );

      const wrapper = await actWithReturn(() =>
        mount(
          <Explorer
            columns={[{ propertyName: 'id' }]}
            dataProvider={provider}
            stationKey="mock-key"
            bulkActions={[{ actionId: 'something', label: 'Something' }]}
          />,
        ),
      );

      await act(async () => {
        await wrapper.update();
        wrapper.find(List).prop('onRequestMoreData')!();
        await wrapper.update();
        wrapper.find(List).prop('onRequestMoreData')!();
        await wrapper.update();
      });

      expect(wrapper.find(List).prop('data')).toEqual([...data, ...data2]);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(2, undefined, undefined, undefined);
    });

    it('stops loading data when empty data is returned from provider', async () => {
      const [provider, spy] = getDataProvider();

      spy.mockReturnValueOnce(
        Promise.resolve({
          totalCount: 4,
          filteredCount: 4,
          data: [],
          hasMoreData: false,
        }),
      );

      const wrapper = await actWithReturn(() =>
        mount(
          <Explorer
            columns={[{ propertyName: 'id' }]}
            dataProvider={provider}
            stationKey="mock-key"
            bulkActions={[{ actionId: 'something', label: 'Something' }]}
          />,
        ),
      );

      await act(async () => {
        await wrapper.update();
        wrapper.find(List).prop('onRequestMoreData')!();
        await wrapper.update();
      });

      expect(wrapper.find(List).prop('data')).toEqual([]);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    describe('changing sort or filter after paging', () => {
      let wrapper: ReactWrapper;
      const sortSpy = jest.fn();
      const filter = { test: 'value', something: 'more' };
      const sort: SortData = { column: 'column', direction: 'asc' };
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const data2 = [{ id: 4 }];
      const [provider, spy] = getDataProvider();

      beforeEach(async () => {
        // Setup Explorer with sorting and filtering, scrolled to 2nd page

        spy.mockReturnValue(
          Promise.resolve({
            totalCount: 4,
            filteredCount: 4,
            data: data,
          }),
        );

        wrapper = await actWithReturn(() =>
          mount(
            <Explorer
              columns={[{ propertyName: 'id' }]}
              dataProvider={provider}
              stationKey="mock-key"
            />,
          ),
        );

        await act(async () => {
          await wrapper.update();
          wrapper.find(List).prop('onSortChanged')!(sort); // Changing sort order
          await wrapper.update();
          wrapper.find(Filters).prop('onFiltersChange')!(filter); // Changing filters
          await wrapper.update();
          spy.mockReturnValue(
            Promise.resolve({
              totalCount: 4,
              filteredCount: 4,
              data: data2,
            }),
          );
          await wrapper.update();
          wrapper.find(List).prop('onRequestMoreData')!(); // Requesting new page
          await wrapper.update();
        });

        spy.mockClear();
      });

      it('sets new filter, resets paging and leaves sort untouched when filter changes', async () => {
        const filter2 = { test: 'value2', something: 'more2' };

        spy.mockReturnValue(
          Promise.resolve({
            totalCount: 3,
            filteredCount: 3,
            data: data,
          }),
        );

        await act(async () => {
          await wrapper.update();
          wrapper!.find(Filters).prop('onFiltersChange')!(filter2); // Changing filters
          await wrapper.setProps({}); // Force re-render
          await wrapper.update();
        });

        expect(wrapper!.find(List).prop('data')).toEqual(data);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(undefined, sort, filter2);
      });

      it('sets new sort, resets paging and leaves filter untouched when sort changes', async () => {
        const sort2: SortData = { column: 'column', direction: 'desc' };

        spy.mockReturnValue(
          Promise.resolve({
            totalCount: 3,
            filteredCount: 3,
            data: data,
          }),
        );

        await act(async () => {
          await wrapper.update();
          wrapper!.find(List).prop('onSortChanged')!(sort2); // Changing sort order
          await wrapper.setProps({}); // Force re-render
          await wrapper.update();
        });

        expect(wrapper!.find(List).prop('data')).toEqual(data);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(undefined, sort2, filter);
      });
    });

    it('loads filtered, sorted and paged data', async () => {
      const [provider, spy] = getDataProvider();
      const filter = { test: 'value', something: 'more' };
      const sort: SortData = { column: 'column', direction: 'asc' };
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const data2 = [{ id: 4 }];
      const mockResponse = {
        totalCount: 4,
        filteredCount: 4,
        data: data,
        hasMoreData: true,
      };

      spy.mockReturnValueOnce(Promise.resolve(mockResponse));
      spy.mockReturnValueOnce(Promise.resolve(mockResponse));
      spy.mockReturnValueOnce(Promise.resolve(mockResponse));
      spy.mockReturnValueOnce(
        Promise.resolve({ ...mockResponse, data: data2, hasMoreData: false }),
      );

      const wrapper = await actWithReturn(() =>
        mount(
          <Explorer
            columns={[{ propertyName: 'id' }]}
            dataProvider={provider}
            stationKey="mock-key"
          />,
        ),
      );

      await act(async () => {
        await wrapper.update();
        wrapper.find(List).prop('onSortChanged')!(sort); // Changing sort order
        await wrapper.update();
        wrapper.find(Filters).prop('onFiltersChange')!(filter); // Changing filters
        await wrapper.update();
        wrapper.find(List).prop('onRequestMoreData')!(); // Requesting new page
        await wrapper.update();
        wrapper.find(List).prop('onRequestMoreData')!(); // Requesting new page (already exhausted source)
        await wrapper.update();
      });

      expect(spy).toHaveBeenCalledTimes(4);
      expect(spy).toHaveBeenNthCalledWith(1, undefined, undefined, undefined);
      expect(spy).toHaveBeenNthCalledWith(2, undefined, sort, undefined);
      expect(spy).toHaveBeenNthCalledWith(3, undefined, sort, filter);
      expect(spy).toHaveBeenNthCalledWith(4, undefined, sort, filter);

      expect(wrapper.find(List).prop('data')).toEqual([...data, ...data2]);
    });

    it('handles isLoading state correctly', async () => {
      const [provider, spy] = getDataProvider();
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const data2 = [{ id: 4 }];

      let resolve: (value: any) => void;

      spy.mockReturnValue(
        new Promise(r => {
          resolve = r;
        }),
      );

      const wrapper = await actWithReturn(() =>
        mount(
          <Explorer
            columns={[{ propertyName: 'id' }]}
            dataProvider={provider}
            stationKey="mock-key"
          />,
        ),
      );

      await act(async () => {
        await wrapper.update();
      });

      expect(wrapper.find(List).prop('isLoading')).toBeTruthy();

      await act(async () => {
        resolve({
          totalCount: data.length + data2.length,
          filteredCount: data.length + data2.length,
          data: data,
          hasNextPage: true,
        });
        await wrapper.setProps({});
        await wrapper.update();
      });

      expect(wrapper.find(List).prop('isLoading')).toBeFalsy();
      expect(wrapper.find(List).prop('data')).toEqual(data);

      spy.mockReturnValue(
        new Promise(r => {
          resolve = r;
        }),
      );

      await act(async () => {
        await wrapper.update();
        wrapper.find(List).prop('onRequestMoreData')!(); // Load another page
        await wrapper.update();
      });

      expect(wrapper.find(List).prop('isLoading')).toBeTruthy();
      expect(wrapper.find(List).prop('data')).toEqual(data);

      await act(async () => {
        resolve({
          totalCount: data.length,
          filteredCount: data.length,
          data: data2,
          hasMoreData: false,
        });
        await wrapper.setProps({});
        await wrapper.update();
      });

      expect(wrapper.find(List).prop('isLoading')).toBeFalsy();
    });

    it('handles data loading error and enables retry', async () => {
      const [provider, spy] = getDataProvider();

      spy.mockReturnValue(Promise.reject('error'));

      const wrapper = await actWithReturn(() =>
        mount(
          <Explorer
            columns={[{ propertyName: 'id' }]}
            dataProvider={provider}
            stationKey="mock-key"
          />,
        ),
      );

      await act(async () => {
        await wrapper.update();
      });

      expect(wrapper.find(List).prop('isError')).toBeTruthy();
      expect(wrapper.find(List).prop('data')).toEqual([]);

      await act(async () => {
        wrapper.find(List).prop('onRetry')!();
        await wrapper.update();
      });

      expect(wrapper.find(List).prop('isError')).toBeTruthy();
      expect(wrapper.find(List).prop('data')).toEqual([]);

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, undefined, undefined, undefined);
      expect(spy).toHaveBeenNthCalledWith(2, undefined, undefined, undefined);
    });

    it('sets the subtitle', async () => {
      const [provider, spy] = getDataProvider();
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

      spy.mockReturnValueOnce(
        Promise.resolve({
          totalCount: 5,
          filteredCount: 4,
          data: data,
        }),
      );

      const wrapper = await actWithReturn(() =>
        mount(
          <Explorer
            columns={[{ propertyName: 'id' }]}
            dataProvider={provider}
            stationKey="mock-key"
            bulkActions={[{ actionId: 'something', label: 'Something' }]}
          />,
        ),
      );

      await act(async () => {
        wrapper.update();
      });

      expect(wrapper.find(PageHeader).prop('subtitle')).toEqual(
        'Total: 5, filtered: 4',
      );
    });
  });

  it('fetches sort order and filters from the global state on component load', async () => {
    const [provider, spy] = getDataProvider();
    const mockInitialstate: { [key: string]: { [key: string]: unknown } } = {
      'mock-key': {
        sort: { column: 'column', direction: 'asc' },
        filters: { filter: 'value' },
      },
    };
    const getStateSpy = jest
      .spyOn(GS, 'getState')
      .mockReturnValueOnce(mockInitialstate['mock-key']['sort'])
      .mockReturnValueOnce(mockInitialstate['mock-key']['filters']);

    const wrapper = await actWithReturn(() =>
      mount(
        <Explorer
          columns={mockListColumns}
          dataProvider={provider}
          stationKey="mock-key"
        />,
      ),
    );

    await act(async () => {
      wrapper.update();
    });

    expect(getStateSpy).toHaveBeenCalledWith('mock-key', 'sort');
    expect(getStateSpy).toHaveBeenCalledWith('mock-key', 'filters');
    expect(spy).toHaveBeenCalledWith(
      undefined,
      mockInitialstate['mock-key']['sort'],
      mockInitialstate['mock-key']['filters'],
    );
  });

  it('stores sort order in the global state', () => {
    const [provider] = getDataProvider();
    const storeStateSpy = jest
      .spyOn(GS, 'storeState')
      .mockImplementation(() => null);

    const mockSort: SortData = { column: 'mockColumn', direction: 'asc' };

    const wrapper = shallow(
      <Explorer
        columns={mockListColumns}
        dataProvider={provider}
        stationKey="mock-key"
      />,
    );

    wrapper.find(List).prop('onSortChanged')!(mockSort);

    expect(storeStateSpy).toHaveBeenCalledWith('mock-key', 'sort', mockSort);
  });

  it('stores filters data in the global state', () => {
    const [provider] = getDataProvider();
    const storeStateSpy = jest
      .spyOn(GS, 'storeState')
      .mockImplementation(() => null);

    const mockFilters: FilterValues = { mockFilter: 'test-value' };

    const wrapper = shallow(
      <Explorer
        columns={mockListColumns}
        dataProvider={provider}
        stationKey="mock-key"
      />,
    );

    wrapper.find(Filters).prop('onFiltersChange')!(mockFilters);

    expect(storeStateSpy).toHaveBeenCalledWith(
      'mock-key',
      'filters',
      mockFilters,
    );
  });
});
