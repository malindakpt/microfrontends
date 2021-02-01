import { Pool } from 'pg';
import { sql } from 'slonik';

import { Config } from '../../common';
import { PgClient } from '../../database';
import { Video } from '../../generated/types';
import { VipQueueName } from '../vip-queue-name.enum';
import { BaseMessage, BaseMessageHandler } from './base.message';

export interface VideoEncodingStartedMessage extends BaseMessage {
  Bitrates: number[];
}

export class VideoEncodingStartedMessageHandler extends BaseMessageHandler<
  VideoEncodingStartedMessage
> {
  constructor(ownerPgPool: Pool, config: Config) {
    super(VipQueueName.VideoEncodingStarted, ownerPgPool, config);
  }

  protected async customProcessing(
    pgClient: PgClient,
    videoId: number,
    messageBody: VideoEncodingStartedMessage,
  ): Promise<void> {
    const bitrates = sql.array(messageBody.Bitrates, 'int4');
    await pgClient.queryExactlyOne<Video>(
      sql`UPDATE app_public.videos
        SET video_bitrates = ${bitrates}
        WHERE id = ${videoId}`,
    );
  }
}
