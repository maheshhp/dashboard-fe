import React, { useState, ChangeEvent } from "react";
import {
  Container,
  CssBaseline,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { OnCurrencyConvertFunction } from "../../types/currency";

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%",
  },
}));

const onCurrencyValueChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setCurrencyValue: Function
): void => {
  const currencyValue = event.target.value;
  setCurrencyValue(currencyValue);
};

const CurrencyConvert = ({
  onConvertCurrency,
}: {
  onConvertCurrency: OnCurrencyConvertFunction;
}) => {
  const classes = useStyles();
  const [currencyValue, setCurrencyValue] = useState(0);

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
          Enter Value in SEK to convert
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => {
            onConvertCurrency(event, Number(currencyValue));
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            type="number"
            required
            fullWidth
            id="currencyValue"
            label="Currency Value"
            name="currencyValue"
            onChange={(event) => onCurrencyValueChange(event, setCurrencyValue)}
            value={currencyValue}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={Number(currencyValue) <= 0}
          >
            Convert
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CurrencyConvert;
