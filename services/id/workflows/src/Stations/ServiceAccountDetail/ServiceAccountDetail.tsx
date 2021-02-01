import React, { useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  ActionData,
  DetailsProps,
  Details,
  ReadOnlyField,
  SingleLineTextField,
  Nullable,
} from '@ax/cms-ui';
import { FormikValues, Field } from 'formik';
import * as Yup from 'yup';
import classes from './ServiceAccountDetail.module.scss';
import {
  UpdateServiceAccountMutationVariables,
  useServiceAccountQuery,
  useUpdateServiceAccountMutation,
  useDeleteServiceAccountMutation,
} from '../../generated/graphql';
import { client } from '../../apolloClient';
import gql from 'graphql-tag';
import { BreadcrumbResolver } from 'frontend-host';

const serviceAccountDetailSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .max(100),
});

type FormData = Nullable<
  UpdateServiceAccountMutationVariables['input']['patch']
>;

export const ServiceAccountDetail: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();

  // Query service account data
  const { loading, data, error } = useServiceAccountQuery({
    client,
    variables: { id },
    fetchPolicy: 'no-cache',
  });

  const [updateServiceAccount] = useUpdateServiceAccountMutation({
    client,
    fetchPolicy: 'no-cache',
  });

  const { actions, actionSelectedHandler } = useActions(id);

  const onSubmit = useCallback(
    async (
      formData: FormikValues,
      initialData: DetailsProps<any>['initialData'],
    ): Promise<any> => {
      if (initialData.loading) {
        return;
      }

      try {
        await updateServiceAccount({
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
    [updateServiceAccount, id],
  );

  return (
    <Details<FormData>
      defaultTitle={data?.serviceAccount?.name}
      subtitle={'Service Account Details'}
      alwaysShowActionsPanel={true}
      actions={actions}
      onActionSelected={actionSelectedHandler}
      validationSchema={serviceAccountDetailSchema}
      initialData={{
        data: data?.serviceAccount || {},
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
      <Field name="clientId" label="Client ID" as={ReadOnlyField} />
      <Field name="tenantId" label="Tenant ID" as={ReadOnlyField} />
      <Field name="applicationId" label="Application ID" as={ReadOnlyField} />
      <Field name="id" label="Service Account ID" as={ReadOnlyField} />
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

  const [deleteServiceAccountMutation] = useDeleteServiceAccountMutation({
    client,
    fetchPolicy: 'no-cache',
  });

  const actions: ActionData[] = [
    {
      actionId: 'permissions',
      label: 'Permissions',
    },
    {
      actionId: 'generateNewClientSecret',
      label: 'Generate New Client Secret',
    },
    {
      actionId: 'delete',
      label: 'Delete',
      confirmationRequired: true,
    },
  ];

  const actionSelectedHandler = (action: string): void => {
    const showPermissions = (): void => {
      // TODO: navigate to service account permissions
    };

    const generateNewClientSecret = (): void => {
      history.push(
        `/accessManagement/serviceAccounts/${id}/generateNewClientSecret`,
      );
    };

    const deleteServiceAccount = async (): Promise<void> => {
      try {
        await deleteServiceAccountMutation({ variables: { input: { id } } });
        history.push(`/accessManagement/serviceAccounts`);
      } catch (error) {
        // TODO: Some proper error handling
        console.log(error);
      }
    };

    switch (action) {
      case 'permissions':
        showPermissions();
        break;
      case 'generateNewClientSecret':
        generateNewClientSecret();
        break;
      case 'delete':
        deleteServiceAccount();
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

const GET_SERVICE_ACCOUNT_NAME = gql`
  query ServiceAccountName($id: UUID!) {
    serviceAccount(id: $id) {
      name
    }
  }
`;

export const ServiceAccountDetailCrumb: BreadcrumbResolver = params => {
  return async (): Promise<string> => {
    const response = await client.query({
      query: GET_SERVICE_ACCOUNT_NAME,
      variables: {
        id: params['id'],
      },
    });
    return response.data.serviceAccount.name as string;
  };
};
