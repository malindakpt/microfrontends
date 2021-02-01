import { FilterValue, FilterValues } from 'components/Filters';

/**
 * Transforms CMS filters to PostGraphile filters using a map.
 * @param activeFilters Current CMS filters
 * @param map Query map
 */
export const filterToPostGraphileFilter = <T>(
  activeFilters: FilterValues,
  map: { [key: string]: string },
): T | undefined => {
  let filters: T | undefined;

  if (activeFilters) {
    const filterEntries: [string, FilterValue][] = Object.entries(
      activeFilters,
    );
    let filterWithQuery: T = {} as T;

    // Postgraphile won't accept an empty Object. If no filters exists, must be undefined
    if (filterEntries.length === 0) {
      filters = undefined;
    } else {
      // Convert CMS filters object to Postgraphile filters using the map
      for (const [prop, value] of filterEntries) {
        filterWithQuery = {
          ...filterWithQuery,
          [prop]: { [map[prop]]: value },
        };
      }
      filters = filterWithQuery as T;
    }

    return filters;
  }
};
