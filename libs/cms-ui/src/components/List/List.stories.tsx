import { action } from '@storybook/addon-actions';
import { boolean, number, object, select, text } from '@storybook/addon-knobs';
import faker from 'faker';
import { generateItemArray, Story } from 'helpers/storybook';
import React, { useState } from 'react';
import { List } from './List';
import { Column, ColumnMap, Data, SortData } from './List.model';
import { sortStoryData, useLocalSort } from './List.stories.helper';
import {
  createStateRenderer,
  createThumbnailRenderer,
  createStateAndThumbnailRenderer,
} from './ListRow/Renderers';

export default {
  title: `Other Components/List`,
};

const defaultColumns: Column[] = [
  {
    propertyName: 'id',
    label: 'Id',
  },
  {
    propertyName: 'title',
    label: 'Title',
  },
  {
    propertyName: 'desc',
    label: 'Description',
  },
];

const generateData = (amount: number) =>
  generateItemArray(amount, index => ({
    id: index,
    desc: `Description ${index}: ${faker.lorem.words(
      faker.random.number({ min: 10, max: 20 }),
    )}`,
    title: `Item ${index}: ${faker.random.words(
      faker.random.number({ min: 1, max: 3 }),
    )}`,
  }));

const defaultData = generateData(10);
const lazyLoadedData = generateData(30);

const actions = {
  onItemClicked: action('onItemClicked'),
  onCreateAction: action('onCreateAction'),
  onItemSelected: action('onItemSelected'),
  onRetry: action('onRetry'),
};

export const Default: Story = () => {
  const { listData, sortChangedHandler } = useLocalSort(defaultData);

  return (
    <List
      columns={defaultColumns}
      data={listData}
      {...actions}
      onSortChanged={sortChangedHandler}
    />
  );
};

export const WithoutActionButton: Story = () => {
  const { listData, sortChangedHandler } = useLocalSort(defaultData);

  return (
    <List
      columns={defaultColumns}
      data={listData}
      showActionButton={false}
      {...actions}
      onSortChanged={sortChangedHandler}
    />
  );
};

export const WithoutCreateButton: Story = () => {
  const { listData, sortChangedHandler } = useLocalSort(defaultData);
  const { onCreateAction, ...remainingActions } = actions;

  return (
    <List
      columns={defaultColumns}
      data={listData}
      {...remainingActions}
      onSortChanged={sortChangedHandler}
    />
  );
};

export const NotSortableColumn: Story = () => {
  const columns = [...defaultColumns];
  columns[2].sortable = false;

  const { listData, sortChangedHandler } = useLocalSort(defaultData);

  return (
    <List
      columns={columns}
      data={listData}
      {...actions}
      onSortChanged={sortChangedHandler}
    />
  );
};

export const WithoutCheckBox: Story = () => {
  const { listData, sortChangedHandler } = useLocalSort(defaultData);

  return (
    <List
      columns={defaultColumns}
      data={listData}
      showItemCheckbox={false}
      {...actions}
      onSortChanged={sortChangedHandler}
    />
  );
};

export const DifferentColumnSizes: Story = () => {
  const { listData, sortChangedHandler } = useLocalSort(defaultData);

  return (
    <List
      columns={[
        {
          propertyName: 'id',
          label: 'Id',
          size: '50px',
        },
        {
          propertyName: 'title',
          label: 'Title',
          size: '1fr',
        },
        {
          propertyName: 'desc',
          label: 'Description',
          size: '2fr',
        },
      ]}
      data={listData}
      {...actions}
      onSortChanged={sortChangedHandler}
    />
  );
};

export const _100Rows: Story = () => {
  const { listData, sortChangedHandler } = useLocalSort(
    generateItemArray(100, index => ({
      id: index,
      desc: `Description ${index}`,
      title: `Item ${index}`,
    })),
  );

  return (
    <List
      columns={defaultColumns}
      data={listData}
      {...actions}
      onSortChanged={sortChangedHandler}
    />
  );
};

export const loadingInitialData: Story = () => (
  <List columns={defaultColumns} data={[]} isLoading={true} {...actions} />
);

