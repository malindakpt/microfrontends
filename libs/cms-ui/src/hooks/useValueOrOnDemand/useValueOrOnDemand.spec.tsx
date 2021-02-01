import { useValueOrOnDemand } from './useValueOrOnDemand';
import { act } from 'react-dom/test-utils';
import { testHook } from 'helpers/hooksTestingHelpers';
import { setImmediateAsync } from 'helpers/testing';

describe('useValueOrDemand hook', () => {
  it.each(['test', 5])('loads synchronous values', async input => {
    let value = '';
    let isLoading = true;
    const wrapper = await testHook(async () => {
      [value, isLoading] = useValueOrOnDemand(input);
    });

    wrapper.debug();

    expect(value).toEqual(String(input));
    expect(isLoading).toBeFalsy();
  });

  it('returns empty string if no value given', async () => {
    let value = '';
    let isLoading = true;
    await testHook(() => {
      [value, isLoading] = useValueOrOnDemand();
    });

    expect(value).toEqual('');
    expect(isLoading).toBeFalsy();
  });

  it.each(['test', 5])('loads async values', async input => {
    const promise = () => Promise.resolve(input);
    let value = '';
    let isLoading = true;

    await act(async () => {
      await testHook(() => {
        [value, isLoading] = useValueOrOnDemand(promise);
      });
    });

    await setImmediateAsync(() => {
      expect(isLoading).toBeFalsy();
      expect(value).toEqual(String(input));
    });
  });

  it('uses empty string as default if promise is rejected', async () => {
    const promise = () => Promise.reject('error');
    let value = '';
    let isLoading = true;

    await act(async () => {
      await testHook(() => {
        [value, isLoading] = useValueOrOnDemand(promise);
      });
    });

    await setImmediateAsync(() => {
      expect(value).toEqual('');
      expect(isLoading).toBeFalsy();
    });
  });

  it('uses uses given fallback if promise is rejected', async done => {
    const spy = jest.fn(() => 'default');
    const promise = () => Promise.reject('error');
    let value = '';
    let isLoading = true;

    await act(async () => {
      await testHook(() => {
        [value, isLoading] = useValueOrOnDemand(promise, spy);
      });
    });

    await setImmediateAsync(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('error');
      expect(value).toEqual('default');
      expect(isLoading).toBeFalsy();
      done();
    });
  });
});
