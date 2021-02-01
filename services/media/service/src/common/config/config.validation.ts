import * as yup from 'yup';

import { ErrorCode, startupError } from '../errors';
import { Logger, LogLevel } from '../logging';
import { Config } from './';

const validationRules: {
  [P in keyof Config]?: any;
} = {
  environment: yup
    .mixed()
    .oneOf(['dev', 'prod', 'test'])
    .required(),
  port: yup
    .number()
    .required()
    .positive()
    .integer(),
  serviceId: yup.string().required(),
  logProject: yup.string().required(),
  dbHost: yup.string().required(),
  dbPort: yup
    .number()
    .required()
    .positive()
    .integer(),
  dbName: yup.string().required(),
  dbOwnerName: yup.string().required(),
  dbOwnerPassword: yup.string().required(),
  dbAuthName: yup.string().required(),
  dbAuthPassword: yup.string().required(),
  dbVisitorName: yup.string().required(),
  dbRootConnectionString: yup.string().required(),
};

const validationSchema = yup.object().shape(validationRules);

//TODO: Add tests
const validateLogLevel = (config: Config): void => {
  const logger = new Logger(config, 'validateLogLevel');
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
