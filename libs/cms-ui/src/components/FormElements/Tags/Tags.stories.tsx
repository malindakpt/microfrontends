import { text } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { Story } from 'helpers/storybook';
import { Tags } from './Tags';

export default {
  title: `Primary Components/Form Elements/Tags`,
  component: Tags,
};

export const Main: Story = () => {
  const [value, setValue] = useState(['1', '2']);

  return (
    <Tags
      name="number"
      value={value}
      label={text('Label', 'Number')}
      dropDownLabel={text('Downdown Label', 'Select')}
      tagsOptions={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
      error={text('Error Message', '')}
      onChange={e => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        //@ts-ignore
        setValue(e.currentTarget.value);
      }}
    />
  );
};
