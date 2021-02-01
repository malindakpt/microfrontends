import { text, boolean } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { Story } from 'helpers/storybook';
import { CustomTags } from './CustomTags';

export default {
  title: `Primary Components/Form Elements/CustomTags`,
  component: CustomTags,
};

export const Main: Story = () => {
  const [value, setValue] = useState(['Drama', 'Comedy']);

  return (
    <CustomTags
      name="customGenres"
      value={value}
      label={text('Label', 'Custom Tags')}
      error={text('Error Message', '')}
      displayAsRows={boolean('Display as rows', false)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      //@ts-ignore
      onChange={e => setValue(e.currentTarget.value)}
    />
  );
};
