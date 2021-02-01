export type ColumnRenderer =
  /**
   * @param value Column data
   * @param data Complete row data
   */
  (value: unknown, data: Data) => React.ReactNode;

export interface Column {
  /** The name of the property on the Data object that should be rendered in that column. */
  propertyName: string;
  /** The width of the column as CSS size (default: 1fr) */
  size?: string;
  /** Column's header label */
  label?: string;
  /** If set to false, disables sorting for this column (default: true) */
  sortable?: boolean;
  /**
   * A custom render function that will be called for every row that should be rendered.
   * The List will already try to render the data in a meaningful way, but in some advanced use cases more control is required.
   * @memberof Column
   */
  render?: ColumnRenderer;
  /** Additional data passed into the render function */
  extras?: unknown;
}

export interface Data {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ColumnMap {
  [key: string]: string;
}

export interface ListItem {
  selected: boolean;
  data: Data;
}

export type ItemSelectEventArgs =
  | {
      mode: 'SELECT_ALL';
    }
  | {
      mode: 'SINGLE_ITEMS';
      items: Data[];
    };

export interface SortData {
  /** Name of the property to sort by */
  column: string;
  /** Sorting direction */
  direction: 'asc' | 'desc';
}
