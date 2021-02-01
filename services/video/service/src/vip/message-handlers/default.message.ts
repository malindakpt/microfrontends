import { Pool } from 'pg';

import { Config } from '../../common';
import { PgClient } from '../../database';
import { VipQueueName } from '../vip-queue-name.enum';
import { BaseMessage, BaseMessageHandler } from './base.message';

export class DefaultMessageHandler extends BaseMessageHandler<BaseMessage> {
  constructor(queueName: VipQueueName, ownerPgPool: Pool, config: Config) {
    super(queueName, ownerPgPool, config);
  }

  protected async customProcessing(
    pgClient: PgClient,
    videoId: number,
    messageBody: BaseMessage,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): Promise<void> {}
}
