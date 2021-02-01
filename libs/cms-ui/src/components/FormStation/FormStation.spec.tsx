jest.mock('components/AxinomCMS/Providers/AppState/AppState');

import { shallow, mount } from 'enzyme';
import React, { useEffect } from 'react';
import { ActionData, Actions } from 'components/Actions';
import { PageHeader, PageHeaderAction } from 'components/PageHeader';
import { FormStation } from './FormStation';
import { noop } from '../../helpers/utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import * as Yup from 'yup';
import { useFormikContext } from 'formik';
import { useAppState } from '../AxinomCMS/Providers/AppState/AppState';
import { asSpy } from 'helpers/testing';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const sampleActions: ActionData[] = [
  {
    actionId: 'actionOne',
    label: 'Action One',
  },
];

const defaultProps = {
  initialData: { loading: true },
  saveData: noop,
};

asSpy(useAppState).mockReturnValue({ breadcrumbs: [] });
// Temporarily disable console.log() from FormStation until proper error handling
jest.spyOn(console, 'log').mockImplementation(() => null);

describe('Details', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<FormStation {...defaultProps} />);

    expect(wrapper).toBeTruthy();
  });

  describe('Actions', () => {
    it('hides actions by default', () => {
      const wrapper = mount(
        <MemoryRouter>
          <FormStation {...defaultProps} />
        </MemoryRouter>,
      );

      const actions = wrapper.find(Actions);

      expect(actions.exists()).toBe(false);
    });

    it.each([
      [true, true],
      [false, false],
      [undefined, false],
    ])('alwaysShowActionsPanel working correctly', (value, isVisible) => {
      const wrapper = mount(
        <MemoryRouter>
          <FormStation {...defaultProps} alwaysShowActionsPanel={value} />,
        </MemoryRouter>,
      );

      const actions = wrapper.find(Actions);

      expect(actions.exists()).toBe(isVisible);
    });

    it('always shows Actions when at least one action is passed into prop "actions"', () => {
      const wrapper = mount(
        <MemoryRouter>
          <FormStation {...defaultProps} actions={sampleActions} />
        </MemoryRouter>,
      );
      const actions = wrapper.find(Actions);

      expect(actions.exists()).toBe(true);
    });

    describe('raising logic', () => {
      const testActionId = sampleActions[0].actionId;

      it('raises the action selected event with the action id if form is valid', async () => {
        const spy = jest.fn();
        const wrapper = mount(
          <MemoryRouter>
            <FormStation
              {...defaultProps}
              actions={sampleActions}
              onActionSelected={spy}
            />
          </MemoryRouter>,
        );

        const actionSelected = wrapper.find(Actions).prop('onActionSelected');
        await act(async () => {
          actionSelected!(testActionId);
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(testActionId);
      });

      it('does not raise the action selected event if the form is invalid', async () => {
        const ForceValidation: React.FC = () => {
          const context = useFormikContext();
          useEffect(() => {
            context.validateForm();
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);
          return null;
        };

        const spy = jest.fn();
        const wrapper = mount(
          <MemoryRouter>
            <FormStation
              {...defaultProps}
              actions={sampleActions}
              validationSchema={Yup.object().shape({
                something: Yup.string()
                  .min(10)
                  .required(),
              })}
              initialData={{ loading: false, data: { something: '' } }}
              onActionSelected={spy}
            >
              <ForceValidation />
            </FormStation>
          </MemoryRouter>,
        );

        await act(async () => {
          wrapper.update();
        });

        await act(async () => {
          wrapper.update();
        });

        const actionSelected = wrapper.find(Actions).prop('onActionSelected');
        await act(async () => {
          actionSelected!(testActionId);
        });

        expect(spy).not.toHaveBeenCalled();
      });

      it('does not raise the action selected event if saveData throws', async () => {
        const spy = jest.fn();
        const wrapper = mount(
          <MemoryRouter>
            <FormStation
              {...defaultProps}
              actions={sampleActions}
              saveData={() => {
                throw new Error('fail');
              }}
              onActionSelected={spy}
            ></FormStation>
          </MemoryRouter>,
        );

        const actionSelected = wrapper.find(Actions).prop('onActionSelected');
        await act(async () => {
          actionSelected!(testActionId);
        });

        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Header', () => {
    it('uses titleProperty as preferred header', () => {
      const wrapper = mount(
        <MemoryRouter>
          <FormStation
            {...defaultProps}
            saveData={() => {
              throw new Error('fail');
            }}
            initialData={{ loading: false, data: { title: 'Test title' } }}
            titleProperty="title"
            defaultTitle="default"
          ></FormStation>
        </MemoryRouter>,
      );

      const header = wrapper.find(PageHeader);
      expect(header.prop('title')).toEqual('Test title');
    });

    it('uses defaultTitle as fallback', () => {
      const wrapper = mount(
        <MemoryRouter>
          <FormStation
            {...defaultProps}
            saveData={() => {
              throw new Error('fail');
            }}
            initialData={{ loading: false, data: { title: 'Test title' } }}
            titleProperty="nonExisting"
            defaultTitle="default"
          ></FormStation>
        </MemoryRouter>,
      );

      const header = wrapper.find(PageHeader);
      expect(header.prop('title')).toEqual('default');
    });

    describe('Reset and cancel operations', () => {
      const ChangeValue: React.FC = () => {
        const context = useFormikContext();
        useEffect(() => {
          context.setFieldValue('something', 'changed');
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return null;
      };

      it('allows resetting of a dirty form', async () => {
        let value = 'initial';

        const MonitorValue: React.FC = () => {
          const { values } = useFormikContext<{ something: string }>();
          useEffect(() => {
            value = values.something;
          }, [values]);
          return null;
        };

        const wrapper = mount(
          <MemoryRouter>
            <FormStation
              {...defaultProps}
              initialData={{ loading: false, data: { something: 'initial' } }}
            >
              <ChangeValue />
              <MonitorValue />
            </FormStation>
          </MemoryRouter>,
        );

        await act(async () => {
          wrapper.update();
        });

        const headerActions = wrapper.find(PageHeaderAction);
        expect(headerActions.length).toEqual(1);

        headerActions.at(0).simulate('click');

        expect(value).toEqual('initial');
      });

      it('allows cancellation if wanted', async () => {
        asSpy(useAppState).mockReturnValue({
          breadcrumbs: [
            { url: '/home', label: 'Home', params: [] },
            { url: '/home/create', label: 'Create', params: [] },
          ],
        });
        let path: string;

        const wrapper = mount(
          <MemoryRouter>
            <FormStation
              {...defaultProps}
              initialData={{ loading: false, data: { something: 'initial' } }}
              canCancel={true}
              saveData={() => {
                // making sure that a call to save would fail
                throw new Error('fail');
              }}
            >
              <ChangeValue />
            </FormStation>
            <Route
              path="*"
              render={({ location }) => {
                path = location.pathname;
                return null;
              }}
            />
          </MemoryRouter>,
        );

        await act(async () => {
          wrapper.update();
        });

        const headerActions = wrapper.find(PageHeaderAction);
        expect(headerActions.length).toEqual(2);

        headerActions.at(1).simulate('click');

        await act(async () => {
          wrapper.update();
        });

        expect(path!).toBe('/home');

        asSpy(useAppState).mockReset();
      });
    });
  });
});
