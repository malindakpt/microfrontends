import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Layout, Row, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Content } = Layout;

export const Home: React.FunctionComponent = () => {
  const tiles = [
    { title: "Some Entity", path: "/some-entity" },
    { title: "Users", path: "/users" },
    { title: "User Roles", path: "/user-roles" },
    { title: "Permissions", path: "/permissions" },
  ];

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
      </Breadcrumb>
      <div className="content" style={{ padding: 24, height: "100%" }}>
        <Row
          gutter={[48, 48]}
          className="tile-container"
          style={{ padding: "24px 32px" }}
        >
          {tiles.map((tile) => {
            return (
              <Col span={6} key={tile.path}>
                <div className="tile">
                  <Link to={tile.path}>
                    <Button size="large" type="primary">
                      {tile.title}
                    </Button>
                  </Link>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Content>
  );
};
