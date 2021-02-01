/* eslint-disable no-console */
import { Express } from 'express';
import { Pool } from 'pg';

import {
  getShutdownActions,
  ShutdownActionsMiddleware,
} from './shutdown-actions.middleware';

//TODO: Replace console calls with logger calls when Logger is refactored and moved to this library
const initializeOwnerPgPool = (
  connectionString: string,
  shutdownActions: ShutdownActionsMiddleware,
): Pool => {
  const ownerPgPool = new Pool({ connectionString });

  ownerPgPool.on('error', err => {
    console.debug(err);
  });

  shutdownActions.push(() => {
    console.debug('Shutting down Owner PostgreSQL connection Pool.');
    ownerPgPool.end();
  });
  return ownerPgPool;
};

const ownerPoolKey = 'ownerPgPool';

export function getOwnerPgPool(app: Express): Pool {
  return app.get(ownerPoolKey);
}

export function setupOwnerPgPool(app: Express, connectionString: string): void {
  const shutdownActions = getShutdownActions(app);
  const ownerPool = initializeOwnerPgPool(connectionString, shutdownActions);
  app.set(ownerPoolKey, ownerPool);
}
