// Country search types
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

// Currency rates types
interface Rate {
  code: string;
  rate: number;
}
export interface CurrencyRates {
  base: string;
  rates: Array<Rate>;
}

export interface CurrencyRatesGqlRes {
  currencyRates: CurrencyRates;
}

export interface CurrencyRatesReqVars {
  currencySymbols: Array<string>;
}
