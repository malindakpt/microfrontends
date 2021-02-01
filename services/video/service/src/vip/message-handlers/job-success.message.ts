import { Pool } from 'pg';
import { sql } from 'slonik';

import { Config } from '../../common';
import { PgClient } from '../../database';
import { TranscodingStatus, Video } from '../../generated/types';
import { VipQueueName } from '../vip-queue-name.enum';
import { BaseMessage, BaseMessageHandler } from './base.message';

export interface JobSuccessMessage extends BaseMessage {
  Output: { hls: string; dash: string };
}

export class JobSuccessMessageHandler extends BaseMessageHandler<
  JobSuccessMessage
> {
  constructor(ownerPgPool: Pool, config: Config) {
    super(VipQueueName.JobSuccess, ownerPgPool, config);
  }

  protected async customProcessing(
    pgClient: PgClient,
    videoId: number,
    messageBody: JobSuccessMessage,
  ): Promise<void> {
    const hlsManifestPath = messageBody.Output.hls ?? null;
    const dashManifestPath = messageBody.Output.dash ?? null;

    await pgClient.queryExactlyOne<Video>(
      sql`UPDATE app_public.videos
          SET (finished_date, transcoding_status, hls_manifest_path, dash_manifest_path) = (${messageBody.Timestamp}, ${TranscodingStatus.Ready}, ${hlsManifestPath}, ${dashManifestPath})
          WHERE id = ${videoId}`,
    );
  }
}
