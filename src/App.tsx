import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./app.css";
import useAuthToken from "./hooks/authToken/useAuthToken";
import { GQL_URL } from "./constants";
import { getAuthTokenFromSessionStorage } from "./utils/sessionStorage";

const gqlHttpLink = createHttpLink({
  uri: GQL_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${getAuthTokenFromSessionStorage()}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(gqlHttpLink),
  cache: new InMemoryCache(),
});

function App() {
  const { authToken, storeAuthToken } = useAuthToken();
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <ProtectedRoute
              path="/dashboard"
              Component={Dashboard}
              authToken={authToken}
            />
            <Route exact path="/login">
              <Login authToken={authToken} storeAuthToken={storeAuthToken} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
