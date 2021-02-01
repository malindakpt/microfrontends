import {
  MessagingError,
  OnError,
  OnMessage,
  Receiver,
  SessionReceiver,
} from '@azure/service-bus';
import { ServiceBusService } from 'azure-sb';

import { Logger } from '../common';

/**
 * The async version for `Receiver.registerMessageHandler` with feedback on the connection status.
 * Original Source: https://github.com/shlomiassaf/pebula-node/blob/100ad01655672e1f69c019aab54cf9bb2d988276/packages/nesbus/src/routing/register-message-handler.ts
 * Resolvement of this issue should supposedly remove the need for this wrapper https://github.com/Azure/azure-sdk-for-js/issues/7986
 */
export const registerMessageHandler = async (
  receiver: Receiver | SessionReceiver,
  onMessage: OnMessage,
  onError: OnError,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    let done = false;
    const onErrorRouter: OnError = err => {
      if (done || err instanceof MessagingError) {
        onError(err);
      } else {
        done = true;
        reject(err);
      }
    };

    const poll = (): void => {
      setTimeout(() => {
        if (receiver.isReceivingMessages()) {
          done = true;
          resolve();
        } else if (!done) {
          poll();
        }
      }, 10);
    };

    receiver.registerMessageHandler(onMessage, onErrorRouter, {
      maxConcurrentCalls: 5,
    });
    poll();
  });
};

//TODO: Check this from time to time: https://github.com/Azure/azure-sdk-for-js/issues/9105
export const createQueueIfNotExists = async (
  serviceBusService: ServiceBusService,
  queueName: string,
  logger: Logger,
): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    serviceBusService.createQueueIfNotExists(queueName, function(error) {
      if (error) {
        reject(error);
      } else {
        logger.debug(`'${queueName}' created if it did not exist before.`);
        resolve(true);
      }
    });
  });
};
