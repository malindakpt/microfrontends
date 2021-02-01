import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppState } from 'components/AxinomCMS/Providers/AppState/AppState';

/**
 * If it doesn't exist yet, it adds a crumb for the current route to the existing breadcrumb.
 * The label of the crumb can be specified.
 * If there is already a crumb for the current URL it will update it to show the given label.
 *
 * This hook can be used for the NotFound page or Error page to add a crumb on the current breadcrumb,
 * independently of what the crumbs are.
 * @param label The label of the current route
 */
export const useLabeledCrumb = (label: string) => {
  const { breadcrumbs, updateAppState } = useAppState();
  const { pathname } = useLocation();
  useEffect(() => {
    if (breadcrumbs[breadcrumbs.length - 1]?.url !== pathname) {
      updateAppState({
        breadcrumbs: [
          ...breadcrumbs,
          {
            label,
            url: pathname,
            params: [],
          },
        ],
      });
    } else if (breadcrumbs[breadcrumbs.length - 1].label !== label) {
      const breadcrumbsCopy = [...breadcrumbs];
      breadcrumbsCopy[breadcrumbsCopy.length - 1].label = label;
      updateAppState({
        breadcrumbs: breadcrumbsCopy,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
