import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { LOGIN_URL, SIMPLE_EMAIL_REGEX } from "./constants";
import { StoreAuthTokenFunction } from "../../types/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

const onEmailChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setEmail: Function,
  setAllowLogin: Function
): void => {
  const email = event.target.value;
  setEmail(email);
  // If email validates with the regex, enable login button
  if (SIMPLE_EMAIL_REGEX.test(String(email))) {
    setAllowLogin(true);
  }
};

const onLoginSubmit = async (
  event: FormEvent,
  email: string,
  storeAuthToken: StoreAuthTokenFunction,
  history: any
): Promise<void> => {
  // Prevent form submit default action
  event.preventDefault();
  // Make call to BE API for logging in and getting token
  const { accessToken } = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then((response) => response.json());
  // Store token in session storage and redirect to dashboard
  storeAuthToken(accessToken);
  history.push("/dashboard");
};

const Login = ({
  storeAuthToken,
  authToken,
}: {
  storeAuthToken: StoreAuthTokenFunction;
  authToken: string | null;
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [allowLogin, setAllowLogin] = useState(false);

  // If token already present, take user to dashboard
  useEffect(() => {
    if (authToken) {
      history.push("/dashboard");
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) =>
            onLoginSubmit(event, email, storeAuthToken, history)
          }
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => onEmailChange(event, setEmail, setAllowLogin)}
            value={email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!allowLogin}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
