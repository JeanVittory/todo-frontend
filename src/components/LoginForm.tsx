import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { Credentials } from "../types/credentials";
import { INVALID_EMAIL_MESSAGE, PASSWORD_REQUIRED_MESSAGE } from "../constants";
import { handleApiError, validateEmail, verifyJWT } from "../utils";
import { authenticate } from "../services/authentication";
import { useAuth } from "../providers/AuthProvider";
import { useAuthStore } from "../store";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [_touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const setUser = useAuthStore((state) => state.setUser);

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!credentials.email) {
      newErrors.email = INVALID_EMAIL_MESSAGE;
    } else if (!validateEmail(credentials.email)) {
      newErrors.email = INVALID_EMAIL_MESSAGE;
    }

    if (!credentials.password) {
      newErrors.password = PASSWORD_REQUIRED_MESSAGE;
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    try {
      setIsLoading(true);
      const { status, data } = await authenticate(credentials);
      const { valid, payload } = await verifyJWT(data.accessToken);

      if (!valid || status !== 200) return;
      setUser({
        email: payload?.email as string,
        name: payload?.name as string,
      });
      signIn();
      navigate("/dashboard");
      setIsLoading(false);
      setCredentials({ email: "", password: "" });
    } catch (error: unknown) {
      handleApiError(error);
      setCredentials({ email: "", password: "" });
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));

    if (id === "email" && value && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: INVALID_EMAIL_MESSAGE }));
    }
  };

  return (
    <Card className="w-full max-w-md bg-black text-gray-100">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Sign In
        </CardTitle>
        <CardDescription className="text-gray-400 text-center">
          Enter your credentials to access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="email" className="text-gray-200">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className={`pl-10 bg-gray-700 text-gray-100 placeholder:text-gray-400 focus:ring-gray-400 focus:border-gray-400 ${
                  errors.email ? "border-red-500" : "border-gray-600"
                }`}
                value={credentials.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="password" className="text-gray-200">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className={`pl-10 bg-gray-700 text-gray-100 placeholder:text-gray-400 focus:ring-gray-400 focus:border-gray-400 ${
                  errors.password ? "border-red-500" : "border-gray-600"
                }`}
                value={credentials.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-500 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
