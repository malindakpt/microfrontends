import { text } from '@storybook/addon-knobs';
import React from 'react';
import { Story } from 'helpers/storybook';
import { DateTimeField } from './DateTimeField';

export default {
  title: `Primary Components/Form Elements/DateTimeField`,
  component: DateTimeField,
};

export const Main: Story = () => {
  return (
    <DateTimeField
      label={text('Label', 'Created At')}
      value={text('Value', '2020-04-27T15:28:38.050419+05:30')}
    />
  );
};
