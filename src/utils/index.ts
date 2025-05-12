import axios from "axios";
import { PUBLIC_JWT_KEY, regexEmail } from "../constants";
import { toast } from "react-toastify";
import { jwtVerify, errors as joseErrors, importSPKI } from "jose";
import type { Priority } from "../types/todos";

export const validateEmail = (email: string) => {
  return regexEmail.test(email);
};

export const handleApiError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    toast(error.response?.data.message || "No message error");
  } else if (error instanceof Error) {
    toast(error.message || "No message error");
  } else {
    toast("Unkown error");
  }
};

export const verifyJWT = async (token: string) => {
  try {
    const publicKey = await importSPKI(PUBLIC_JWT_KEY, "RS256");

    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: ["RS256"],
    });

    if (!payload.email || !payload.exp) {
      return {
        valid: false,
        error: "Invalid Token",
      };
    }

    return {
      valid: true,
      payload: {
        email: payload.email,
        name: payload.name,
        sessionId: payload.sessionId,
        issuedAt: payload.iat,
        expiresAt: payload.exp,
      },
    };
  } catch (error) {
    let errorMessage = "Invalid Token";
    if (error instanceof joseErrors.JWTExpired) {
      errorMessage = "Expired Token";
    } else if (error instanceof joseErrors.JWTInvalid) {
      errorMessage = "Invalid Token";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { valid: false, error: errorMessage };
  }
};

export const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "low":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "medium":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "high":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "";
  }
};
