import { JSONify, sleep } from '@ax/service-common';
import { MessagingError, ServiceBusMessage } from '@azure/service-bus';
import { Pool } from 'pg';
import { sql } from 'slonik';

import { Config, Logger } from '../../common';
import { PgClient } from '../../database';
import { TranscodingHistory } from '../../generated/types';
import { VipQueueName } from '../vip-queue-name.enum';

export interface BaseMessage {
  JobId: string;
  ExternalId: string;
  TenantId: string;
  ExternalType: string;
  ExternalProvider: string;
  Timestamp: string;
}

export abstract class BaseMessageHandler<TMessage extends BaseMessage> {
  protected readonly logger: Logger;
  // 10 is the default maximum value of retries which is set per queue on creation.
  // We have no control over it right now from the code.
  // Waiting for release of an update to '@azure/service-bus' library to hopefully have more control over this.
  protected readonly maxRetryCount = 10;
  constructor(
    public readonly queueName: VipQueueName,
    private readonly ownerPgPool: Pool,
    config: Config,
  ) {
    this.logger = new Logger(config, queueName);
  }

  public async handle(message: ServiceBusMessage): Promise<void> {
    let messageBody: TMessage;
    try {
      messageBody = JSON.parse(message.body);
      await this.defaultProcessing(message, messageBody);
      this.logger.debug('Message Received');
    } catch (error) {
      const attempt = message.deliveryCount + 1;
      const retryMessage = `Failed to process message after ${attempt} attempts.`;
      if (attempt >= this.maxRetryCount) {
        await message.deadLetter({
          deadletterReason: retryMessage,
          deadLetterErrorDescription: error.message,
        });
        this.logger.error(error, {
          messageJson: messageBody,
          messageString: messageBody ? undefined : message.body,
        });
      } else {
        this.logger.debug(retryMessage);
        await sleep(1000);
        await message.abandon();
      }
    }
  }

  public handleError(error: MessagingError | Error): void {
    this.logger.error(error);
  }

  protected async defaultProcessing(
    message: ServiceBusMessage,
    messageBody: TMessage,
  ): Promise<void> {
    let pgClient: PgClient;
    try {
      pgClient = await PgClient.create(this.ownerPgPool, {
        'ax.claims.username': 'VIP',
      });

      const enqueuedDate = message.enqueuedTimeUtc.toISOString();
      const videoId = parseInt(messageBody.ExternalId.split('-')[0], 10);

      const videoExists = await pgClient.exists(
        sql`select 1 from app_public.videos where id=${videoId}`,
      );

      if (!videoExists) {
        throw new Error(
          `Message received, but video with id '${videoId}' does not exist.`,
        );
      }

      await pgClient.queryExactlyOne<TranscodingHistory>(
        sql`INSERT INTO app_public.transcoding_histories(video_id, message_type, message_body, enqueued_date)
            VALUES (${videoId}, ${message.userProperties.OriginalMessageType}, ${message.body}, ${enqueuedDate})`,
      );

      await this.customProcessing(pgClient, videoId, messageBody);

      await pgClient.commitTransaction();
    } catch (error) {
      await pgClient?.rollbackTransaction();
      throw error;
    } finally {
      pgClient?.release();
    }
  }

  protected abstract async customProcessing(
    pgClient: PgClient,
    videoId: number,
    messageBody: TMessage,
  ): Promise<void>;
}
