import { filterToPostGraphileFilter } from './FilterTransformer';
import { FilterValues } from 'components/Filters';

const mockMap: { [key: string]: string } = {
  title: 'includesInsensitive',
};

describe('filterToPostGraphileFilter', () => {
  it('transforms filters to postgraphile filters using a map', () => {
    const mockFilter: FilterValues = { title: 'Mocking Bird' };

    const titleFilter = filterToPostGraphileFilter<{ [key: string]: string }>(
      mockFilter,
      mockMap,
    );

    expect(titleFilter).toEqual({
      title: { [mockMap['title']]: mockFilter['title'] },
    });
  });

  it('returns undefined if an empty object is given', () => {
    const mockFilter: FilterValues = {};

    const filter = filterToPostGraphileFilter<{ [key: string]: string }>(
      mockFilter,
      mockMap,
    );

    expect(filter).toBe(undefined);
  });
});
