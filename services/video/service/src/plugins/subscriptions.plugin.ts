import { makePluginByCombiningPlugins } from 'graphile-utils';
import { SubscriptionsPluginFactory } from '@ax/service-common';

export const SubscriptionsPlugin = makePluginByCombiningPlugins(
  SubscriptionsPluginFactory('videos', 'Video'),
);
