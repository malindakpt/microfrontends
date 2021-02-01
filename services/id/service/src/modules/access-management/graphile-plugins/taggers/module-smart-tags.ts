/* eslint-disable @typescript-eslint/camelcase */
import { makeJSONPgSmartTagsPlugin } from 'graphile-utils';
import { JSONPgSmartTags } from 'postgraphile';

const smartTags: JSONPgSmartTags = {
  version: 1,
  config: {
    class: {
      'access_management.user': {
        attribute: {
          name: {
            tags: {
              omit: 'update',
            },
          },
          profile_picture_url: {
            tags: {
              omit: 'update',
            },
          },
        },
        constraint: {
          user_tenant_id_application_id_id_key: {
            tags: {
              omit: true,
            },
          },
          user_tenant_id_application_id_email_key: {
            tags: {
              omit: true,
            },
          },
        },
      },
      'access_management.user_role': {
        constraint: {
          user_role_tenant_id_application_id_name_key: {
            tags: {
              omit: true,
            },
          },
        },
      },
      'access_management.user_role_parent': {
        tags: {
          name: 'userRoleParentAssignment',
        },
        constraint: {
          user_role_parent_user_role_id_parent_user_role_id_key: {
            tags: {
              omit: true,
            },
          },
          user_role_parent_user_role_id_fkey: {
            tags: {
              omit: true,
            },
          },
          user_role_parent_parent_user_role_id_fkey: {
            tags: {
              foreignFieldName: 'userRoleParentAssignments',
            },
          },
        },
      },
      'access_management.user_role_assignment': {
        constraint: {
          user_role_assignment_user_id_user_role_id_key: {
            tags: {
              omit: true,
            },
          },
        },
      },
      'access_management.tag': {
        constraint: {
          tag_tenant_id_application_id_name_key: {
            tags: {
              omit: true,
            },
          },
        },
      },
      'access_management.user_role_tag': {
        tags: {
          name: 'userRoleTagAssignment',
        },
        constraint: {
          user_role_tag_user_role_id_tag_id_key: {
            tags: {
              omit: true,
            },
          },
        },
      },
      'access_management.permission': {
        tags: {
          omit: 'create,update,delete',
        },
        constraint: {
          permission_service_id_name_key: {
            tags: {
              omit: true,
            },
          },
        },
      },
      'access_management.user_role_permission': {
        tags: {
          name: 'userRolePermissionAssignment',
        },
        constraint: {
          user_role_permission_user_role_id_permission_id_key: {
            tags: {
              omit: true,
            },
          },
        },
      },
      'access_management.service_account': {
        attribute: {
          client_secret: {
            tags: {
              omit: true,
            },
          },
        },
        constraint: {
          service_account_tenant_id_application_id_name_key: {
            tags: {
              omit: true,
            },
          },
        },
      },
      'access_management.service_account_permission': {
        tags: {
          name: 'serviceAccountPermissionAssignment',
        },
        constraint: {
          service_account_permission_service_account_id_permission_id_key: {
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