export const LoadingNextPage: Story = () => {
  const { listData, sortChangedHandler } = useLocalSort(defaultData);

  return (
    <List
      columns={defaultColumns}
      data={listData}
      isLoading={true}
      {...actions}
      onSortChanged={sortChangedHandler}
    />
  );
};

export const noData: Story = () => (
  <List
    columns={defaultColumns}
    data={[]}
    showActionButton={false}
    {...actions}
  />
);

export const WithError: Story = () => {
  const withData = boolean('With Data', false);

  return (
    <List
      columns={defaultColumns}
      data={withData ? defaultData : []}
      isError={true}
      {...actions}
    />
  );
};
WithError.story = {
  parameters: {
    docs: {
      storyDescription: `Use the \`Canvas\` view to tweak this Story using the \`Knobs\` panel.`,
    },
  },
};

export const LocaleFormattingAndCustomRenderer: Story = () => {
  const Bold = (value: unknown): React.ReactNode => <b>{value as string}</b>;

  return (
    <List
      columns={[
        {
          propertyName: 'date',
          size: '1fr',
          label: 'Date',
        },
        {
          propertyName: 'number',
          size: '1fr',
          label: 'Number',
        },
        {
          propertyName: 'text',
          size: '1fr',
          label: 'Bold text (custom renderer)',
          // Inline arrow function does not work because of eslint and https://github.com/yannickcr/eslint-plugin-react/issues/512
          render: Bold,
          // render: function Bold(data: string) {
          //   return <b>{data}</b>;
          // },
        },
      ]}
      keyProperty="number"
      data={[{ text: 'some text', date: new Date(), number: 55324.33 }]}
      showActionButton={false}
      {...actions}
    />
  );
};

export const WithThumbnailRenderer: Story = () => {
  const data = defaultData.map((data, idx) => {
    return {
      ...data,
      thumbnail:
        idx !== 7 ? `http://picsum.photos/50?random=${idx}` : undefined,
    };
  });
  const { listData, sortChangedHandler } = useLocalSort(data);

  return (
    <List
      columns={[
        {
          propertyName: 'id',
          label: 'Id',
          size: '50px',
        },
        {
          propertyName: 'thumbnail',
          label: 'Thumb',
          render: createThumbnailRenderer(),
          sortable: false,
          size: '80px',
        },
        {
          propertyName: 'title',
          label: 'Title',
        },
        {
          propertyName: 'desc',
          label: 'Description',
        },
      ]}
      keyProperty="id"
      data={listData}
      showActionButton={false}
      onSortChanged={sortChangedHandler}
      {...actions}
    />
  );
};

export const WithStateRenderer: Story = () => {
  const stateMap: ColumnMap = {
    success: '#68a357',
    failure: 'red',
    warning: 'rgba(255, 165, 0, 1)',
  };
  const stateValues = Object.keys(stateMap);
  const data = defaultData.map(data => {
    return {
      ...data,
      state: stateValues[Math.floor(Math.random() * stateValues.length)],
    };
  });
  const { listData, sortChangedHandler } = useLocalSort(data);

  return (
    <List
      columns={[
        {
          propertyName: 'id',
          label: 'Id',
          size: '50px',
        },
        {
          propertyName: 'state',
          label: '',
          render: createStateRenderer(stateMap),
          size: '30px',
        },
        {
          propertyName: 'title',
          label: 'Title',
        },
        {
          propertyName: 'desc',
          label: 'Description',
        },
      ]}
      keyProperty="id"
      data={listData}
      showActionButton={false}
      onSortChanged={sortChangedHandler}
      {...actions}
    />
  );
};

export const WithStateAndThumbnailRenderer: Story = () => {
  const stateMap: ColumnMap = {
    success: '#68a357',
    failure: 'red',
    warning: 'rgba(255, 165, 0, 1)',
  };
  const stateValues = Object.keys(stateMap);
  const data = defaultData.map((data, idx) => {
    return {
      ...data,
      state: stateValues[Math.floor(Math.random() * stateValues.length)],
      thumbnail:
        idx !== 7 ? `http://picsum.photos/50?random=${idx}` : undefined,
    };
  });

  const { listData, sortChangedHandler } = useLocalSort(data);

  return (
    <List
      columns={[
        {
          propertyName: 'id',
          label: 'Id',
          size: '50px',
        },
        {
          propertyName: 'state',
          label: 'State',
          render: createStateAndThumbnailRenderer(stateMap, 'thumbnail'),
          size: '80px',
        },
        {
          propertyName: 'title',
          label: 'Title',
        },
        {
          propertyName: 'desc',
          label: 'Description',
        },
      ]}
      keyProperty="id"
      data={listData}
      showActionButton={false}
      onSortChanged={sortChangedHandler}
      {...actions}
    />
  );
};

