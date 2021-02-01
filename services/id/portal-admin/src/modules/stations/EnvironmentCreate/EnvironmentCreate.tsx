import React from 'react';
import {
  Create,
  SingleLineTextField,
  CustomTagsField,
  ActionData,
} from '@ax/cms-ui';
import { Field, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useCallback, useRef } from 'react';
import { ExecutionResult } from 'graphql';
import {
  CreateApplicationMutation,
  useCreateApplicationMutation,
  Application,
} from '../../../generated/graphql';
import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useAppStateIDS } from 'AppStateIDS';

const initialFormValues = {
  interimAdministratorEmail: '',
  name: '',
  allowedOrigins: [] as string[],
};

export const environmentCreateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .max(255),
  interimAdministratorEmail: Yup.string()
    .required('Administrator Email is a required field')
    .email('Administrator Email must be a valid email')
    .max(255),
  // Yup.url() is incapable of validating localhost urls
  allowedOrigins: Yup.array().of(
    Yup.string()
      .max(255)
      .matches(/^https?:\/\//, 'Allowed Origins must include only valid URLs'),
  ),
});

export const EnvironmentCreate: React.FC = () => {
  useSetBreadcrumb();
  const apolloClient = useApolloClient();
  const [environmentCreate] = useCreateApplicationMutation({
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });

  const { actions, actionSelectedHandler, application } = useActions();

  const saveData = useCallback(
    async (
      formData: FormikValues,
      initialData,
      { setSubmitting },
    ): Promise<ExecutionResult<CreateApplicationMutation>> => {
      setSubmitting(true);
      let response: ExecutionResult<CreateApplicationMutation>;
      try {
        response = await environmentCreate({
          variables: {
            input: {
              application: {
                interimAdministratorEmail: formData.interimAdministratorEmail,
                name: formData.name,
                allowedOrigins: formData.allowedOrigins,
              },
            },
          },
        });
        application.current = response.data?.createApplication
          ?.application as Application;
        return response;
      } catch (error) {
        // TODO: Implement proper error handling
        console.error('failed to submit form', error);
        throw error;
      }
    },
    [application, environmentCreate],
  );

  return (
    <Create
      title="Create Environment"
      subtitle="Environments"
      validationSchema={environmentCreateSchema}
      saveData={saveData}
      actions={actions}
      onActionSelected={actionSelectedHandler}
      initialData={{
        data: initialFormValues,
        loading: false,
      }}
    >
      <Field name="name" label="Name" as={SingleLineTextField} />
      <Field
        name="interimAdministratorEmail"
        label="Adminstrator Email"
        as={SingleLineTextField}
      />
      <Field
        name="allowedOrigins"
        label="Allowed Origins"
        as={CustomTagsField}
        displayAsRows={true}
      />
    </Create>
  );
};

function useActions() {
  const history = useHistory();
  const application = useRef<Application>();

  const actions: ActionData[] = [
    {
      actionId: 'proceed',
      label: 'Proceed',
    },
  ];

  const actionSelectedHandler = (action: string): void => {
    switch (action) {
      case 'proceed':
        if (application.current) {
          history.push(
            `/env/${application.current.id}/${application.current.name}`,
          );
        } else {
          console.log('create an application before proceed');
        }
        break;
    }
  };

  return {
    actions,
    actionSelectedHandler,
    application,
  } as const;
}

function useSetBreadcrumb() {
  const { updateAppStateIDS } = useAppStateIDS();
  React.useEffect(() => {
    updateAppStateIDS({
      breadcrumbs: [
        {
          label: 'Environments',
          url: '/env',
          params: [],
        },
        { label: 'Create', url: '/env/create', params: [] },
      ],
    });
  }, [updateAppStateIDS]);
}
