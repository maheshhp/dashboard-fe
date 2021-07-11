import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  Component,
  path,
  authToken,
}: {
  Component: any;
  path: string;
  authToken: string | null;
}) => {
  if (authToken) {
    return <Route path={path} exact component={Component} />;
  }
  return <Redirect to="/login" />;
};

export default ProtectedRoute;
