import { Breadcrumb } from 'components';
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
} from 'react';
import { Maybe } from 'helpers/utils';
import { AuthProps } from 'components/Header/Auth/Auth';

interface AppState {
  breadcrumbs: Breadcrumb[];
  user: AuthProps;
}

export interface AppStateOptions {
  /**
   * Global breadcrumb state. Update this property to update breadcrumbs
   * @example
   * updateAppState({ breadcrumbs: [{ label: 'Home Station', url: '/', params: [] }]});
   */
  breadcrumbs?: Breadcrumb[];
  /**
   * Global User state. Update this property to update User info
   * @example
   * updateAppState({ user: { userName: 'Axinom User' } });
   */
  user?: AuthProps;
}

export interface AppStateProps extends AppState {
  updateAppState: (newState: AppStateOptions) => void;
}

const AppState = createContext<Maybe<AppStateProps>>(null);

/**
 * Hook for receiving the AppState from the Context.
 *
 * The component calling that hook has to be wrapped inside an `<AppStateProvider />`.
 * @deprecated This function is deprecated and will be removed in future versions.
 */
export const useAppState = (): AppStateProps => {
  const context = useContext(AppState);

  if (!context) {
    throw new Error(
      'to use `useAppState` your component must be located within an <AppStateProvider/>',
    );
  }

  return context;
};

/**
 * Provider for the AppState.
 *
 * In nested components, the `useAppState` hook can be used to consume the AppState.
 * @deprecated This component is deprecated and will be removed in future versions.
 */
export const AppStateProvider: React.FC = ({ children }) => {
  // Holds App state
  const [stateValues, setStateValues] = useState<AppState>({
    breadcrumbs: [],
    user: {},
  });

  // Updates App state
  const updateAppState = useCallback((newState: AppStateOptions) => {
    setStateValues(previousState => {
      return { ...previousState, ...newState };
    });
  }, []);

  // Memoize the state object to avoid unnecessary re-renders
  const state = useMemo(
    () => ({
      ...stateValues,
      updateAppState,
    }),
    [stateValues, updateAppState],
  );
  return <AppState.Provider value={state}>{children}</AppState.Provider>;
};
