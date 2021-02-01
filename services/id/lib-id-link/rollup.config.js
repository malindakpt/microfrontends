import { config, isProd } from '../../../rollup.config';
import pkg from './package.json';
import commonjs from 'rollup-plugin-commonjs';
import * as idLinkUtils from '@ax/id-link-utils';

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
  plugins: [
    commonjs({
      namedExports: {
        '@ax/id-link-utils': Object.keys(idLinkUtils),
      },
    }),
    ...config.plugins,
  ],
};
