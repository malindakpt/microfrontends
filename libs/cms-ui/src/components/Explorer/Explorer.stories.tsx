import { action } from '@storybook/addon-actions';
import { boolean, number, object, select, text } from '@storybook/addon-knobs';
import faker from 'faker';
import { generateItemArray, randomDate, Story, wait } from 'helpers/storybook';
import React, { useMemo, useState } from 'react';
import { ActionData } from '../Actions';
import { FilterType, FilterTypes } from '../Filters/Filters.model';
import { Column } from '../List';
import { Explorer, ExplorerProps } from './Explorer';
import { ExplorerDataProvider } from './Explorer.model';
import {
  createInMemoryDataProvider,
  findAnywhereInStringCaseInsensitive,
} from './InMemoryDataProvider';

export default {
  title: `Primary Components/Station Controls/Explorer`,
};

const defaultColumns: Column[] = [
  {
    propertyName: 'id',
    label: 'Id',
    size: '50px',
  },
  {
    propertyName: 'title',
    label: 'Title',
  },
  {
    propertyName: 'date',
    label: 'Date',
  },
  {
    propertyName: 'desc',
    label: 'Description',
    size: '2fr',
  },
];

const generateData = (
  amount: number,
  { startIndex = 0, usePrefix = true } = {},
) =>
  generateItemArray(amount, i => {
    const index = i + startIndex;
    return {
      id: index,
      desc: `${usePrefix ? `Description ${index}: ` : ''}${faker.lorem.words(
        faker.random.number({ min: 10, max: 20 }),
      )}`,
      date: randomDate(new Date(2019, 0, 1)),
      title: `${usePrefix ? `Index ${index}: ` : ''}${faker.random.words(
        faker.random.number({ min: 1, max: 3 }),
      )}`,
    };
  });

const generateActions = (amount: number) =>
  generateItemArray(
    amount,
    index =>
      ({
        actionId: `action${index + 1}`,
        label: `Action ${index + 1}`,
      } as ActionData),
  );

const actions: Partial<ExplorerProps> = {
  onItemClicked: action('onItemClicked'),
  onCreateAction: action('onCreateAction'),
  onBulkActionSelected: action('onBulkActionSelected'),
};

const freeTextFilter: FilterType = {
  label: 'Title',
  property: 'title',
  type: FilterTypes.FreeText,
};

const optionFilter: FilterType = {
  label: 'Description',
  property: 'desc',
  type: FilterTypes.Options,
  options: [
    {
      label: "Containing 'si'",
      value: 'si',
    },
    {
      label: "Containing 'en'",
      value: 'en',
    },
  ],
};

export const Default: Story = () => {
  const data = generateData(20, { usePrefix: false });
  const dataProvider: ExplorerDataProvider = useMemo(
    () =>
      createInMemoryDataProvider(data, {
        filterFunctions: {
          title: findAnywhereInStringCaseInsensitive,
          desc: findAnywhereInStringCaseInsensitive,
        },
      }),
    [data],
  );

  return (
    <Explorer
      title="Explorer"
      columns={defaultColumns}
      dataProvider={dataProvider}
      stationKey="StoryBookExplorer1"
      filterOptions={[freeTextFilter, optionFilter]}
      bulkActions={generateActions(4)}
      {...actions}
    />
  );
};

export const Empty: Story = () => {
  const dataProvider: ExplorerDataProvider = useMemo(
    () => createInMemoryDataProvider([]),
    [],
  );

  return (
    <Explorer
      title="Explorer"
      columns={defaultColumns}
      dataProvider={dataProvider}
      stationKey="storyBookExplorer2"
      filterOptions={[freeTextFilter, optionFilter]}
      bulkActions={generateActions(4)}
      {...actions}
    />
  );
};

export const NoFilterNoBulkOperations: Story = () => {
  const data = generateData(20, { usePrefix: false });
  const dataProvider: ExplorerDataProvider = useMemo(
    () => createInMemoryDataProvider(data),
    [data],
  );

  return (
    <Explorer
      title="Explorer"
      columns={defaultColumns}
      dataProvider={dataProvider}
      stationKey="storyBookExplorer3"
      {...actions}
    />
  );
};

