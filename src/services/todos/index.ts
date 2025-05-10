import axios from "axios";
import { BASE_URL, GET_USER_TODOS_ENDPOINT } from "../../constants";

export const getTodosByUserEmail = async () => {
  const response = await axios.get(`${BASE_URL}${GET_USER_TODOS_ENDPOINT}`, {
    withCredentials: true,
  });
  return response.data.response;
};
