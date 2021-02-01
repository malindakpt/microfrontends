import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
} from 'react';
import { Breadcrumb } from '@ax/cms-ui';

interface AppStateIDS {
  breadcrumbs: Breadcrumb[];
  isLoggedIn: boolean;
  tenantAdminName: string;
  tenantId: string;
  tenantName: string;
  accessToken: string;
}

export interface AppStateOptionsIDS {
  breadcrumbs?: Breadcrumb[];
  isLoggedIn?: boolean;
  tenantAdminName?: string;
  tenantId?: string;
  tenantName?: string;
  accessToken?: string;
}

export interface AppStatePropsIDS extends AppStateIDS {
  updateAppStateIDS: (newState: AppStateOptionsIDS) => void;
}

const AppStateIDS = createContext<AppStatePropsIDS | null>(null);

/**
 * Hook for receiving the AppState from the Context.
 *
 * The component calling that hook has to be wrapped inside an `<AppStateProvider />`.
 */
export const useAppStateIDS = (): AppStatePropsIDS => {
  const context = useContext(AppStateIDS);

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
 */
export const AppStateProviderIDS: React.FC = ({ children }) => {
  // Holds App state
  const [stateValues, setStateValues] = useState<AppStateIDS>({
    breadcrumbs: [],
    isLoggedIn: false,
    tenantAdminName: '',
    tenantId: '',
    tenantName: '',
    accessToken: '',
  });

  // Updates App state
  const updateAppStateIDS = useCallback((newState: AppStateOptionsIDS) => {
    setStateValues(previousState => {
      return { ...previousState, ...newState };
    });
  }, []);

  // Memoize the state object to avoid unnecessary re-renders
  const state = useMemo(
    () => ({
      ...stateValues,
      updateAppStateIDS: updateAppStateIDS,
    }),
    [stateValues, updateAppStateIDS],
  );
  return <AppStateIDS.Provider value={state}>{children}</AppStateIDS.Provider>;
};
