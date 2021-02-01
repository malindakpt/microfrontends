import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  useGenerateServiceAccountSecretMutation,
  useServiceAccountNameQuery,
} from '../../generated/graphql';
import { Alert } from '../../components/Alert/Alert';
import { AlertAction } from '../../components/Alert/AlertAction.model';
import { client } from '../../apolloClient';
import { BreadcrumbResolver } from 'frontend-host';

export const ServiceAccountNewClientSecret: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { data } = useServiceAccountNameQuery({
    client,
    variables: {
      id,
    },
  });

  const [
    generateServiceAccountSecret,
  ] = useGenerateServiceAccountSecretMutation({
    client,
    fetchPolicy: 'no-cache',
  });

  // Generate new client secret for the service account
  const [clientSecret, setClientSecret] = useState<string>();
  useEffect(() => {
    const fetchNewClientSecret = async () => {
      try {
        const response = await generateServiceAccountSecret({
          variables: {
            input: {
              id,
            },
          },
        });
        setClientSecret(
          response.data?.generateServiceAccountSecret?.clientSecret,
        );
      } catch (error) {
        // TODO: Proper error handling using setStatus or setErrors()
        // https://stackoverflow.com/questions/52986962/how-to-properly-use-formiks-seterror-method-react-library
        throw error;
      }
    };
    fetchNewClientSecret();
  }, [id, generateServiceAccountSecret]);

  const { actions, actionSelectedHandler } = useActions(id);
  const message =
    'Please copy the client secret displayed below and store it in a secure location, and press OK to close the dialog. Once this dialog is closed, this value will not be retrievable again and can only be replaced by a new client secret.';

  return (
    <Alert
      title={data?.serviceAccount?.name}
      subtitle={'Service Account Details'}
      message={message}
      actions={actions}
      onActionSelected={actionSelectedHandler}
    >
      <ClientSecret secret={clientSecret}></ClientSecret>
    </Alert>
  );
};

const ClientSecret: React.FC<{
  secret?: string;
}> = ({ secret }) => {
  const copyClientSecret = () => {
    const element = document.getElementById('clientSecret') as HTMLInputElement;
    element.select();
    element.setSelectionRange(0, 99999);
    document.execCommand('copy');
  };

  return (
    <div>
      <input id="clientSecret" type="text" value={secret} readOnly></input>
      <button onClick={() => copyClientSecret()}>Copy</button>
    </div>
  );
};

function useActions(id: string) {
  const history = useHistory();
  const actions: AlertAction[] = [
    {
      actionId: 'ok',
      label: 'OK',
    },
  ];

  const actionSelectedHandler = (action: string): void => {
    switch (action) {
      case 'ok':
        history.push(`/accessManagement/serviceAccounts/${id}`);
        break;
    }
  };
  return {
    actions,
    actionSelectedHandler,
  } as const;
}

export const ServiceAccountNewClientSecretCrumb: BreadcrumbResolver = () =>
  'Generate New Client Secret';
