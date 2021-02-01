import { useState } from 'react';
import { Data, SortData } from './List.model';

export const sortStoryData = (sort: SortData, data: Data): Data[] => {
  return data.sort((a: Data, b: Data) =>
    sort.direction === 'asc'
      ? a[sort.column] > b[sort.column]
        ? 1
        : a[sort.column] < b[sort.column]
        ? -1
        : 0
      : a[sort.column] > b[sort.column]
      ? -1
      : a[sort.column] < b[sort.column]
      ? 1
      : 0,
  );
};

export function useLocalSort(
  data: Data[],
): {
  readonly listData: Data[];
  readonly sortChangedHandler: (sort: SortData) => void;
} {
  const [listData, setListData] = useState<Data[]>(data);

  const sortChangedHandler = (sort: SortData): void => {
    const sortOrder = sortStoryData(sort, listData);
    setListData([...sortOrder]);
  };

  return { listData, sortChangedHandler } as const;
}
