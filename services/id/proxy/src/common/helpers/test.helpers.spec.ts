import {
  toSerializeEqual,
  dateToBeGreaterThan,
  toBeIso8601Strict,
} from './test.helpers';

class CustomArray extends Array {
  get isCustomArray(): boolean {
    return true;
  }
}

describe('Test Helpers', () => {
  describe('toSerializeEqual', () => {
    it('returns true when other equals return false', async () => {
      // Arrange
      const obj1 = { test: 'test', array: new CustomArray() };
      const obj2 = { test: 'test', array: [] };

      // Assert
      expect(obj1).not.toBe(obj2);
      expect(obj1).not.toStrictEqual(obj2);
      toSerializeEqual(obj1, obj2);
    });
  });

  describe('dateToBeGreaterThan', () => {
    it('Date > Date', async () => {
      // Arrange
      const greaterDate = new Date(Date.UTC(2020, 0, 31, 23, 59, 59, 1));
      const lesserDate = new Date(Date.UTC(2020, 0, 31, 23, 59, 59, 0));

      // Assert
      dateToBeGreaterThan(greaterDate, lesserDate);
    });

    it('ISO String > Date', async () => {
      // Arrange
      const greaterDate = '2020-01-31T23:59:59.001Z';
      const lesserDate = new Date(Date.UTC(2020, 0, 31, 23, 59, 59, 0));

      // Assert
      dateToBeGreaterThan(greaterDate, lesserDate);
    });

    it('Date > ISO String', async () => {
      // Arrange
      const greaterDate = new Date(Date.UTC(2020, 0, 31, 23, 59, 59, 1));
      const lesserDate = '2020-01-31T23:59:59.000Z';

      // Assert
      dateToBeGreaterThan(greaterDate, lesserDate);
    });

    it('ISO String > ISO String', async () => {
      // Arrange
      const greaterDate = '2020-01-31T23:59:59.001Z';
      const lesserDate = '2020-01-31T23:59:59.000Z';

      // Assert
      dateToBeGreaterThan(greaterDate, lesserDate);
    });

    it('Date === Date', async () => {
      // Arrange
      const sameDate1 = new Date(Date.UTC(2020, 0, 31, 23, 59, 59, 0));
      const sameDate2 = new Date(Date.UTC(2020, 0, 31, 23, 59, 59, 0));

      // Assert
      expect(() => {
        dateToBeGreaterThan(sameDate1, sameDate2);
      }).toThrowError();
    });

    it('ISO String === Date', async () => {
      // Arrange
      const sameDate1 = '2020-01-31T23:59:59.000Z';
      const sameDate2 = new Date(Date.UTC(2020, 0, 31, 23, 59, 59, 0));

      // Assert
      expect(() => {
        dateToBeGreaterThan(sameDate1, sameDate2);
      }).toThrowError();
    });

    it('Date === ISO String', async () => {
      // Arrange
      const sameDate1 = new Date(Date.UTC(2020, 0, 31, 23, 59, 59, 0));
      const sameDate2 = '2020-01-31T23:59:59.000Z';

      // Assert
      expect(() => {
        dateToBeGreaterThan(sameDate1, sameDate2);
      }).toThrowError();
    });

    it('ISO String === ISO String', async () => {
      // Arrange
      const sameDate1 = '2020-01-31T23:59:59.000Z';
      const sameDate2 = '2020-01-31T23:59:59.000Z';

      // Assert
      expect(() => {
        dateToBeGreaterThan(sameDate1, sameDate2);
      }).toThrowError();
    });
  });

  describe('toBeIso8601Strict', () => {
    it('returns true with correct format', async () => {
      // Arrange
      const date = '2020-01-31T23:59:59.001Z';

      // Assert
      toBeIso8601Strict(date);
    });

    it('throws error with unsupported format', async () => {
      // Arrange
      const date = '2019-11-18T12:11:52.724+00:00';

      // Assert
      expect(() => {
        toBeIso8601Strict(date);
      }).toThrowError();
    });
  });
});
