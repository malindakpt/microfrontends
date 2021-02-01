import { durationToSeconds } from '@ax/service-common';
import { extname } from 'path';
import { Pool } from 'pg';
import { sql } from 'slonik';

import { Config } from '../../common';
import { PgClient } from '../../database';
import { Video } from '../../generated/types';
import { VipQueueName } from '../vip-queue-name.enum';
import { BaseMessage, BaseMessageHandler } from './base.message';

export interface ContentPreProcessedMessage extends BaseMessage {
  VideoDurationForPublic: string;
  AudioLanguages: string[];
  SubtitleLanguages: string[];
  CaptionLanguages: string[];
  VideoStream: { FileName: string };
}

export class ContentPreProcessedMessageHandler extends BaseMessageHandler<
  ContentPreProcessedMessage
> {
  constructor(ownerPgPool: Pool, config: Config) {
    super(VipQueueName.ContentPreProcessed, ownerPgPool, config);
  }

  protected async customProcessing(
    pgClient: PgClient,
    videoId: number,
    messageBody: ContentPreProcessedMessage,
  ): Promise<void> {
    const fileExtension = extname(messageBody.VideoStream.FileName);
    const fileNameWithoutExtension = messageBody.VideoStream.FileName.replace(
      /\.[^/.]+$/,
      '',
    );
    const audio = sql.array(messageBody.AudioLanguages, 'text');
    const subtitles = sql.array(messageBody.SubtitleLanguages, 'text');
    const captions = sql.array(messageBody.CaptionLanguages, 'text');
    const duration = durationToSeconds(messageBody.VideoDurationForPublic);
    await pgClient.queryExactlyOne<Video>(
      sql`UPDATE app_public.videos
        SET (duration_in_seconds, audio_languages, subtitle_languages, caption_languages, source_file_name, source_file_extension) = (${duration}, ${audio}, ${subtitles}, ${captions}, ${fileNameWithoutExtension}, ${fileExtension})
        WHERE id = ${videoId}`,
    );
  }
}
