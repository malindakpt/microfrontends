import { useCallback, useState } from 'react';

export const useExpand = (): {
  readonly isExpanded: boolean;
  readonly expand: () => void;
  readonly collapse: () => void;
} => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expand = useCallback(() => {
    setIsExpanded(true);
  }, []);
  const collapse = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return { isExpanded, expand, collapse } as const;
};
