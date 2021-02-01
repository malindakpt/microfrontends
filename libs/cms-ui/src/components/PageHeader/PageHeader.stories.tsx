import { action } from '@storybook/addon-actions';
import React from 'react';
import { PageHeader } from './PageHeader';
import { PageHeaderAction } from './PageHeaderAction/PageHeaderAction';

export default {
  title: `Other Components/PageHeader`,
};

export const Default = () => {
  return <PageHeader />;
};

export const Title = () => {
  return <PageHeader title="Title" />;
};

export const Subtitle = () => {
  return <PageHeader subtitle="Subtitle" />;
};

export const withBothTitles = () => {
  return <PageHeader title="Title" subtitle="Subtitle" />;
};

export const withTitlesAndButtons = () => {
  return (
    <PageHeader title="Title" subtitle="Subtitle">
      <PageHeaderAction
        icon={'./images/images.png'}
        alt={'Dummy Action'}
        onClick={action('header action clicked')}
      />
    </PageHeader>
  );
};
