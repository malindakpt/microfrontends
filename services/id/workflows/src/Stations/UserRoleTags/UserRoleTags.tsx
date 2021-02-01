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
  TagsQuery,
  TagsQueryVariables,
  TagsDocument,
} from '../../generated/graphql';
import { client } from '../../apolloClient';
import { BreadcrumbResolver } from 'frontend-host';

export const UserRoleTags: React.FC = () => {
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

      const result = await client.query<TagsQuery, TagsQueryVariables>({
        query: TagsDocument,
        variables: {
          filter: {
            name: { includes: filterName as string },
          },
        },
        fetchPolicy: 'network-only',
      });

      const data =
        result.data.filtered?.nodes.map(tag => {
          if (tag) {
            tag.createdAt = new Date(tag.createdAt);
            tag.updatedAt = new Date(tag.updatedAt);
          }
          return tag;
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
    history.push(`/accessManagement/userRoleTags/${item.id}`);
  };

  const handleItemCreate = (): void => {
    history.push(`/accessManagement/userRoleTags/create`);
  };

  return (
    <div>
      <Explorer
        title="User Role Tags"
        stationKey="UserRoleTagsExplorer"
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

export const UserRoleTagsCrumb: BreadcrumbResolver = () => 'User Role Tags';
