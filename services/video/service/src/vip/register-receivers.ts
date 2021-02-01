import { getOwnerPgPool, getShutdownActions } from '@ax/service-common';
import {
  MessagingError,
  ReceiveMode,
  ServiceBusClient,
  ServiceBusMessage,
} from '@azure/service-bus';
import { createServiceBusService } from 'azure-sb';
import { Express } from 'express';
import { Pool } from 'pg';

import { config, ErrorCode, Logger } from '../common';
import {
  createQueueIfNotExists,
  registerMessageHandler,
} from './azure.helpers';
import {
  AcquisitionProgressMessageHandler,
  BaseMessage,
  BaseMessageHandler,
  ContentAcquiredMessageHandler,
  ContentPreProcessedMessageHandler,
  ContentPublishedMessageHandler,
  DefaultMessageHandler,
  EncodingProgressMessageHandler,
  FinalErrorMessageHandler,
  JobCreatedMessageHandler,
  JobSuccessMessageHandler,
  VideoEncodingStartedMessageHandler,
} from './message-handlers';
import { VipQueueName } from './vip-queue-name.enum';

const getMessageHandlers = (
  ownerPgPool: Pool,
): BaseMessageHandler<BaseMessage>[] => {
  return [
    new JobCreatedMessageHandler(ownerPgPool, config),
    new AcquisitionProgressMessageHandler(ownerPgPool, config),
    new ContentAcquiredMessageHandler(ownerPgPool, config),
    new ContentPreProcessedMessageHandler(ownerPgPool, config),
    new VideoEncodingStartedMessageHandler(ownerPgPool, config),
    new EncodingProgressMessageHandler(ownerPgPool, config),
    new ContentPublishedMessageHandler(ownerPgPool, config),
    new JobSuccessMessageHandler(ownerPgPool, config),
    new DefaultMessageHandler(VipQueueName.ContentMapped, ownerPgPool, config),
    new DefaultMessageHandler(
      VipQueueName.EncodingFinished,
      ownerPgPool,
      config,
    ),
    new DefaultMessageHandler(
      VipQueueName.ImagesExtracted,
      ownerPgPool,
      config,
    ),
    new DefaultMessageHandler(
      VipQueueName.ImagesExtractionFailure, // Even tough it's a failure event, it will not disrupt the overall encoding process
      ownerPgPool,
      config,
    ),
    new FinalErrorMessageHandler(ownerPgPool, config),
  ];
};

export const registerReceivers = async (app: Express): Promise<void> => {
  const logger = new Logger(config, 'registerReceivers');
  try {
    const sbConnection = config.vipServiceBusManagerConnection;
    const sbClient = ServiceBusClient.createFromConnectionString(sbConnection);
    const serviceBusService = createServiceBusService(sbConnection); // Used only to create Queues
    const shutdownActions = getShutdownActions(app);
    const ownerPgPool = getOwnerPgPool(app);
    const queueHandlers = getMessageHandlers(ownerPgPool);

    for (const handler of queueHandlers) {
      await createQueueIfNotExists(
        serviceBusService,
        handler.queueName,
        logger,
      );
      const queueClient = sbClient.createQueueClient(handler.queueName);
      const receiver = queueClient.createReceiver(ReceiveMode.peekLock);

      // Explicit OnMessage and OnError calls are required, otherwise 'this' inside of the handler will transform into 'receiver'
      // and ownerPool and logger references inside of the handler will be lost
      await registerMessageHandler(
        receiver,
        async (message: ServiceBusMessage) => {
          await handler.handle(message);
        },
        (error: MessagingError | Error): void => {
          handler.handleError(error);
        },
      );

      shutdownActions.push(async () => {
        logger.debug(
          `Shutting down Service Bus Receiver for ${handler.queueName}`,
        );
        await receiver.close();
        await queueClient.close();
      });
    }
    shutdownActions.push(async () => {
      logger.debug('Shutting down Service Bus Client.');
      await sbClient.close();
    });
  } catch (error) {
    if (config.isDev()) {
      logger.warn(
        'Error occurred while initializing VIP Service Bus Message receivers.',
      );
    } else {
      logger.error(error, { code: ErrorCode.StartupError });
      process.exit(-1);
    }
  }
};
