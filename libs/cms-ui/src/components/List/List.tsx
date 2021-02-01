import React, {
  ReactElement,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  Column,
  Data,
  ListItem,
  SortData,
  ItemSelectEventArgs,
} from './List.model';
import classes from './List.scss';
import { ListHeader } from './ListHeader/ListHeader';
import { ListRow } from './ListRow/ListRow';
import { ListRowLoader } from './ListRow/ListRowLoader';
import { noop } from 'helpers/utils';

export interface ListProps {
  /** List data */
  data: Data[];
  /** Defines whether data is being loaded (default: false) */
  isLoading?: boolean;
  /** Defines whether there was an error with the data. If true a button will be shown that will trigger `onRetry` when hit. */
  isError?: boolean;
  /**
   * Column definitions
   * The order of this array determines the order of columns
   */
  columns: Column[];
  /** The name of the property on the data object that should be used to identify objects (default: 'id')  */
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
  /** Defines whether an action button will be rendered (default: true) */
  showActionButton?: boolean;
  /** Defines whether a checkbox for each item should be rendered (default: true) */
  showItemCheckbox?: boolean;
  /** Defines when the loading of the next page is triggered. The number represents the number of row left, before a load is triggered. (default: 10) */
  loadingTriggerOffset?: number;
  /** Defines how the list data should be sorted */
  defaultSortOrder?: SortData;
  /** Raised when an data item is clicked */
  onItemClicked?: (data: Data) => void;
  /** Raised when the create action button is clicked */
  onCreateAction?: () => void;
  /** Raised when item selection has changed */
  onItemSelected?: (itemSelectEvent: ItemSelectEventArgs) => void;
  /** Raised when list has scrolled down to the item indicated by loadingTriggerOffset */
  onRequestMoreData?: () => void;
  /** Callback to emit when a sort event occurs. Name of the property and order of the direction are sent back. */
  onSortChanged?: (sort: SortData) => void;
  /** Callback emitted if the user clicks on the retry button which is shown when `isError` is set to true */
  onRetry?: () => void;
}

/**
 * Generates a combined string of all columns.columnSize values, to be used as CSS value
 * @param columns The list of columns that should be used
 * @returns a string of all column sizes of the array, combined
 */
function getColumnsSizeDefinition(
  columns: Column[],
  showActionButton: boolean,
  showCreateButton: boolean,
  showItemCheckbox: boolean,
): string {
  let buttonColumn = '';
  let checkboxColumn = '';
  const columnDefinition = columns
    .reduce((prev, current) => `${prev} ${current.size ?? '1fr'}`, '')
    .trim();

  if (showItemCheckbox) {
    checkboxColumn = '20px ';
  }

  if (showActionButton || showCreateButton) {
    buttonColumn = ' 51px';
  }
  return `${checkboxColumn}${columnDefinition}${buttonColumn}`;
}

function noItemsMessage(
  itemsCount: number,
  isLoading: boolean,
  isError: boolean,
): ReactElement | undefined {
  if (!isLoading && !isError && itemsCount === 0) {
    return <div className={classes.NoData}>No items found!</div>;
  }
}

function isTrigger(
  index: number,
  listItems: ListItem[],
  loadingTriggerOffset: number,
): boolean {
  return listItems.length - loadingTriggerOffset === index + 1 ? true : false;
}

function useSort(
  defaultSortOrder: SortData | undefined,
  onSortChanged: (sort: SortData) => void,
): {
  readonly sort: SortData | undefined;
  readonly sortChangedHandler: (sort: SortData) => void;
} {
  const [sort, setSort] = useState<SortData | undefined>(defaultSortOrder);

  const sortChangedHandler = (sort: SortData): void => {
    setSort(sort);
    onSortChanged && onSortChanged(sort);
  };

  return { sort, sortChangedHandler } as const;
}

/**
 * Renders various sets of data in a tabular format
 * @example
 * <List
 *  columns={[{propertyName: 'id', size: '1fr', label: 'Id'}]}
 *  data={[{id: '1',desc: 'Description 1',title: 'Item 1'}]}
 *  itemClicked={(item)=> {console.log(item)}}
 * />
 */
