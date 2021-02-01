/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express';
import * as fs from 'fs';
import { JWK, JWKS } from 'jose';
import * as path from 'path';

import { config, Logger } from '../../../common';

const logger = new Logger('well-known-config-middleware');

export const wellKnownConfigMiddleware = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Check if proxy is being used, and use it as public endpoint
    let publicAuthEndpointUrl: string;
    if (req.get('x-forwarded-proto') && req.get('x-forwarded-host')) {
      publicAuthEndpointUrl = `${req.get('x-forwarded-proto')}://${req.get(
        'x-forwarded-host',
      )}`;
    } else {
      publicAuthEndpointUrl = config.publicAuthEndpointUrl;
    }

    const configKey = req.params.configKey;

    if (!configKey) {
      res.send({
        jwks_uri: `${publicAuthEndpointUrl}/.well-known/jwks.json`,
      });
    } else if (configKey === 'jwks.json') {
      const publicKey = JWK.asKey(
        fs.readFileSync(
          path.resolve(__dirname, './../../../../keys/public.key'),
          'utf8',
        ),
      );

      const keystore = new JWKS.KeyStore([publicKey]);

      res.send(keystore.toJWKS());
    } else {
      res.status(404).send();
    }
  } catch (error) {
    logger.error(error);
  }
};
