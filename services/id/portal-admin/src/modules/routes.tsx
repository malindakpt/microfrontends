import { RouteConfig } from '@ax/cms-ui';
import { ChangePassword } from './components/ChangePassword/ChangePassword';
import { Environments } from './stations/Environments/Environments';
import { EnvironmentDetail } from './stations/EnvironmentDetail/EnvironmentDetail';
import { EnvironmentCreate } from './stations/EnvironmentCreate/EnvironmentCreate';
import { IdentityProviders } from './stations/IdentityProviders/IdentityProviders';
import { IdentityProviderDetails } from './stations/IdentityProviderDetail/IdentityProviderDetail';
import { EnvironmentDelete } from './stations/EnvironmentDelete/EnvironmentDelete';
import { SignIn } from './components/SiginIn/SignIn';
import { Home } from './stations/Home/Home';

export const Routes = [
  {
    path: '/signIn',
    component: SignIn,
  },
  {
    path: '/env/:envId/:envName/identityProviders/:idpId',
    component: IdentityProviderDetails,
  },
  {
    path: '/env/:envId/:envName/delete',
    component: EnvironmentDelete,
  },
  {
    path: '/env/:envId/:envName/identityProviders',
    component: IdentityProviders,
  },
  { path: '/env/:envId/:envName', component: EnvironmentDetail },
  { path: '/env/create', component: EnvironmentCreate },
  { path: '/changePassword', component: ChangePassword },
  { path: '/env', component: Environments },
  { path: '/', component: Home },
] as RouteConfig[];
