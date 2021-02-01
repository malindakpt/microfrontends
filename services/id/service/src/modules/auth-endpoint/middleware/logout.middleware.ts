import { LogoutResponse, LogoutResponseCode } from '@ax/id-link-utils';
import { Request, Response } from 'express';
import { sql } from 'slonik';

import { config, Logger } from '../../../common';
import { PgClient } from '../database/pg-client';
import { UserToken } from '../entity/user-token';
import { applicationError } from '../common/error-handler';

const logger = new Logger('logout-middleware');

export const logoutUserMiddleware = async (
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
      const axinomIamToken = req.cookies['AXINOM_IAM_TOKEN'];

      // Delete user token rows
      if (axinomIamToken) {
        const pgClient = new PgClient({ tenantId, applicationId });

        const { rows: deletedRows } = await pgClient.query<UserToken>(sql`
          DELETE FROM auth_endpoint.user_token ut
          WHERE ut.tenant_id = ${tenantId}
          AND   ut.application_id = ${applicationId}
          AND   ut.axinom_iam_token = ${axinomIamToken}
          RETURNING *
        `);

        logger.debug({
          message: 'Deleting user tokens for logout request',
          deletedUserTokenIds: deletedRows.map(row => {
            return row.id;
          }),
        });

        // Destroying the cookie
        res.cookie('AXINOM_IAM_TOKEN', '', {
          // domain: 'id.axinom.com',
          path: `/${tenantId}/${applicationId}/`,
          maxAge: 0,
          httpOnly: true,
          // secure: true,
          // sameSite: 'none',
        });
      }

      const logoutResponse: LogoutResponse = {
        code: LogoutResponseCode.SUCCESS,
      };
      res.send(logoutResponse);
    }
  } catch (error) {
    logger.log(error);

    const logoutResponse: LogoutResponse = {
      code: LogoutResponseCode.ERROR,
      message: `Internal Server Error while logging out user, Please check the ${config.serviceId} log for more details.`,
    };
    res.send(logoutResponse);
  }
};
