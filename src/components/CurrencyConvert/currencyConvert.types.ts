import { FormEvent } from "react";

export type OnCurrencyConvertFunction = (
  event: FormEvent,
  currencyValue: number
) => void;
