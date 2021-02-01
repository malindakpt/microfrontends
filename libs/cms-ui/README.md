# cms-ui

> UI Components for building Axinom CMS applications

[![cms-ui package in AxinomCMS feed in Azure Artifacts](https://feeds.dev.azure.com/axinom/96f5bc74-ca65-4157-bb07-b8fed3437ad9/_apis/public/Packaging/Feeds/e36476ea-618b-44ae-afae-fd3aa358eabb/Packages/c7d1417b-7437-4b72-8030-e8daed9d0eb2/Badge)](https://dev.azure.com/axinom/CMS-PoC/_packaging?_a=package&feed=e36476ea-618b-44ae-afae-fd3aa358eabb&package=c7d1417b-7437-4b72-8030-e8daed9d0eb2&preferRelease=true)

## Usage

### Installation

```bash
yarn add --save cms-ui
```

### Code Example

```tsx
import React from 'react';

import MyComponent from '@ax/cms-ui';

class Example extends React.Component {
  render() {
    return <MyComponent />;
  }
}
```

## Development

The project uses a private npm repository on Azure DevOps. So before installing
the dependencies you need to connect to the package feed by following the
instructions described at
https://dev.azure.com/axinom/CMS-PoC/_packaging?_a=connect&feed=AxinomCMS%40Local

## License

UNLICENSED © [Axinom](https://github.com/Axinom)
