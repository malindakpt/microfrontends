import { Pool } from 'pg';
import { sql } from 'slonik';

import { Config } from '../../common';
import { PgClient } from '../../database';
import { VipQueueName } from '../vip-queue-name.enum';
import { BaseMessage, BaseMessageHandler } from './base.message';

export interface ProgressMessage extends BaseMessage {
  Progress: number;
}

export class EncodingProgressMessageHandler extends BaseMessageHandler<
  ProgressMessage
> {
  constructor(ownerPgPool: Pool, config: Config) {
    super(VipQueueName.EncodingProgress, ownerPgPool, config);
  }

  protected async customProcessing(
    pgClient: PgClient,
    videoId: number,
    messageBody: ProgressMessage,
  ): Promise<void> {
    await pgClient.query(
      sql`UPDATE app_public.videos
          SET encoding_progress = ${messageBody.Progress}
          WHERE id = ${videoId} AND (encoding_progress < ${messageBody.Progress} OR encoding_progress is NULL)`,
    );
  }
}
