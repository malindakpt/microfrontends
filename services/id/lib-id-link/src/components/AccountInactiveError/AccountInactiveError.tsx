import React from 'react';
import { useIdentityService } from '../IdentityServiceProvider/IdentityServiceProvider';

export const AccountInactiveError: React.FC = () => {
  const { logoutUser } = useIdentityService();
  return (
    <>
      <p>This account is not activated!</p>
      <button onClick={logoutUser}>Logout</button>
    </>
  );
};
