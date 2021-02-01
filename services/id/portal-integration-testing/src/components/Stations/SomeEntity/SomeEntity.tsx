import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Content } = Layout;

export const SomeEntity: React.FC = () => {
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
          <Link to="/some-entity">
            <Space>
              <HomeOutlined />
              <span>Some Entity</span>
            </Space>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="content" style={{ padding: 24, height: "100%" }}></div>
    </Content>
  );
};
