import React, { useState, ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const mockCountrySearchData = [
  {
    name: "British Indian Ocean Territory",
    alpha3Code: "IOT",
    population: 3000,
    currencies: [
      {
        name: "United States dollar",
        symbol: "$",
        code: "USD",
      },
    ],
  },
  {
    name: "India",
    alpha3Code: "IND",
    population: 1295210000,
    currencies: [
      {
        name: "Indian rupee",
        symbol: "₹",
        code: "INR",
      },
    ],
  },
  {
    name: "Indonesia",
    alpha3Code: "IDN",
    population: 258705000,
    currencies: [
      {
        name: "Indonesian rupiah",
        symbol: "Rp",
        code: "IDR",
      },
    ],
  },
];

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
}));

const onCountrySearchChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setSearchString: Function,
  setSearchEnable: Function
): void => {
  const searchString = event.target.value;
  setSearchString(searchString);
  if (searchString && searchString !== "") {
    setSearchEnable(true);
  } else {
    setSearchEnable(false);
  }
};

const CountrySearch = () => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState(undefined);
  const [searchEnabled, setSearchEnabled] = useState(false);

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
          Search & Add Countries
        </Typography>
        <form className={classes.form} noValidate onSubmit={(event) => {}}>
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
                  onCountrySearchChange(
                    event,
                    setSearchString,
                    setSearchEnabled
                  )
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
                disabled={!searchEnabled}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
        <div className={classes.countryCardsContainer}>
          {mockCountrySearchData.map((country) => (
            <Card key={country.alpha3Code} className={classes.countryCard}>
              <div className={classes.countryCardContent}>
                <Typography component="span">{country.name}</Typography>
                <Button variant="contained" color="primary">
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
