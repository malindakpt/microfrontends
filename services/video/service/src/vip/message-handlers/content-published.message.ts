import { Pool } from 'pg';
import { sql } from 'slonik';

import { Config } from '../../common';
import { PgClient } from '../../database';
import { Video } from '../../generated/types';
import { VipQueueName } from '../vip-queue-name.enum';
import { BaseMessage, BaseMessageHandler } from './base.message';

export interface ContentPublishedMessage extends BaseMessage {
  TotalSizeInBytes: number;
  Type: string;
}

export class ContentPublishedMessageHandler extends BaseMessageHandler<
  ContentPublishedMessage
> {
  constructor(ownerPgPool: Pool, config: Config) {
    super(VipQueueName.ContentPublished, ownerPgPool, config);
  }

  protected async customProcessing(
    pgClient: PgClient,
    videoId: number,
    messageBody: ContentPublishedMessage,
  ): Promise<void> {
    const property = sql.identifier([
      `${messageBody.Type.toLowerCase()}_size_in_bytes`,
    ]);

    await pgClient.queryExactlyOne<Video>(
      sql`UPDATE app_public.videos
          SET ${property} = ${messageBody.TotalSizeInBytes}
          WHERE id = ${videoId}`,
    );
  }
}
