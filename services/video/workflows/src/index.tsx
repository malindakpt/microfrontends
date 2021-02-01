import { PiletApi } from 'frontend-host';
import * as React from 'react';
import { PageHeader } from '@ax/cms-ui';

export function setup(app: PiletApi): void {
  app.registerPage('/video', () => <PageHeader title="Video Management" />, {
    breadcrumb: () => 'Video Management',
  });
}
