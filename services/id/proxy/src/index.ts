import * as http from 'http';
import * as httpProxy from 'http-proxy';

import { config } from './common/config';
import { ErrorCode } from './common/errors';
import { JSONify } from './common/helpers';
import { Logger } from './common/logging';

const logger = new Logger('bootstrap');

async function bootstrap(): Promise<void> {
  const proxy = httpProxy.createProxyServer();

  const server = http.createServer((req, res) => {
    proxy.web(
      req,
      res,
      {
        xfwd: true,
        target: `${config.publicAuthEndpointUrl}`,
      },
      error => {
        logger.error({
          message: 'An unhandled exception occured',
          error,
        });
      },
    );
  });

  server.on('listening', () => {
    logger.log({
      message: `id-proxy started`,
      proxyListenPort: config.idProxyPort,
      proxyTarget: config.publicAuthEndpointUrl,
    });
  });

  server.listen(config.idProxyPort);
}

bootstrap().catch(error => {
  logger.error({ code: ErrorCode.StartupError, ...JSONify(error) });
  process.exit(-1);
});
