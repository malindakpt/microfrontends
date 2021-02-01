/* eslint-disable @typescript-eslint/camelcase */
import { makeJSONPgSmartTagsPlugin } from 'graphile-utils';
import { JSONPgSmartTags } from 'postgraphile';

const smartTags: JSONPgSmartTags = {
  version: 1,
  config: {
    class: {
      'tenant_administration.tenant': {
        attribute: {
          is_root: {
            tags: {
              omit: true,
            },
          },
        },
        constraint: {
          tenant_name_key: {
            tags: {
              omit: true,
            },
          },
        },
      },
      'tenant_administration.tenant_admin': {
        attribute: {
          password_hash: {
            tags: {
              omit: true,
            },
          },
          password_changed: {
            tags: {
              omit: 'update',
            },
          },
        },
        constraint: {
          tenant_admin_tenant_id_email_key: {
            tags: {
              omit: true,
            },
          },
        },
      },
    },
    attribute: {},
    constraint: {},
    procedure: {},
  },
};
export const ModuleSmartTagsPlugin = makeJSONPgSmartTagsPlugin(smartTags);
