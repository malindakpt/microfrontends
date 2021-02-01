import React, { useCallback, useRef } from 'react';
import { ActionData, Create, SingleLineTextField, Nullable } from '@ax/cms-ui';
import { useHistory } from 'react-router-dom';
import { FormikValues, Field } from 'formik';
import { ExecutionResult } from 'graphql';
import * as Yup from 'yup';
import {
  CreateServiceAccountMutationVariables,
  useCreateServiceAccountMutation,
  CreateServiceAccountMutation,
  ServiceAccount,
} from '../../generated/graphql';
import { BreadcrumbResolver } from 'frontend-host';
import { client } from '../../apolloClient';

const serviceAccountCreateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .max(100),
});

type FormData = Nullable<
  CreateServiceAccountMutationVariables['input']['serviceAccount']
>;

export const ServiceAccountCreate: React.FC = () => {
  const [serviceAccountCreate] = useCreateServiceAccountMutation({
    client: client,
    fetchPolicy: 'no-cache',
  });

  const { actions, actionSelectedHandler, serviceAccount } = useActions();

  const saveData = useCallback(
    async (
      formData: FormikValues,
      initialData,
      { setSubmitting },
    ): Promise<ExecutionResult<CreateServiceAccountMutation>> => {
      setSubmitting(true);
      let response: ExecutionResult<CreateServiceAccountMutation>;
      try {
        response = await serviceAccountCreate({
          variables: {
            input: {
              serviceAccount: {
                name: formData.name,
              },
            },
          },
        });
        serviceAccount.current = response.data?.createServiceAccount
          ?.serviceAccount as ServiceAccount;
        return response;
      } catch (error) {
        // TODO: Proper error handling using setStatus or setErrors()
        // https://stackoverflow.com/questions/52986962/how-to-properly-use-formiks-seterror-method-react-library
        throw error;
      }
    },
    [serviceAccount, serviceAccountCreate],
  );

  return (
    <Create<FormData>
      title="Create Service Account"
      subtitle="Service Accounts"
      validationSchema={serviceAccountCreateSchema}
      saveData={saveData}
      actions={actions}
      onActionSelected={actionSelectedHandler}
      initialData={{
        loading: false,
      }}
    >
      <Field name="name" label="Name" as={SingleLineTextField} />
    </Create>
  );
};

function useActions() {
  const history = useHistory();
  const serviceAccount = useRef<ServiceAccount>();

  const actions: ActionData[] = [
    {
      actionId: 'proceed',
      label: 'Proceed',
    },
  ];

  const actionSelectedHandler = (action: string): void => {
    switch (action) {
      case 'proceed':
        if (serviceAccount.current) {
          history.push(
            `/accessManagement/serviceAccounts/${serviceAccount.current?.id}`,
          );
        } else {
          console.log('Please enter service account details to proceed');
        }
        break;
    }
  };
  return {
    actions,
    actionSelectedHandler,
    serviceAccount,
  } as const;
}

export const ServiceAccountCreateCrumb: BreadcrumbResolver = () => 'Create';
