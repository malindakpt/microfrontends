/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeWrapResolversPlugin } from 'postgraphile';

import { inputError } from '../../../../common/errors';
import { ApplicationError } from '../../../../common/errors/types/application.error';
import {
  CreateTenantAdminInput,
  DeleteTenantAdminInput,
  Tenant,
  TenantAdmin,
  TenantAdminPatch,
  TenantStatus,
  UpdateTenantAdminInput,
  UpdateTenantInput,
} from '../../../../generated/graphql.types';
import { Endpoints } from '../../security';

async function anyActiveTenantAdmins(
  pgClient,
  tenantId: string,
): Promise<boolean> {
  const {
    rows: [tenantCheckPassed],
  } = await pgClient.query(
    `SELECT exists (SELECT id FROM tenant_administration.tenant_admin WHERE tenant_id = $1 AND active = $2)`,
    [tenantId, true],
  );

  return tenantCheckPassed.exists;
}

async function anyActiveTenantAdminsExcept(
  pgClient,
  tenantId: string,
  tenantAdminId: string,
): Promise<boolean> {
  const {
    rows: [tenantCheckPassed],
  } = await pgClient.query(
    `SELECT exists (SELECT id FROM tenant_administration.tenant_admin WHERE tenant_id = $1 AND id != $2 AND active = $3)`,
    [tenantId, tenantAdminId, true],
  );

  return tenantCheckPassed.exists;
}

async function isTenantEnabled(pgClient, tenantId: string): Promise<boolean> {
  const {
    rows: [tenant],
  } = await pgClient.query(
    `SELECT id, status FROM tenant_administration.tenant WHERE id = $1`,
    [tenantId],
  );

  return (tenant as Tenant).status === TenantStatus.ENABLED;
}

async function getTenantIdFromTenantAdminId(
  pgClient,
  tenantAdminId: string,
): Promise<string> {
  const {
    rows: [tenantAdmin],
  } = await pgClient.query(
    `SELECT tenant_id FROM tenant_administration.tenant_admin WHERE id = $1`,
    [tenantAdminId],
  );

  return tenantAdmin.tenant_id;
}

// Validate Tenant data before update
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const validateTenant = propName => {
  return async (
    resolve: any,
    source: any,
    args: { [argName: string]: any },
    context: any,
  ) => {
    const { pgClient } = context;

    const input = args.input as UpdateTenantInput;
    const tenant = input.patch;

    // Validate status
    if (tenant && tenant.status) {
      if (tenant.status === TenantStatus.ENABLED) {
        if (!(await anyActiveTenantAdmins(pgClient, input.id))) {
          throw new ApplicationError({
            message:
              'Unable to enable Tenant as there are currently no Tenant Administrators in active state.',
          });
        }
      }
    }

    return resolve();
  };
};

//this plugin validates TenantAdmin data before insert or update
const validateTenantAdmin = propName => {
  return async (
    resolve: any,
    source: any,
    args: { [argName: string]: any },
    context: any,
  ) => {
    const { pgClient } = context;

    const input = args.input as CreateTenantAdminInput | UpdateTenantAdminInput;
    const tenantAdmin = input[propName] as TenantAdmin | TenantAdminPatch;

    //validate email address
    if (tenantAdmin && tenantAdmin.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(tenantAdmin.email))
        throw inputError('Entered email format is invalid');
    }

    // validate active status update
    if (propName === 'patch' && !tenantAdmin.active) {
      const tenantAdminId = (input as UpdateTenantAdminInput).id;
      const tenantId = await getTenantIdFromTenantAdminId(
        pgClient,
        tenantAdminId,
      );
      if (
        (await isTenantEnabled(pgClient, tenantId)) &&
        !(await anyActiveTenantAdminsExcept(pgClient, tenantId, tenantAdminId))
      ) {
        throw new ApplicationError({
          message:
            'Please disable the tenant before deactivating the last active Tenant Administrator.',
        });
      }
    }

    return resolve();
  };
};

// Check if delete allowed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkTenantAdminDelete = propName => {
  return async (
    resolve: any,
    source: any,
    args: { [argName: string]: any },
    context: any,
  ) => {
    const { pgClient } = context;
    const input = args.input as DeleteTenantAdminInput;

    const tenantId = await getTenantIdFromTenantAdminId(pgClient, input.id);
    if (
      (await isTenantEnabled(pgClient, tenantId)) &&
      !(await anyActiveTenantAdminsExcept(pgClient, tenantId, input.id))
    ) {
      throw new ApplicationError({
        message:
          'Please disable the tenant before deleting the last active Tenant Administrator.',
      });
    }

    return resolve();
  };
};

export const ValidateTenantAdminPlugin = makeWrapResolversPlugin({
  Mutation: {
    [Endpoints.updateTenant]: validateTenant('patch'),
    [Endpoints.createTenantAdmin]: validateTenantAdmin('tenantAdmin'),
    [Endpoints.updateTenantAdmin]: validateTenantAdmin('patch'),
    [Endpoints.deleteTenantAdmin]: checkTenantAdminDelete('id'),
  },
});
