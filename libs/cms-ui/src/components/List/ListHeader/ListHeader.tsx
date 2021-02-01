import React from 'react';
import { Column, SortData } from '../List.model';
import { ListCheckBox } from '../ListCheckBox/ListCheckBox';
import { ColumnLabel } from './ColumnLabel/ColumnLabel';
import { CreateButton } from './CreateButton/CreateButton';
import classes from './ListHeader.scss';

export interface ListHeaderProps {
  /** Column definitions */
  columns: Column[];
  /** Sizes of each column */
  columnSizes: string;
  /** Spacing between columns */
  columnGap: string;
  /** Header row height */
  rowHeight: string;
  /** Horizontal alignment of text */
  horizontalTextAlign: 'left' | 'right' | 'center';
  /** Vertical alignment of text */
  verticalTextAlign: 'start' | 'center' | 'end';
  /** Whether or the item is selected (default: false) */
  itemSelected?: boolean;
  /** Defines how the list data should be sorted */
  sortData?: SortData;
  /** Defines whether the create button will be rendered (default: true) */
  showCreateButton?: boolean;
  /** Defines whether a checkbox for each item should be rendered (default: true) */
  showItemCheckbox?: boolean;
  /** Raised when the create action button is clicked */
  onCreateAction?: () => void;
  /** Raised when the header checkbox has been changed. Checked state is sent back. */
  onCheckboxToggled?: (checked: boolean) => void;
  /** Callback to emit when a sort event occurs. Name of the property and order of the direction are sent back. */
  onSortChanged?: (sort: SortData) => void;
}

/**
 * Renders the headers for the list component
 * @example
 * <ListHeader
 *  columns={[{propertyName: 'id', size: '1fr', label: 'Id'}]}
 *  columnSizes={'1fr'}
 *  columnGap={'5px'}
 *  rowHeight={'44px'}
 *  horizontalTextAlign={'left'}
 *  verticalTextAlign={'center'}
 * />
 */
export const ListHeader: React.FC<ListHeaderProps> = ({
  columns,
  columnSizes,
  columnGap,
  rowHeight,
  horizontalTextAlign,
  verticalTextAlign,
  itemSelected = false,
  sortData,
  showCreateButton = true,
  showItemCheckbox = true,
  onCreateAction,
  onCheckboxToggled,
  onSortChanged,
}) => {
  const customStyles = {
    gridAutoRows: rowHeight,
    gridTemplateColumns: columnSizes,
    gridColumnGap: columnGap,
    justifyItems: horizontalTextAlign,
    alignItems: verticalTextAlign,
  } as React.CSSProperties;

  return (
    <div className={classes.container} style={customStyles}>
      {showItemCheckbox && (
        <ListCheckBox
          onCheckBoxToggled={onCheckboxToggled}
          isChecked={itemSelected}
        />
      )}
      {columns.map(column => (
        <div key={column.propertyName}>
          <ColumnLabel
            propertyName={column.propertyName}
            label={column.label ?? column.propertyName}
            sortable={column.sortable}
            sortData={sortData}
            onSortChanged={onSortChanged}
          />
        </div>
      ))}
      {showCreateButton && <CreateButton onCreateAction={onCreateAction} />}
    </div>
  );
};
