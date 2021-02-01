import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { GraphQLErrorComponent } from "components/Errors/GraphQLErrorComponent/GraphQLErrorComponent";
import { GraphQLError } from "graphql";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apolloClient } from "../../../client/apllo-client";
import {
  AllUserRolesDocument,
  AllUserRolesQuery,
  UserRole,
} from "../../../generated/graphql";

const { Content } = Layout;

const columns: ColumnsType<UserRole> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

export const UserRoles: React.FC = () => {
  const [userRoleData, setUserRoleData] = useState<UserRole[]>([]);
  const [errorData, setErrorData] = useState<ReadonlyArray<GraphQLError>>([]);

  useEffect(() => {
    const loadAllUserRoles = async () => {
      const result = await apolloClient.query<AllUserRolesQuery>({
        query: AllUserRolesDocument,
        errorPolicy: "all",
        fetchPolicy: "network-only",
      });

      if (result.errors) {
        setErrorData(result.errors);
      } else {
        const userRoleResults = result.data.userRoles?.nodes as UserRole[];
        setUserRoleData(userRoleResults);
      }
    };

    loadAllUserRoles();
  }, []);

  return (
    <Content className="page" style={{ height: "100%" }}>
      <Breadcrumb style={{ margin: "24px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">
            <Space>
              <HomeOutlined />
              <span>Home</span>
            </Space>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/user-roles">
            <Space>
              <HomeOutlined />
              <span>User Roles</span>
            </Space>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="content" style={{ padding: 24, height: "100%" }}>
        {errorData.length ? (
          <GraphQLErrorComponent graphQlErrors={errorData} />
        ) : null}
        <Table columns={columns} dataSource={userRoleData} />
      </div>
    </Content>
  );
};
