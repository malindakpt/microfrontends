import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Checkbox, Layout, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { GraphQLErrorComponent } from "components/Errors/GraphQLErrorComponent/GraphQLErrorComponent";
import { GraphQLError } from "graphql";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apolloClient } from "../../../client/apllo-client";
import {
  AllPermissionsDocument,
  AllPermissionsQuery,
  Permission,
} from "../../../generated/graphql";

const { Content } = Layout;

const columns: ColumnsType<Permission> = [
  {
    title: "Service ID",
    dataIndex: "serviceId",
    key: "serviceId",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "From Managed Service",
    dataIndex: "fromManagedService",
    key: "fromManagedService",
    render: (value: boolean) => <Checkbox checked={value} disabled={true} />,
  },
];

export const Permissions: React.FC = () => {
  const [permissionData, setPermissionData] = useState<Permission[]>([]);
  const [errorData, setErrorData] = useState<ReadonlyArray<GraphQLError>>([]);

  useEffect(() => {
    const loadAllPermissions = async () => {
      const result = await apolloClient.query<AllPermissionsQuery>({
        query: AllPermissionsDocument,
        errorPolicy: "all",
        fetchPolicy: "network-only",
      });

      if (result.errors) {
        setErrorData(result.errors);
      } else {
        const permissionResults = result.data.permissions
          ?.nodes as Permission[];
        setPermissionData(permissionResults);
      }
    };

    loadAllPermissions();
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
          <Link to="/permissions">
            <Space>
              <HomeOutlined />
              <span>Permissions</span>
            </Space>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="content" style={{ padding: 24, height: "100%" }}>
        {errorData.length ? (
          <GraphQLErrorComponent graphQlErrors={errorData} />
        ) : null}
        <Table columns={columns} dataSource={permissionData} />
      </div>
    </Content>
  );
};