export const List: React.FC<ListProps> = ({
  columns,
  data,
  isLoading = false,
  isError = false,
  minimumWidth = '500px',
  columnGap = '5px',
  rowGap = '2px',
  headerRowHeight = '44px',
  listRowHeight = '51px',
  horizontalTextAlign = 'left',
  verticalTextAlign = 'center',
  keyProperty = 'id',
  showActionButton = true,
  showItemCheckbox = true,
  loadingTriggerOffset = 10,
  defaultSortOrder,
  onCreateAction,
  onItemClicked = noop,
  onItemSelected = noop,
  onRequestMoreData = noop,
  onSortChanged = noop,
  onRetry = noop,
}) => {
  const showCreateButton = !!onCreateAction;
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const isAllItemsChecked = useRef<boolean>(false);

  useEffect(() => {
    setListItems((prevState: ListItem[]) => {
      const newListItems: ListItem[] = data.map((i, index) => ({
        selected: isAllItemsChecked.current || prevState[index]?.selected,
        data: i,
      }));
      return newListItems;
    });
  }, [data]);

  const columnSizes = getColumnsSizeDefinition(
    columns,
    showCreateButton,
    showActionButton,
    showItemCheckbox,
  );

  const customStyles = { gridRowGap: rowGap, minWidth: minimumWidth };

  const itemSelectionHandler = useCallback(
    (items: ListItem[]) => {
      const selectedData: Data[] = items.map(({ data }) => data);
      onItemSelected &&
        onItemSelected({
          mode: 'SINGLE_ITEMS',
          items: selectedData,
        });
    },
    [onItemSelected],
  );

  const headerCheckboxHandler = useCallback(
    (checked: boolean): void => {
      const newListItems: ListItem[] = data.map(i => ({
        selected: checked,
        data: i,
      }));
      setListItems(newListItems);
      isAllItemsChecked.current = checked;

      if (checked) {
        onItemSelected({
          mode: 'SELECT_ALL',
        });
      } else {
        onItemSelected({
          mode: 'SINGLE_ITEMS',
          items: [],
        });
      }
    },
    [data, onItemSelected],
  );

  function itemSelectedHandler(selected: boolean, index: number): void {
    const items = [...listItems];
    items[index].selected = selected;
    setListItems(items);
    itemSelectionHandler(items.filter(item => item.selected === true));
  }

  function onTriggeredHandler(): void {
    if (!isLoading && !isError) {
      onRequestMoreData();
    }
  }

  const { sort, sortChangedHandler } = useSort(defaultSortOrder, onSortChanged);

  return (
    <div className={classes.wrapper} style={customStyles}>
      {/* Header */}
      <ListHeader
        columns={columns}
        itemSelected={isAllItemsChecked.current}
        sortData={sort}
        columnSizes={columnSizes}
        columnGap={columnGap}
        rowHeight={headerRowHeight}
        horizontalTextAlign={horizontalTextAlign}
        verticalTextAlign={verticalTextAlign}
        showCreateButton={showCreateButton}
        showItemCheckbox={showItemCheckbox}
        onCreateAction={onCreateAction}
        onCheckboxToggled={headerCheckboxHandler}
        onSortChanged={sortChangedHandler}
      />
      {/* Rows */}
      {listItems.map((item: ListItem, index) => (
        <ListRow
          key={item.data[keyProperty]}
          columns={columns}
          data={item.data}
          itemSelected={item.selected}
          isTrigger={isTrigger(index, listItems, loadingTriggerOffset)}
          isCheckBoxDisabled={isAllItemsChecked.current}
          columnSizes={columnSizes}
          columnGap={columnGap}
          rowHeight={listRowHeight}
          horizontalTextAlign={horizontalTextAlign}
          verticalTextAlign={verticalTextAlign}
          showActionButton={showActionButton}
          showItemCheckbox={showItemCheckbox}
          onItemClicked={onItemClicked}
          onTriggered={onTriggeredHandler}
          onItemSelected={checked => {
            itemSelectedHandler(checked, index);
          }}
        />
      ))}
      {isLoading && (
        <ListRowLoader
          columnSizes={columnSizes}
          columnGap={columnGap}
          rowHeight={listRowHeight}
          columns={columns}
          hasCheckbox={showItemCheckbox}
        />
      )}
      {noItemsMessage(listItems.length, isLoading, isError)}
      {isError && (
        <div className={classes.Error}>
          There was an error.
          <button onClick={() => onRetry()}>Retry?</button>
        </div>
      )}
    </div>
  );
};
