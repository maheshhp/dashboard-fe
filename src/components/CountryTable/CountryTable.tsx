import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const mockdata = [
  {
    countryCode: "IND",
    name: "India",
    population: 1234567,
    currencies: [
      {
        name: "Indian Rupee",
        code: "INR",
        symbol: "₹",
      },
    ],
  },
];

const mockConvertedValuesData: Record<string, number> = {
  INR: 12243.76,
};

const useStyles = makeStyles((theme) => ({
  tableHeading: {
    fontWeight: "bold",
  },
}));

const CountryTable = (): JSX.Element => {
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
          {mockdata.map((country) => (
            <TableRow key={country.countryCode}>
              <TableCell>{country.name}</TableCell>
              <TableCell>
                {Number(country.population).toLocaleString()}
              </TableCell>
              <TableCell>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeading}>
                        Name
                      </TableCell>
                      <TableCell className={classes.tableHeading}>
                        Code
                      </TableCell>
                      <TableCell className={classes.tableHeading}>
                        SEK Conversion
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {country.currencies.map((currency) => (
                      <TableRow key={currency.code}>
                        <TableCell>{currency.name}</TableCell>
                        <TableCell>{currency.code}</TableCell>
                        <TableCell>
                          <span>{currency.symbol}</span>
                          {Number(
                            mockConvertedValuesData[currency.code]
                          ).toLocaleString()}
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
