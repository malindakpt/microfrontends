import React from 'react';
import { Story } from 'helpers/storybook';
import { AxinomCMS } from './AxinomCMS';
import { StationRoot } from './Layout/StationRoot/StationRoot';

export default {
  title: `Primary Components/AxinomCMS`,
};

const Home: React.FC = () => (
  <StationRoot>
    <h1>This is the home station</h1>
  </StationRoot>
);

export const Default: Story = () => {
  return (
    <AxinomCMS
      homeComponent={Home}
      // As storybook runs our story at `/iframe.html` we need to add home here as well.
      routes={[{ path: '/iframe.html', component: Home }]}
    ></AxinomCMS>
  );
};
