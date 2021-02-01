import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDeleteApplicationMutation } from 'generated/graphql';
import { useApolloClient } from '@apollo/react-hooks';
import { PageHeader } from '@ax/cms-ui';
import classes from './EnvironmentDelete.module.scss';
import { useNavigateBack } from 'hooks/useNavigateBack/useNavigateBack';
import { useAppStateIDS } from 'AppStateIDS';

export const EnvironmentDelete: React.FC = () => {
  const { envId, envName } = useParams<{
    envId: string;
    envName: string;
  }>();
  const apolloClient = useApolloClient();
  const [applicationDelete] = useDeleteApplicationMutation({
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });
  useSetBreadcrumb(envId, envName);
  const { navigateBack } = useNavigateBack();

  const history = useHistory();
  const deleteApp = async (): Promise<void> => {
    try {
      await applicationDelete({ variables: { input: { id: envId } } });
      history.push(`/env`);
    } catch (error) {
      // TODO: Implement proper error handling
      console.error(error);
    }
  };

  return (
    <div>
      <PageHeader
        title={'Are you sure?'}
        subtitle={`${envName} is about to delete`}
      />
      <div className={classes.container}>
        <div className={classes.message}>
          Deleting an environment will completely remove all related data
          including IDP Configurations, Users and User Roles for the
          environment. You may instead Disable the environment if you still need
          access to this information. Are you sure you want to delete this
          environment?
        </div>
        <div className={classes.buttons}>
          <input type="button" value="YES" onClick={deleteApp} />
          <input type="button" value="NO" onClick={() => navigateBack()} />
        </div>
      </div>
    </div>
  );
};

function useSetBreadcrumb(envId: string, envName: string): void {
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
        { label: `Delete`, url: `/env/${envId}/${envName}/delete`, params: [] },
      ],
    });
  }, [envId, envName, updateAppStateIDS]);
}
