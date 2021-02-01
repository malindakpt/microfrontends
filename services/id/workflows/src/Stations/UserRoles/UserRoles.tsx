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
import { DataProviderResults } from '@ax/cms-ui/dist/components/Explorer/Explorer.model';
import {
  UserRolesQuery,
  UserRolesQueryVariables,
  UserRolesDocument,
} from '../../generated/graphql';
import { BreadcrumbResolver } from 'frontend-host';
import { client } from '../../apolloClient';

export const UserRoles: React.FC = () => {
  const history = useHistory();

  // Columns
  const explorerColumns: Column[] = [
    { label: 'Name', propertyName: 'name', size: '2fr' },
    { label: 'Description', propertyName: 'description' },
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

      const result = await client.query<
        UserRolesQuery,
        UserRolesQueryVariables
      >({
        query: UserRolesDocument,
        variables: {
          filter: {
            name: { includes: filterName as string },
          },
        },
        fetchPolicy: 'network-only',
      });

      const data =
        result.data.filtered?.nodes.map(userRole => {
          if (userRole) {
            userRole.createdAt = new Date(userRole.createdAt);
            userRole.updatedAt = new Date(userRole.updatedAt);
          }
          return userRole;
        }) ?? [];

      return {
        data: data,
        totalCount: result.data.nonFiltered?.totalCount as number,
        hasMoreData: false,
        filteredCount: result.data.filtered?.totalCount as number,
      };
    },
  };

  const handleItemClick = (item: Data): void => {
    history.push(`/accessManagement/userRoles/${item.id}`);
  };

  const handleItemCreate = (): void => {
    history.push(`/accessManagement/userRoles/create`);
  };

  return (
    <div>
      <Explorer
        title="User Roles"
        stationKey="UserRolesExplorer"
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
        ]}
      />
    </div>
  );
};

export const UserRolesCrumb: BreadcrumbResolver = () => 'User Roles';
