import { useIdentityService, User } from '@ax/id-link';
import { Avatar, Button, Layout, Menu, Space, Tag } from 'antd';
import { Home } from 'components/Stations/Home/Home';
import { Permissions } from 'components/Stations/Permissions/Permissions';
import { SomeEntity } from 'components/Stations/SomeEntity/SomeEntity';
import { UserRoles } from 'components/Stations/UserRoles/UserRoles';
import { Users } from 'components/Stations/Users/Users';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

export const LayoutComposer: React.FC = () => {
  const { getToken, logoutUser } = useIdentityService();

  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setUser(token.user);
    })();
  }, [getToken]);

  return (
    <BrowserRouter>
      <Layout className="app" style={{ height: '100%' }}>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div className="logo">
            <div className="logo-title">
              ID-Service - Integration Testing Portal
            </div>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Space size={'large'}>
              <>
                <Avatar size={40} src={user?.profilePictureUrl} />
                <Tag>{user?.name}</Tag>
                <Button type="primary" size={'large'} onClick={logoutUser}>
                  Logout
                </Button>
              </>
            </Space>
          </Menu>
        </Header>
        <Content
          className="page-container"
          style={{ padding: '0 50px', marginTop: 64 }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/some-entity" component={SomeEntity} />
            <Route path="/users" component={Users} />
            <Route path="/user-roles" component={UserRoles} />
            <Route path="/permissions" component={Permissions} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Created by Axinom © 2020
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};
