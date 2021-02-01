import cloneDeep from 'lodash/cloneDeep';
import isFunction from 'lodash/isFunction';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { NavigationAPI } from '../models';
import { isPromise } from './utils';

type HistoryAction = 'POP' | 'PUSH' | 'REPLACE';

interface HistoryLocation {
  pathname: string;
  search: string;
  hash: string;
  key: string;
}

type ReactRouterPause = (
  props: {
    [key: string]: any;
  },
  when: boolean,
) => void;

/**
 * Used to pause navigation while performing CRUD operations
 * @param props Object that contains the handler
 * @param when Indicates when beforeunload logic should be triggered
 */
export const useReactRouterPause: ReactRouterPause = (props, when) => {
  const history = useHistory();

  // Logic in this useEffect hook is only responsible for a user refreshing, closing the page, or clicking on an external link.
  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      if (when) {
        e.preventDefault();
        e.returnValue = 'stop';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [when]);

  // Temporary flag so can skip blocking 'the next' navigation event
  const ignoreNextNavigationEvent = useRef<boolean>(false);

  // Cache the location data for navigation event that was delayed.
  const cachedNavigation = useRef<any>(null);

  // Cache for unblock function returned by history.block
  const historyUnblock = useRef<any>(null);

  // Cache the active handler function so can compare between renders
  const handler = useRef<any>(null);

  // Flag to prevent useEffect-unblock from running EXCEPT on unMount
  const runUnmountEffect = false;

  function unblock(): void {
    const fn = historyUnblock.current;
    historyUnblock.current = null;
    handler.current = null;
    if (fn) fn();
  }

  function block(): void {
    // Unbind current blocker, if set
    unblock();

    handler.current = props.handler;

    // Call history.block with listener to fire BEFORE a route-change.
    // The return value is method for unbinding the block listener.
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    historyUnblock.current = history.block(beforeRouteChange);
  }

  // onUnmount handler to ensure history.block callback gets removed
  useEffect(() => unblock, [runUnmountEffect]);

  /**
   * Check props to see if need to change any blocking configuration.
   * NOTE: This method must be efficient as called after every key-stroke!
   */
  function updateBlocking(): void {
    // Abort early if possible
    if (when === false) {
      unblock();
      return;
    }
    const prev = handler.current;
    let next: any = props.handler;

    // Ensure param is a function
    if (next && !isFunction(next)) next = null;

    // Allow blocking handler to be changed on each render
    // MAY TRIGGER ON EVERY RENDER if 'handler' callback is recreated each
    // time!
    if (!prev && !next) {
      // Nothing to do
    } else if (prev && !next) {
      unblock();
    } else if (next && !prev) {
      block();
    } else if (next !== prev) {
      block();
    }
  }

  // Update handler and blocking status on every render
  updateBlocking();

  /**
   * Was a handler method passed in to the component?
   * @returns {boolean}
   */
  function isBlocking(): boolean {
    return !!historyUnblock.current;
  }

  /**
   * Set or clear flag used for skipping the next navigation event.
   * @param {boolean} enable
   */
  function allowNextEvent(enable: boolean): void {
    ignoreNextNavigationEvent.current = !!enable;
  }

  /**
   * Is there currently a location cached that we can 'resume'?
   * @returns {(Object|null)}
   */
  function pausedLocation(): HistoryLocation | null {
    const route = cachedNavigation.current;
    /** @namespace route.location **/
    return route ? cloneDeep(route.location) : null;
  }

  /**
   * Clear the cached location
   */
  function clearCache(): void {
    cachedNavigation.current = null;
  }

  /**
   * Is there currently a location cached that we can 'resume'?
   * @returns {boolean}
   */
  function isPaused(): boolean {
    return !!cachedNavigation.current;
  }

  /**
   * Resume previously cachedNavigation blocked by handler callback.
   */
  function resume(): void {
    if (!isPaused()) return;

    // eslint-disable-next-line prefer-const
    let { location, action } = cachedNavigation.current;
    action = action.toLowerCase();
    clearCache();

    // Avoid blocking the next event
    allowNextEvent(true);

    // NOTE: Impossible to handle multi-page-back programmatically
    // There is not history.pop() method, only history.go(-n), but it is
    //	not possible to lookup passed "location.key" uid in history stack!
    if (action === 'pop') {
      // Most of the time a POP is only a single page back, so do that.
      // This handles confirmation. User can THEN go-back more pages.
      history.goBack();
    } else {
      // action === 'push' || 'replace'
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      history[action](location);
    }
  }

  /**
   * Clear cached navigation/location data so cannot be used
   */
  function cancel(): void {
    clearCache();
  }

  /**
   * @param {(string|Object)} pathOrLocation
   * @param {Object} [state]
   */
  function push(
    pathOrLocation: string,
    state: {
      [key: string]: unknown;
    },
  ): void {
    clearCache();
    allowNextEvent(true); // Avoid blocking this event
    history.push(pathOrLocation, state);
  }

  /**
   * @param {(string|Object)} pathOrLocation
   * @param {Object} [state]
   */
  function replace(
    pathOrLocation: string,
    state: {
      [key: string]: unknown;
    },
  ): void {
    clearCache();
    allowNextEvent(true); // Avoid blocking this event
    history.replace(pathOrLocation, state);
  }

  /**
   * @param {object} location
   * @param {string} action
   * @returns {boolean}
   */
  function askHandler(
    location: HistoryLocation,
    action: HistoryAction,
  ): boolean {
    let resp: any = true;
    let pauseCalled = false;

    // Cache route info so can resume route later
    cachedNavigation.current = { location, action };

    const navigationAPI: NavigationAPI = {
      isPaused, // Returns true or false
      pausedLocation, // Returns location-object or null
      pause: () => (pauseCalled = true), // SYNCHRONOUS 'pause' method to be set via an API call instead of returning null
      resume,
      cancel,
      push,
      replace,
    };

    // Prevent a component-level error from breaking router navigation
    try {
      resp = handler.current(navigationAPI, location, action);
    } catch (err) {} // eslint-disable-line

    // If pausedLocation is empty, an api method must have been called
    if (!isPaused()) {
      return false;
    }

    // If navigation.pause() was called, THIS TAKES PRECEDENT
    if (pauseCalled) {
      resp = null;
    }

    // A Null response means pause/delay navigation
    if (isNull(resp)) {
      return false;
    }

    // A Promise response means pause/delay navigation
    // Promise will resume navigation if resolved; cancel if rejected
    if (isPromise(resp)) {
      // noinspection JSUnresolvedFunction,JSObjectNullOrUndefined
      resp
        .then((val: boolean) => {
          if (val === false) cancel();
          else resume();
        })
        .catch(cancel);

      return false;
    }

    // NOT PAUSED, so clear the cached location
    clearCache();

    if (resp === false) {
      return false;
    }
    if (resp === true || isUndefined(resp)) {
      return true;
    }

    // Log warning if an invalid response received, including undefined
    console.error(
      `Invalid response from ReactRouterPause.handler: \`${resp}\`. ` +
        '\nResponse should be one of: true, false, null, undefined, Promise',
    );

    return true;
  }

  /**
   * Listener for history.block - fires BEFORE a route-change.
   *
   * @param {Object} location        Object with location, hash, etc.
   * @param {string} action       One of [PUSH|REPLACE|POP]
   */
  function beforeRouteChange(
    location: HistoryLocation,
    action: HistoryAction,
  ): boolean {
    if (ignoreNextNavigationEvent.current) {
      allowNextEvent(false); // Reset one-time flag
      return true;
    } else if (isBlocking()) {
      // The askHandler method handles the pause/resume functionality.
      // Call the handler to see if we should allow route change (true).
      // Coerce response to a boolean because that's what RR expects.
      const resp = !!askHandler(location, action);

      // There are only 3 responses that block navigation
      if (resp === false || isNull(resp) || isPromise(resp)) {
        return false;
      }
    }

    // Allow anything not handled above
    return true;
  }
};
