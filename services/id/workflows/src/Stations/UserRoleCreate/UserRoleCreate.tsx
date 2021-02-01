import React, { useCallback, useRef } from 'react';
import { Create, Nullable, SingleLineTextField, ActionData } from '@ax/cms-ui';
import { FormikValues, Field } from 'formik';
import { ExecutionResult } from 'graphql';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import {
  CreateUserRoleMutationVariables,
  useCreateUserRoleMutation,
  CreateUserRoleMutation,
  UserRole,
} from '../../generated/graphql';
import { BreadcrumbResolver } from 'frontend-host';
import { client } from '../../apolloClient';

const userRoleCreateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .max(200),
  description: Yup.string()
    .required('Description is a required field')
    .max(2000),
});

type FormData = Nullable<CreateUserRoleMutationVariables['input']['userRole']>;

const initialFormValues: FormData = {
  name: '',
  description: '',
};

export const UserRoleCreate: React.FC = () => {
  const [userRoleCreate] = useCreateUserRoleMutation({
    client,
    fetchPolicy: 'no-cache',
  });

  const { actions, actionSelectedHandler, userRole } = useActions();

  const saveData = useCallback(
    async (
      formData: FormikValues,
      initialData,
      { setSubmitting },
    ): Promise<ExecutionResult<CreateUserRoleMutation>> => {
      setSubmitting(true);
      let response: ExecutionResult<CreateUserRoleMutation>;
      try {
        response = await userRoleCreate({
          variables: {
            input: {
              userRole: {
                name: formData.name,
                description: formData.description,
              },
            },
          },
        });
        userRole.current = response.data?.createUserRole?.userRole as UserRole;
        return response;
      } catch (error) {
        // TODO: Proper error handling using setStatus or setErrors()
        // https://stackoverflow.com/questions/52986962/how-to-properly-use-formiks-seterror-method-react-library
        throw error;
      }
    },
    [userRole, userRoleCreate],
  );

  return (
    <Create<FormData>
      title="Create User Role"
      subtitle="User Roles"
      validationSchema={userRoleCreateSchema}
      saveData={saveData}
      actions={actions}
      onActionSelected={actionSelectedHandler}
      initialData={{
        data: initialFormValues,
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
  const userRole = useRef<UserRole>();

  const actions: ActionData[] = [
    {
      actionId: 'proceed',
      label: 'Proceed',
    },
  ];

  const actionSelectedHandler = (action: string): void => {
    switch (action) {
      case 'proceed':
        if (userRole.current) {
          history.push(`/accessManagement/userRoles/${userRole.current?.id}`);
        } else {
          console.log('Please enter user role details to proceed');
        }
        break;
    }
  };
  return {
    actions,
    actionSelectedHandler,
    userRole,
  } as const;
}

export const UserRoleCreateCrumb: BreadcrumbResolver = () => 'Create';
