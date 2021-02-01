import React from 'react';
import {
  Explorer,
  Column,
  ExplorerDataProvider,
  FilterTypes,
  Data,
  SortData,
  FilterValues,
  createBooleanDotRenderer,
} from '@ax/cms-ui';
import { useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import {
  ApplicationsWithDataQuery,
  ApplicationsWithDataQueryVariables,
  ApplicationsWithDataDocument,
} from '../../../generated/graphql';
import { useHistory } from 'react-router-dom';
import { useAppStateIDS } from 'AppStateIDS';

const explorerColumns: Column[] = [
  { label: 'Name', propertyName: 'name', size: '2fr' },
  {
    label: 'Interim Administrator',
    propertyName: 'interimAdministratorEmail',
  },
  {
    label: 'Status',
    propertyName: 'enabled',
    render: createBooleanDotRenderer(),
    size: '75px',
  },
  { label: 'Created At', propertyName: 'createdAt' },
  { label: 'Updated At', propertyName: 'updatedAt' },
];

export const Environments: React.FC = () => {
  const apolloClient = useApolloClient();
  const history = useHistory();

  useUpdateBreadcrumb();

  const dataProvider: ExplorerDataProvider = {
    loadData: async (
      pagingInformation: unknown,
      sorting?: SortData,
      filters?: FilterValues,
    ) => {
      const filterName = filters?.name ?? '';
      const filterStatus =
        typeof filters?.enabled === 'boolean'
          ? [filters?.enabled]
          : [true, false];
      const filterEmail = filters?.interimAdministratorEmail ?? '';

      const result = await apolloClient.query<
        ApplicationsWithDataQuery,
        ApplicationsWithDataQueryVariables
      >({
        query: ApplicationsWithDataDocument,
        variables: {
          filter: {
            name: { includes: filterName as string },
            enabled: { in: filterStatus },
            interimAdministratorEmail: { includes: filterEmail as string },
          },
        },
        fetchPolicy: 'network-only',
      });

      const data =
        result.data.filtered?.nodes.map(env => {
          if (env) {
            env.createdAt = new Date(env.createdAt);
            env.updatedAt = new Date(env.updatedAt);
          }
          return env;
        }) ?? [];

      return {
        data,
        totalCount: result.data.nonFilterd?.totalCount ?? 0,
        hasMoreData: false,
        filteredCount: result.data.filtered?.totalCount ?? 0,
      };
    },
  };

  const handleItemClick = (item: Data): void => {
    history.push(`/env/${item.id}/${item.name}`);
  };
  const handleItemCreate = (): void => {
    history.push(`/env/create/`);
  };

  return (
    <div>
      <Explorer
        title="Environments"
        stationKey="ServicePackagesExplorer"
        columns={explorerColumns}
        dataProvider={dataProvider}
        onItemClicked={handleItemClick}
        onCreateAction={handleItemCreate}
        filterOptions={[
          {
            label: 'Name',
            property: 'name',
            type: FilterTypes.FreeText,
          },
          {
            label: 'Status',
            property: 'enabled',
            type: FilterTypes.Options,
            options: [
              {
                label: 'Enabled',
                value: true,
              },
              {
                label: 'Disabled',
                value: false,
              },
            ],
          },
          {
            label: 'Interim Administrator',
            property: 'interimAdministratorEmail',
            type: FilterTypes.FreeText,
          },
        ]}
      />
    </div>
  );
};

function useUpdateBreadcrumb(): void {
  const { updateAppStateIDS } = useAppStateIDS();

  useEffect(() => {
    updateAppStateIDS({
      breadcrumbs: [
        {
          label: 'Environments',
          url: '/env',
          params: [],
        },
      ],
    });
  }, [updateAppStateIDS]);
}
