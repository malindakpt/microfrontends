export type ValueOrOnDemand =
  | string
  | number
  | (() => Promise<string | number>);

type PushOrReplace = (
  pathOrLocation: string,
  state: {
    [key: string]: unknown;
  },
) => void;

export interface NavigationAPI {
  isPaused: () => boolean;
  pausedLocation: () => {} | null;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
  push: PushOrReplace;
  replace: PushOrReplace;
}
