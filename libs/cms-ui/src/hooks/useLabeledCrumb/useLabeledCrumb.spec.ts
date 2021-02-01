jest.mock('components/AxinomCMS/Providers/AppState/AppState');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual<{}>('react-router-dom'),
  useLocation: jest.fn(),
}));

import { useAppState } from 'components/AxinomCMS/Providers/AppState/AppState';
import { testHook } from '../../helpers/hooksTestingHelpers';
import { useLabeledCrumb } from './useLabeledCrumb';
import { useLocation } from 'react-router-dom';
import { asSpy } from 'helpers/testing';

describe('useLabeledCrumb', () => {
  it("adds crumb for current route if it doesn't exist", async () => {
    const updateAppState = jest.fn();

    asSpy(useAppState).mockReturnValue({
      breadcrumbs: [{ label: 'root', url: '/home', params: [] }],
      updateAppState,
    });

    asSpy(useLocation).mockReturnValue({ pathname: '/test' });

    try {
      await testHook(async () => {
        useLabeledCrumb('test');
      });
    } catch (e) {
      console.log(e);
    }
    expect(updateAppState).toHaveBeenCalledTimes(1);
    expect(updateAppState).toHaveBeenCalledWith({
      breadcrumbs: [
        { label: 'root', url: '/home', params: [] },
        { label: 'test', url: '/test', params: [] },
      ],
    });
  });

  it('renames the current breadcrumb if it already exists', async () => {
    const updateAppState = jest.fn();

    asSpy(useAppState).mockReturnValue({
      breadcrumbs: [{ label: 'root', url: '/test', params: [] }],
      updateAppState,
    });

    asSpy(useLocation).mockReturnValue({ pathname: '/test' });

    try {
      await testHook(async () => {
        useLabeledCrumb('test');
      });
    } catch (e) {
      console.log(e);
    }
    expect(updateAppState).toHaveBeenCalledTimes(1);
    expect(updateAppState).toHaveBeenCalledWith({
      breadcrumbs: [{ label: 'test', url: '/test', params: [] }],
    });
  });
});
