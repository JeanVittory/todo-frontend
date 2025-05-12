import axios from "axios";
import {
  BASE_URL,
  GET_USER_TODOS_ENDPOINT,
  POST_TODO_ENDPOINT,
  DELETE_TODO_ENDPOINT,
  API_V1,
} from "../../constants";
import type { CreateTodo } from "../../types/todos";

export const getTodos = async () => {
  const response = await axios.get(
    `${BASE_URL}${API_V1}${GET_USER_TODOS_ENDPOINT}`,
    {
      withCredentials: true,
    }
  );
  if (response.status === 401) throw response.statusText;
  return response.data.response;
};

export const addTodo = async (newTodo: CreateTodo) => {
  const response = await axios.post(
    `${BASE_URL}${API_V1}${POST_TODO_ENDPOINT}`,
    newTodo,
    {
      withCredentials: true,
    }
  );
  return response.data.response;
};

export const removeTodo = async (todoId: number) => {
  const response = await axios.delete(
    `${BASE_URL}${API_V1}${DELETE_TODO_ENDPOINT}/${todoId}`,
    {
      withCredentials: true,
    }
  );
  return response.data.response;
};
