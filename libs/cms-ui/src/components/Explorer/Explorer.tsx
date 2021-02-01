import { assertNever, noop } from 'helpers/utils';
import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  getState,
  storeState,
} from '../../components/AxinomCMS/State/GlobalState';
import { ActionData, Actions } from '../Actions';
import { Filters } from '../Filters/Filters';
import { FilterType, FilterValues } from '../Filters/Filters.model';
import { Column, Data, ItemSelectEventArgs, List, SortData } from '../List';
import { PageHeader } from '../PageHeader';
import { ExplorerDataProvider, ItemSelection } from './Explorer.model';
import classes from './Explorer.scss';

export interface ExplorerProps {
  /** Title shown in page header */
  title?: string;

  /**
   * Column definitions
   * The order of this array determines the order of columns
   */
  columns: Column[];
  /** The filters that should be available on the Explorer */
  filterOptions?: FilterType[];
  /** The name of the property on the data object that should be used to identify objects (default: 'id') */
  keyProperty?: string;
  /** Minimum width of this component */
  minimumWidth?: string;
  /** Spacing between columns */
  columnGap?: string;
  /** Header row height */
  headerRowHeight?: string;
  /** List row height */
  listRowHeight?: string;
  /** Spacing between rows */
  rowGap?: string;
  /** Horizontal alignment of text */
  horizontalTextAlign?: 'left' | 'right' | 'center';
  /** Vertical alignment of text */
  verticalTextAlign?: 'start' | 'center' | 'end';
  /** Defines when the loading of the next page is triggered. The number represents the number of row left, before a load is triggered. (default: 10) */
  loadingTriggerOffset?: number;
  /** Array of Actions */
  bulkActions?: ActionData[];
  /** Width of the Actions container */
  actionsWidth?: string;
  /** Unique identifier used to store states related to explorer */
  stationKey: string;

  //TODO: defaultFilter

  /** Raised when an data item is clicked */
  onItemClicked?: (data: Data) => void;
  /** Raised when the create action button is clicked */
  onCreateAction?: () => void;
  /**
   * Callback to emit when a user clicks on an Action
   * The actionId and information about the selected items are supplied as an argument
   * Item selection can have two modes:
   * * `SINGLE_ITEMS` - if single items were checked by the user. The selected items are available on the `items` property.
   * * `SELECT_ALL` - if the checkbox on the header is selected. The action is supposed to be executed on _all_ items matching the given `filters` settings.
   */
  onBulkActionSelected?: (action: string, selection: ItemSelection) => void;
  /** Callback used to request new or additional data */
  dataProvider: ExplorerDataProvider;
}

/**
 * Renders an Explorer that can show a list of assets and allows selection of single assets,
 * performing bulk operations on multiple assets, filtering, sorting as well as a button to create new assets.
 *
 * @example
 * <Explorer
 *  title="Title"
 *  columns={[{propertyName: 'id', size: '1fr', label: 'Id'}]}
 *  dataProvider={dataProvider}
 *  bulkActions={[{actionId: 'action1', label: 'Action One'}]}
 *  onItemClicked={itemClickedHandler}
 *  onCreateAction={createActionHandler}
 *  onBulkActionSelected={actionSelectedHandler}
 * />
 */
