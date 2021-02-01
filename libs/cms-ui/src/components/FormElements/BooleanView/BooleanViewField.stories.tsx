import { text, boolean } from '@storybook/addon-knobs';
import React from 'react';
import { Story } from 'helpers/storybook';
import { BooleanViewField } from './BooleanViewField';

export default {
  title: `Primary Components/Form Elements/BooleanViewField`,
  component: BooleanViewField,
};

export const Main: Story = () => {
  return (
    <BooleanViewField
      label={text('Label', 'Status')}
      value={boolean('Value', true)}
      trueLabel={text('True Lable', 'Enabled')}
      falseLabel={text('False Lable', 'Disabled')}
    />
  );
};
