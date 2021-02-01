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
  idProxyPort: yup
    .number()
    .required()
    .positive()
    .integer(),
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
