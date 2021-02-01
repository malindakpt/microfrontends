import React from 'react';
import { Column } from '..';
import { Loader } from '../../Loaders/Loader/Loader';
import classes from './ListRow.scss';

export interface ListRowLoaderProps {
  /** Spacing between columns */
  columnSizes: string;
  /** Header row height */
  columnGap: string;
  /** List row height */
  rowHeight: string;
  /** The column definition */
  columns: Column[];
  /** Indicating whether the row has a checkbox or not */
  hasCheckbox: boolean;
}

export const ListRowLoader: React.FC<ListRowLoaderProps> = ({
  columnSizes,
  columnGap,
  rowHeight,
  columns,
  hasCheckbox,
}) => {
  const checkBoxHeight = 15;
  const textLoaderHeight = 7;

  const customRowStyles = {
    gridAutoRows: rowHeight,
    gridTemplateColumns: columnSizes,
    gridColumnGap: columnGap,
  } as React.CSSProperties;

  const customCheckBoxStyles = {
    width: '100%',
  };

  return (
    <div className={classes.row} style={customRowStyles}>
      {hasCheckbox && (
        <div style={customCheckBoxStyles}>
          <Loader
            showLoader={true}
            width={checkBoxHeight}
            height={checkBoxHeight}
            viewBox={`0 0 ${checkBoxHeight} ${checkBoxHeight}`}
          />
        </div>
      )}
      {columns.map(column => (
        <div key={column.propertyName} className={classes.cell}>
          <Loader
            showLoader={true}
            height={textLoaderHeight}
            viewBox={`0 0 100 ${textLoaderHeight}`}
          />
        </div>
      ))}
      {<div />}
    </div>
  );
};
