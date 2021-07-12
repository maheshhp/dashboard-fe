import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { CountrySearchResult } from "../../pages/Dashboard/dashboard.types";

const getLocalCurrencyValue = (value: string | number): string => {
  return value ? Number(value).toLocaleString() : "-";
};

const useStyles = makeStyles((theme) => ({
  tableHeading: {
    fontWeight: "bold",
  },
}));

const CountryTable = ({
  countriesInList,
  currencyConvValues,
}: {
  countriesInList: Array<CountrySearchResult>;
  currencyConvValues: Record<string, Record<string, number>>;
}): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeading}>Name</TableCell>
            <TableCell className={classes.tableHeading}>Population</TableCell>
            <TableCell className={classes.tableHeading}>
              Official Currencies
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countriesInList.map((country) => (
            <TableRow key={country.alpha3Code}>
              <TableCell>{country.name}</TableCell>
              <TableCell>{getLocalCurrencyValue(country.population)}</TableCell>
              <TableCell>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell width="50%" className={classes.tableHeading}>
                        Name
                      </TableCell>
                      <TableCell width="10%" className={classes.tableHeading}>
                        Code
                      </TableCell>
                      <TableCell width="40%" className={classes.tableHeading}>
                        SEK Conversion
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {country.currencies.map((currency) => (
                      <TableRow key={currency.code}>
                        <TableCell width="50%">{currency.name}</TableCell>
                        <TableCell width="10%">{currency.code}</TableCell>
                        <TableCell width="40%">
                          <span>{currency.symbol}</span>
                          {getLocalCurrencyValue(
                            currencyConvValues[country.alpha3Code]?.[
                              currency.code
                            ]
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default CountryTable;
