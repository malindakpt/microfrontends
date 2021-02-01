import { text } from '@storybook/addon-knobs';
import React from 'react';
import { Story } from 'helpers/storybook';
import { ReadOnlyField } from './ReadOnlyField';

export default {
  title: `Primary Components/Form Elements/ReadOnlyField`,
  component: ReadOnlyField,
};

export const Main: Story = () => {
  return (
    <ReadOnlyField
      label={text('Label', 'Name')}
      value={text('Value', 'Axinom')}
    />
  );
};
