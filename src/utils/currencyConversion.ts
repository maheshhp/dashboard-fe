import {
  CountrySearchResult,
  CurrencyRates,
} from "../pages/Dashboard/dashboard.types";

export const convertSekToCurrenciesInList = (
  currencyResponse: CurrencyRates | undefined,
  currencyValue: number,
  countriesInList: Array<CountrySearchResult>
): Record<string, Record<string, number>> => {
  if (!currencyResponse) {
    return {};
  }
  const ratesMap: Record<string, number> = currencyResponse.rates.reduce(
    (map, rate) => {
      return {
        ...map,
        [rate.code]: rate.rate,
      };
    },
    {}
  );
  const sekInBaseCurrency = ratesMap["SEK"];
  if (!sekInBaseCurrency) {
    return {};
  }
  const valueInBaseCurrency = currencyValue / sekInBaseCurrency;
  const convertedValues: Record<
    string,
    Record<string, number>
  > = countriesInList.reduce((countriesMap, country) => {
    const countryCode = country.alpha3Code;
    const perCountryValues: Record<string, number> = country.currencies.reduce(
      (conversionMap, currency) => {
        return {
          ...conversionMap,
          [currency.code]: Number(
            valueInBaseCurrency * ratesMap[currency.code]
          ).toFixed(2),
        };
      },
      {}
    );
    return {
      ...countriesMap,
      [countryCode]: perCountryValues,
    };
  }, {});
  return convertedValues;
};

export const getAllCurrenciesAndCountries = (
  countriesInList: Array<CountrySearchResult>,
  currentCountryData: CountrySearchResult
): { countries: Array<string>; currencies: Set<string> } => {
  const setOfCurrencies = new Set<string>();
  const countries = new Array<string>();
  countriesInList.forEach((country) => {
    countries.push(country.alpha3Code);
    country.currencies.forEach((currency) =>
      setOfCurrencies.add(currency.code)
    );
  });
  currentCountryData.currencies.forEach((currency) =>
    setOfCurrencies.add(currency.code)
  );
  // We need to send SEK by default as we accept input as SEK
  setOfCurrencies.add("SEK");
  return {
    countries,
    currencies: setOfCurrencies,
  };
};
