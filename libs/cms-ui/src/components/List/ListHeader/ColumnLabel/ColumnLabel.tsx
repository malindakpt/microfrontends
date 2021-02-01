import clsx from 'clsx';
import React from 'react';
import { SortData } from '../../List.model';
import classes from './ColumnLabel.scss';
import { noop } from 'helpers/utils';

export interface ColumnLabelProps {
  /** Data object's property name associated with this column */
  propertyName: string;
  /** Column label */
  label?: string;
  /** If set to false, disables sorting for this column (default: true) */
  sortable?: boolean;
  /** Defines how the list data should be sorted. */
  sortData?: SortData;
  /** Callback to emit when a user clicks on this component. The name of the property and the order of the direction are sent back. */
  onSortChanged?: (sort: SortData) => void;
}

export const ColumnLabel: React.FC<ColumnLabelProps> = ({
  propertyName,
  label,
  sortable = true,
  sortData,
  onSortChanged = noop,
}) => {
  /** Creates sort data object to be emitted back on change event. */
  const getSortDir = (): SortData => {
    if (sortData?.column === propertyName && sortData.direction === 'asc') {
      return { column: propertyName, direction: 'desc' };
    } else {
      return { column: propertyName, direction: 'asc' };
    }
  };

  /** Determines if the current column is currently being used to sort and which direction. */
  const direction =
    sortData?.column === propertyName ? sortData.direction : undefined;

  if (!sortable) {
    return (
      <div className={classes.container}>
        <span className={classes.label}>{label ?? propertyName}</span>
      </div>
    );
  } else {
    return (
      <div
        className={clsx(classes.container, classes.sortable)}
        onClick={() => onSortChanged(getSortDir())}
      >
        <span className={classes.label}>{label ?? propertyName}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.18 13.7">
          <polygon
            className={clsx({ [classes.sorted]: direction === 'asc' })}
            points="4.61 0 0.04 5.83 9.19 5.83 4.61 0"
          />
          <polygon
            className={clsx({ [classes.sorted]: direction === 'desc' })}
            points="4.58 13.7 9.15 7.87 0 7.87 4.58 13.7"
          />
        </svg>
      </div>
    );
  }
};
