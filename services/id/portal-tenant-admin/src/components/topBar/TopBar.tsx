import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AuthenticateActions } from "../authenticate/authenticateActions/AuthenticateActions";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export const TopBar: React.FC = React.memo(() => {
  const themeClasses = useStyles();
  return (
    <div className={themeClasses.root}>
      <AppBar position="static">
        <Toolbar>
          <SupervisorAccountIcon style={{ fontSize: 40 }} />
          <Typography variant="h6" className={themeClasses.title}>
            Tenant Administration
          </Typography>
          <AuthenticateActions />
        </Toolbar>
      </AppBar>
    </div>
  );
});
