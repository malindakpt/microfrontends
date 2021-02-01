import { useGlobalState, Dict, PageRegistration } from 'piral-core';
import {
  useLocation,
  match,
  matchPath,
  RouteComponentProps,
  generatePath,
} from 'react-router';
import { Breadcrumb } from '@ax/cms-ui';

declare module 'piral-core/lib/types/custom' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PiralCustomPageMeta extends BreadCrumbMeta {}
}

export interface BreadCrumbMeta {
  breadcrumb?: BreadcrumbResolver;
}

export type BreadcrumbResolver = (routeParams: {
  [key: string]: string;
}) => Breadcrumb['label'];

/**
 * Calculates the Breadcrumb object that can be given to the Header component.
 */
export function useBreadcrumb(): Breadcrumb[] {
  const pages = useGlobalState(s => s.registry.pages);
  const { pathname } = useLocation();
  const currentMatch = findCurrentMatch(pathname, pages);

  return calculateBreadcrumb(currentMatch, pages);
}

/**
 * Finds the current match from the routes given on the pages parameter.
 * @param pathname The current location.pathname
 * @param pages all registered pages
 */
function findCurrentMatch(
  pathname: string,
  pages: Dict<PageRegistration>,
): match | null {
  const x = Object.keys(pages).reduce<match | null>((prev, page) => {
    const match = matchPath(pathname, { path: page, exact: true });
    return prev ?? match;
  }, null);

  return x;
}

/**
 * Calculates the Breadcrumb array needed by the Header component.
 * @param match The current match
 * @param pages The registered pages in the current Piral
 */
const calculateBreadcrumb = (
  match: RouteComponentProps<{}>['match'] | null,
  pages: Dict<PageRegistration>,
): Breadcrumb[] => {
  if (!match) {
    return [];
  }

  // Splitting the match by path pieces
  const splitMatch = match.path.split('/');

  const bc: Breadcrumb[] = [];
  while (splitMatch.length > 0) {
    const subPath = splitMatch.join('/');
    // try finding a registered page that matches the current match
    const page = pages[subPath];
    if (page?.meta?.breadcrumb) {
      // If page exists and has a breadcrumb value defined, we will add it to the array
      bc.unshift({
        url: generatePath(subPath, match.params), // Generating the actual URL (including the params) for the breadcrumb link
        label: page.meta.breadcrumb(match.params), // Passing the match.params down to the label resolver
        params: [],
      });
    }
    // Removing the last path section of the match as well as the url
    splitMatch.pop();
  }
  return bc;
};
