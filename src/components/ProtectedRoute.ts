import { type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store";

type ProtectedRouteProps = PropsWithChildren;
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isUserVerified = useAuthStore((state) => state.isUserVerified);
  const navigate = useNavigate();

  if (!isUserVerified) navigate("/", { replace: true });

  return children;
}
