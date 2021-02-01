import { sortToPostGraphileOrderBy } from './SortTransformer';
import { SortData } from 'components/List';

enum mockEnum {
  TITLE_ASC = 'TITLE_ASC',
  TITLE_DESC = 'TITLE_DESC',
}

describe('sortToPostGraphileOrderBy', () => {
  it('returns a value from an enum using the ascending direction', () => {
    const sort: SortData = { column: 'title', direction: 'asc' };

    const orderBy = sortToPostGraphileOrderBy(sort, mockEnum);

    expect(orderBy).toEqual([mockEnum.TITLE_ASC]);
  });

  it('returns a value from an enum using the ascending direction', () => {
    const sort: SortData = { column: 'title', direction: 'desc' };

    const orderBy = sortToPostGraphileOrderBy(sort, mockEnum);

    expect(orderBy).toEqual([mockEnum.TITLE_DESC]);
  });

  it('returns undefined if no sorting data is given', () => {
    const sort = undefined;

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const orderBy = sortToPostGraphileOrderBy(sort, mockEnum);

    expect(orderBy).toEqual(undefined);
  });

  it('returns undefined if sort data does not match an enum value', () => {
    const sort: SortData = { column: 'NotAnEnumValue', direction: 'asc' };

    const orderBy = sortToPostGraphileOrderBy(sort, mockEnum);

    expect(orderBy).toEqual(undefined);
  });
});
