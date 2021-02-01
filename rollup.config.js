import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from '@rollup/plugin-url';
import { terser } from 'rollup-plugin-terser';
// import svgr from '@svgr/rollup'; TODO: Determine if this would ever be used

export const isProd = process.env.NODE_ENV === 'production';

export const config = {
  input: 'src/index.ts',
  output: [],
  plugins: [
    peerDepsExternal(), // Exclude peerDependencies from the bundle to reduce its size, preferably set as first plugin.
    postcss({
      modules: true, // Set this to false to disable css modules
      inject: true, // Place style tags with css into the document head
      Default: ['sass'],
    }),
    url(),
    // svgr(),
    resolve(),
    typescript({
      tsconfig: 'tsconfig.build.json',
      clean: false, // Clears cache for every build - set to false for now, true seems to cause some errors randomly when running a build
      objectHashIgnoreUnknownHack: true, // Needs to be true to fix this issue: https://github.com/vladshcherbin/rollup-plugin-copy/issues/16 // the issue is caused by using rollup-plugin-url
      exclude: ['*.d.ts', '**/*.d.ts'],
    }),
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'node_modules/scheduler/index.js': [
          'unstable_runWithPriority',
          'LowPriority',
        ],
      },
    }),
    isProd && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
