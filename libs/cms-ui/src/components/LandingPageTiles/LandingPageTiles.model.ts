import { ValueOrOnDemand } from 'hooks';

export interface LandingPageItem {
  /** url path */
  path: string;
  /** Tile label */
  label: string;
  /** Icon location */
  icon: string;
  /** Tile type */
  type: 'small' | 'large';
  /** Tile is disabled or enabled, default is false  */
  disabled?: boolean;
  /** Subtitle resolver */
  subtitle?: ValueOrOnDemand;
}
