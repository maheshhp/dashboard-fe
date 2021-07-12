import { FormEvent } from "react";

export type OnCurrencyConvertFunction = (
  event: FormEvent,
  currencyValue: number
) => void;

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
