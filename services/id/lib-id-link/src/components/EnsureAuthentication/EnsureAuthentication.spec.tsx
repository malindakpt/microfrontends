import React from 'react';
import { mount } from 'enzyme';
import * as ISP from 'components/IdentityServiceProvider/IdentityServiceProvider';
import { EnsureAuthentication } from './EnsureAuthentication';
import { Login } from '../Login/Login';
import { AccountInactiveError } from '../AccountInactiveError/AccountInactiveError';
import { ConfigurationInvalidError } from '../ConfigurationInvalidError/ConfigurationInvalidError';
import {
  IdentityProvider,
  ConfigStatusResponseCode,
  TokenResponseCode,
} from '@ax/id-link-utils';
import { act } from 'react-dom/test-utils';

const flushPromises = () => new Promise(setImmediate);

const successValue = {
  addTokenChangedHandler: jest.fn(),
  getConfiguration: () => {
    //throw 'asdf';
    return {
      status: ConfigStatusResponseCode.SUCCESS,
      providers: [
        { title: 'Google', idpId: IdentityProvider.GOOGLE, enabled: true },
      ],
    } as any;
  },
  getToken: () => {
    return {
      code: TokenResponseCode.SUCCESS,
      user: {
        email: 'test@test.com',
        id: '1234',
        name: 'Test User',
        profilePictureUrl: 'PictureUrl',
        token: {
          accessToken: 'accessToken',
          expiresIn: Date.now() + 3000,
          permissions: {},
          tags: [],
        },
      },
    } as any;
  },
} as any;

describe('EnsureAuthentication', () => {
  it('renders content when user is authenticated', async () => {
    const value = {
      ...successValue,
    };
    jest.spyOn(ISP, 'useIdentityService').mockImplementation(() => value);

    const wrapper = mount(
      <EnsureAuthentication>
        <div id="test" />
      </EnsureAuthentication>,
    );

    await act(async () => {
      await flushPromises();
      wrapper.update();
    });

    expect(wrapper.find('#test')).toHaveLength(1);
  });

  it('renders the login from when user is not authenticated', async () => {
    const value = {
      ...successValue,
      getToken: () => {
        return { code: TokenResponseCode.NEEDS_LOGIN };
      },
    };
    jest.spyOn(ISP, 'useIdentityService').mockImplementation(() => value);

    const wrapper = mount(
      <EnsureAuthentication>
        <div id="test" />
      </EnsureAuthentication>,
    );

    await act(async () => {
      await flushPromises();
      wrapper.update();
    });

    expect(wrapper.find('#test')).toHaveLength(0);
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it.each([
    {
      code: ConfigStatusResponseCode.SUCCESS,
      enabledIdentityProviders: [],
    },
    {
      code: ConfigStatusResponseCode.MISCONFIGURATION,
    },
  ])(
    'renders a configuration error from when the configuration is bad',
    async config => {
      const value = {
        ...successValue,
        getConfiguration: () => config,
      };
      jest.spyOn(ISP, 'useIdentityService').mockImplementation(() => value);

      const wrapper = mount(
        <EnsureAuthentication>
          <div id="test" />
        </EnsureAuthentication>,
      );

      await act(async () => {
        await flushPromises();
        wrapper.update();
      });

      expect(wrapper.find('#test').length).toEqual(0);
      expect(wrapper.find(ConfigurationInvalidError)).toHaveLength(1);
    },
  );

  it('renders an account inactive error if the account is not active', async () => {
    const value = {
      ...successValue,
      getToken: () => ({
        code: TokenResponseCode.ACCOUNT_NOT_ACTIVE,
      }),
    };
    jest.spyOn(ISP, 'useIdentityService').mockImplementation(() => value);

    const wrapper = mount(
      <EnsureAuthentication>
        <div id="test" />
      </EnsureAuthentication>,
    );

    await act(async () => {
      await flushPromises();
      wrapper.update();
    });

    expect(wrapper.find('#test')).toHaveLength(0);
    expect(wrapper.find(AccountInactiveError)).toHaveLength(1);
  });
});
