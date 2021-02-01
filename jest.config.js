// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('./jest.config.base.js');

module.exports = {
  ...base,
  projects: [
    '<rootDir>/services/**/jest.config.js',
    '<rootDir>/libs/**/jest.config.js',
  ],
};
