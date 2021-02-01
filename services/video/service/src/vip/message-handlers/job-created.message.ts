import { Pool } from 'pg';
import { sql } from 'slonik';

import { Config } from '../../common';
import { PgClient } from '../../database';
import { TranscodingStatus } from '../../generated/types';
import { VipQueueName } from '../vip-queue-name.enum';
import { BaseMessage, BaseMessageHandler } from './base.message';

export class JobCreatedMessageHandler extends BaseMessageHandler<BaseMessage> {
  constructor(ownerPgPool: Pool, config: Config) {
    super(VipQueueName.JobCreated, ownerPgPool, config);
  }

  protected async customProcessing(
    pgClient: PgClient,
    videoId: number,
    messageBody: BaseMessage,
  ): Promise<void> {
    await pgClient.query(
      sql`UPDATE app_public.videos
          SET transcoding_status = ${TranscodingStatus.InProgress}
          WHERE id = ${videoId} AND transcoding_status = ${TranscodingStatus.Waiting}`,
    );
  }
}
