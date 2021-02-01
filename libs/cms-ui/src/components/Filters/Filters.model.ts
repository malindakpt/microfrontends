export enum FilterTypes {
  FreeText,
  Options,
  Custom,
}

export interface FilterConfig {
  label: string;
  property: string;
  type: FilterTypes;
}

export interface Option {
  label: string;
  value: any;
}

export interface FreeTextFilter extends FilterConfig {
  type: FilterTypes.FreeText;
}

export interface OptionsFilter extends FilterConfig {
  type: FilterTypes.Options;
  options: Option[];
}

export interface CustomFilter extends FilterConfig {
  type: FilterTypes.Custom;
  component: React.FC<CustomFilterProps>;
}

export interface CustomFilterProps {
  onSelect: (value: FilterValue) => void;
}

export type FilterValue = string | number | boolean | object | undefined;

export type FilterType = FreeTextFilter | OptionsFilter | CustomFilter;

export interface FilterValues {
  [filterProperty: string]: FilterValue;
}
