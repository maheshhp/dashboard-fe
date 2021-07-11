import { useState } from "react";
import {
  setAuthTokenInSessionStorage,
  getAuthTokenFromSessionStorage,
} from "../../utils/sessionStorage";

const useAuthToken = () => {
  const storeAuthToken = (accessToken: string): void => {
    setAuthTokenInSessionStorage(accessToken);
    setAuthToken(accessToken);
  };

  const [authToken, setAuthToken] = useState(getAuthTokenFromSessionStorage());

  return {
    authToken,
    storeAuthToken,
  };
};

export default useAuthToken;
