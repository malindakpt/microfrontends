import { text } from '@storybook/addon-knobs';
import React from 'react';
import { LandingPageHeader } from './LandingPageHeader';

export default {
  title: `Primary Components/LandingPage/LandingPageHeader`,
  component: LandingPageHeader,
};

export const BasicView = () => {
  return <LandingPageHeader title={'Test Title'} subtitle={'Test Subtitle'} />;
};

export const TitleOnlyView = () => {
  return <LandingPageHeader title={'Test Title'} subtitle={''} />;
};

export const Knobs = () => {
  return (
    <LandingPageHeader
      title={text('Title', 'Title')}
      subtitle={text('Sub title', 'Sub title')}
    />
  );
};
