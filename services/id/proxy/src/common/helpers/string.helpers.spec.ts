import { isNullOrWhitespace } from './string.helpers';

describe('String Helpers', () => {
  describe('isNullOrWhitespace', () => {
    it.each([undefined, null, '', '   '])(
      'returns true for empty value: "%s"',
      value => {
        // Act
        const result = isNullOrWhitespace(value);

        // Assert
        expect(result).toBe(true);
      },
    );

    it('returns false for non-empty value', () => {
      // Act
      const result = isNullOrWhitespace('value');

      // Assert
      expect(result).toBe(false);
    });
  });
});
