export const config = {
  environment: process.env.NODE_ENV,
  serviceId: process.env.SERVICE_ID,
  logLevel: process.env.LOG_LEVEL,

  idProxyPort: parseInt(process.env.ID_PROXY_PORT),
  publicAuthEndpointUrl: process.env.PUBLIC_AUTH_ENDPOINT_URL,

  isDev: function() {
    return this.environment === 'dev';
  },
};

export type Config = typeof config;
