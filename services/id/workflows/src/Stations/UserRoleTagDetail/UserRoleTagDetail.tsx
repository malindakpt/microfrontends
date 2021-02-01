import React, { useCallback, useState } from 'react';
import {
  ActionData,
  DetailsProps,
  SingleLineTextField,
  ReadOnlyField,
  Details,
  Nullable,
} from '@ax/cms-ui';
import { useParams, useHistory } from 'react-router-dom';
import { FormikValues, Field } from 'formik';
import * as Yup from 'yup';
import classes from './UserRoleTagDetail.module.scss';
import {
  UpdateTagMutationVariables,
  useTagQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} from '../../generated/graphql';
import { client } from '../../apolloClient';
import gql from 'graphql-tag';
import { BreadcrumbResolver } from 'frontend-host';

const tagDetailSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .max(100),
  description: Yup.string()
    .required('Description is a required field')
    .max(2000),
});

type FormData = Nullable<UpdateTagMutationVariables['input']['patch']>;

export const UserRoleTagDetail: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();

  // Query tag data
  const { loading, data, error } = useTagQuery({
    client,
    variables: { id },
    fetchPolicy: 'no-cache',
  });

  const [updateTag] = useUpdateTagMutation({
    client,
    fetchPolicy: 'no-cache',
  });

  const { actions, actionSelectedHandler } = useActions(id);

  const onSubmit = useCallback(
    async (
      formData: FormikValues,
      initialData: DetailsProps<any>['initialData'],
    ): Promise<void> => {
      if (initialData.loading) {
        return;
      }

      try {
        await updateTag({
          variables: {
            input: {
              id,
              patch: createUpdateDto(formData, initialData.data, id),
            },
          },
        });
      } catch (error) {
        // TODO: Proper error handling using setStatus or setErrors()
        // https://stackoverflow.com/questions/52986962/how-to-properly-use-formiks-seterror-method-react-library
        throw error;
      }
    },
    [updateTag, id],
  );

  return (
    <Details<FormData>
      defaultTitle={data?.tag?.name}
      subtitle={'User Role Tag Details'}
      alwaysShowActionsPanel={true}
      actions={actions}
      onActionSelected={actionSelectedHandler}
      validationSchema={tagDetailSchema}
      initialData={{
        data: data?.tag || {},
        loading,
        error: error?.message,
      }}
      saveData={onSubmit}
    >
      <Form />
    </Details>
  );
};

const Form: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);
  const toggleHistory = () => {
    setShowHistory(prev => !prev);
  };

  return (
    <>
      <Field name="name" label="Name" as={SingleLineTextField} />
      <Field name="description" label="Description" as={SingleLineTextField} />
      <Field name="tenantId" label="Tenant ID" as={ReadOnlyField} />
      <Field name="applicationId" label="Application ID" as={ReadOnlyField} />
      <Field name="id" label="User Role Tag ID" as={ReadOnlyField} />
      <div className={classes.history} onClick={toggleHistory}>
        <svg viewBox="0 0 100 100" className={classes.historyIcon}>
          <rect width="100" height="100" strokeWidth="5" />
          <line x1="10" y1="50" x2="90" y2="50" strokeWidth="5" />
          <line x1="50" y1="10" x2="50" y2="90" strokeWidth="5" />
        </svg>
        History
      </div>
      {showHistory && (
        <div>
          <Field name="createdAt" label="Created At" as={ReadOnlyField} />
          <Field name="updatedAt" label="Updated At" as={ReadOnlyField} />
          <Field name="createdBy" label="Created By" as={ReadOnlyField} />
          <Field name="updatedBy" label="Updated By" as={ReadOnlyField} />
        </div>
      )}
    </>
  );
};

function useActions(id: string) {
  const history = useHistory();

  const [deleteTagMutation] = useDeleteTagMutation({
    client,
    fetchPolicy: 'no-cache',
  });

  const actions: ActionData[] = [
    {
      actionId: 'delete',
      label: 'Delete',
      confirmationRequired: true,
    },
  ];

  const actionSelectedHandler = (action: string): void => {
    const deleteTag = async (): Promise<void> => {
      try {
        await deleteTagMutation({ variables: { input: { id } } });
        history.push(`/accessManagement/userRoleTags`);
      } catch (error) {
        // TODO: Some proper error handling
        console.log(error);
      }
    };

    switch (action) {
      case 'delete':
        deleteTag();
        break;
    }
  };
  return { actions, actionSelectedHandler } as const;
}

function createUpdateDto(
  currentValues: FormikValues,
  initialValues: FormikValues | undefined,
  id: string,
): any {
  const updateData = initialValues
    ? Object.keys(currentValues).reduce<{
        [key: string]: any;
      }>(
        (previous, current) => {
          if (currentValues[current] !== initialValues[current]) {
            previous[current] = currentValues[current];
          }
          return previous;
        },
        { id },
      )
    : currentValues;
  delete updateData['id'];
  return updateData;
}

const GET_USER_ROLE_TAG_DETAIL = gql`
  query UserRoleName($id: UUID!) {
    tag(id: $id) {
      name
    }
  }
`;

export const UserRoleTagDetailCrumb: BreadcrumbResolver = params => {
  return async (): Promise<string> => {
    const response = await client.query({
      query: GET_USER_ROLE_TAG_DETAIL,
      variables: {
        id: params['id'],
      },
    });
    return response.data.tag.name as string;
  };
};
