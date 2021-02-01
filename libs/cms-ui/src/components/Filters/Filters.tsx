import clsx from 'clsx';
import React, { useRef } from 'react';
import { Filter } from './Filter/Filter';
import { FilterType, FilterValue, FilterValues } from './Filters.model';
import classes from './Filters.scss';

export interface FiltersProps {
  options?: FilterType[];
  defaultValues?: FilterValues;
  onFiltersChange?: (filters: FilterValues) => void;
}

/**
 * Renders filter components depending on the options specified in params
 * FreeTextFilter and OptionsFilter are inbuilt filter types and its possible to pass custom
 * filters with filter type of CustomFilter
 * @param array - filters: Array of FilterControl elements to define all the filters
 * @Param object - filters: Object of currently active filters
 * @param function - onFiltersChange: callBack function to invoke when the selected value for filter is changed
 * @example
 *   <Filter filters={[freeTextFilter, optionsFilter, customFilter]} onFiltersChange={callBackFn} />
 */
export const Filters: React.FC<FiltersProps> = ({
  defaultValues: defaultFilters = {},
  options,
  onFiltersChange,
}) => {
  const activeFilters = useRef<FilterValues>(defaultFilters);

  const filtersChangedHandler = (prop: string, value: FilterValue): void => {
    // Add the filter and remove any filters whose value is undefined
    activeFilters.current = Object.entries({
      ...activeFilters.current,
      [prop]: value,
    })
      .filter(([, v]) => v !== undefined)
      .reduce<FilterValues>((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    // Emit new set of filters
    if (onFiltersChange) {
      onFiltersChange(activeFilters.current);
    }
  };

  return (
    <div className={clsx({ [classes.container]: options })}>
      {options?.map((filter: FilterType) => (
        <Filter
          options={filter}
          value={activeFilters.current[filter.property]}
          key={filter.label}
          onFilterChange={filtersChangedHandler}
        />
      ))}
    </div>
  );
};
