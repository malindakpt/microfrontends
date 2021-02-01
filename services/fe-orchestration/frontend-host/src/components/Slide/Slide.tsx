import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Breadcrumb } from '@ax/cms-ui';
import { AnimationDirection } from './Slide.model';
import './Slide.module.scss';

let animatedDirection: AnimationDirection = AnimationDirection.None;
let isTransitionInProgress = false;
let previousBreadcrumbs: Breadcrumb[] = [];

export interface SlideProps {
  children: ReactNode;
  /** The breadcrumbs to determine the direction of the transition. */
  breadcrumbs: Breadcrumb[];
}

export const getAnimationName = (
  breadcrumbs: Breadcrumb[],
): AnimationDirection => {
  if (!previousBreadcrumbs && !breadcrumbs) {
    // Null check
    return AnimationDirection.None;
  }

  for (let i = 0; i < previousBreadcrumbs.length; i++) {
    const breadcrumb = breadcrumbs[i];
    const previousBreadcrumb = previousBreadcrumbs[i];

    if (
      breadcrumb &&
      previousBreadcrumb &&
      breadcrumb.url !== previousBreadcrumb.url
    ) {
      // Paths have diverged. Ex: Navigated from one station to a different station
      return AnimationDirection.Forward;
    }

    if (!breadcrumb) {
      // Navigated backward
      return AnimationDirection.Backward;
    }
  }

  if (breadcrumbs.length > previousBreadcrumbs.length) {
    // Navigated forward
    return AnimationDirection.Forward;
  }

  // No navigation occured
  return AnimationDirection.None;
};

/**
 * Adds slide transitions for route changes.
 *
 * The component needs an array of BreadCrumb elements to decide the direction of the transition that should be executed.
 *
 * Wrap the piral <PiralRoutes> component with this component and pass it the breadcrumbs array.
 *
 * @example
 *  <Slide breadcrumbs={breadcrumbs}>
 *    <PiralRoutes location={location} NotFound={NotFound} />
 *  </Slide>
 */
export const Slide: React.FC<SlideProps> = ({ breadcrumbs, children }) => {
  const location = useLocation();

  return (
    <TransitionGroup
      childFactory={child => {
        if (!isTransitionInProgress) {
          animatedDirection = getAnimationName(breadcrumbs);
        }
        return React.cloneElement(child, {
          classNames: animatedDirection,
        });
      }}
    >
      <CSSTransition
        timeout={500}
        key={location.pathname}
        onEnter={() => {
          isTransitionInProgress = true;
        }}
        onEntered={() => {
          isTransitionInProgress = false;
          animatedDirection = AnimationDirection.None;
          previousBreadcrumbs = [...breadcrumbs];
        }}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};
