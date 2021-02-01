import React from 'react';
import { Data, Column } from '../List.model';
import { ListRow, ListRowProps, refreshLocale } from './ListRow';
import { shallow, mount } from 'enzyme';
import { ActionButton } from './ActionButton/ActionButton';
import { ListCheckBox } from '../ListCheckBox/ListCheckBox';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

// Possible bug setting this const as an array does not trigger TypeScript error
const mockExplorerData: Data = {
  id: '1',
  desc: 'Description 1',
  title: 'Item 1',
};

const mockProps: ListRowProps = {
  columns: [{ propertyName: 'id', size: '1fr', label: 'id' }],
  data: mockExplorerData,
  columnSizes: '1fr',
  columnGap: '5px',
  rowHeight: '60px',
  horizontalTextAlign: 'left',
  verticalTextAlign: 'center',
};

describe('ListRow', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<ListRow {...mockProps} />);

    expect(wrapper).toBeTruthy();
  });

  it.each`
    expectedColumns | name
    ${[
  { propertyName: 'desc', size: '1fr', label: 'desc' },
  { propertyName: 'id', size: '1fr', label: 'id' },
  { propertyName: 'title', size: '1fr', label: 'title' },
] as Column[]} | ${'all columns from data in changed order'}
    ${[
  { propertyName: 'desc', size: '1fr', label: 'desc' },
  { propertyName: 'id', size: '1fr', label: 'id' },
] as Column[]} | ${'less columns than in data'}
  `(
    'renders the defined columns in the defined order -> $name',
    ({ expectedColumns }: { expectedColumns: Column[] }) => {
      const wrapper = shallow(
        <ListRow {...mockProps} columns={expectedColumns} />,
      );

      const actualColumns = wrapper.find('.cell');

      // Check amount of rendered columns
      expect(actualColumns).toHaveLength(expectedColumns.length);

      actualColumns.forEach((column, idx) => {
        const expectedPropertyName = expectedColumns[idx].propertyName;
        expect(column.key()).toEqual(expectedPropertyName);

        expect(column.text()).toEqual(mockExplorerData[expectedPropertyName]);
      });
    },
  );

  it('renders locale strings', () => {
    const expectedColumns: Column[] = [
      { propertyName: 'date', size: '1fr', label: 'date' },
      { propertyName: 'number', size: '1fr', label: 'number' },
    ];
    const rowData = { date: new Date(0), number: 123456.12 };

    const languageMock = jest.spyOn(navigator, 'language', 'get');
    languageMock.mockReturnValue('de-DE');

    refreshLocale();

    const wrapper = shallow(
      <ListRow
        data={rowData}
        columns={expectedColumns}
        columnSizes="1fr"
        columnGap="5px"
        rowHeight="60px"
        horizontalTextAlign="left"
        verticalTextAlign="center"
      />,
    );

    const actualColumns = wrapper.find('.cell');

    // Check amount of rendered columns
    expect(actualColumns).toHaveLength(2);

    // see https://stackoverflow.com/questions/23199909/using-tolocalestring-in-node-js/23200062
    expect(actualColumns.at(0).text()).toEqual(rowData.date.toLocaleString());
    expect(actualColumns.at(1).text()).toEqual(rowData.number.toLocaleString());

    languageMock.mockRestore();
  });

  it('uses custom renderer', () => {
    const expectedColumns: Column[] = [
      {
        propertyName: 'value',
        label: 'value',
        render: (value: unknown) => `Changed: ${value}`,
      },
    ];
    const rowData = { value: 'something' };

    const wrapper = shallow(
      <ListRow {...mockProps} data={rowData} columns={expectedColumns} />,
    );
    const actualColumns = wrapper.find('.cell');
    expect(actualColumns.at(0).text()).toEqual('Changed: something');
  });

  it('shows empty field if a value required in a column is not present on the data object', () => {
    const expectedColumns: Column[] = [
      { propertyName: "doesn't exist", size: '1fr', label: 'desc' },
    ];

    const wrapper = shallow(
      <ListRow {...mockProps} columns={expectedColumns} />,
    );

    const actualColumns = wrapper.find('.cell');

    // Check amount of rendered columns
    expect(actualColumns).toHaveLength(1);

    expect(actualColumns.first().key()).toEqual(
      expectedColumns[0].propertyName,
    );
    expect(actualColumns.first().text()).toEqual('');
  });

  it('renders a ActionButton by default', () => {
    const wrapper = shallow(
      <ListRow
        {...mockProps}
        columns={[{ propertyName: 'id', size: '1fr', label: 'id' }]}
      />,
    );

    expect(wrapper.find(ActionButton)).toHaveLength(1);
  });

  it('renders no ActionButton if told', () => {
    const wrapper = shallow(
      <ListRow {...mockProps} showActionButton={false} />,
    );

    expect(wrapper.find(ActionButton)).toHaveLength(0);
  });

  it('calls the "onItemClicked" event with data', () => {
    const spy = jest.fn();
    const wrapper = shallow(<ListRow {...mockProps} onItemClicked={spy} />);
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockExplorerData);
  });

  it('renders no Checkbox if told', () => {
    const wrapper = shallow(
      <ListRow {...mockProps} showItemCheckbox={false} />,
    );

    expect(wrapper.find(ListCheckBox)).toHaveLength(0);
  });

  it('raises checkBoxHandler', () => {
    const spy = jest.fn();
    const wrapper = mount(<ListRow {...mockProps} onItemSelected={spy} />);

    const chk = wrapper.find(ListCheckBox);
    chk.prop('onCheckBoxToggled')!(true);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
  });

  describe('Data Loading Trigger', () => {
    const windowIntersectionObserver = window.IntersectionObserver;
    const observe = jest.fn();
    beforeEach(() => {
      window.IntersectionObserver = jest.fn().mockImplementation(() => ({
        observe,
      }));
    });

    afterEach(() => {
      window.IntersectionObserver = windowIntersectionObserver;
    });

    it('creates the IntersectionObserver when row has isTrigger===true', () => {
      const spy = jest.fn();
      const wrapper = mount(
        <ListRow {...mockProps} isTrigger={true} onTriggered={spy} />,
      );

      expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
      expect(observe).toHaveBeenCalledWith(wrapper.getDOMNode());
      expect(spy).not.toHaveBeenCalled();
    });

    it('creates no IntersectionObserver when row has isTrigger===false', () => {
      const spy = jest.fn();

      mount(<ListRow {...mockProps} isTrigger={false} onTriggered={spy} />);

      expect(window.IntersectionObserver).not.toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    });

    it('triggers onTriggered when IntersectionObserver observes entry', () => {
      let intersectionFn: IntersectionObserverCallback = () => null;
      const spy = jest.fn();

      (window.IntersectionObserver as jest.Mock).mockImplementation(fn => {
        // Remember the callback function
        intersectionFn = fn;
        // Return the mocked object
        return { observe };
      });

      mount(<ListRow {...mockProps} isTrigger={true} onTriggered={spy} />);

      // Manually trigger the intersection callback
      intersectionFn(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it.todo('sets ref if row is trigger'); // https://github.com/airbnb/enzyme/issues/2215
  });
});
