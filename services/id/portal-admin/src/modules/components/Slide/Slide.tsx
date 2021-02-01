import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ANIMATION_DIRECTION } from './Slide.model';
import './Slide.module.scss';
import { Breadcrumb } from '@ax/cms-ui';

interface Location {
  pathname: string | null;
}

let animatedDirection: ANIMATION_DIRECTION = ANIMATION_DIRECTION.NONE;
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
) => {
  if (prevLocation.pathname == null) {
    prevLocation.pathname = nextLocation.pathname;
  }
  // Make the animation direction decision only at the first getAnimationName invoke.
  // Since this method is call several times for a single transition, and nextLocation.pathname is changed at the middleway.
  if (isTransitionInProgress) {
    return animatedDirection;
  }
  let animationName = ANIMATION_DIRECTION.FORWARD;

  if (nextLocation.pathname === prevLocation.pathname) {
    animationName = ANIMATION_DIRECTION.NONE;
  } else if (nextLocation.pathname === '/') {
    // Since home path is not included in breadcrumb, always consider navigation to home as backward
    animationName = ANIMATION_DIRECTION.BACKWARD;
  } else {
    for (const breadcrumb of breadcrumbs) {
      if (breadcrumb.url === nextLocation.pathname) {
        animationName = ANIMATION_DIRECTION.BACKWARD;
        break;
      }
    }
  }
  animatedDirection = animationName;
  return animationName;
};

/**
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
          animatedDirection = ANIMATION_DIRECTION.NONE;
        }}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};
