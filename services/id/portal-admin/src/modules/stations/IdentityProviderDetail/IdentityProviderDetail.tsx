import React from 'react';
import { useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import * as Yup from 'yup';
import {
  useIdpConfigurationsQuery,
  IdentityProvider,
  useUpdateIdpConfigurationMutation,
  useDeleteIdpConfigurationMutation,
  useCreateIdpConfigurationMutation,
  IdpConfiguration,
} from '../../../generated/graphql';
import { Field, FormikValues } from 'formik';
import {
  SingleLineTextField,
  ReadOnlyField,
  TagsField,
  ActionData,
  BooleanViewField,
  DateTimeField,
  FormStation,
} from '@ax/cms-ui';
import { useCallback, useEffect, useState } from 'react';
import classes from './IdentityProviderDetail.module.scss';
import { useNavigateBack } from 'hooks/useNavigateBack/useNavigateBack';
import { useAppStateIDS } from 'AppStateIDS';

export const environmentCreateSchema = Yup.object().shape({
  discoveryDocumentUrl: Yup.string()
    .required('Discovery Document URL is a required field')
    .max(255)
    .matches(/^https?:\/\//, 'Discovery Document URL must be a valid URL'),
  clientId: Yup.string()
    .required('Client ID is a required field')
    .max(255),
  clientSecret: Yup.string()
    .required("Client's secret is a required field")
    .max(255),
  scopes: Yup.array()
    .min(1, 'Scopes must include atleast 1 scope')
    .of(Yup.string().max(255)),
});

export const IdentityProviderDetails: React.FC = () => {
  const { envId, envName, idpId } = useParams<{
    envId: string;
    envName: string;
    idpId: IdentityProvider;
  }>();
  useSetBreadcrumb(envId, envName, idpId);
  const apolloClient = useApolloClient();

  const { loading, data, error } = useIdpConfigurationsQuery({
    client: apolloClient,
    variables: {
      idpConfigurationCondition: {
        applicationId: envId,
        idpId: idpId as IdentityProvider,
      },
      idpScopeFilter: {
        idpId: {
          equalTo: idpId as IdentityProvider,
        },
      },
    },
    fetchPolicy: 'no-cache',
  });
  const [updateIdpConfig] = useUpdateIdpConfigurationMutation({
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });
  const [createIdpConfig] = useCreateIdpConfigurationMutation({
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });

  const initialData = data?.configurations?.nodes[0];
  let detailObj = initialData || {
    idpId: idpId,
    applicationId: envId,
    discoveryDocumentUrl: '',
    clientId: '',
    clientSecret: '',
    scopes: [],
  };

  const { actions, actionSelectedHandler, updatedData } = useActions(
    detailObj as IdpConfiguration,
  );

  // If any updated data is available, merge them to initial detailObj
  detailObj = { ...detailObj, ...updatedData };

  const scopeArr: string[] = [];
  const requiredScopeArr: string[] = [];

  // Fill the requiredScopes and scopes string arrays with the values of scope objects
  data?.scopes?.nodes?.forEach(scope => {
    if (scope) {
      scopeArr.push(scope.scopeName);
      if (scope.required) {
        requiredScopeArr.push(scope.scopeName);
      }
    }
  });

  // If first time, set the required scopes as the scopes of the detailObj
  detailObj.scopes =
    detailObj.scopes.length > 0 ? detailObj.scopes : requiredScopeArr;

  const onSubmit = useCallback(
    async (formData: FormikValues, initialData): Promise<void> => {
      if (initialData.loading) {
        return;
      }

      try {
        if (initialData.data?.id) {
          await updateIdpConfig({
            variables: {
              input: {
                id: initialData.data?.id,
                patch: createUpdateDto(
                  formData,
                  initialData.data,
                  initialData.data.applicationId,
                ),
              },
            },
          });
        } else {
          await createIdpConfig({
            variables: {
              input: {
                idpConfiguration: {
                  applicationId: initialData.data?.applicationId,
                  idpId: initialData.data?.idpId as IdentityProvider,
                  discoveryDocumentUrl: formData.discoveryDocumentUrl,
                  clientId: formData.clientId,
                  clientSecret: formData.clientSecret,
                  scopes: formData.scopes,
                },
              },
            },
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [createIdpConfig, updateIdpConfig],
  );

  return (
    <FormStation
      canCancel={false}
      defaultTitle={idpId}
      subtitle="Configurations"
      actions={initialData === undefined ? [] : actions}
      onActionSelected={actionSelectedHandler}
      validationSchema={environmentCreateSchema}
      initialData={{
        data: detailObj,
        loading,
        error: error?.message,
      }}
      saveData={onSubmit}
    >
      <Form
        isNew={initialData === undefined}
        scopeArr={scopeArr}
        requiredScopeArr={requiredScopeArr}
      />
    </FormStation>
  );
};

const Form: React.FC<{
  isNew: boolean;
  scopeArr: string[];
  requiredScopeArr: string[];
}> = ({ isNew, scopeArr, requiredScopeArr }) => {
  const [showHistory, setShowHistory] = useState(false);
  const toggleHistory = (): void => {
    setShowHistory(prev => !prev);
  };

  return (
    <>
      <Field
        name="discoveryDocumentUrl"
        label="Discovery Document URL"
        autoComplete="off"
        as={SingleLineTextField}
      />
      <Field
        name="clientId"
        label="Client ID"
        autoComplete="off"
        as={SingleLineTextField}
      />
      <Field
        name="clientSecret"
        label="Client's Secret"
        type="password"
        autoComplete="new-password"
        as={SingleLineTextField}
      />
      {scopeArr && (
        <Field
          name="scopes"
          label="Scopes"
          tagsOptions={scopeArr}
          requiredOptions={requiredScopeArr}
          as={TagsField}
        />
      )}
      {!isNew && (
        <>
          <Field name="enabled" label="Status" as={BooleanViewField} />
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
      )}
    </>
  );
};

function useActions(idp: IdpConfiguration) {
  const apolloClient = useApolloClient();

  const [idpDelete] = useDeleteIdpConfigurationMutation({
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });
  const [updateIdp] = useUpdateIdpConfigurationMutation({
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });
  const [updatedData, setUpdatedData] = useState<IdpConfiguration>();

  const actions: ActionData[] = [
    {
      actionId: 'delete',
      label: 'Delete',
      confirmationRequired: true,
    },
  ];

  const statusAction = updatedData ? updatedData?.enabled : idp?.enabled;
  if (statusAction) {
    actions.push({
      actionId: 'disable',
      label: 'Disable Provider',
      confirmationRequired: true,
    });
  } else {
    actions.push({
      actionId: 'enable',
      label: 'Enable Provider',
      confirmationRequired: true,
    });
  }

  const { navigateBack } = useNavigateBack();

  const actionSelectedHandler = (action: string): void => {
    const deleteEnvronment = async (): Promise<void> => {
      try {
        await idpDelete({ variables: { input: { id: idp.id } } });

        navigateBack();
      } catch (error) {
        // TODO: Implement proper error handling
        console.error(error);
      }
    };
    const changeStatusOfIdp = async (status: boolean): Promise<void> => {
      try {
        const result = await updateIdp({
          variables: {
            input: {
              id: idp.id,
              patch: { enabled: status },
            },
          },
        });

        setUpdatedData(
          result.data?.updateIdpConfiguration
            ?.idpConfiguration as IdpConfiguration,
        );
      } catch (error) {
        // TODO: Implement proper error handling
        console.error(error);
      }
    };

    switch (action) {
      case 'delete':
        deleteEnvronment();
        break;
      case 'enable':
        changeStatusOfIdp(true);
        break;
      case 'disable':
        changeStatusOfIdp(false);
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

function useSetBreadcrumb(envId: string, envName: string, idpId: string) {
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
        {
          label: `Identity Providers`,
          url: `/env/${envId}/${envName}/identityProviders`,
          params: [],
        },
        {
          label: `${idpId}`,
          url: `/env/${envId}/${envName}/identityProviders/${idpId}`,
          params: [],
        },
      ],
    });
  }, [envId, envName, idpId, updateAppStateIDS]);
}
