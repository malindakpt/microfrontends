import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Breadcrumb } from '../Header/Header.models';
import { AnimationDirection } from './Slide.model';
import './Slide.module.scss';

interface Location {
  pathname: string | null;
}

let animatedDirection: AnimationDirection = AnimationDirection.None;
let isTransitionInProgress = false;
const prevLocation: Location = {
  pathname: null,
};

export interface SlideProps {
  children: ReactNode;
  /** The breadcrumbs to determine the direction of the transition. */
  breadcrumbs: Breadcrumb[];
}

export const getAnimationName = (
  prevLocation: Location,
  nextLocation: Location,
  breadcrumbs: Breadcrumb[],
): AnimationDirection => {
  if (prevLocation.pathname == null) {
    prevLocation.pathname = nextLocation.pathname;
  }
  // Make the animation direction decision only at the first getAnimationName invoke.
  // Since this method is call several times for a single transition, and nextLocation.pathname is changed at the middleway.
  if (isTransitionInProgress) {
    return animatedDirection;
  }
  let animationName = AnimationDirection.Forward;

  if (nextLocation.pathname === prevLocation.pathname) {
    animationName = AnimationDirection.None;
  } else if (nextLocation.pathname === '/') {
    // Since home path is not included in breadcrumb, always consider navigation to home as backward
    animationName = AnimationDirection.Backward;
  } else {
    for (const breadcrumb of breadcrumbs) {
      if (breadcrumb.url === nextLocation.pathname) {
        animationName = AnimationDirection.Backward;
        break;
      }
    }
  }
  animatedDirection = animationName;
  return animationName;
};

/**
 * @deprecated This component is deprecated and will be removed in future versions.
 *
 * Adds slide transitions for route changes.
 *
 * The component needs an array of BreadCrumb elements to decide the direction of the transition that should be executed.
 *
 * Wrap the react-router <Switch> component with this component and pass it the breadcrumbs array.
 *
 * @example
 * <Slide breadcrumbs={appState.breadcrumbs}>
 *  <Switch location={location}>
 *    <Route path="/" exact component={Home} />
 *    <Route
 *      path="/pageOne"
 *      exact
 *      component={PageOne}
 *    />
 *  </Switch>
 *</Slide>
 */
export const Slide: React.FC<SlideProps> = ({ breadcrumbs, children }) => {
  const location = useLocation();

  return (
    <TransitionGroup
      childFactory={child => {
        return React.cloneElement(child, {
          classNames: getAnimationName(prevLocation, location, breadcrumbs),
        });
      }}
    >
      <CSSTransition
        timeout={500}
        key={location.key}
        onEnter={() => {
          isTransitionInProgress = true;
          prevLocation.pathname = location.pathname;
        }}
        onExited={() => {
          isTransitionInProgress = false;
          animatedDirection = AnimationDirection.None;
        }}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};
