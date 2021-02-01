import React, { useCallback } from 'react';
import { useReactRouterPause } from 'hooks/useReactRouterPause/useReactRouterPause';
import { NavigationAPI } from 'hooks/models';

export interface NavigationAwareStationProps {
  /**
   * When set to `true`, each navigation attempt to an external URL will
   * result in a warning by the browser and every in-app navigation will trigger a
   * call to `onNavigate()`.
   */
  restrictNavigation?: boolean;
  /**
   * A callback that can be used to perform some work before navigating. It should
   * return `true` if navigation can continue afterwards or `false` if the navigation
   * attempt should be canceled.
   *
   * __Note:__ the function should be wrapped by a `useCallback` ot avoid unnecessary rendering cycles.
   */
  onNavigate?: () => Promise<boolean> | boolean;
}

/**
 * The `NavigationAwareStation` component can be used by any station that needs to restrict
 * navigation. It allows defining a callback that will be executed which eventually decides
 * whether the navigation should be allowed or not.
 *
 * __Note__: This component will not add any visual effects e.g. loading states or notifications
 * in case a navigation is cancelled. It's the responsibility of the station to perform
 * meaningful visualization of what's going on.
 */
export const NavigationAwareStation: React.FC<NavigationAwareStationProps> = ({
  restrictNavigation = false,
  onNavigate = () => true,
  children,
}) => {
  const handler = useCallback(
    async (navigation: NavigationAPI, location: Location) => {
      if (!restrictNavigation) {
        return;
      }

      // Pause navigation
      navigation.pause();
      try {
        // call `onNavigate`
        const result = await onNavigate(); //TODO: Loading animation?
        if (result) {
          // resume if `onNavigate` returned true
          navigation.resume();
        } else {
          // otherwise cancel navigation
          navigation.cancel();
        }
      } catch (error) {
        // TODO: Proper Error handling
        // An error occurred while attempting to save, cancel navigation
        navigation.cancel();
      }
    },
    [onNavigate, restrictNavigation],
  );

  useReactRouterPause(
    {
      handler,
    },
    restrictNavigation,
  );

  return <>{children}</>;
};
