import { FilterValues } from 'components/Filters';
import { Data, SortData } from 'components/List';

export type ItemSelection =
  | {
      mode: 'SELECT_ALL';
      filters: FilterValues | undefined;
    }
  | {
      mode: 'SINGLE_ITEMS';
      items: Data[];
    };

export type PageIdentifier = string | number | undefined;

export interface DataProviderResults {
  /** Paginated data results */
  data: Data[];
  /** Total amount of results */
  totalCount: number;
  /** Determines if requests for more paginated data should continue (default: true)*/
  hasMoreData: boolean;
  /** Amount of results after filters are applied */
  filteredCount?: number;
  /**
   * Additional paging information to be sent.
   * This property will be reset to undefined when a new set of data is requested.
   */
  pagingInformation?: unknown;
}

export interface ExplorerDataProvider {
  loadData: (
    /** Information related to pagination */
    pagingInformation: unknown,
    /** Information about the current sort order that is requested. */
    sorting?: SortData,
    /** Information about the current filter settings that are requested. */
    filters?: FilterValues,
  ) => Promise<DataProviderResults>;
}
