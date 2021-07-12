import { FormEvent } from "react";
import { CountrySearchResult } from "../../pages/Dashboard/dashboard.types";

export type CountrySearchFunction = (
  event: FormEvent,
  searchString: string
) => void;

export type AddCountryToListFunction = (
  countryData: CountrySearchResult
) => void;
