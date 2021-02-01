import React, { useCallback, useRef } from 'react';
import {
  Create,
  SingleLineTextField,
  SelectField,
  Nullable,
  ActionData,
} from '@ax/cms-ui';
import { FormikValues, Field } from 'formik';
import { ExecutionResult } from 'graphql';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { BreadcrumbResolver } from 'frontend-host';
import {
  UserStatus,
  CreateUserMutationVariables,
  useCreateUserMutation,
  CreateUserMutation,
} from '../../generated/graphql';
import { User } from '@ax/id-link';
import { client } from '../../apolloClient';

const userCreateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .max(255),
  email: Yup.string()
    .required('Email is a required field')
    .email('Email must be a valid email')
    .max(255),
  status: Yup.mixed().oneOf([UserStatus.Active, UserStatus.Blocked]),
});

type FormData = Nullable<CreateUserMutationVariables['input']['user']>;

const initialFormValues: FormData = {
  name: 'Pre Registered User',
  email: '',
  status: UserStatus.Active,
};

export const UserCreate: React.FC = () => {
  const [userCreate] = useCreateUserMutation({
    client: client,
    fetchPolicy: 'no-cache',
  });

  const { actions, actionSelectedHandler, user } = useActions();

  const saveData = useCallback(
    async (
      formData: FormikValues,
      initialData,
      { setSubmitting },
    ): Promise<ExecutionResult<CreateUserMutation>> => {
      setSubmitting(true);
      let response: ExecutionResult<CreateUserMutation>;
      try {
        response = await userCreate({
          variables: {
            input: {
              user: {
                name: formData.name,
                email: formData.email,
                status: formData.status,
              },
            },
          },
        });
        user.current = response.data?.createUser?.user as User;
        return response;
      } catch (error) {
        // TODO: Proper error handling using setStatus or setErrors()
        // https://stackoverflow.com/questions/52986962/how-to-properly-use-formiks-seterror-method-react-library
        throw error;
      }
    },
    [user, userCreate],
  );

  return (
    <Create<FormData>
      title="Create User"
      subtitle="Users"
      validationSchema={userCreateSchema}
      saveData={saveData}
      actions={actions}
      onActionSelected={actionSelectedHandler}
      initialData={{
        data: initialFormValues,
        loading: false,
      }}
    >
      <Field name="name" label="Name" as={SingleLineTextField} />
      <Field name="email" label="Email" as={SingleLineTextField} />
      <Field
        name="status"
        label="Status"
        options={[
          { value: UserStatus.Active, label: 'Active' },
          { value: UserStatus.Blocked, label: 'Blocked' },
        ]}
        as={SelectField}
      />
    </Create>
  );
};

function useActions() {
  const history = useHistory();
  const user = useRef<User>();

  const actions: ActionData[] = [
    {
      actionId: 'proceed',
      label: 'Proceed',
    },
  ];

  const actionSelectedHandler = (action: string): void => {
    switch (action) {
      case 'proceed':
        if (user.current) {
          history.push(`/accessManagement/users/${user.current?.id}`);
        } else {
          console.log('Please enter user details to proceed');
        }
        break;
    }
  };
  return {
    actions,
    actionSelectedHandler,
    user,
  } as const;
}

export const UserCreateCrumb: BreadcrumbResolver = () => 'Create';
