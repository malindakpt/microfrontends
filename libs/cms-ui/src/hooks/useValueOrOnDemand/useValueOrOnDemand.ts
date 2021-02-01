import { useEffect, useState } from 'react';
import { ValueOrOnDemand } from '../models';

/**
 * Returns the value and a loading indicator
 * @param input the text or function to retrieve the text
 * @param onError a callback that will be called when the input could not be retrieved. It should return a fallback value that will be used instead.
 */
export const useValueOrOnDemand = (
  input: ValueOrOnDemand = '',
  onError?: (err: any) => string,
) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let didCancel = false;

    (async (): Promise<void> => {
      let value;

      try {
        value =
          typeof input === 'function' ? String(await input()) : String(input);
      } catch (err) {
        value = onError ? onError(err) : '';
      }

      if (!didCancel) {
        setValue(value);
        setIsLoading(false);
      }
    })();

    return (): void => {
      didCancel = true;
    };
  }, [input, onError]);

  return [value, isLoading] as const;
};