export const WithKnobs: Story = () => {
  const createAction = boolean('onCreateAction', true, 'style');
  const { onCreateAction, ...actionsWithoutCreate } = actions;

  const KnobsDefault = React.useMemo(
    () => ({
      columns: [
        { propertyName: 'id', size: '50px', label: 'Id' },
        { propertyName: 'title', size: '1fr', label: 'Title' },
        { propertyName: 'desc', size: '2fr', label: 'Description' },
      ],
      data: generateItemArray(10, index => ({
        id: index,
        desc: faker.lorem.words(10),
        title: faker.random.words(faker.random.number({ min: 1, max: 3 })),
      })),
    }),
    [],
  );

  return (
    <List
      columns={object('columns', KnobsDefault.columns, 'data')}
      data={object('data', KnobsDefault.data, 'data')}
      showActionButton={boolean('showActionButton', true, 'style')}
      showItemCheckbox={boolean('showCheckBox', true, 'style')}
      minimumWidth={text('minimumWidth', '500px', 'style')}
      columnGap={text('columnGap', '5px', 'style')}
      rowGap={text('rowGap', '2px', 'style')}
      headerRowHeight={text('headerRowHeight', '44px', 'style')}
      listRowHeight={text('listRowHeight', '51px', 'style')}
      isLoading={boolean('isLoading', false, 'states')}
      isError={boolean('isError', false, 'states')}
      horizontalTextAlign={select(
        'horizontalTextAlign',
        ['left', 'right', 'center'],
        'left',
        'style',
      )}
      verticalTextAlign={select(
        'verticalTextAlign',
        ['center', 'start', 'end'],
        'center',
        'style',
      )}
      {...(createAction ? actions : actionsWithoutCreate)}
      onSortChanged={action('onSortChanged')}
    />
  );
};
WithKnobs.story = {
  name: 'Configurable ⚒ (with knobs)',
  parameters: {
    docs: {
      storyDescription: `Use the \`Canvas\` view to tweak this Story using the \`Knobs\` panel.`,
    },
  },
};

// TODO: restrict this in height, so it will not grow infinitely on 'Docs' view
export const PagedData: Story = () => {
  const [data, setData] = useState<Data[]>(lazyLoadedData);
  const [dataIndexes, setDataIndexes] = useState(30);
  const [mockIsLoading, setMockIsLoading] = useState(false);
  const [sort, setSort] = useState<SortData>({
    column: 'id',
    direction: 'asc',
  });
  const sortChangedHandler = (sort: SortData): void => {
    const defaultSortOrder = sortStoryData(sort, data);
    setSort(sort);
    setData([...defaultSortOrder]);
  };

  const loadingTime = number('Loading time', 1000);
  const pageSize = 30;

  function onRequestMoreDataHandler(): void {
    setMockIsLoading(true);
    setTimeout(() => {
      const newData = generateItemArray(pageSize, index => ({
        id: index + dataIndexes,
        desc: `Description ${index + dataIndexes}: ${faker.lorem.words(
          faker.random.number({ min: 10, max: 20 }),
        )}`,
        title: `Item ${index + dataIndexes}: ${faker.random.words(
          faker.random.number({ min: 1, max: 3 }),
        )}`,
      }));
      setMockIsLoading(false);
      setData(sortStoryData(sort, [...data, ...newData]));
      setDataIndexes(dataIndexes + pageSize);
    }, loadingTime);
  }

  return (
    <div>
      <List
        columns={defaultColumns}
        data={data}
        isLoading={mockIsLoading}
        {...actions}
        onRequestMoreData={() => {
          onRequestMoreDataHandler();
        }}
        onSortChanged={sortChangedHandler}
      />
    </div>
  );
};
