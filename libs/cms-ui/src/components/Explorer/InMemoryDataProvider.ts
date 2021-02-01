import { FilterValue, FilterValues } from '../Filters';
import { Data, SortData } from '../List';
import { ExplorerDataProvider } from './Explorer.model';

type FilterFunction = (value: any, filter: FilterValue, item: Data) => boolean;

interface LocalDataProviderConfig {
  caseSensitiveSort?: boolean;
  filterFunctions?: {
    [property: string]: FilterFunction;
  };
}

export function createInMemoryDataProvider(
  data: Data[],
  {
    caseSensitiveSort = false,
    filterFunctions = {},
  }: LocalDataProviderConfig = {},
): ExplorerDataProvider {
  return {
    loadData: (_pageInfo, sorting, filters) => {
      let result: Data[] = [...data];

      if (filters) {
        result = applyFilter(result, filters, filterFunctions);
      }

      if (sorting) {
        result = applySort(result, sorting, caseSensitiveSort);
      }

      return Promise.resolve({
        totalCount: data.length,
        filteredCount: result.length,
        data: result,
        hasMoreData: false,
      });
    },
  };
}

/**
 * Checks if the the `String(value)` exactly matches `String(filter)`.
 */
export const findExact: FilterFunction = (value, filter) => {
  return String(value) === String(filter);
};

/**
 * Checks if the filter string can be found somewhere in the value string. (case sensitive)
 */
export const findAnywhereInString: FilterFunction = (value, filter) => {
  return String(value).indexOf(String(filter)) >= 0;
};

/**
 * Checks if the filter string can be found somewhere in the value string. (case insensitive)
 */
export const findAnywhereInStringCaseInsensitive: FilterFunction = (
  value,
  filter,
) => {
  return (
    String(value)
      .toLowerCase()
      .indexOf(String(filter).toLowerCase()) >= 0
  );
};

function applyFilter(
  data: Data[],
  filters: FilterValues,
  filterFunctions: {
    [property: string]: FilterFunction;
  },
): Data[] {
  return data.filter(i => {
    return Object.keys(filters).reduce<boolean>((prev, property) => {
      if (!prev) return false;

      // Use any given filter function or `findExact` if as fallback.
      const filterFn = filterFunctions[property] ?? findExact;
      return filterFn(i[property], filters[property], i);
    }, true);
  });
}

function applySort(
  data: Data[],
  sorting: SortData,
  caseSensitiveSort: boolean,
): Data[] {
  data = data.sort((a, b) => {
    let aValue = a[sorting.column];
    let bValue = b[sorting.column];
    if (!caseSensitiveSort && typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    if (aValue > bValue) {
      return 1;
    } else {
      return -1;
    }
  });
  if (sorting.direction === 'desc') {
    data = data.reverse();
  }

  return data;
}
