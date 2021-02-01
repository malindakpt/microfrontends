- It seems that lerna run will be out of sync if version of library is not the
  same in package.json dependencies of consumer app.
  - this leads lerna run will execute 2 packages asynchronously, breaking the
    build of the app
- This helped setup jest for multi-package usage, including "Jest Runner" being
  able to work:
  - https://github.com/facebook/jest/issues/3112
  - https://github.com/firsttris/vscode-jest-runner/issues/61
    - This is mostly a reminder that jest runner just executes jest commands
      from root of the monorepo, which means that if you can launch tests from
      root of the monorepo - extension should be able to as well.
  - Catch: link to failed test is not always clickable:
    - execute all tests from monorepo root - not clickable
    - execute all tests from project - clickable
    - running tests using Jest Runner extension - not clickable =(
- There seems to be a problem with react-scripts version 3.4.1 not launching
  webpack dev server
  - https://github.com/facebook/create-react-app/issues/8685
  - downgraded the version to make the --stream option work for react apps
  - Affected packages:
    - jest X -> 24.9.0
    - webpack 8.1.0 -> 8.0.6
    - babel-loader 4.42.0 -> 4.41.5
