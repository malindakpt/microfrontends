const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const tsConfig = path.resolve(__dirname, './tsconfig.storybook.json');

module.exports = {
  webpackFinal: (config) => {
    // Adding TsconfigPathsPlugin to allow absolute import resolving
    // https://github.com/TypeStrong/ts-loader#baseurl--paths-module-resolution
    config.resolve = {
      ...(config.resolve || []),
      plugins: [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          configFile: tsConfig,
      })]
    }

    return config;
  },
  stories: ['../src/**/*.stories.(tsx|mdx)'],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: tsConfig,
        },
        tsDocgenLoaderOptions: {
          tsconfigPath: tsConfig,
        },
        forkTsCheckerWebpackPluginOptions: {
        },
        include: [path.resolve(__dirname, '../src')],
      },
    },
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: "[name]__[local]___[hash:base64:5]", // Produces the same pattern as react-create-app and rollup
          },
        },
      },
    },

    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },


    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
  ],
}
