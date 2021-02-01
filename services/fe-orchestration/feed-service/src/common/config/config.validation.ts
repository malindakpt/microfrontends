import * as yup from 'yup';
import { startupError } from '../errors';
import { Config } from './';

const SHA256Regex = /^[A-Fa-f0-9]{64}$/;

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
  protocol: yup.string(),
  authKeys: yup.array(yup.string().matches(SHA256Regex)).required()
};

const validationSchema = yup.object().shape(validationRules);

export const validateConfig = async (config: Config): Promise<void> => {
  await validationSchema.validate(config, { abortEarly: false }).catch(e => {
    throw startupError(
      { validation: e.errors },
      `Error occurred during validation of configuration values.`,
    );
  });
};
