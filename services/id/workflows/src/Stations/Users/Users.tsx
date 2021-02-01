import React, { useCallback } from 'react';
import {
  Explorer,
  Column,
  ExplorerDataProvider,
  SortData,
  FilterValues,
  Data,
  FilterTypes,
  ColumnRenderer,
  createBooleanDotRenderer,
} from '@ax/cms-ui';
import { DataProviderResults } from '@ax/cms-ui/dist/components/Explorer/Explorer.model';
import {
  UsersQuery,
  UsersQueryVariables,
  UsersDocument,
  UserStatus,
} from '../../generated/graphql';
import { useHistory } from 'react-router-dom';
import { client } from '../../apolloClient';
import { BreadcrumbResolver } from 'frontend-host';

export const Users: React.FC = () => {
  const history = useHistory();

  // Renderer for status column
  const statusRenderer: ColumnRenderer = useCallback((val: unknown) => {
    const renderer = createBooleanDotRenderer();
    return renderer(val === UserStatus.Active);
  }, []);

  // Columns
  const explorerColumns: Column[] = [
    { label: 'Name', propertyName: 'name', size: '2fr' },
    { label: 'Email', propertyName: 'email' },
    { label: 'Status', propertyName: 'status', render: statusRenderer },
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
      const filterStatus = filters?.status
        ? [UserStatus[filters.status as keyof typeof UserStatus]]
        : [UserStatus.Active, UserStatus.Blocked];
      const filterEmail = filters?.email ?? '';

      const result = await client.query<UsersQuery, UsersQueryVariables>({
        query: UsersDocument,
        variables: {
          filter: {
            name: { includes: filterName as string },
            status: { in: filterStatus },
            email: { includes: filterEmail as string },
          },
        },
        fetchPolicy: 'network-only',
      });

      return {
        data: result.data.filtered?.nodes as [],
        totalCount: result.data.nonFiltered?.totalCount as number,
        hasMoreData: false,
        filteredCount: result.data.filtered?.totalCount as number,
      };
    },
  };

  const handleItemClick = (item: Data): void => {
    history.push(`/accessManagement/users/${item.id}`);
  };

  const handleItemCreate = (): void => {
    history.push(`/accessManagement/users/create`);
  };

  return (
    <div>
      <Explorer
        title="Users"
        stationKey="UsersExplorer"
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
            label: 'Email',
            property: 'email',
            type: FilterTypes.FreeText,
          },
          {
            label: 'Status',
            property: 'status',
            type: FilterTypes.Options,
            options: [
              {
                label: 'Active',
                value: 'Active',
              },
              {
                label: 'Blocked',
                value: 'Blocked',
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export const UserCrumb: BreadcrumbResolver = () => 'Users';
