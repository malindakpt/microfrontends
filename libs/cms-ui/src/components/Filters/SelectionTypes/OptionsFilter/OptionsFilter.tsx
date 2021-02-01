import React from 'react';
import { Option } from '../../Filters.model';
import classes from './OptionsFilter.scss';

export interface OptionFilterPorps {
  options: Option[];
  onSelect: (text: string) => void;
}

export const OptionsFilter: React.FC<OptionFilterPorps> = ({
  options,
  onSelect,
}) => {
  return (
    <div className={classes.container}>
      {options?.map((option: Option) => (
        <div
          className={classes.option}
          onClick={() => onSelect(option.value)}
          key={option.label}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};
