import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink, ServerError } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GQL_URL } from "./constants";
import {
  getAuthTokenFromSessionStorage,
  removeAuthTokenFromSessionStorage,
} from "./sessionStorage";

const gqlHttpLink = createHttpLink({
  uri: GQL_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${getAuthTokenFromSessionStorage()}`,
    },
  };
});

const errorLink = onError(({ networkError }) => {
  // Custom error message to show user friendly errors
  if (networkError) {
    const { statusCode } = networkError as ServerError;
    switch (statusCode) {
      case 429:
        networkError.message = "TOO_MANY_REQUESTS";
        break;
      case 401:
        // Remove expired token from session storage
        removeAuthTokenFromSessionStorage();
        networkError.message = "UNAUTHORIZED";
        break;
      default:
        networkError.message = "IMPLEMENTATION_ERROR";
    }
  }
});

export const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(gqlHttpLink),
  cache: new InMemoryCache(),
});
