import { Pool } from 'pg';
import { sql } from 'slonik';

import { Config } from '../../common';
import { PgClient } from '../../database';
import { VipQueueName } from '../vip-queue-name.enum';
import { BaseMessageHandler } from './base.message';
import { ProgressMessage } from './encoding-progress.message';

export class AcquisitionProgressMessageHandler extends BaseMessageHandler<
  ProgressMessage
> {
  constructor(ownerPgPool: Pool, config: Config) {
    super(VipQueueName.AcquisitionProgress, ownerPgPool, config);
  }

  protected async customProcessing(
    pgClient: PgClient,
    videoId: number,
    messageBody: ProgressMessage,
  ): Promise<void> {
    await pgClient.query(
      sql`UPDATE app_public.videos
          SET acquisition_progress = ${messageBody.Progress}
          WHERE id = ${videoId} AND (acquisition_progress < ${messageBody.Progress} OR acquisition_progress is NULL)`,
    );
  }
}
