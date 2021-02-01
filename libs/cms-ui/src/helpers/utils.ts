/**
 * A function doing nothing. Useful for example as fallback value for optional callbacks.
 *
 * using `parameter = () => {}` would drop your test coverage (unless you explicitly have a case testing calling the fallback value) - with `parameter = noop` it does not count as "untested function"
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop(): void {}

/**
 * Function that can be used for exhaustiveness checks on switch statements.
 */
export const assertNever = (_type: never): void => {
  console.error(`Switch was not exhaustive`);
};

/**
 * Declares a nullable T
 */
export type Maybe<T> = T | null;

/**
 * Make all properties in T nullable
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
