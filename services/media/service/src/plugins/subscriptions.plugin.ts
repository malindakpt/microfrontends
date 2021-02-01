import { SubscriptionsPluginFactory } from '@ax/service-common';
import { makePluginByCombiningPlugins } from 'graphile-utils';

export const SubscriptionsPlugin = makePluginByCombiningPlugins(
  SubscriptionsPluginFactory('movie_genres', 'MovieGenre'),
  SubscriptionsPluginFactory('tvshow_genres', 'TvshowGenre'),
  SubscriptionsPluginFactory('movies', 'Movie'),
  SubscriptionsPluginFactory('tvshows', 'Tvshow'),
  SubscriptionsPluginFactory('seasons', 'Season'),
  SubscriptionsPluginFactory('episodes', 'Episode'),
  SubscriptionsPluginFactory('collections', 'Collection'),
);
