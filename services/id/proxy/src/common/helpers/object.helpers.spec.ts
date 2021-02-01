import 'jest-extended';

import { toSerializeEqual } from '../../tests/common';
import { ErrorCode, handledError, startupError } from '../errors';
import { removeNullProperties } from './';
import {
  isEmptyObject,
  JSONify,
  removeEmptyProperties,
} from './object.helpers';

describe('Object Helpers', () => {
  describe('removeNullProperties', () => {
    it('removes null value', () => {
      // Arrange
      const obj = { toRemove: null, toRetain: 'toRetain' };

      // Act
      const result = removeNullProperties(obj);

      // Assert
      toSerializeEqual(result, { toRetain: 'toRetain' });
    });

    it('removes multiple null values', () => {
      // Arrange
      const obj = {
        toRemove: null,
        toRetain: 'toRetain',
        anotherToRemove: null,
      };

      // Act
      const result = removeNullProperties(obj);

      // Assert
      toSerializeEqual(result, { toRetain: 'toRetain' });
    });

    it.each([undefined, '', '    '])(
      'Empty or undefined value is retained, value: "%s"',
      retainableValue => {
        // Arrange
        const obj = {
          toRetain: retainableValue,
          toRegularyKeep: 'toRegularyKeep',
        };

        // Act
        const result = removeNullProperties(obj);

        // Assert
        toSerializeEqual(result, obj);
      },
    );
  });

  describe('removeEmptyProperties', () => {
    it.each([undefined, null, '', '    '])(
      'removes empty value: "%s"',
      removableValue => {
        // Arrange
        const obj = { toKeep: removableValue, toRetain: 'toRetain' };

        // Act
        const result = removeEmptyProperties(obj);

        // Assert
        toSerializeEqual(result, { toRetain: 'toRetain' });
      },
    );
  });

  describe('isEmptyObject', () => {
    it('empty object -> true', () => {
      // Arrange
      const obj = {};

      // Act
      const result = isEmptyObject(obj);

      // Assert
      expect(result).toBe(true);
    });

    it('object with undefined property -> false', () => {
      // Arrange
      const obj = { someProperty: undefined };

      // Act
      const result = isEmptyObject(obj);

      // Assert
      expect(result).toBe(false);
    });

    it('object with defined property -> false', () => {
      // Arrange
      const obj = { someProperty: 'test' };

      // Act
      const result = isEmptyObject(obj);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('JSONify', () => {
    it('Error -> object without name', () => {
      // Arrange
      const error = new Error('Test Error Message');

      // Act
      const result = JSONify(error);

      // Assert
      expect(result.message).toBe('Test Error Message');
      expect(result.stack).toStartWith('Error: Test Error Message');
      expect(Object.keys(result).length).toBe(2);
    });

    it('ono startupError -> object without toJSON', () => {
      // Arrange
      const error = startupError('Test Error Message');

      // Act
      const result = JSONify(error);

      // Assert
      expect(result.message).toBe('Test Error Message');
      expect(result.stack).toStartWith('Error: Test Error Message');
      expect(Object.keys(result).length).toBe(2);
    });

    it('ono handledError -> object without toJSON and with code', () => {
      // Arrange
      const error = handledError('Test Error Message');

      // Act
      const result = JSONify(error);

      // Assert
      expect(result.message).toBe('Test Error Message');
      expect(result.stack).toStartWith('Error: Test Error Message');
      expect(result.code).toBe(ErrorCode.HandledInternalServerError);
      expect(Object.keys(result).length).toBe(3);
    });
  });
});