export const LoadingState: Story = () => {
  const dataProvider: ExplorerDataProvider = useMemo(() => {
    return {
      loadData: (page, sort, filter) => {
        action('loadData')({ page, sort, filter });
        return new Promise(() => {
          // never resolving
        });
      },
    };
  }, []);

  return (
    <Explorer
      title="Explorer"
      columns={defaultColumns}
      dataProvider={dataProvider}
      stationKey="storyBookExplorer4"
      filterOptions={[freeTextFilter, optionFilter]}
      bulkActions={generateActions(4)}
      {...actions}
    />
  );
};

export const ErrorState: Story = () => {
  const dataProvider: ExplorerDataProvider = useMemo<
    ExplorerDataProvider
  >(() => {
    return {
      loadData: (page, sort, filter) => {
        action('loadData')({ page, sort, filter });
        return Promise.reject('nope') as any;
      },
    };
  }, []);

  return (
    <Explorer
      title="Explorer"
      columns={defaultColumns}
      dataProvider={dataProvider}
      stationKey="storyBookExplorer5"
      filterOptions={[freeTextFilter, optionFilter]}
      bulkActions={generateActions(4)}
      {...actions}
    />
  );
};

export const TalkativeInMemoryDataProvider: Story = () => {
  const data = generateData(20, { usePrefix: false });
  const dataProvider: ExplorerDataProvider = useMemo(() => {
    const actualProvider = createInMemoryDataProvider(data, {
      filterFunctions: {
        title: findAnywhereInStringCaseInsensitive,
        desc: findAnywhereInStringCaseInsensitive,
      },
    });
    return {
      loadData: (page, sort, filter) => {
        action('loadData')({ page, sort, filter });
        return actualProvider.loadData(page, sort, filter);
      },
    };
  }, [data]);

  return (
    <Explorer
      title="Explorer"
      columns={defaultColumns}
      dataProvider={dataProvider}
      stationKey="storyBookExplorer6"
      filterOptions={[freeTextFilter, optionFilter]}
      bulkActions={generateActions(4)}
      {...actions}
    />
  );
};

export const WithKnobs: Story = () => {
  const pageSize = 20;
  const data = generateData(200, { usePrefix: false });
  const [currentPage, setCurrentPage] = useState<number>(0);

  const loadDuration = number(
    'Response delay (ms)',
    100,
    { min: 0, max: 2000, step: 100, range: true },
    'Data Provider',
  );
  const returnError = boolean('Return error', false, 'Data Provider');

  const dataProvider: ExplorerDataProvider = useMemo(() => {
    const actualProvider = createInMemoryDataProvider(data, {
      filterFunctions: {
        title: findAnywhereInStringCaseInsensitive,
        desc: findAnywhereInStringCaseInsensitive,
      },
    });
    return {
      loadData: async (page, sort, filter) => {
        // Report the call
        action('loadData')(page, sort, filter);

        // Increase page count
        setCurrentPage(prevValue => prevValue + 1);

        // Delay the response (configurable through knobs)
        await wait(loadDuration);

        if (returnError) {
          throw new Error('nope');
        }
        // Use the in memory provider to do the heavy lifting
        const {
          totalCount,
          filteredCount,
          data,
        } = await actualProvider.loadData(page, sort, filter);

        // Apply paging to the results
        return {
          totalCount: totalCount,
          filteredCount: filteredCount,
          data: data.slice(
            pageSize * currentPage,
            pageSize * (currentPage + 1),
          ),
          hasMoreData: currentPage < 9,
        };
      },
    };
  }, [currentPage, data, loadDuration, returnError]);

  return (
    <Explorer
      title={text('tile', 'Configurable ⚒ (with knobs)', 'Explorer')}
      columns={object('columns', defaultColumns, 'Explorer')}
      dataProvider={dataProvider}
      stationKey="storyBookExplorer7"
      loadingTriggerOffset={number(
        'loadingTriggerOffset',
        10,
        { min: 1, max: 15, range: true },
        'Explorer',
      )}
      filterOptions={
        boolean('has filters', true, 'Explorer')
          ? [freeTextFilter, optionFilter]
          : []
      }
      bulkActions={
        boolean('has bulkActions', true, 'Explorer')
          ? generateActions(4)
          : undefined
      }
      onBulkActionSelected={action('onBulkActionSelected')}
      onCreateAction={
        boolean('has createAction', true, 'Explorer')
          ? action('onCreateAction')
          : undefined
      }
      onItemClicked={
        boolean('has onItemClicked', true, 'Explorer')
          ? action('onItemClicked')
          : undefined
      }
      actionsWidth={text('actionsWidth', '300px', 'Explorer (Style)')}
      columnGap={text('columnGap', '5px', 'Explorer (Style)')}
      headerRowHeight={text('headerRowHeight', '44px', 'Explorer (Style)')}
      listRowHeight={text('listRowHeight', '51px', 'Explorer (Style)')}
      minimumWidth={text('minimumWidth', '500px', 'Explorer (Style)')}
      rowGap={text('rowGap', '2px', 'Explorer (Style)')}
      verticalTextAlign={select(
        'verticalTextAlign',
        ['start', 'center', 'end'],
        'center',
        'Explorer (Style)',
      )}
      horizontalTextAlign={select(
        'horizontalTextAlign',
        ['left', 'center', 'right'],
        'left',
        'Explorer (Style)',
      )}
    />
  );
};
WithKnobs.story = {
  name: 'Configurable ⚒ (with knobs)',
  parameters: {
    docs: {
      storyDescription: `Use the \`Canvas\` view to tweak this Story using the \`Knobs\` panel.  
      The used data provider simulates a paged asynchronous data source.
      It will also put notifications about invocations of \`loadData\` to the \`Actions\` panel.
      Filtering and sorting is fully working.`,
    },
  },
};

