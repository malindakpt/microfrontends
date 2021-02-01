import React from 'react';
import { useFormikContext } from 'formik';
import { useReactRouterPause, NavigationAPI } from 'hooks';

/**
 * Performs logic to keep user on the page if form is not valid, as well as saving valid forms on navigation.
 */
export const SaveOnNavigate: React.FC = () => {
  const { dirty, isValid, submitForm } = useFormikContext();
  async function handleNavigationAttempt(
    navigation: NavigationAPI,
  ): Promise<void> {
    if (!dirty) {
      // Form values didn't change, just navigate away
      navigation.resume();
      return;
    }
    if (!isValid) {
      // Form is invalid, cancel navigation
      // TODO: Add a message here (probably connected to "Error handling")
      navigation.cancel();
      return;
    }
    // Form values have changed and form is valid, attempt save
    navigation.pause();
    try {
      // Wait for success response
      await submitForm();
      // Successfully saved, continue navigation
      navigation.resume();
    } catch (error) {
      // TODO: Proper Error handling
      // An error occurred while attempting to save, cancel navigation
      navigation.cancel();
    }
  }
  useReactRouterPause({ handler: handleNavigationAttempt }, dirty);
  return null;
};
