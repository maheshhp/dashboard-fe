import { CURRENCY_RATES_QUERY, SEARCH_COUNTRIES_QUERY } from "./constants";

export const mockGqlData = [
  {
    request: {
      query: SEARCH_COUNTRIES_QUERY,
      variables: {
        countryName: "test",
      },
    },
    result: {
      data: {
        searchCountries: [
          {
            name: "Test Country",
            alpha3Code: "TES",
            population: 3000,
            currencies: [
              {
                name: "Test Money",
                symbol: "*",
                code: "TMY",
              },
            ],
          },
        ],
      },
    },
  },
  {
    request: {
      query: CURRENCY_RATES_QUERY,
      variables: {
        currencySymbols: ["TMY", "SEK"],
      },
    },
    result: {
      data: {
        currencyRates: {
          base: "EUR",
          rates: [
            {
              code: "TMY",
              rate: 1.18581,
            },
            {
              code: "SEK",
              rate: 10.180451,
            },
          ],
        },
      },
    },
  },
];
