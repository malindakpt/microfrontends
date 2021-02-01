import { text } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { Story } from 'helpers/storybook';
import { SingleLineText } from './SingleLineText';

export default {
  title: `Primary Components/Form Elements/SingleLineText`,
  component: SingleLineText,
};

export const Main: Story = () => {
  const [value, setValue] = useState('');

  return (
    <SingleLineText
      name="name"
      label={text('Label', 'Name')}
      placeholder={text('Placeholder', 'Enter Name...')}
      value={value}
      type={text('Type', 'text')}
      onChange={e => setValue(e.currentTarget.value)}
      error={text('Error Message', '')}
    />
  );
};
