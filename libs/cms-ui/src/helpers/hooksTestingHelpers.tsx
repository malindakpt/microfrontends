import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

// This section implements the testing harness for custom hooks.
// Use the `testHook` method in your test and the test function using the hook.

interface TestHookProps {
  callback: () => any;
}

const TestHook: React.FC<TestHookProps> = ({ callback }) => {
  callback();
  return null;
};

/**
 * Helper method to test a custom hook.
 * @param callback the hook that should be tested
 */
export const testHook = async (callback: () => any): Promise<ReactWrapper> => {
  return await mount(<TestHook callback={callback} />);
};
