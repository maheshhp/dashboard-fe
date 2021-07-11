import { gql } from "@apollo/client";

export const SEARCH_COUNTRIES_QUERY = gql`
  query SearchCountries($countryName: String!) {
    searchCountries(countryName: $countryName) {
      name
      alpha3Code
      population
      currencies {
        name
        symbol
        code
      }
    }
  }
`;