// export const Empty: Story = () => (
//   <Explorer columns={defaultColumns} data={emptyData} {...actions} />
// );

// export const WithBulkAction: Story = () => {
//   const { listData, sortChangedHandler } = useLocalSort(defaultData);

//   return (
//     <Explorer
//       columns={defaultColumns}
//       data={listData}
//       title="Title"
//       subtitle="Subtitle"
//       bulkActions={defaultActions}
//       {...actions}
//       onSortChanged={sortChangedHandler}
//     />
//   );
// };

// export const WithFilters: Story = () => {
//   const { listData, sortChangedHandler } = useLocalSort(defaultData);

//   return (
//     <Explorer
//       columns={defaultColumns}
//       data={listData}
//       title="Title"
//       subtitle="Subtitle"
//       filters={[freeTextFilter, optionFilter]}
//       onSortChanged={sortChangedHandler}
//     />
//   );
// };

// export const WithOverflow: Story = () => {
//   const { listData, sortChangedHandler } = useLocalSort(defaultData);

//   return (
//     <div className="container">
//       <style>{`
//         .container > div {
//           height: 500px;
//         }
//      `}</style>
//       <Explorer
//         columns={defaultColumns}
//         data={listData}
//         title="Title"
//         subtitle="Subtitle"
//         bulkActions={generateActions(15)}
//         filters={generateFilters(30)}
//         {...actions}
//         onSortChanged={sortChangedHandler}
//       />
//     </div>
//   );
// };

// export const WithKnobs: Story = () => {
//   return (
//     <Explorer
//       title={text('title', 'My Explorer', 'data')}
//       subtitle={text('subtitle', 'with knobs', 'data')}
//       columns={object('columns', defaultColumns, 'data')}
//       data={object('data', moreData, 'data')}
//       bulkActions={object('bulkActions', defaultActions, 'data')}
//       actionsWidth={text('actionsWidth', '300px', 'style')}
//       columnGap={text('columnGap', '5px', 'style')}
//       rowGap={text('rowGap', '2px', 'style')}
//       headerRowHeight={text('headerRowHeight', '44px', 'style')}
//       listRowHeight={text('listRowHeight', '51px', 'style')}
//       horizontalTextAlign={select(
//         'horizontalTextAlign',
//         ['center', 'left', 'right'],
//         'left',
//         'style',
//       )}
//       verticalTextAlign={select(
//         'verticalTextAlign',
//         ['center', 'start', 'end'],
//         'center',
//         'style',
//       )}
//       isLoading={boolean('isLoading', false, 'data')}
//       keyProperty={'id'}
//       loadingTriggerOffset={number(
//         'loadingTriggerOffset',
//         10,
//         { step: 1 },
//         'data',
//       )}
//       minimumWidth={text('minimumWidth', '500px', 'style')}
//       showActionButton={boolean('showActionButton', true, 'style')}
//       showCreateButton={boolean('showCreateButton', true, 'style')}
//       {...actions}
//       onSortChanged={action('onSortChanged')}
//     />
//   );
//};
