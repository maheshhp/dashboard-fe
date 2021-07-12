import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CountrySearchResult } from "../../types/country";
import {
  AddCountryToListFunction,
  CountrySearchFunction,
} from "../../types/country";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%",
  },
  searchButtonContainer: {
    display: "flex",
    alignItems: "center",
  },
  countryCard: {
    marginBottom: theme.spacing(1),
  },
  countryCardContent: {
    padding: theme.spacing(1.5),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(0, 1),
  },
  countryCardsContainer: {
    overflow: "scroll",
    maxHeight: "100px",
  },
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
}));

const CountrySearch = ({
  onSearch,
  loading,
  countriesSearchData,
  onAddCountryToList,
}: {
  onSearch: CountrySearchFunction;
  onAddCountryToList: AddCountryToListFunction;
  loading: boolean;
  countriesSearchData: Array<CountrySearchResult>;
}) => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState("");

  if (loading) {
    return (
      <div className={classes.loaderContainer}>
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
          Search & Add Countries
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => {
            onSearch(event, searchString);
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="countrySearch"
                label="Country name"
                name="countrySearch"
                onChange={(event) =>
                  setSearchString(String(event.target.value))
                }
                value={searchString}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              className={classes.searchButtonContainer}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!(searchString && searchString !== "")}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
        <div className={classes.countryCardsContainer}>
          {countriesSearchData.map((country) => (
            <Card key={country.alpha3Code} className={classes.countryCard}>
              <div className={classes.countryCardContent}>
                <Typography component="span">{country.name}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onAddCountryToList(country)}
                >
                  Add to list
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CountrySearch;
