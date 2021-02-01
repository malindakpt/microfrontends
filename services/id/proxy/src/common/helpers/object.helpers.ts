/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNullOrWhitespace } from './string.helpers';

/**
 * Removes all properties with null value from object and returns a new object
 */
export const removeNullProperties = (obj: any): any => {
  const result = { ...obj };
  for (const propName in result) {
    if (result[propName] === null) {
      delete result[propName];
    }
  }
  return result;
};

/**
 * Removes all properties with empty value from object and returns a new object
 */
export const removeEmptyProperties = (obj: any): any => {
  const result = { ...obj };
  for (const propName in result) {
    if (isNullOrWhitespace(result[propName])) {
      delete result[propName];
    }
  }
  return result;
};

export const isEmptyObject = (obj: any): boolean => {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
};

/**
 * This function first creates a json string of an object.
 * This strips excessive properties.
 * Then transforms that string into an object.
 * Useful for parsing Error objects.
 */
export const JSONify = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj, Object.getOwnPropertyNames(obj)));
};
