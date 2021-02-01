import { getFilterPrefix } from './source-videos-endpoint.plugin';

describe('getFilterPrefix', () => {
  it.each`
    rootFolderPath                | startsWith                  | expected
    ${undefined}                  | ${undefined}                | ${''}
    ${undefined}                  | ${null}                     | ${''}
    ${undefined}                  | ${''}                       | ${''}
    ${undefined}                  | ${'filterPrefix'}           | ${'filterPrefix'}
    ${undefined}                  | ${'filterPrefix/'}          | ${'filterPrefix'}
    ${undefined}                  | ${'filterPrefix/throwaway'} | ${'filterPrefix'}
    ${null}                       | ${undefined}                | ${''}
    ${null}                       | ${null}                     | ${''}
    ${null}                       | ${''}                       | ${''}
    ${null}                       | ${'filterPrefix'}           | ${'filterPrefix'}
    ${null}                       | ${'filterPrefix/'}          | ${'filterPrefix'}
    ${null}                       | ${'filterPrefix/throwaway'} | ${'filterPrefix'}
    ${''}                         | ${undefined}                | ${''}
    ${''}                         | ${null}                     | ${''}
    ${''}                         | ${''}                       | ${''}
    ${''}                         | ${'filterPrefix'}           | ${'filterPrefix'}
    ${''}                         | ${'filterPrefix/'}          | ${'filterPrefix'}
    ${''}                         | ${'filterPrefix/throwaway'} | ${'filterPrefix'}
    ${'folderName'}               | ${undefined}                | ${'folderName/'}
    ${'folderName'}               | ${null}                     | ${'folderName/'}
    ${'folderName'}               | ${''}                       | ${'folderName/'}
    ${'folderName'}               | ${'filterPrefix'}           | ${'folderName/filterPrefix'}
    ${'folderName'}               | ${'filterPrefix/'}          | ${'folderName/filterPrefix'}
    ${'folderName'}               | ${'filterPrefix/throwaway'} | ${'folderName/filterPrefix'}
    ${'folderName/'}              | ${undefined}                | ${'folderName/'}
    ${'folderName/'}              | ${null}                     | ${'folderName/'}
    ${'folderName/'}              | ${''}                       | ${'folderName/'}
    ${'folderName/'}              | ${'filterPrefix'}           | ${'folderName/filterPrefix'}
    ${'folderName/'}              | ${'filterPrefix/'}          | ${'folderName/filterPrefix'}
    ${'folderName/'}              | ${'filterPrefix/throwaway'} | ${'folderName/filterPrefix'}
    ${'folderName/anotherFolder'} | ${undefined}                | ${'folderName/anotherFolder/'}
    ${'folderName/anotherFolder'} | ${null}                     | ${'folderName/anotherFolder/'}
    ${'folderName/anotherFolder'} | ${''}                       | ${'folderName/anotherFolder/'}
    ${'folderName/anotherFolder'} | ${'filterPrefix'}           | ${'folderName/anotherFolder/filterPrefix'}
    ${'folderName/anotherFolder'} | ${'filterPrefix/'}          | ${'folderName/anotherFolder/filterPrefix'}
    ${'folderName/anotherFolder'} | ${'filterPrefix/throwaway'} | ${'folderName/anotherFolder/filterPrefix'}
  `(
    `returns '$expected' for rootFolderPath '$rootFolderPath' and startsWith '$startsWith'`,
    ({ rootFolderPath, startsWith, expected }) => {
      // Act
      const result = getFilterPrefix(rootFolderPath, startsWith);

      // Assert
      expect(result).toBe(expected);
    },
  );
});
