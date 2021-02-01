import { Pool } from 'pg';
import { sql } from 'slonik';

import { Config } from '../../common';
import { PgClient } from '../../database';
import { Video } from '../../generated/types';
import { VipQueueName } from '../vip-queue-name.enum';
import { BaseMessage, BaseMessageHandler } from './base.message';

export interface ContentAcquiredMessage extends BaseMessage {
  TotalFilesSizeInBytes: number;
}

export class ContentAcquiredMessageHandler extends BaseMessageHandler<
  ContentAcquiredMessage
> {
  constructor(ownerPgPool: Pool, config: Config) {
    super(VipQueueName.ContentAcquired, ownerPgPool, config);
  }

  protected async customProcessing(
    pgClient: PgClient,
    videoId: number,
    messageBody: ContentAcquiredMessage,
  ): Promise<void> {
    await pgClient.queryExactlyOne<Video>(
      sql`UPDATE app_public.videos
        SET source_size_in_bytes = ${messageBody.TotalFilesSizeInBytes}
        WHERE id = ${videoId}`,
    );
  }
}
