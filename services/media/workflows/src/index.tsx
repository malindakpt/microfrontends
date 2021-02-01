import { PiletApi } from 'frontend-host';
import * as React from 'react';
import { PageHeader } from '@ax/cms-ui';

export function setup(app: PiletApi): void {
  app.registerPage('/media', () => <PageHeader title="Media Management" />, {
    breadcrumb: () => 'Media Management',
  });
}
