import { SortData } from 'components/List';

/**
 * Converts the column property name from camel case to snake case (all caps) as required by a Postgraphile backend.
 * It will return `undefined` if the calculated value can not be found on the sortingEnum.
 * @param sort Sorting data coming from `<Explorer />`
 * @param sortingEnum Enumeration containing the values on your Postgraphile backend. Usually `{QueryName}OrderBy`.
 */
export const sortToPostGraphileOrderBy = <T>(
  sort: SortData,
  sortingEnum: T,
): T[keyof T][] | undefined => {
  if (sort) {
    // TODO: support numbers?
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const convertedString = `${sort.column
      .match(/([A-Z]?[^A-Z]*)/g)!
      .slice(0, -1)
      .join('_')
      .toUpperCase()}_${sort.direction.toUpperCase()}`;

    const value = sortingEnum[convertedString as keyof T];

    return value !== undefined ? [value] : undefined;
  }
};
