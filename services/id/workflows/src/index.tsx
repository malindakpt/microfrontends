import { PiletApi } from 'frontend-host';
import { initializeApolloClient } from './apolloClient';
import { Home, HomeBreadCrumb } from './Stations/Home/Home';
import { Users, UserCrumb } from './Stations/Users/Users';
import { UserDetail, UserDetailsCrumb } from './Stations/UserDetail/UserDetail';
import { UserRoles, UserRolesCrumb } from './Stations/UserRoles/UserRoles';
import {
  ServiceAccounts,
  ServiceAccountsCrumb,
} from './Stations/ServiceAccounts/ServiceAccounts';
import {
  UserRoleTags,
  UserRoleTagsCrumb,
} from './Stations/UserRoleTags/UserRoleTags';
import {
  ServiceAccountCreate,
  ServiceAccountCreateCrumb,
} from './Stations/ServiceAccountCreate/ServiceAccountCreate';
import { UserCreate, UserCreateCrumb } from './Stations/UserCreate/UserCreate';
import {
  UserRoleCreate,
  UserRoleCreateCrumb,
} from './Stations/UserRoleCreate/UserRoleCreate';
import {
  UserRoleDetail,
  UserRoleDetailsCrumb,
} from './Stations/UserRoleDetail/UserRoleDetail';
import {
  ServiceAccountDetail,
  ServiceAccountDetailCrumb,
} from './Stations/ServiceAccountDetail/ServiceAccountDetail';
import {
  ServiceAccountNewClientSecret,
  ServiceAccountNewClientSecretCrumb,
} from './Stations/ServiceAccountNewClientSecret/ServiceAccountNewClientSecret';
import {
  UserRoleTagDetail,
  UserRoleTagDetailCrumb,
} from './Stations/UserRoleTagDetail/UserRoleTagDetail';
import {
  UserRoleTagCreate,
  UserRoleTagCreateCrumb,
} from './Stations/UserRoleTagCreate/UserRoleTagCreate';

export function setup(app: PiletApi): void {
  initializeApolloClient(app.getToken);

  app.registerPage('/accessManagement', Home, {
    breadcrumb: HomeBreadCrumb,
  });

  app.registerPage('/accessManagement/users', Users, {
    breadcrumb: UserCrumb,
  });

  app.registerPage('/accessManagement/users/create', UserCreate, {
    breadcrumb: UserCreateCrumb,
  });

  app.registerPage('/accessManagement/users/:userId', UserDetail, {
    breadcrumb: UserDetailsCrumb,
  });

  app.registerPage('/accessManagement/userRoles', UserRoles, {
    breadcrumb: UserRolesCrumb,
  });

  app.registerPage('/accessManagement/userRoles/create', UserRoleCreate, {
    breadcrumb: UserRoleCreateCrumb,
  });

  app.registerPage('/accessManagement/userRoles/:userRoleId', UserRoleDetail, {
    breadcrumb: UserRoleDetailsCrumb,
  });

  app.registerPage('/accessManagement/serviceAccounts', ServiceAccounts, {
    breadcrumb: ServiceAccountsCrumb,
  });

  app.registerPage(
    '/accessManagement/serviceAccounts/create',
    ServiceAccountCreate,
    {
      breadcrumb: ServiceAccountCreateCrumb,
    },
  );

  app.registerPage(
    '/accessManagement/serviceAccounts/:id',
    ServiceAccountDetail,
    {
      breadcrumb: ServiceAccountDetailCrumb,
    },
  );

  app.registerPage(
    '/accessManagement/serviceAccounts/:id/generateNewClientSecret',
    ServiceAccountNewClientSecret,
    {
      breadcrumb: ServiceAccountNewClientSecretCrumb,
    },
  );

  app.registerPage('/accessManagement/userRoleTags/create', UserRoleTagCreate, {
    breadcrumb: UserRoleTagCreateCrumb,
  });

  app.registerPage('/accessManagement/userRoleTags', UserRoleTags, {
    breadcrumb: UserRoleTagsCrumb,
  });

  app.registerPage('/accessManagement/userRoleTags/:id', UserRoleTagDetail, {
    breadcrumb: UserRoleTagDetailCrumb,
  });
}
