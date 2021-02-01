import { durationToSeconds, isNullOrWhitespace } from './string.helpers';

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

    it('returns false for empty object value', () => {
      // Act
      const result = isNullOrWhitespace({});

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('durationToSeconds', () => {
    it.each`
      input                  | expected
      ${undefined}           | ${0}
      ${null}                | ${0}
      ${''}                  | ${0}
      ${'   '}               | ${0}
      ${'00:01'}             | ${0}
      ${'00:00:00'}          | ${0}
      ${'00:00:01'}          | ${1}
      ${'00:00:30'}          | ${30}
      ${'00:02:30'}          | ${150}
      ${'01:02:31'}          | ${3751}
      ${'1:2:31'}            | ${3751}
      ${'01:02:31.99999999'} | ${3751}
      ${'23:59:59.99999999'} | ${86399}
    `(`returns '$expected' for value '$input'`, ({ input, expected }) => {
      // Act
      const result = durationToSeconds(input);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
