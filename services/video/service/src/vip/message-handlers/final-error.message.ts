import { Pool } from 'pg';
import { sql } from 'slonik';

import { Config } from '../../common';
import { PgClient } from '../../database';
import { TranscodingStatus, Video } from '../../generated/types';
import { VipQueueName } from '../vip-queue-name.enum';
import { BaseMessage, BaseMessageHandler } from './base.message';

export class FinalErrorMessageHandler extends BaseMessageHandler<BaseMessage> {
  constructor(ownerPgPool: Pool, config: Config) {
    super(VipQueueName.FinalError, ownerPgPool, config);
  }

  protected async customProcessing(
    pgClient: PgClient,
    videoId: number,
    messageBody: BaseMessage,
  ): Promise<void> {
    await pgClient.queryExactlyOne<Video>(
      sql`UPDATE app_public.videos
          SET transcoding_status = ${TranscodingStatus.Error}
          WHERE id = ${videoId}`,
    );
  }
}
