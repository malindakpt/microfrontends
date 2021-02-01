import { action } from '@storybook/addon-actions';
import React from 'react';
import { Filters } from './Filters';
import { CustomFilterProps, FilterType, FilterTypes } from './Filters.model';

export default {
  title: `Other Components/Filters`,
};

const textFilter: FilterType = {
  label: 'Title',
  property: 'title',
  type: FilterTypes.FreeText,
};

const optionFilter: FilterType = {
  label: 'Service Type',
  property: 'serviceType',
  type: FilterTypes.Options,
  options: [
    {
      label: 'CREW 1',
      value: 'CREW1',
    },
    {
      label: 'CREW 2',
      value: 'CREW2',
    },
    {
      label: 'CREW 3',
      value: 'CREW3',
    },
  ],
};

const CustomFilterComponent: React.FC<CustomFilterProps> = ({ onSelect }) => {
  return (
    <div style={{ padding: '10px' }}>
      Custom Filter UI:
      <button onClick={() => onSelect('custom value')}>
        Select custom value
      </button>
    </div>
  );
};

const customFilter: FilterType = {
  label: 'Custom (Custom Filter)',
  property: 'custom',
  type: FilterTypes.Custom,
  component: CustomFilterComponent,
};

export const freeTextFilter: React.FC = () => (
  <Filters options={[textFilter]} onFiltersChange={action('Filter changed')} />
);

export const optionsFilter: React.FC = () => (
  <Filters
    options={[optionFilter]}
    onFiltersChange={action('Filter changed')}
  />
);

export const CustomFilter: React.FC = () => {
  return (
    <Filters
      options={[customFilter]}
      onFiltersChange={action('Filter changed')}
    />
  );
};

export const MultipleFilters: React.FC = () => (
  <Filters
    options={[textFilter, optionFilter, customFilter]}
    onFiltersChange={action('Filter changed')}
  />
);
