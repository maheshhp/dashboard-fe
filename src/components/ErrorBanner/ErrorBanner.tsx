import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ApolloError } from "@apollo/client";
import Paper from "@material-ui/core/Paper";
import { errorMessageMap } from "./constants";

const useStyles = makeStyles((theme) => ({
  banner: {
    display: "flex",
    width: "100%",
    backgroundColor: "#ef5350",
    color: "white",
    borderRadius: "5px",
    padding: theme.spacing(1),
  },
}));

const ErrorBanner = ({
  currencyError,
  searchError,
}: {
  currencyError: ApolloError | undefined;
  searchError: ApolloError | undefined;
}): JSX.Element => {
  const classes = useStyles();
  if (currencyError || searchError) {
    if (searchError?.networkError || currencyError?.networkError) {
      const errorMessage =
        searchError?.networkError?.message ||
        currencyError?.networkError?.message;
      return (
        <Paper variant="outlined" elevation={0} className={classes.banner}>
          {errorMessageMap[errorMessage || "IMPLEMENTATION_ERROR"]}
        </Paper>
      );
    }
  }
  return <></>;
};

export default ErrorBanner;
