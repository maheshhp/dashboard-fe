import { useState } from "react";

const AUTH_TOKEN_SESSION_STORAGE_KEY = "dashboardAuthToken";

const useAuthToken = () => {
  const getAuthToken = (): string | null => {
    const authTokenString = sessionStorage.getItem(
      AUTH_TOKEN_SESSION_STORAGE_KEY
    );
    if (authTokenString) {
      const authToken = JSON.parse(authTokenString);
      return authToken.accessToken;
    }

    return null;
  };

  const storeAuthToken = ({ accessToken }: Record<string, string>): void => {
    sessionStorage.setItem(
      AUTH_TOKEN_SESSION_STORAGE_KEY,
      JSON.stringify({ accessToken })
    );
    setAuthToken(accessToken);
  };

  const [authToken, setAuthToken] = useState(getAuthToken());

  return {
    authToken,
    storeAuthToken,
  };
};

export default useAuthToken;
