import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import store from 'store';

import SideBarLayout from './SideBarLayout';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';

import { dashboardRoutes } from '../router';
import { LayoutContext } from '../contexts';

const { Content } = Layout;

function MainLayout() {
  const isAuthenticated = !!store.get('authenticationToken');

  const {
    sideBarCollapsed: [sideBarCollapsed]
  } = useContext(LayoutContext);

  return !isAuthenticated ? (
    <Redirect to="/login" />
  ) : (
    <Layout style={{ marginLeft: sideBarCollapsed ? '80px' : '200px' }}>
      <SideBarLayout />
      <Layout>
        <HeaderLayout />
        <Content>
          <Switch>
            {dashboardRoutes.map(route => (
              <Route
                exact={true}
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
            <Redirect to="/" />
          </Switch>
        </Content>
        <FooterLayout />
      </Layout>
    </Layout>
  );
}

export default MainLayout;
