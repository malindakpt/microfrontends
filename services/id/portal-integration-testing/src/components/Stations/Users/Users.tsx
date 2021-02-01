import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { GraphQLErrorComponent } from 'components/Errors/GraphQLErrorComponent/GraphQLErrorComponent';
import { GraphQLError } from 'graphql';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { apolloClient } from '../../../client/apllo-client';
import {
  AllUsersDocument,
  AllUsersQuery,
  UpdateUserDocument,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
  UserStatus,
} from '../../../generated/graphql';

const { Content } = Layout;

const columns: ColumnsType<User> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Profile Picture',
    dataIndex: 'profilePictureUrl',
    key: 'profilePictureUrl',
    render: (text: string) => <a href={text}>{text}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt: Date) => `${createdAt.toDateString()}`,
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (updatedAt: Date) => `${updatedAt.toDateString()}`,
  },
  {
    title: '',
    dataIndex: 'status',
    key: 'updateStatus',
    render: (status: UserStatus, user) =>
      status === UserStatus.BLOCKED ? (
        <Button
          type="primary"
          onClick={() => updateUserStatus(user, UserStatus.ACTIVE)}
        >
          Activate
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => updateUserStatus(user, UserStatus.BLOCKED)}
        >
          Block
        </Button>
      ),
  },
];

const updateUserStatus = async (user: User, newStatus: UserStatus) => {
  const updateInput: UpdateUserMutationVariables = {
    updateUserInput: {
      id: user.id,
      patch: {
        status: newStatus,
      },
    },
  };

  const result = await apolloClient.mutate<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >({
    mutation: UpdateUserDocument,
    variables: updateInput,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  });

  const updatedUser = result.data?.updateUser?.user as User;
  updatedUser.createdAt = new Date(user.createdAt);
  updatedUser.updatedAt = new Date(user.updatedAt);

  updateUsers(updatedUser);
};

const updateUsers = (userToUpdate: User) => {
  const index = externalUserData.findIndex(user => user.id === userToUpdate.id);

  if (index !== -1) {
    const newUserData = [...externalUserData];
    newUserData[index] = userToUpdate;
    externalSetUserData(newUserData);
  }
};

let externalUserData: User[] = [];
let externalSetUserData: (userData: React.SetStateAction<User[]>) => void;

export const Users: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);
  externalSetUserData = setUserData;

  const [errorData, setErrorData] = useState<ReadonlyArray<GraphQLError>>([]);

  useEffect(() => {
    const loadAllUsers = async () => {
      const result = await apolloClient.query<AllUsersQuery>({
        query: AllUsersDocument,
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      });

      if (result.errors) {
        setErrorData(result.errors);
      } else {
        const userResults = (result.data.users?.nodes as User[]).map(user => {
          user.createdAt = new Date(user.createdAt);
          user.updatedAt = new Date(user.updatedAt);
          return user;
        });

        externalUserData = userResults;
        setUserData(userResults);
      }
    };

    loadAllUsers();
  }, []);

  return (
    <Content className="page" style={{ height: '100%' }}>
      <Breadcrumb style={{ margin: '24px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <Space>
              <HomeOutlined />
              <span>Home</span>
            </Space>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/users">
            <Space>
              <HomeOutlined />
              <span>Users</span>
            </Space>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="content" style={{ padding: 24, height: '100%' }}>
        {errorData?.length ? (
          <GraphQLErrorComponent graphQlErrors={errorData} />
        ) : null}
        <Table columns={columns} dataSource={userData} />
      </div>
    </Content>
  );
};
