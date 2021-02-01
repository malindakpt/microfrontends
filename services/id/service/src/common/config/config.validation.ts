import * as yup from 'yup';

import { ErrorCode, startupError } from '../errors';
import { Logger, LogLevel } from '../logging';
import { Config } from './';

const validationRules: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof Config]?: any;
} = {
  environment: yup
    .mixed()
    .oneOf(['dev', 'cb', 'test', 'acc', 'prod'])
    .required(),
  serviceId: yup.string().required(),
  tenantAdminPort: yup
    .number()
    .required()
    .positive()
    .integer(),
  appAdminPort: yup
    .number()
    .required()
    .positive()
    .integer(),
  accessManagementPort: yup
    .number()
    .required()
    .positive()
    .integer(),
  authEndpointPort: yup
    .number()
    .required()
    .positive()
    .integer(),
  pgHost: yup.string().required(),
  pgPort: yup
    .number()
    .required()
    .positive()
    .integer(),
  pgSSLMode: yup
    .mixed()
    .oneOf([
      'disable',
      'allow',
      'prefer',
      'require',
      'verify-ca',
      'verify-full',
    ])
    .required(),
  pgRootUser: yup.string().required(),
  pgRootUserPassword: yup.string().required(),
  dbName: yup.string().required(),
  dbOwnerName: yup.string().required(),
  dbOwnerPassword: yup.string().required(),
  dbPgUser: yup.string().required(),
  dbPgUserPassword: yup.string().required(),
  dbPgWebUser: yup.string().required(),
  pgRootConnectionString: yup.string().required(),
  dbOwnerConnectionString: yup.string().required(),
  dbPgConnectionString: yup.string().required(),
  taSuperUserEmail: yup.string().required(),
  taSuperUserPasswordHash: yup.string().required(),
  managedServiceClientId: yup.string().required(),
  managedServiceClientSecret: yup.string().required(),
  publicAuthEndpointUrl: yup.string().required(),
};

const validationSchema = yup.object().shape(validationRules);

const validateLogLevel = (config: Config): void => {
  const logger = new Logger('validateLogLevel', config);
  const configValue = (config.logLevel ?? '').toUpperCase();
  const level = LogLevel[configValue];
  if (level === undefined || typeof level === 'string') {
    const logLevelValues = Object.keys(LogLevel)
      .filter(k => isNaN(Number(k)))
      .join(', ');
    logger.warn({
      code: ErrorCode.StartupError,
      message: `LOG_LEVEL '${config.logLevel}' is not valid. Please use one of the following values: ${logLevelValues}`,
    });
  }
};

export const validateConfig = async (config: Config): Promise<void> => {
  validateLogLevel(config);
  await validationSchema.validate(config, { abortEarly: false }).catch(e => {
    throw startupError(
      { validation: e.errors },
      `Error occurred during validation of configuration values.`,
    );
  });
};
