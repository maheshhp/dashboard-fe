import React, { useState, ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
  setCurrencyValue: Function,
  setConvertEnable: Function
): void => {
  const currencyValue = event.target.value;
  setCurrencyValue(currencyValue);
  if (currencyValue !== "" && Number(currencyValue) > 0) {
    setConvertEnable(true);
  } else {
    setConvertEnable(false);
  }
};

const CurrencyConvert = () => {
  const classes = useStyles();
  const [currencyValue, setCurrencyValue] = useState(0);
  const [convertEnabled, setConvertEnabled] = useState(false);

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
          Enter Value in SEK to convert
        </Typography>
        <form className={classes.form} noValidate onSubmit={(event) => {}}>
          <TextField
            variant="outlined"
            margin="normal"
            type="number"
            required
            fullWidth
            id="currencyValue"
            label="Currency Value"
            name="currencyValue"
            onChange={(event) =>
              onCurrencyValueChange(event, setCurrencyValue, setConvertEnabled)
            }
            value={currencyValue}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!convertEnabled}
          >
            Convert
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CurrencyConvert;
