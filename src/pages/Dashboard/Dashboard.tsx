import React, { FormEvent, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLazyQuery } from "@apollo/client";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CountryTable from "../../components/CountryTable/CountryTable";
import CountrySearch from "../../components/CountrySearch/CountrySearch";
import CurrencyConvert from "../../components/CurrencyConvert/CurrencyConvert";
import { CountrySearchReqVars, CountrySearchGqlRes } from "./dashboard.types";
import { SEARCH_COUNTRIES_QUERY } from "./constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  content: {
    width: "100%",
    height: "100vh",
    overflow: "auto",
  },
  container: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "30vh",
  },
}));

const Dashboard = (): JSX.Element => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState("");

  const [
    searchCountries,
    { called, loading, data: searchCountriesData, error },
  ] = useLazyQuery<CountrySearchGqlRes, CountrySearchReqVars>(
    SEARCH_COUNTRIES_QUERY
  );

  const onSearch = (event: FormEvent): void => {
    event.preventDefault();
    searchCountries({ variables: { countryName: String(searchString) } });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Typography component="h1" variant="h4" color="primary">
            Dashboard
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>
                <CountrySearch
                  searchString={searchString}
                  setSearchString={setSearchString}
                  onSearch={onSearch}
                  searchLoading={called && loading}
                  addToListLoading={false}
                  countriesSearchData={
                    searchCountriesData?.searchCountries || []
                  }
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={classes.paper}>
                <CurrencyConvert />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CountryTable />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
