import React from 'react';
import {
  Details,
  SingleLineTextField,
  ReadOnlyField,
  CustomTagsField,
  ActionData,
  BooleanViewField,
  DateTimeField,
} from '@ax/cms-ui';
import { useEffect, useCallback, useState } from 'react';
import { Field, FormikValues } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
import {
  useApplicationQuery,
  useUpdateApplicationMutation,
  Application,
} from '../../../generated/graphql';
import { useApolloClient } from '@apollo/react-hooks';
import { environmentCreateSchema } from '../EnvironmentCreate/EnvironmentCreate';
import classes from './EnvironmentDetail.module.scss';
import { useAppStateIDS } from 'AppStateIDS';

export const EnvironmentDetail: React.FC = () => {
  const apolloClient = useApolloClient();
  const { envId, envName } = useParams<{
    envId: string;
    envName: string;
    action: string;
  }>();

  useSetBreadcrumb(envId, envName);
  const { loading, data, error } = useApplicationQuery({
    client: apolloClient,
    variables: { id: envId },
    fetchPolicy: 'no-cache',
  });

  const [updateApplication] = useUpdateApplicationMutation({
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });

  const { actions, actionSelectedHandler, updatedData } = useActions(
    envId,
    envName,
    data?.application?.enabled || false,
  );

  if (data?.application && updatedData) {
    Object.assign(data?.application, updatedData);
  }

  const onSubmit = useCallback(
    async (formData: FormikValues, initialData): Promise<any> => {
      if (initialData.loading) {
        return;
      }

      try {
        await updateApplication({
          variables: {
            input: {
              id: envId,
              patch: createUpdateDto(formData, initialData.data, envId),
            },
          },
        });
      } catch (error) {
        // TODO: Implement proper error handling
        console.error(error);
      }
    },
    [updateApplication, envId],
  );

  return (
    <Details
      defaultTitle={envName}
      subtitle={'Environment Details'}
      alwaysShowActionsPanel={true}
      actions={actions}
      onActionSelected={actionSelectedHandler}
      validationSchema={environmentCreateSchema}
      initialData={{
        data: data?.application || {},
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
      <Field
        name="enabled"
        label="Status"
        as={BooleanViewField}
        trueLabel={'Enabled'}
        falseLabel={'Disabled'}
      />
      <Field name="tenantId" label="Tenant ID" as={ReadOnlyField} />
      <Field name="id" label="Environment ID" as={ReadOnlyField} />
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
          <Field name="createdAt" label="Created At" as={DateTimeField} />
          <Field name="updatedAt" label="Updated At" as={DateTimeField} />
          <Field name="createdBy" label="Created By" as={ReadOnlyField} />
          <Field name="updatedBy" label="Updated By" as={ReadOnlyField} />
        </div>
      )}
    </>
  );
};

function useActions(id: string, envName: string, isEnabled: boolean) {
  const apolloClient = useApolloClient();
  const history = useHistory();
  const [updateApplication] = useUpdateApplicationMutation({
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });
  const [updatedData, setUpdatedData] = useState<Application>();

  const actions: ActionData[] = [
    {
      actionId: 'idProviders',
      label: 'Identity Providers',
    },
    {
      actionId: 'delete',
      label: 'Delete',
    },
  ];

  const statusAction = updatedData ? updatedData.enabled : isEnabled;
  if (statusAction) {
    actions.push({
      actionId: 'disable',
      label: 'Disable Environment',
      confirmationRequired: true,
    });
  } else {
    actions.push({
      actionId: 'enable',
      label: 'Enable Environment',
      confirmationRequired: true,
    });
  }

  const actionSelectedHandler = (action: string): void => {
    const onDeleteEnvronment = async (): Promise<void> => {
      console.log(history.location);
      history.push(`/env/${id}/${envName}/delete`);
    };

    const changeStatusOfEnvronment = async (status: boolean): Promise<void> => {
      try {
        const result = await updateApplication({
          variables: {
            input: {
              id,
              patch: { enabled: status },
            },
          },
        });

        setUpdatedData(
          result.data?.updateApplication?.application as Application,
        );
      } catch (error) {
        // TODO: Implement proper error handling
        console.error(error);
      }
    };

    const navigateToIdProviders = () => {
      history.push(`/env/${id}/${envName}/identityProviders`);
    };

    switch (action) {
      case 'delete':
        onDeleteEnvronment();
        break;
      case 'enable':
        changeStatusOfEnvronment(true);
        break;
      case 'disable':
        changeStatusOfEnvronment(false);
        break;
      case 'idProviders':
        navigateToIdProviders();
        break;
    }
  };
  return { actions, actionSelectedHandler, updatedData } as const;
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

function useSetBreadcrumb(envId: string, envName: string) {
  const { updateAppStateIDS } = useAppStateIDS();
  useEffect(() => {
    updateAppStateIDS({
      breadcrumbs: [
        {
          label: 'Environments',
          url: '/env',
          params: [],
        },
        { label: `${envName}`, url: `/env/${envId}/${envName}`, params: [] },
      ],
    });
  }, [envId, envName, updateAppStateIDS]);
}
