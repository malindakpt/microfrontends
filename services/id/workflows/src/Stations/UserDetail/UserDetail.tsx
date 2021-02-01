import React, { useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Details,
  ActionData,
  DetailsProps,
  ReadOnlyField,
  SelectField,
  Nullable,
} from '@ax/cms-ui';
import {
  useUserQuery,
  UserStatus,
  useDeleteUserMutation,
  useUpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../generated/graphql';
import { FormikValues, Field } from 'formik';
import classes from './UserDetail.module.scss';
import * as Yup from 'yup';
import { client } from '../../apolloClient';
import gql from 'graphql-tag';
import { BreadcrumbResolver } from 'frontend-host';

type FormData = Nullable<UpdateUserMutationVariables['input']['patch']>;

const userDetailSchema = Yup.object().shape<FormData>({
  status: Yup.mixed().oneOf([UserStatus.Active, UserStatus.Blocked]),
});

export const UserDetail: React.FC = () => {
  const { userId } = useParams<{
    userId: string;
  }>();

  // Query user data
  const { loading, data, error } = useUserQuery({
    client,
    variables: { id: userId },
    fetchPolicy: 'no-cache',
  });

  const [updateUser] = useUpdateUserMutation({
    client,
    fetchPolicy: 'no-cache',
  });

  const { actions, actionSelectedHandler } = useActions(userId);

  const onSubmit = useCallback(
    async (
      formData: FormikValues,
      initialData: DetailsProps<any>['initialData'],
    ): Promise<any> => {
      if (initialData.loading) {
        return;
      }

      try {
        await updateUser({
          variables: {
            input: {
              id: userId,
              patch: createUpdateDto(formData, initialData.data, userId),
            },
          },
        });
      } catch (error) {
        // TODO: Proper error handling using setStatus or setErrors()
        // https://stackoverflow.com/questions/52986962/how-to-properly-use-formiks-seterror-method-react-library
        throw error;
      }
    },
    [updateUser, userId],
  );

  return (
    <Details<FormData>
      defaultTitle={data?.user?.name}
      subtitle={'User Details'}
      alwaysShowActionsPanel={true}
      actions={actions}
      onActionSelected={actionSelectedHandler}
      validationSchema={userDetailSchema}
      initialData={{
        data: data?.user || {},
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
      <Field name="name" label="Name" as={ReadOnlyField} />
      <Field name="email" label="Email" as={ReadOnlyField} />
      <Field // TODO: Replace this with BooleanViewField once that is merged into cms-ui
        name="status"
        label="Status"
        options={[
          { value: UserStatus.Active, label: 'Active' },
          { value: UserStatus.Blocked, label: 'Blocked' },
        ]}
        as={SelectField}
      />
      <Field name="tenantId" label="Tenant ID" as={ReadOnlyField} />
      <Field name="applicationId" label="Application ID" as={ReadOnlyField} />
      <Field name="id" label="User ID" as={ReadOnlyField} />
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
          <Field name="createdAt" label="Created At" as={ReadOnlyField} />{' '}
          {/*TODO: Replace with DateTimeField once that is merged into cms-ui*/}
          <Field name="updatedAt" label="Updated At" as={ReadOnlyField} />{' '}
          {/*TODO: Replace with DateTimeField once that is merged into cms-ui*/}
          <Field name="createdBy" label="Created By" as={ReadOnlyField} />
          <Field name="updatedBy" label="Updated By" as={ReadOnlyField} />
        </div>
      )}
    </>
  );
};

function useActions(id: string) {
  const history = useHistory();

  const [deleteUserMutation] = useDeleteUserMutation({
    client,
    fetchPolicy: 'no-cache',
  });

  const actions: ActionData[] = [
    {
      actionId: 'roleAssignments',
      label: 'User Role Assignments',
    },
    {
      actionId: 'delete',
      label: 'Delete',
      confirmationRequired: true,
    },
  ];

  const actionSelectedHandler = (action: string): void => {
    const showRoleAssignments = (): void => {
      // TODO: navigate to user role assignments
    };

    const deleteUser = async (): Promise<void> => {
      try {
        await deleteUserMutation({ variables: { input: { id } } });
        history.push(`/accessManagement/users`);
      } catch (error) {
        // TODO: Some proper error handling
        console.log(error);
      }
    };

    switch (action) {
      case 'roleAssignments':
        showRoleAssignments();
        break;
      case 'delete':
        deleteUser();
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

const GET_USERNAME = gql`
  query UserName($id: UUID!) {
    user(id: $id) {
      name
    }
  }
`;

export const UserDetailsCrumb: BreadcrumbResolver = params => {
  return async (): Promise<string> => {
    const response = await client.query({
      query: GET_USERNAME,
      variables: {
        id: params['userId'],
      },
    });
    return response.data.user.name as string;
  };
};
