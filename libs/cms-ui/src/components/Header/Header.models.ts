import { ValueOrOnDemand } from 'hooks';

/** Breadcrumb */
export interface Breadcrumb {
  /** Text to be displayed in breadcrumb */
  label: ValueOrOnDemand;
  /** The link it leads to, must be absolute path */
  url: string;
  /** Collection of route parameters */
  params: [];
}
