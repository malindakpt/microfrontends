import "./App.scss";

import { IdentityServiceProvider, createIdentityServiceClient, EnsureAuthentication } from "@ax/id-link";
import React from "react";

import { LayoutComposer } from "../components/LayoutComposer/LayoutComposer";
import { identityServiceConfig } from "../id-service.config";

export const client = createIdentityServiceClient(identityServiceConfig);

export const App: React.FC = () => {
  return (
    <IdentityServiceProvider client={client}>
      <EnsureAuthentication>
        <LayoutComposer />
      </EnsureAuthentication>
    </IdentityServiceProvider>
  );
};
