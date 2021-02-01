import 'normalize.css';

import './index.scss';

import { createInstance, Piral, SetComponent } from 'piral-core';
import * as React from 'react';
import { render } from 'react-dom';
import { Layout } from './Layout/Layout';
import {
  IdentityServiceProvider,
  EnsureAuthentication,
  createIdentityServiceClient,
} from '@ax/id-link';
import { identityServiceConfig } from './id-service.config';
import { createAuthApi } from './AuthExtension/create';
import { Link } from 'react-router-dom';

export const client = createIdentityServiceClient(identityServiceConfig);

const feedUrl =
  process.env.FEED_SERVICE_URL ?? 'http://localhost:10000/api/v1/pilet';

const instance = createInstance({
  async requestPilets() {
    const response = await fetch(feedUrl);
    const feed = await response.json();
    return feed.items;
  },
  extendApi: [createAuthApi(client)],
});

const app = (
  <IdentityServiceProvider client={client}>
    <EnsureAuthentication>
      <Piral instance={instance}>
        <SetComponent name="Layout" component={Layout} />
      </Piral>
    </EnsureAuthentication>
  </IdentityServiceProvider>
);

render(app, document.querySelector('#app'));

//TODO: temporary landing page - needs to be removed later
instance.root.registerPage('/', () => (
  <ul>
    <li>
      <Link to="accessManagement">Access Management</Link>
    </li>
    <li>
      <Link to="video">Video Management</Link>
    </li>
    <li>
      <Link to="media">Media Management</Link>
    </li>
  </ul>
));
