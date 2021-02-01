import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { TenantDetail } from "../components/tenantDetail/TenantDetail";
import { Login } from "../components/authenticate/login/Login";
import { Tenants } from "../components/tenants/Tenants";
import { NotFound } from "../components/notfound/NotFound";

interface Props {
  isLoggedIn: boolean;
}
export const AppRoutes: React.FC<Props> = React.memo(({ isLoggedIn }) => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route
        exact
        path="/tenants"
        component={() => (isLoggedIn ? <Tenants /> : <Login />)}
      />
      <Route
        exact
        path="/tenants/detail/:tenantId/:name"
        component={() => (isLoggedIn ? <TenantDetail /> : <Login />)}
      />
      <Route component={NotFound} />
    </Switch>
  );
});
