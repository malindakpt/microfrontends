import { assertNever } from 'helpers/utils';
import React, { useState } from 'react';
import { FilterType, FilterTypes, FilterValue } from '../Filters.model';
import { FreeTextFilter } from '../SelectionTypes/FreeTextFilter/FreeTextFilter';
import { OptionsFilter } from '../SelectionTypes/OptionsFilter/OptionsFilter';
import classes from './Filter.scss';
import closeIcon from './images/close.svg';

export interface FilterProps {
  options: FilterType;
  value?: FilterValue;
  onFilterChange: (prop: string, value: FilterValue) => void;
}
export const Filter: React.FC<FilterProps> = ({
  options,
  value,
  onFilterChange,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onFilterValueChange = (prop: string, value: FilterValue): void => {
    onFilterChange(prop, value);
    setIsExpanded(false);
  };

  const renderFilterContent = (): JSX.Element => {
    switch (options.type) {
      case FilterTypes.FreeText:
        return (
          <FreeTextFilter
            onSelect={(value: FilterValue) =>
              onFilterValueChange(options.property, value)
            }
          />
        );

      case FilterTypes.Options:
        return (
          <OptionsFilter
            options={options.options}
            onSelect={(value: FilterValue) =>
              onFilterValueChange(options.property, value)
            }
          />
        );

      case FilterTypes.Custom:
        return (
          <options.component
            onSelect={(value: FilterValue) => {
              onFilterValueChange(options.property, value);
            }}
          />
        );

      default:
        //Exhaustiveness check
        throw assertNever(options);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={classes.title}
        >
          <span>{options.label}</span>
          <div className={classes.arrowWrapper}>
            <svg viewBox="0 0 16.05 10.03">
              <polygon
                className={classes.arrow}
                points="8.05,10.03 8,10.03 0,0 16.05,0 "
              />
            </svg>
          </div>
        </div>

        {value !== undefined && (
          <div className={classes.selectedValue}>
            <span>{String(value)}</span>
            <img
              className={classes.closeBtn}
              onClick={() => {
                onFilterValueChange(options.property, undefined);
              }}
              src={closeIcon}
            />
          </div>
        )}
      </div>
      {isExpanded && <div>{renderFilterContent()}</div>}
    </>
  );
};
