import { removeProperties } from './object.helpers';

const toSerializeEqual = (received: object, expected: object): void => {
  const sortOrder = Object.keys(received).sort();
  expect(JSON.stringify(received, sortOrder)).toBe(
    JSON.stringify(expected, sortOrder),
  );
};

describe('Object Helpers', () => {
  describe('removeProperties', () => {
    it('empty array -> object with same properties', () => {
      // Arrange
      const original = {
        toRetain: function() {
          return 'test';
        },
      };

      // Act
      const result = removeProperties(original, []);

      // Assert
      toSerializeEqual(result, original);
      expect(result.toRetain()).toBe('test');
    });

    it('non-existent property -> object with same properties', () => {
      // Arrange
      const original = {
        toRetain: function() {
          return 'test';
        },
      };

      // Act
      const result = removeProperties(original, ['nonExistentProperty']);

      // Assert
      toSerializeEqual(result, original);
      expect(result.toRetain()).toBe('test');
    });

    it('single property -> object without property', () => {
      // Arrange
      const original = {
        toRemove: 'toRemoveValue',
        toRetain: function() {
          return 'test';
        },
      };
      const expected = {
        toRetain: function() {
          return 'test';
        },
      };

      // Act
      const result = removeProperties(original, ['toRemove']);

      // Assert
      toSerializeEqual(result, expected);
      expect(result.toRetain()).toBe('test');
    });

    it('multiple properties -> object without properties', () => {
      // Arrange
      const original = {
        toRemove: 'toRemoveValue',
        toRemove2: function() {
          return 'test';
        },
        toRetain: function() {
          return 'test';
        },
        toRetain2: function() {
          return 'test2';
        },
      };
      const expected = {
        toRetain: function() {
          return 'test';
        },
        toRetain2: function() {
          return 'test2';
        },
      };

      // Act
      const result = removeProperties(original, ['toRemove', 'toRemove2']);

      // Assert
      toSerializeEqual(result, expected);
      expect(result.toRetain()).toBe('test');
      expect(result.toRetain2()).toBe('test2');
    });
  });
});
