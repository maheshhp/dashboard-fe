import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./app.css";
import useAuthToken from "./hooks/authToken/useAuthToken";

function App() {
  const { authToken, storeAuthToken } = useAuthToken();
  return (
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
  );
}

export default App;
