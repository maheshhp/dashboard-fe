import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Dashboard, Login } from "./pages";
import { ProtectedRoute } from "./components";
import useAuthToken from "./hooks/authToken/useAuthToken";
import { apolloClient } from "./utils/graphql";

function App() {
  const { authToken, storeAuthToken } = useAuthToken();
  return (
    <ApolloProvider client={apolloClient}>
      <div>
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
