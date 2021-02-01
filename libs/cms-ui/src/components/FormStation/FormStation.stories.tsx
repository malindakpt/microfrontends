import { action } from '@storybook/addon-actions';
import { ActionData } from 'components/Actions';
import {
  CustomTagsField,
  ReadOnlyField,
  SelectField,
  SingleLineTextField,
  TagsField,
} from 'components/FormElements';
import { Field } from 'formik';
import { generateItemArray, Story } from 'helpers/storybook';
import React from 'react';
import * as Yup from 'yup';
import { wrapWithProviders } from '../../helpers/storybook';
import { Create } from './Create/Create';
import { Details } from './Details/Details';
import { FormStation } from './FormStation';

export default {
  title: `Primary Components/Station Controls/Form Station`,
  component: FormStation,
};

const generateActions = (amount: number): ActionData[] =>
  generateItemArray(
    amount,
    index =>
      ({
        actionId: `action${index + 1}`,
        label: `Action ${index + 1}`,
      } as ActionData),
  );

const defaultActions: ActionData[] = generateActions(3);

const actions = {
  onActionSelected: action('actionSelected'),
  saveData: action('saveData'),
};

export const Main: Story = () =>
  wrapWithProviders(
    <FormStation<{ title: string }>
      titleProperty="title"
      subtitle="My Asset Type"
      actions={defaultActions}
      validationSchema={Yup.object().shape<{ title: string }>({
        title: Yup.string()
          .required()
          .max(25)
          .label('Title'),
      })}
      initialData={{ data: { title: 'My asset' }, loading: false }}
      {...actions}
    >
      <div>
        <h1 style={{ textAlign: 'center', marginTop: 0 }}>
          Define the form as you like ✨
        </h1>
        <Field name="title" label="Title" as={SingleLineTextField} />
      </div>
    </FormStation>,
  );

export const EditStation: Story = () => {
  interface DetailsValues {
    id: number;
    title: string;
    publishState: string;
    genres: string[];
    ratings: string;
    shortDescription: string;
    longDescription: string;
    cast: string[];
  }

  return wrapWithProviders(
    <Details<DetailsValues>
      titleProperty="title"
      subtitle="Movies"
      actions={generateActions(7)}
      validationSchema={Yup.object().shape<Partial<DetailsValues>>({
        title: Yup.string()
          .required()
          .max(25)
          .label('Title'),
        genres: Yup.array<string>()
          .max(2)
          .label('Genres'),
        shortDescription: Yup.string()
          .required()
          .label('Short Description'),
        cast: Yup.array<string>()
          .min(1)
          .label('Cast'),
      })}
      initialData={{
        loading: false,
        data: {
          id: 12344567890,
          title: 'My Movie',
          publishState: 'PUBLISHED',
          genres: [],
          ratings: 'PG-13',
          shortDescription: 'Some short abstract...',
          longDescription: '',
          cast: ['Jane Doe', 'John Doe'],
        },
      }}
      {...actions}
    >
      <Field name="id" label="Id" as={ReadOnlyField} />
      <Field name="title" label="Title" as={SingleLineTextField} />
      <Field name="publishState" label="Publish State" as={ReadOnlyField} />
      <Field
        name="genres"
        label="Genre(s)"
        tagsOptions={['Crime', 'Drama', 'Thriller']}
        as={TagsField}
      />

      <Field
        name="ratings"
        label="Age Rating"
        options={[
          { value: 'PG', label: 'Parental Guidance Suggested (PG)' },
          { value: 'PG-13', label: 'Parents Strongly Cautioned (PG-13)' },
          { value: 'R', label: 'Restricted (R)' },
        ]}
        as={SelectField}
      />

      <Field
        name="shortDescription"
        label="Short Description"
        placeholder="Enter a short description..."
        as={SingleLineTextField}
      />
      <Field
        name="longDescription"
        label="Long Description"
        placeholder="Enter a description..."
        as={SingleLineTextField}
      />
      <Field name="cast" label="Cast" as={CustomTagsField} />
      <Field
        name="password"
        label="Password"
        as={SingleLineTextField}
        type="password"
      />
    </Details>,
  );
};
EditStation.story = {
  name: 'Edit',
  parameters: {
    docs: {
      storyDescription: `This story shows the Details component with a form as content.
      The form is created using the [CMS UI Library Form elements](/docs/primary-components-form--main).`, // TODO: This is an "external" link that reloads storybook :-(
    },
  },
};

export const CreateStation: Story = () => {
  interface CreateValues {
    title: string;
    genres: string[];
    ratings: string;
    shortDescription: string;
    longDescription: string;
    cast: string[];
  }

  return wrapWithProviders(
    <Create<CreateValues>
      title="Create a Movie"
      subtitle="Movies"
      validationSchema={Yup.object().shape<Partial<CreateValues>>({
        title: Yup.string()
          .required()
          .max(25)
          .label('Title'),
        genres: Yup.array<string>()
          .max(2)
          .label('Genres'),
        shortDescription: Yup.string()
          .required()
          .label('Short Description'),
        cast: Yup.array<string>()
          .min(1)
          .label('Cast'),
      })}
      initialData={{
        loading: false,
        data: {
          title: '',
          genres: [],
          ratings: '',
          shortDescription: '',
          longDescription: '',
          cast: [],
        },
      }}
      {...actions}
    >
      <Field name="title" label="Title" as={SingleLineTextField} />
      <Field
        name="genres"
        label="Genre(s)"
        tagsOptions={['Crime', 'Drama', 'Thriller']}
        as={TagsField}
      />

      <Field
        name="ratings"
        label="Age Rating"
        options={[
          { value: 'PG', label: 'Parental Guidance Suggested (PG)' },
          { value: 'PG-13', label: 'Parents Strongly Cautioned (PG-13)' },
          { value: 'R', label: 'Restricted (R)' },
        ]}
        as={SelectField}
      />

      <Field
        name="shortDescription"
        label="Short Description"
        placeholder="Enter a short description..."
        as={SingleLineTextField}
      />
      <Field
        name="longDescription"
        label="Long Description"
        placeholder="Enter a description..."
        as={SingleLineTextField}
      />
      <Field name="cast" label="Cast" as={CustomTagsField} />
      <Field
        name="password"
        label="Password"
        as={SingleLineTextField}
        type="password"
      />
    </Create>,
  );
};
CreateStation.story = {
  name: 'Create',
  parameters: {
    docs: {
      storyDescription: `This story shows the Details component with a form as content.
      The form is created using the [CMS UI Library Form elements](/docs/primary-components-form--main).`, // TODO: This is an "external" link that reloads storybook :-(
    },
  },
};

export const WithOverflow: Story = () => {
  return (
    <div className="container">
      <style>{`
      .container > div {
        height: 400px;
      }
   `}</style>
      <EditStation />
    </div>
  );
};
WithOverflow.story = {
  name: 'Overflowing content',
  parameters: {
    docs: {
      storyDescription: `This story demonstrates the scrolling behavior of the component if the content will not fit on a single screen.`,
    },
  },
};
