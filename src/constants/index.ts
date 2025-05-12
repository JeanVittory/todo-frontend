export const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const INVALID_EMAIL_MESSAGE = "Please use a valid email.";
export const PASSWORD_REQUIRED_MESSAGE = "Password is required.";

export const PUBLIC_JWT_KEY = import.meta.env.VITE_PUBLIC_JWT_KEY;

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const API_V1 = "/api/v1";
export const LOGIN_ENDPOINT = "/login";
export const LOGOUT_ENDPOINT = "/logout";
export const GET_USER_TODOS_ENDPOINT = "/todos";
export const POST_TODO_ENDPOINT = "/todo";
export const DELETE_TODO_ENDPOINT = "/todo";
export const VERIFY_ENDPOINT = "/verify";
