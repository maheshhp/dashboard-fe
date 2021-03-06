import { AUTH_TOKEN_SESSION_STORAGE_KEY } from "./constants";

export const getAuthTokenFromSessionStorage = (): string | null => {
  const authTokenString = sessionStorage.getItem(
    AUTH_TOKEN_SESSION_STORAGE_KEY
  );
  if (authTokenString) {
    const authToken = JSON.parse(authTokenString);
    return authToken.accessToken;
  }
  return null;
};

export const setAuthTokenInSessionStorage = (accessToken: string): void => {
  sessionStorage.setItem(
    AUTH_TOKEN_SESSION_STORAGE_KEY,
    JSON.stringify({ accessToken })
  );
};

export const removeAuthTokenFromSessionStorage = (): void => {
  sessionStorage.removeItem(AUTH_TOKEN_SESSION_STORAGE_KEY);
};