export const Explorer: React.FC<ExplorerProps> = ({
  title,

  minimumWidth,
  columnGap,
  rowGap,
  headerRowHeight,
  listRowHeight,
  horizontalTextAlign,
  verticalTextAlign,
  actionsWidth,

  columns,
  filterOptions,
  keyProperty,
  stationKey,

  bulkActions,

  dataProvider,
  loadingTriggerOffset,

  onCreateAction,
  onItemClicked,
  onBulkActionSelected = noop,
}) => {
  const sortOrder = getState<SortData>(stationKey, 'sort');
  const activeFilters = getState<FilterValues>(stationKey, 'filters');

  const {
    data,
    isLoading,
    isError,
    subtitle,
    onRetry,
    onRequestMoreData,
    onFiltersChange,
    onSortChanged,
  } = useDataProvider(dataProvider, sortOrder, activeFilters);

  // TODO: Put into hook?------------------
  const [isActionsShown, setIsActionsShown] = useState<boolean>(false);
  const [itemSelection, setItemSelection] = useState<ItemSelectEventArgs>();

  const itemSelectedHandler = useCallback(
    (itemSelectEventArgs: ItemSelectEventArgs): void => {
      setItemSelection(itemSelectEventArgs);
      if (
        itemSelectEventArgs.mode === 'SELECT_ALL' ||
        itemSelectEventArgs?.items.length > 0
      ) {
        setIsActionsShown(true);
      } else {
        setIsActionsShown(false);
      }
    },
    [],
  );

  const bulkActionSelectedHandler = useCallback(
    (action: string) => {
      let payload: ItemSelection;

      const selection = itemSelection ?? { mode: 'SELECT_ALL' };

      switch (selection.mode) {
        case 'SELECT_ALL':
          payload = {
            mode: selection.mode,
            filters: activeFilters,
          };
          break;
        case 'SINGLE_ITEMS':
          payload = {
            mode: selection.mode,
            items: selection.items,
          };
          break;
        default:
          throw assertNever(selection);
      }

      onBulkActionSelected(action, payload);
    },
    [itemSelection, onBulkActionSelected, activeFilters],
  );
  //------------------

  return (
    <div className={classes.container}>
      <PageHeader title={title} subtitle={subtitle}>
        {onCreateAction && (
          <div className={classes.createIcon} onClick={onCreateAction}>
            <div className={classes.content}>
              <div className={classes.createImage}>
                <svg className={classes.svgPlus} viewBox="0 0 100 100">
                  <line x1="10" y1="50" x2="90" y2="50" strokeWidth="5"></line>
                  <line x1="50" y1="10" x2="50" y2="90" strokeWidth="5"></line>
                </svg>
              </div>
              <div className={classes.text}>NEW</div>
            </div>
          </div>
        )}
      </PageHeader>
      <Filters
        options={filterOptions}
        defaultValues={activeFilters}
        onFiltersChange={args => {
          onFiltersChange(args);
          storeState(stationKey, 'filters', args);
        }}
      />
      <List
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        minimumWidth={minimumWidth}
        columnGap={columnGap}
        rowGap={rowGap}
        headerRowHeight={headerRowHeight}
        listRowHeight={listRowHeight}
        horizontalTextAlign={horizontalTextAlign}
        verticalTextAlign={verticalTextAlign}
        keyProperty={keyProperty}
        showActionButton={Boolean(onItemClicked)} // or hard code to `true`?
        showItemCheckbox={Boolean(bulkActions && bulkActions.length > 0)}
        loadingTriggerOffset={loadingTriggerOffset}
        defaultSortOrder={sortOrder}
        onItemClicked={onItemClicked}
        onItemSelected={itemSelectedHandler}
        onRequestMoreData={onRequestMoreData}
        onSortChanged={(sortData: SortData) => {
          onSortChanged(sortData);
          storeState(stationKey, 'sort', sortData);
        }}
        onRetry={onRetry}
      />
      {isActionsShown && (
        <Actions
          actions={bulkActions}
          width={actionsWidth}
          onActionSelected={bulkActionSelectedHandler}
        />
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useDataProvider(
  dataProvider: ExplorerDataProvider,
  defaultSortOrder?: SortData,
  filters?: FilterValues,
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [subtitle, setSubtitle] = useState<string>('');
  const hasMoreData = useRef<boolean>(true);
  const pagingInfo = useRef<unknown>();
  const lastAttemptedPagingInfo = useRef<unknown>();

  const sorting = useRef<SortData | undefined>(defaultSortOrder);
  const filterValues = useRef<FilterValues | undefined>(filters);

  const loadData = async (
    isFirstPage = true,
    pagingInformation: unknown = undefined,
  ): Promise<void> => {
    // If there is no more data, exit.
    if (hasMoreData.current === false) {
      return;
    }

    if (isFirstPage === true) {
      // Reset pagingInfo.
      pagingInfo.current = undefined;
      // Clean out data, because we're anyway loading the data new from scratch.
      // This way the error message will not appear way down on the list but in sight.
      setData(() => []);
    }

    setIsLoading(true);
    setIsError(false);

    // Remembering the attempted paging information to use on retry.
    lastAttemptedPagingInfo.current = pagingInformation;
    try {
      const result = await dataProvider.loadData(
        cloneDeep(pagingInfo.current),
        cloneDeep(sorting.current),
        cloneDeep(filterValues.current),
      );

      setSubtitle(
        `Total: ${result.totalCount}, filtered: ${result.filteredCount}`, // Is filter count used anymore
      );

      // Set new paging info.
      setData(data => [...data, ...result.data]);
      pagingInfo.current = result.pagingInformation;
      hasMoreData.current = result.hasMoreData;
    } catch (err) {
      // console.log('loadData Error', err);
      // TODO: show more information (including the original message),
      // using the mechanism that will be developed by Story 4835.
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadData();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSortChanged = (sort: SortData): void => {
    // Re-enable more data requests
    hasMoreData.current = true;
    // Set new sorting order.
    sorting.current = sort;
    loadData();
  };

  const onFiltersChange = (filters: FilterValues): void => {
    // Re-enable more data requests
    hasMoreData.current = true;
    // Set new filters.
    filterValues.current = filters;
    loadData();
  };

  const onRequestMoreData = (): void => {
    loadData(false, pagingInfo.current);
  };

  const onRetry = (): void => {
    loadData(false, lastAttemptedPagingInfo.current);
  };

  return {
    isLoading,
    isError,
    subtitle,
    onRetry,
    onSortChanged,
    onFiltersChange,
    onRequestMoreData,
    data,
  } as const;
}
