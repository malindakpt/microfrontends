import isObjectLike from 'lodash/isObjectLike';
import pick from 'lodash/pick';
import isFunction from 'lodash/isFunction';

/**
 * Helper to determine if object is a thenable; ie: a promise
 *
 * @param {*} obj
 * @returns {boolean}
 */
const isPromise = (obj: any) => isObjectLike(obj) && isFunction(obj.then);

const isSameFunction = (fn1: any, fn2: any) =>
  isFunction(fn1) &&
  isFunction(fn2) &&
  (fn1 === fn2 || fn1.name === fn2.name) &&
  // All Jest mocks have same name; treat them as 'different mock-functions'
  fn1.name !== 'mockConstructor';

/**
 * Helper to create a fingerprint string for easy comparisons.
 * Note that 'hash' is not fingerprinted; handled by this.beforeRouteChange().
 *
 * @param {Object} location 	The router.history.location object
 * @returns {string}            Unique identifier for this location
 */
const fingerprint = (location: {}) =>
  JSON.stringify(pick(location, ['pathname', 'search', 'state']));

export { isPromise, isSameFunction, fingerprint };
