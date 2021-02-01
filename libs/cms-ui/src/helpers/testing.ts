import { ShallowWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

// Putting this here, to make TS not freak out about it as it's function
// defined in @types/node
declare function setImmediate(
  callback: (...args: any[]) => void,
  ...args: any[]
): void;

/**
 * Executes the given callback in an `setImmediate` call and returns a Promise that resolves after the call is finished.
 * @param callback The code that should run in the `setImmediate`
 */
export const setImmediateAsync = async (
  callback: (() => Promise<void>) | (() => void),
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setImmediate(async () => {
      try {
        await callback();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
};

/**
 * Creates a helper function that allows checking the value of a prop on an Enzyme Wrapper
 * against a property value of the given `props` object.
 * @param props
 */
export const createExpectComponentReceivesValue = (props: {
  [key: string]: any;
}) => {
  /**
   * Asserts that a given property on the wrapper is equal to the a property value on the
   * `props` object passed to the `createExpectComponentReceivesValue` method.
   *
   * It assumes that the prop names on the `props` object matches the name of the prop on the wrapper.
   * If that's not the case, you can use the `internalProp` parameter to define a different value.
   * @param wrapper The wrapper that should contain the prop.
   * @param prop The name of the prop that should be checked.
   * @param internalProp In case the internal prop name does not match the prop name on the `props`
   *                     object this parameter can be used to specify the prop name on the wrapper.
   */
  function test(
    wrapper: ShallowWrapper<any>,
    prop: string,
    internalProp?: string,
  ): void {
    /**
     * Test
     */
    expect(
      wrapper.prop(internalProp ?? prop),
      `The prop '${internalProp ?? prop}' does not equal the expected property${
        internalProp ? ` (Input prop: '${prop}').` : '.'
      }`,
    ).toEqual(props[prop]);
  }

  return test;
};

/**
 * Helper method to that calls the given function inside an `act` function
 * and returns the return of that function.
 *
 * This is useful to avoid getting `TSS2454: Variable 'wrapper' is used before being assigned.`
 * and having to use `wrapper!.` everywhere in your test.
 *
 * @example
 * const wrapper = await actWithReturn(() =>
 *   mount(
 *     <Explorer
 *       columns={[{ propertyName: 'id' }]}
 *       dataProvider={provider}
 *     />,
 *   ),
 * );
 */

export async function actWithReturn<T>(
  render: () => T | Promise<T>,
): Promise<T> {
  let w: T;
  await act(async () => {
    w = await render();
  });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wrapper = w!;
  return wrapper;
}

/**
 * Helper used for getting mocked function as correct type.
 * This helper will not mock any thing. It's just converting Typescript types!
 * @param f the mocked function
 */
export const asSpy = <T>(
  fn: (...args: any) => T,
): jest.SpyInstance<Partial<T>> => {
  return (fn as unknown) as jest.SpyInstance<Partial<T>>;
};
