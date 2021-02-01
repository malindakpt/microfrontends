import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import React from 'react';
import { generateItemArray } from 'helpers/storybook';
import { Actions } from './Actions';
import { ActionData } from './Actions.models';

export default {
  title: `Other Components/Actions`,
};

const defaultActions: ActionData[] = [
  {
    actionId: 'actionOne',
    label: 'Action One',
  },
  {
    actionId: 'actionTwo',
    label: 'Action Two',
  },
  {
    actionId: 'actionThree',
    label: 'Action Three',
  },
];

const generateActions = (amount: number) =>
  generateItemArray(amount, index => ({
    actionId: `action${index + 1}`,
    label: `Action ${index + 1}`,
  }));

const customStyles = {
  height: 'calc(100vh - 16px)',
} as React.CSSProperties;

export const Default = () => {
  return (
    <div style={customStyles}>
      <Actions actions={[]} />
    </div>
  );
};

export const withActions = () => {
  return (
    <div style={customStyles}>
      <Actions
        actions={defaultActions}
        onActionSelected={action('itemClicked')}
      />
    </div>
  );
};

export const confirmation = () => {
  const confirmationAction: ActionData[] = [
    { actionId: 'actionOne', label: 'Action One', confirmationRequired: true },
  ];

  return (
    <div style={customStyles}>
      <Actions
        actions={confirmationAction}
        onActionSelected={action('itemClicked')}
      />
    </div>
  );
};

export const withEllipsis = () => {
  const longLabelAction: ActionData = {
    actionId: 'actionFour',
    label: 'Action Four With Long Label',
  };

  return (
    <div style={customStyles}>
      <Actions
        actions={[...defaultActions, longLabelAction]}
        onActionSelected={action('itemClicked')}
      />
    </div>
  );
};

export const withOverflow = () => {
  return (
    <div className="wrapper">
      <style>{`
      .wrapper > div {
        height: 350px;
      }
   `}</style>
      <Actions
        actions={generateActions(15)}
        onActionSelected={action('itemClicked')}
      />
    </div>
  );
};

export const knobs = () => {
  return (
    <div style={customStyles}>
      <Actions
        actions={defaultActions}
        onActionSelected={action('itemClicked')}
        width={text('width', '300px', 'style')}
      />
    </div>
  );
};
