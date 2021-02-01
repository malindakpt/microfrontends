import {
  createInMemoryDataProvider,
  findAnywhereInString,
  findAnywhereInStringCaseInsensitive,
  findExact,
} from './InMemoryDataProvider';

describe('filter functions', () => {
  describe('findExact', () => {
    it.each([
      ['a', 'a', true],
      ['a', 'b', false],
      [0, 0, true],
      [0, 1, false],
      [new Date(0), new Date(0), true],
      [new Date(0), new Date(1000), false],
    ] as const)('finds only exact matches', (value, filter, expected) => {
      expect(
        findExact(value, filter, {}),
        ` value: ${value}\n  filter: ${filter}\nexpected: ${expected}`,
      ).toEqual(expected);
    });
  });

  describe('findAnywhereInString', () => {
    it.each([
      ['ffffaffff', 'a', true],
      ['ffffAffff', 'a', false],
      ['ffffaffff', 'b', false],
      [10, 1, true],
      [10, 1, true],
      [new Date(0), 1970, true],
      [new Date(0), 1971, false],
    ] as const)(
      'finds when string contains filter',
      (value, filter, expected) => {
        expect(
          findAnywhereInString(value, filter, {}),
          ` value: ${value}\n  filter: ${filter}\nexpected: ${expected}`,
        ).toEqual(expected);
      },
    );
  });

  describe('findAnywhereInStringCaseInsensitive', () => {
    it.each([
      ['ffffaffff', 'a', true],
      ['ffffaffff', 'A', true],
      ['ffffaffff', 'b', false],
      [10, 1, true],
      [10, 1, true],
      [new Date(0), 1970, true],
      [new Date(0), 1971, false],
    ] as const)(
      'finds when string contains filter',
      (value, filter, expected) => {
        expect(
          findAnywhereInStringCaseInsensitive(value, filter, {}),
          ` value: ${value}\n  filter: ${filter}\nexpected: ${expected}`,
        ).toEqual(expected);
      },
    );
  });
});

describe('InMemoryDataProvider', () => {
  it('returns all data it has on first page', async () => {
    const input = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    const provider = createInMemoryDataProvider(input);

    const data = await provider.loadData(0);
    expect(data).toEqual({
      totalCount: input.length,
      filteredCount: input.length,
      data: input,
      hasMoreData: false,
    });
  });

  it('can sort in ascending order', async () => {
    const input = [{ id: 'b' }, { id: 'B' }, { id: 'a' }, { id: 'c' }];

    const provider = createInMemoryDataProvider(input);

    const data = await provider.loadData(0, { column: 'id', direction: 'asc' });
    expect(data).toEqual({
      totalCount: input.length,
      filteredCount: input.length,
      data: [{ id: 'a' }, { id: 'B' }, { id: 'b' }, { id: 'c' }],
      hasMoreData: false,
    });
  });

  it('can sort in descending order', async () => {
    const input = [{ id: 'b' }, { id: 'x' }, { id: 'a' }, { id: 'c' }];

    const provider = createInMemoryDataProvider(input);

    const data = await provider.loadData(0, {
      column: 'id',
      direction: 'desc',
    });
    expect(data).toEqual({
      totalCount: input.length,
      filteredCount: input.length,
      data: [{ id: 'x' }, { id: 'c' }, { id: 'b' }, { id: 'a' }],
      hasMoreData: false,
    });
  });

  it('can sort case sensitive', async () => {
    const input = [{ id: 'b' }, { id: 'B' }, { id: 'a' }, { id: 'c' }];

    const provider = createInMemoryDataProvider(input, {
      caseSensitiveSort: true,
    });

    const data = await provider.loadData(0, { column: 'id', direction: 'asc' });
    expect(data).toEqual({
      totalCount: input.length,
      filteredCount: input.length,
      data: [{ id: 'B' }, { id: 'a' }, { id: 'b' }, { id: 'c' }],
      hasMoreData: false,
    });
  });

  it('filters exact matches by default', async () => {
    const input = [
      { title: 'b' },
      { title: 'x' },
      { title: 'a' },
      { title: 'c' },
    ];

    const provider = createInMemoryDataProvider(input);

    const data = await provider.loadData(0, undefined, { title: 'a' });
    expect(data).toEqual({
      totalCount: input.length,
      filteredCount: 1,
      data: [{ title: 'a' }],
      hasMoreData: false,
    });
  });

  it('allows custom filters', async () => {
    const input = [
      { title: 'b' },
      { title: 'x' },
      { title: 'a' },
      { title: 'c' },
    ];

    let callCount = 0;
    const provider = createInMemoryDataProvider(input, {
      filterFunctions: {
        title: (value, filter, item) => {
          expect(filter).toEqual('a');
          expect(input).toContain(item);
          callCount++;
          return value === 'x';
        },
      },
    });

    const data = await provider.loadData(0, undefined, { title: 'a' });
    expect(data).toEqual({
      totalCount: input.length,
      filteredCount: 1,
      data: [{ title: 'x' }],
      hasMoreData: false,
    });
    expect(callCount).toEqual(4);
  });
});
