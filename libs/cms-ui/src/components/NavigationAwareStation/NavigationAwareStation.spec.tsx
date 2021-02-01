jest.mock('hooks/useReactRouterPause/useReactRouterPause');

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { NavigationAwareStation } from './NavigationAwareStation';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { useReactRouterPause } from 'hooks/useReactRouterPause/useReactRouterPause';
import { asSpy } from 'helpers/testing';

describe('NavigationAwareStation', () => {
  beforeEach(() => {
    asSpy(useReactRouterPause).mockReset();
  });

  it('does nothing if restrictNavigation is set to false', async () => {
    mount(
      <MemoryRouter>
        <NavigationAwareStation restrictNavigation={false} />
      </MemoryRouter>,
    );

    expect(useReactRouterPause).toHaveBeenCalledTimes(1);
    expect(asSpy(useReactRouterPause).mock.calls[0][1]).toEqual(false);
  });

  it('blocks navigation if restrictNavigation is set to true', async () => {
    mount(
      <MemoryRouter>
        <NavigationAwareStation restrictNavigation={true} />
      </MemoryRouter>,
    );

    expect(useReactRouterPause).toHaveBeenCalledTimes(1);
    expect(asSpy(useReactRouterPause).mock.calls[0][1]).toEqual(true);
  });

  it('pauses navigation until onNavigate is finished and resumes when returned true', async () => {
    const navigation = {
      isPaused: jest.fn(),
      pausedLocation: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      cancel: jest.fn(),
    };

    mount(
      <MemoryRouter>
        <NavigationAwareStation
          restrictNavigation={true}
          onNavigate={async () => {
            return new Promise<boolean>(resolve => {
              expect(navigation.pause).toHaveBeenCalled();
              expect(navigation.resume).not.toHaveBeenCalled();
              expect(navigation.cancel).not.toHaveBeenCalled();
              resolve(true);
            });
          }}
        />
      </MemoryRouter>,
    );

    expect(useReactRouterPause).toHaveBeenCalledTimes(1);
    expect(asSpy(useReactRouterPause).mock.calls[0][1]).toEqual(true);

    const handler = asSpy(useReactRouterPause).mock.calls[0][0].handler;
    await handler(navigation);
    expect(navigation.resume).toHaveBeenCalled();
    expect(navigation.cancel).not.toHaveBeenCalled();
  });

  it('pauses navigation until onNavigate is finished and cancels when returned false', async () => {
    const navigation = {
      isPaused: jest.fn(),
      pausedLocation: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      cancel: jest.fn(),
    };

    mount(
      <MemoryRouter>
        <NavigationAwareStation
          restrictNavigation={true}
          onNavigate={async () => {
            return new Promise<boolean>(resolve => {
              expect(navigation.pause).toHaveBeenCalled();
              expect(navigation.resume).not.toHaveBeenCalled();
              expect(navigation.cancel).not.toHaveBeenCalled();
              resolve(false);
            });
          }}
        />
      </MemoryRouter>,
    );

    expect(useReactRouterPause).toHaveBeenCalledTimes(1);
    expect(asSpy(useReactRouterPause).mock.calls[0][1]).toEqual(true);

    const handler = asSpy(useReactRouterPause).mock.calls[0][0].handler;
    await handler(navigation);
    expect(navigation.cancel).toHaveBeenCalled();
    expect(navigation.resume).not.toHaveBeenCalled();
  });

  it('pauses navigation until onNavigate is finished and cancels when exception is thrown', async () => {
    const navigation = {
      isPaused: jest.fn(),
      pausedLocation: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      cancel: jest.fn(),
    };

    mount(
      <MemoryRouter>
        <NavigationAwareStation
          restrictNavigation={true}
          onNavigate={async () => {
            throw new Error();
          }}
        />
      </MemoryRouter>,
    );

    expect(useReactRouterPause).toHaveBeenCalledTimes(1);
    expect(asSpy(useReactRouterPause).mock.calls[0][1]).toEqual(true);

    const handler = asSpy(useReactRouterPause).mock.calls[0][0].handler;
    await handler(navigation);
    expect(navigation.cancel).toHaveBeenCalled();
    expect(navigation.resume).not.toHaveBeenCalled();
  });
});
