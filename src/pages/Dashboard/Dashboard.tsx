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
import {
  CountrySearchReqVars,
  CountrySearchGqlRes,
  CountrySearchResult,
  CurrencyRatesGqlRes,
  CurrencyRatesReqVars,
} from "./dashboard.types";
import { SEARCH_COUNTRIES_QUERY, CURRENCY_RATES_QUERY } from "./constants";
import {
  convertSekToCurrenciesInList,
  getAllCurrenciesAndCountries,
} from "../../utils/currencyConversion";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";

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
  const [currencyConvValues, setCurrencyConvValues] = useState<
    Record<string, Record<string, number>>
  >({});
  const [countriesInList, setCountriesInList] = useState<
    Array<CountrySearchResult>
  >([]);

  const [
    searchCountries,
    { loading: searchLoading, data: searchCountriesData, error: searchError },
  ] = useLazyQuery<CountrySearchGqlRes, CountrySearchReqVars>(
    SEARCH_COUNTRIES_QUERY
  );

  const [getCurrencyRates, { data: currencyData, error: currencyError }] =
    useLazyQuery<CurrencyRatesGqlRes, CurrencyRatesReqVars>(
      CURRENCY_RATES_QUERY
    );

  const onSearch = (event: FormEvent, searchString: string): void => {
    event.preventDefault();
    searchCountries({ variables: { countryName: searchString } });
  };

  const onAddCountryToList = (countryData: CountrySearchResult): void => {
    const { countries, currencies } = getAllCurrenciesAndCountries(
      countriesInList,
      countryData
    );
    // Add country to list and get currency rates if its not already there
    if (!countries.includes(countryData.alpha3Code)) {
      getCurrencyRates({
        variables: {
          currencySymbols: Array.from(currencies),
        },
      });
      setCountriesInList([...countriesInList, countryData]);
    }
  };

  const onConvertCurrency = (event: FormEvent, currencyValue: number): void => {
    event.preventDefault();
    const convertedValues = convertSekToCurrenciesInList(
      currencyData?.currencyRates,
      currencyValue,
      countriesInList
    );
    setCurrencyConvValues(convertedValues);
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
            <Grid item xs={12} md={12} lg={12}>
              <ErrorBanner
                searchError={searchError}
                currencyError={currencyError}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>
                <CountrySearch
                  onSearch={onSearch}
                  loading={searchLoading}
                  countriesSearchData={
                    searchCountriesData?.searchCountries || []
                  }
                  onAddCountryToList={onAddCountryToList}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={classes.paper}>
                <CurrencyConvert onConvertCurrency={onConvertCurrency} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CountryTable
                  currencyConvValues={currencyConvValues}
                  countriesInList={countriesInList}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
