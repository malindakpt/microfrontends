/* eslint-disable @typescript-eslint/camelcase */
import { makeJSONPgSmartTagsPlugin } from 'graphile-utils';
import { JSONPgSmartTags } from 'postgraphile';

const smartTags: JSONPgSmartTags = {
  version: 1,
  config: {
    class: {
      'application_administration.application': {
        attribute: {
          is_root: {
            tags: {
              omit: true,
            },
          },
        },
        constraint: {
          application_tenant_id_id_key: {
            tags: {
              omit: true,
            },
          },
          application_tenant_id_name_key: {
            tags: {
              omit: true,
            },
          },
          // application_tenant_id_fkey: {
          //   tags: {
          //     omit: true,
          //   },
          // },
        },
      },
      'application_administration.idp_scope': {
        attribute: {},
        constraint: {
          idp_scope_idp_id_scope_name_key: {
            tags: {
              omit: true,
            },
          },
        },
      },
      'application_administration.idp_configuration': {
        attribute: {},
        constraint: {
          idp_configuration_tenant_id_application_id_idp_id_key: {
            tags: {
              omit: true,
            },
          },
          idp_configuration_tenant_id_application_id_fkey: {
            tags: {
              fieldName: 'application',
              foreignFieldName: 'idpConfigurations',
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
