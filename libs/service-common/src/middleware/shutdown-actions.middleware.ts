/* eslint-disable no-console */
import { Express } from 'express';

export type ShutdownAction = () => void | Promise<void>;

//TODO: Replace console calls with logger calls when Logger is refactored and moved to this library
export class ShutdownActionsMiddleware {
  private readonly shutdownActions: ShutdownAction[] = [];
  private shutdownActionsCalled = false;

  constructor() {
    this.initializeEventListeners();
  }

  public push(action: ShutdownAction): void {
    this.shutdownActions.push(action);
  }

  private initializeEventListeners(): void {
    process.once('SIGINT', () => {
      process.on('SIGINT', () => {
        console.debug(
          'SIGINT event already triggered, shutdown actions are running.',
        );
      });
      this.gracefulShutdown(() => {
        process.kill(process.pid, 'SIGINT');
        process.exit();
      });
    });

    process.once('exit', () => {
      this.callShutdownActions();
    });
  }

  private gracefulShutdown(callback: () => void): void {
    const promises = this.callShutdownActions();
    if (promises.length === 0) {
      return callback();
    }

    let called = false;
    const callbackOnce = (): void => {
      if (!called) {
        called = true;
        callback();
      }
    };

    // Guarantee the callback will be called
    const guaranteeCallback = setTimeout(callbackOnce, 3000);
    guaranteeCallback.unref();

    Promise.all(promises).then(callbackOnce, callbackOnce);
  }

  private callShutdownActions(): (Promise<void> | void)[] {
    if (this.shutdownActionsCalled) {
      return [];
    }
    this.shutdownActionsCalled = true;
    return this.shutdownActions.map(fn => {
      // Ensure that all actions are called, even if a previous action throws an error
      try {
        return fn();
      } catch (e) {
        return Promise.reject(e);
      }
    });
  }
}

const shutdownActionsKey = 'shutdownActions';

export function getShutdownActions(app: Express): ShutdownActionsMiddleware {
  return app.get(shutdownActionsKey);
}

export function setupShutdownActions(app: Express): void {
  const middleware = new ShutdownActionsMiddleware();
  app.set(shutdownActionsKey, middleware);
}
