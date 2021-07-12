import { FormEvent } from "react";

export type CountrySearchFunction = (
  event: FormEvent,
  searchString: string
) => void;

export type AddCountryToListFunction = (
  countryData: CountrySearchResult
) => void;

interface SearchCurrency {
  code: string;
  name: string;
  symbol: string;
}

export interface CountrySearchResult {
  name: string;
  alpha3Code: string;
  population: number;
  currencies: Array<SearchCurrency>;
}

export interface CountrySearchGqlRes {
  searchCountries: Array<CountrySearchResult>;
}

export interface CountrySearchReqVars {
  countryName: string;
}
