import React from 'react';
import { FilterValue } from '../../Filters.model';
import classes from './FreeTextFilter.scss';

export interface FreeTextFilterPorps {
  onSelect: (value: FilterValue) => void;
}

export const FreeTextFilter: React.FC<FreeTextFilterPorps> = ({ onSelect }) => {
  const ENTER_KEY = 'Enter';

  const handleKeyDown = (e: any) => {
    if (e.key === ENTER_KEY) {
      onSelect(e.target.value !== '' ? e.target.value : undefined);
    }
  };

  return (
    <div className={classes.container}>
      <input className={classes.inputValue} onKeyDown={handleKeyDown} />
    </div>
  );
};
