import { text } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { Story } from 'helpers/storybook';
import { Select } from './Select';

export default {
  title: `Primary Components/Form Elements/Select`,
  component: Select,
};

export const Main: Story = () => {
  const [value, setValue] = useState('');

  const selectOptions = [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
    { value: '4', label: 'Four' },
  ];
  return (
    <Select
      name="number"
      value={value}
      label={text('Label', 'Number')}
      options={selectOptions}
      error={text('Error Message', '')}
      onChange={e => {
        setValue(e.currentTarget.value);
      }}
    />
  );
};
