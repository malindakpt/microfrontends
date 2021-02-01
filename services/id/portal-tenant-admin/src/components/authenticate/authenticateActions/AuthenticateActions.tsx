import * as React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../app/App";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useContext } from "react";

export const AuthenticateActions: React.FC = React.memo(() => {
  const history = useHistory();
  const context = useContext(AppContext);
  return (
    <>
      {context.isLoggedIn ? (
        <>
          <Button
            color="inherit"
            onClick={() => {
              context.onLoginStateChange("");
              history.push("/");
            }}
          >
            SIGN OUT
          </Button>
          <LockOpenIcon />
        </>
      ) : (
        <>
          <Button
            color="inherit"
            onClick={() => {
              history.push("/");
            }}
          >
            SIGN IN
          </Button>
          <LockIcon />
        </>
      )}
    </>
  );
});
