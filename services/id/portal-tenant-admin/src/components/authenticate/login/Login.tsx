import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useContext, useState } from "react";
import { AppContext } from "../../../app/App";
import { useHistory } from "react-router-dom";
import { useAuthenticateSuperUserMutation } from "../../../generated/graphql";
import { useApolloClient } from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
    textAlign: "center",
  },
}));

export const Login: React.FC = React.memo(() => {
  const context = useContext(AppContext);
  const apolloClient = useApolloClient();
  const history = useHistory();
  const [btnStatus, setButtonStatus] = useState(true);
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [loginUser] = useAuthenticateSuperUserMutation({
    client: apolloClient,
    fetchPolicy: "no-cache",
  });

  const submitCredentials = () => {
    setErrorMsg("");
    setButtonStatus(false);
    loginUser({
      variables: {
        dto: {
          email: email,
          password: password,
        },
      },
    })
      .then((res) => {
        context.onLoginStateChange(
          res.data?.authenticateSuperUser.accessToken as string
        );
        history.push("/tenants");
      })
      .catch((error) => {
        setButtonStatus(true);
        const errorArr: Array<{ message: string }> = error.graphQLErrors;
        let errString = "";
        errorArr.forEach((value) => {
          errString = errString + "\t\t" + value.message;
        });
        setErrorMsg(errString || "Communicate to server failed");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitCredentials();
              }
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitCredentials();
              }
            }}
          />

          <div className={classes.error}>{errorMsg}</div>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!btnStatus}
            className={classes.submit}
            onClick={submitCredentials}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://www.axinom.com">
            Axinom
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
});
