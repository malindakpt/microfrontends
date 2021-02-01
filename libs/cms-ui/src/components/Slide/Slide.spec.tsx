import { Breadcrumb } from '../Header/Header.models';
import { getAnimationName } from './Slide';
import { AnimationDirection } from './Slide.model';

describe('getAnimationName method decides animation direction', () => {
  const breadcrumb1: Breadcrumb = { label: 'label_a', url: 'a', params: [] };
  const breadcrumb2: Breadcrumb = { label: 'label_b', url: 'b', params: [] };

  const breadcrumbs = [breadcrumb1, breadcrumb2];

  it('returns none, if navigates to same route', () => {
    const prevLocation = {
      pathname: 'a',
    };
    const nextLocation = {
      pathname: 'a',
    };
    const animationDirection = getAnimationName(
      prevLocation,
      nextLocation,
      breadcrumbs,
    );
    expect(animationDirection).toBe(AnimationDirection.None);
  });

  it('returns animate-forward, if navigates to new route', () => {
    const prevLocation = {
      pathname: 'a',
    };
    const nextLocation = {
      pathname: 'd',
    };
    const animationDirection = getAnimationName(
      prevLocation,
      nextLocation,
      breadcrumbs,
    );
    expect(animationDirection).toBe(AnimationDirection.Forward);
  });

  it('returns animate-backward, if navigates to an old route', () => {
    const prevLocation = {
      pathname: 'b',
    };
    const nextLocation = {
      pathname: 'a',
    };
    const animationDirection = getAnimationName(
      prevLocation,
      nextLocation,
      breadcrumbs,
    );
    expect(animationDirection).toBe(AnimationDirection.Backward);
  });
});
