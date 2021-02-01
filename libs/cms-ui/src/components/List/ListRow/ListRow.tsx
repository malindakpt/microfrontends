import { noop } from 'helpers/utils';
import React, { useCallback, useRef } from 'react';
import { Column, Data } from '../List.model';
import { ListCheckBox } from '../ListCheckBox/ListCheckBox';
import { ActionButton } from './ActionButton/ActionButton';
import classes from './ListRow.scss';

export interface ListRowProps {
  /** Spacing between columns */
  columnSizes: string;
  /** Header row height */
  columnGap: string;
  /** List row height */
  rowHeight: string;
  /** Horizontal alignment of text */
  horizontalTextAlign: 'left' | 'right' | 'center';
  /** Vertical alignment of text */
  verticalTextAlign: 'start' | 'center' | 'end';
  /** List data */
  data: Data;
  /** The column definition */
  columns: Column[];
  /** Whether or not the item is selected (default: false) */
  itemSelected?: boolean;
  /** Whether or not the item is a trigger for pagination (default: false) */
  isTrigger?: boolean;
  /** Defines whether an action button will be rendered (default: true) */
  showActionButton?: boolean;
  /** Defines whether a checkbox for each item should be rendered (default: true) */
  showItemCheckbox?: boolean;
  /** Defines whether a checkbox for each item should be disabled (default: false) */
  isCheckBoxDisabled?: boolean;

  onItemClicked?: (data: Data) => void;
  onItemSelected?: (checked: boolean) => void;
  onTriggered?: () => void;
}

let dateFormatter: Intl.DateTimeFormat;

let numberFormatter: Intl.NumberFormat;

export const refreshLocale: () => void = () => {
  dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  numberFormatter = new Intl.NumberFormat(navigator.language);
};

refreshLocale();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderData(
  column: Column,
  rowData: Data,
  propertyName: string,
): React.ReactNode {
  const value: unknown = rowData[propertyName];
  if (column.render) {
    return column.render(value, rowData);
  }

  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'number') {
    return numberFormatter.format(value);
  }

  if (value instanceof Date) {
    return dateFormatter.format(value);
  }

  return String(value);
}

/**
 * Renders the rows for the list component
 * @example
 * <ListRow
 *  key={index}
 *  data={[{id: '1',desc: 'Description 1',title: 'Item 1'}]}
 *  columnSizes={'1fr'}
 *  columnGap={'5px'}
 *  rowHeight={'60px'}
 *  horizontalTextAlign={'left'}
 *  verticalTextAlign={'center'}
 * />
 */
export const ListRow: React.FC<ListRowProps> = ({
  columnSizes,
  columnGap,
  rowHeight,
  horizontalTextAlign,
  verticalTextAlign,
  data,
  itemSelected = false,
  isTrigger = false,
  columns,
  showActionButton = true,
  showItemCheckbox = true,
  onItemClicked = noop,
  onItemSelected = noop,
  onTriggered = noop,
  isCheckBoxDisabled = false,
}) => {
  const customStyles = {
    gridAutoRows: rowHeight,
    gridTemplateColumns: columnSizes,
    gridColumnGap: columnGap,
    justifyItems: horizontalTextAlign,
    alignItems: verticalTextAlign,
  } as React.CSSProperties;

  // Trigger based on: https://www.youtube.com/watch?v=NZKUirTtxcg
  const onTriggeredHandler = useCallback(() => {
    onTriggered && onTriggered();
  }, [onTriggered]);
  const observer = useRef<IntersectionObserver>();
  const elementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isTrigger === false) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          onTriggeredHandler();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isTrigger, onTriggeredHandler],
  );

  return (
    <div
      className={classes.row}
      style={customStyles}
      onClick={() => onItemClicked(data)}
      ref={isTrigger ? elementRef : null}
    >
      {showItemCheckbox && (
        <ListCheckBox
          onCheckBoxToggled={onItemSelected}
          isChecked={itemSelected}
          isDisabled={isCheckBoxDisabled}
        />
      )}
      {/* Items */}
      {columns.map(column => (
        <div key={column.propertyName} className={classes.cell}>
          {renderData(column, data, column.propertyName)}
        </div>
      ))}
      {showActionButton && <ActionButton />}
    </div>
  );
};
