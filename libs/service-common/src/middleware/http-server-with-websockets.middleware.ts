import { Express, Request, Response } from 'express';
import { createServer, Server } from 'http';
import { Middleware } from 'postgraphile';

const webSocketsKey = 'websocketMiddlewares';
const httpServerKey = 'httpServer';

export function getHttpServer(app: Express): Server | void {
  return app.get(httpServerKey);
}

export function getWebsocketMiddlewares(
  app: Express,
): Middleware<Request, Response>[] {
  return app.get(webSocketsKey);
}

export function setupHttpServerWithWebsockets(
  app: Express,
  websocketMiddlewares: Middleware<Request, Response>[] = [],
): Server {
  const httpServer = createServer();

  // Getting access to the HTTP server directly means that we can do things
  // with websockets if we need to (e.g. GraphQL subscriptions).
  app.set(httpServerKey, httpServer);

  // When we're using websockets, we may want them to have access to
  // sessions/etc for authentication.
  app.set(webSocketsKey, websocketMiddlewares);

  return httpServer;
}
