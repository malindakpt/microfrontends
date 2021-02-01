/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  displayName: 'cms-ui',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$':
      '<rootDir>../../node_modules/jest-css-modules',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>../../__test__/fileMock.ts',
  },
  setupFilesAfterEnv: [
    '<rootDir>../../__test__/jest.setup.ts',
    'jest-expect-message',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules', 'src'],
};
