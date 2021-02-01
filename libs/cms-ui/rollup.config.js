import { config, isProd } from '../../rollup.config';
import pkg from './package.json';

export default {
  ...config,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: !isProd,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: !isProd,
    },
  ],
};
