import React from 'react';
import { IdServiceApp } from './modules/IdSeviceApp/IdServiceApp';
import { AppStateProviderIDS } from './AppStateIDS';

export interface AuthAction {
  label: string;
  action: () => void;
}

const App: React.FC = () => {
  return (
    <AppStateProviderIDS>
      <IdServiceApp />
    </AppStateProviderIDS>
  );
};

export default App;
