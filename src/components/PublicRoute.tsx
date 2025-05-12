import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { useEffect, type PropsWithChildren } from "react";

type PublicRoute = PropsWithChildren;
export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { user, isLoading, isUserVerified, verifyAuth } = useAuthStore();

  useEffect(() => {
    verifyAuth();
    if (!isLoading && user && isUserVerified) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isLoading, isUserVerified, navigate, verifyAuth]);

  if (isLoading) return <div>Cargando...</div>;

  return children;
}
