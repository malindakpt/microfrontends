import React, { useCallback, useRef } from 'react';
import { ActionData, Create, SingleLineTextField, Nullable } from '@ax/cms-ui';
import { useHistory } from 'react-router-dom';
import { FormikValues, Field } from 'formik';
import { ExecutionResult } from 'graphql';
import * as Yup from 'yup';
import {
  CreateTagMutationVariables,
  useCreateTagMutation,
  CreateTagMutation,
  Tag,
} from '../../generated/graphql';
import { BreadcrumbResolver } from 'frontend-host';
import { client } from '../../apolloClient';

const tagCreateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .max(100),
  description: Yup.string()
    .required('Description is a required field')
    .max(2000),
});

type FormData = Nullable<CreateTagMutationVariables['input']['tag']>;

export const UserRoleTagCreate: React.FC = () => {
  const [tagCreate] = useCreateTagMutation({
    client,
    fetchPolicy: 'no-cache',
  });

  const { actions, actionSelectedHandler, tag } = useActions();

  const saveData = useCallback(
    async (
      formData: FormikValues,
      initialData,
      { setSubmitting },
    ): Promise<ExecutionResult<CreateTagMutation>> => {
      setSubmitting(true);
      let response: ExecutionResult<CreateTagMutation>;
      try {
        response = await tagCreate({
          variables: {
            input: {
              tag: {
                name: formData.name,
                description: formData.description,
              },
            },
          },
        });
        tag.current = response.data?.createTag?.tag as Tag;
        return response;
      } catch (error) {
        // TODO: Proper error handling using setStatus or setErrors()
        // https://stackoverflow.com/questions/52986962/how-to-properly-use-formiks-seterror-method-react-library
        throw error;
      }
    },
    [tag, tagCreate],
  );

  return (
    <Create<FormData>
      title="Create User Role Tag"
      subtitle="User Role Tags"
      validationSchema={tagCreateSchema}
      saveData={saveData}
      actions={actions}
      onActionSelected={actionSelectedHandler}
      initialData={{
        loading: false,
      }}
    >
      <Field name="name" label="Name" as={SingleLineTextField} />
      <Field name="description" label="Description" as={SingleLineTextField} />
    </Create>
  );
};

function useActions() {
  const history = useHistory();
  const tag = useRef<Tag>();

  const actions: ActionData[] = [
    {
      actionId: 'proceed',
      label: 'Proceed',
    },
  ];

  const actionSelectedHandler = (action: string): void => {
    switch (action) {
      case 'proceed':
        if (tag.current) {
          history.push(`/accessManagement/userRoleTags/${tag.current?.id}`);
        } else {
          console.log('Please enter tag details to proceed');
        }
        break;
    }
  };
  return {
    actions,
    actionSelectedHandler,
    tag,
  } as const;
}

export const UserRoleTagCreateCrumb: BreadcrumbResolver = () => 'Create';
