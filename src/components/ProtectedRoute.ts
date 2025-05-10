import { type PropsWithChildren } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router";

type ProtectedRouteProps = PropsWithChildren;
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  if (!isSignedIn) navigate("/", { replace: true });

  return children;
}
