import axios from "axios";
import { BASE_URL, LOGOUT_ENDPOINT, LOGIN_ENDPOINT } from "../../constants";
import type { Credentials } from "../../types/credentials";

export const authenticate = async (credentials: Credentials) => {
  const response = await axios.post(
    `${BASE_URL}${LOGIN_ENDPOINT}`,
    credentials,
    { withCredentials: true }
  );
  return response;
};

export const logout = async () => {
  const response = await axios.post(
    `${BASE_URL}${LOGOUT_ENDPOINT}`,
    {},
    { withCredentials: true }
  );
  return response;
};
