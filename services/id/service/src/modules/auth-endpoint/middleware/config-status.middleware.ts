import {
  ConfigStatusResponse,
  ConfigStatusResponseCode,
  IdentityProvider,
} from '@ax/id-link-utils';
import { Request, Response } from 'express';
import { sql } from 'slonik';

import { Logger } from '../../../common';
import {
  IdpConfiguration,
  TenantStatus,
} from '../../../generated/graphql.types';
import { applicationError } from '../common/error-handler';
import { PgClient } from '../database/pg-client';

const logger = new Logger('logout-middleware');

export const configStatusMiddleware = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const tenantId = req.params.tenantId;
  const applicationId = req.params.applicationId;

  try {
    // Validate request
    if (!tenantId) {
      res.status(400).send(applicationError(req, 'Tenant ID is not found.'));
    } else if (!applicationId) {
      res
        .status(400)
        .send(applicationError(req, 'Application ID is not found.'));
    } else {
      const pgClient = new PgClient({ tenantId, applicationId });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const idpConfig = await pgClient.query<any>(sql`
        SELECT ic.idp_id, ic.enabled AS idp_enabled, a.enabled AS application_enabled, t.status AS tenant_status
        FROM application_administration.idp_configuration ic, application_administration.application a, tenant_administration.tenant t
        WHERE t.id = a.tenant_id
        AND   a.id = ic.application_id
        AND   ic.tenant_id = ${tenantId}
        AND   ic.application_id = ${applicationId}
      `);

      let configStatusResponse: ConfigStatusResponse;

      configStatusResponse = {
        code: ConfigStatusResponseCode.MISCONFIGURATION,
        tenantId,
        applicationId,
        enabledIdentityProviders: [],
      };

      if (idpConfig.rowCount) {
        const identityServiceEnabled =
          idpConfig.rows[0].tenantStatus === TenantStatus.ENABLED &&
          idpConfig.rows[0].applicationEnabled === true;

        const enabledIdentityProviders = idpConfig.rows
          .filter(idpInfo => {
            return idpInfo.idpEnabled === true;
          })
          .map(
            (idpConfig: IdpConfiguration) => IdentityProvider[idpConfig.idpId],
          );

        if (identityServiceEnabled) {
          configStatusResponse = {
            code: ConfigStatusResponseCode.SUCCESS,
            tenantId,
            applicationId,
            enabledIdentityProviders,
          };
        } else {
          configStatusResponse.enabledIdentityProviders = enabledIdentityProviders;
        }
      }

      res.send(configStatusResponse);
    }
  } catch (error) {
    logger.log(error);

    const configStatusResponse = {
      code: ConfigStatusResponseCode.ERROR,
      tenantId,
      applicationId,
      enabledIdentityProviders: [],
    };

    res.send(configStatusResponse);
  }
};
