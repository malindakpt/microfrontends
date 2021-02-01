import React, { useState, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { TopBar } from "../components/topBar/TopBar";
import { Container } from "@material-ui/core";
import { ApolloProvider } from "@apollo/react-hooks";
import { AlertDialog, AlertProps } from "../components/alertDialog/AlertDialog";
import { AppRoutes } from "./App.routes";
import {
  Breadcrumb,
  BreadcrumbNode
} from "../components/breadcrumb/Breadcrumb";
import { apolloClient } from "../apolloClient";

export const AppContext = React.createContext({
  isLoggedIn: false,
  onLoginStateChange: (token: string) => {},
  onShowAlert: (opt: AlertProps) => {},
  onBreadcrumbChange: (breadcrumbNodes: Array<BreadcrumbNode>) => {}
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [breadcrumbNodes, setBreadcrumbNodes] = useState<Array<BreadcrumbNode>>(
    []
  );
  const [alertOptions, setAlertOptions] = useState<AlertProps>({
    isOpen: false
  });

  const handleBreadcrumbChange = useCallback(
    (breadcrumbArr: Array<BreadcrumbNode>) => {
      setBreadcrumbNodes(breadcrumbArr);
    },
    []
  );

  const handleShowAlert = useCallback((alertOptions: AlertProps) => {
    setAlertOptions({ ...alertOptions, isOpen: true });
  }, []);

  const handleAlertClose = useCallback(
    (success: boolean) => {
      if (success && alertOptions.onAlertClose) {
        alertOptions.onAlertClose(true);
      }
      setAlertOptions(prev => {
        const newState = { ...prev, isOpen: false };
        return newState;
      });
    },
    [alertOptions]
  );

  const handleLoginStateChange = useCallback((token: string) => {
    setAccessToken(token);
    setIsLoggedIn(token !== "");
  }, []);

  return (
    <Router>
      <AppContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          onLoginStateChange: handleLoginStateChange,
          onShowAlert: handleShowAlert,
          onBreadcrumbChange: handleBreadcrumbChange
        }}
      >
        <ApolloProvider client={apolloClient(accessToken)}>
          <TopBar />
          <Breadcrumb breadcrumbArr={breadcrumbNodes as BreadcrumbNode[]} />
          <AlertDialog {...alertOptions} onAlertClose={handleAlertClose} />
          <Container maxWidth="lg">
            <AppRoutes isLoggedIn={isLoggedIn} />
          </Container>
        </ApolloProvider>
      </AppContext.Provider>
    </Router>
  );
};

export default App;
