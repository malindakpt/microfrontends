import React from 'react';
import {
  Column,
  ExplorerDataProvider,
  SortData,
  FilterValues,
  Data,
  Explorer,
  FilterTypes,
} from '@ax/cms-ui';
import { useHistory } from 'react-router-dom';
import {
  ServiceAccountsQuery,
  ServiceAccountsQueryVariables,
  ServiceAccountsDocument,
} from '../../generated/graphql';
import { client } from '../../apolloClient';
import { BreadcrumbResolver } from 'frontend-host';
import { DataProviderResults } from '@ax/cms-ui/dist/components/Explorer/Explorer.model';

export const ServiceAccounts: React.FC = () => {
  const history = useHistory();

  // Columns
  const explorerColumns: Column[] = [
    { label: 'Name', propertyName: 'name', size: '2fr' },
    { label: 'Client ID', propertyName: 'clientId' },
    { label: 'Created At', propertyName: 'createdAt' },
    { label: 'Updated At', propertyName: 'updatedAt' },
  ];

  // Data provider
  const dataProvider: ExplorerDataProvider = {
    loadData: async (
      pagingInformation: unknown,
      sorting?: SortData,
      filters?: FilterValues,
    ): Promise<DataProviderResults> => {
      const filterName = filters?.name ?? '';
      const filterClientId = filters?.clientId ?? '';

      const result = await client.query<
        ServiceAccountsQuery,
        ServiceAccountsQueryVariables
      >({
        query: ServiceAccountsDocument,
        variables: {
          filter: {
            name: { includes: filterName as string },
            clientId: { includes: filterClientId as string },
          },
        },
        fetchPolicy: 'network-only',
      });

      const data =
        result.data.filtered?.nodes.map(serviceAccount => {
          if (serviceAccount) {
            serviceAccount.createdAt = new Date(serviceAccount.createdAt);
            serviceAccount.updatedAt = new Date(serviceAccount.updatedAt);
          }
          return serviceAccount;
        }) ?? [];

      return {
        data: data,
        totalCount: result.data.nonFiltered?.totalCount as number,
        hasMoreData: false,
        filteredCount: result.data.filtered?.totalCount as number,
      };
    },
  };

  const handleItemClick = (item: Data) => {
    history.push(`/accessManagement/serviceAccounts/${item.id}`);
  };

  const handleItemCreate = () => {
    history.push(`/accessManagement/serviceAccounts/create`);
  };

  return (
    <div>
      <Explorer
        title="Service Accounts"
        stationKey="ServiceAccountsExplorer"
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
            label: 'Client ID',
            property: 'clientId',
            type: FilterTypes.FreeText,
          },
        ]}
      />
    </div>
  );
};

export const ServiceAccountsCrumb: BreadcrumbResolver = () =>
  'Service Accounts';
