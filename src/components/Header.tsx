import { useState } from "react";
import DesktopNavigation from "./DesktopNavigation";
import MobileMenuButton from "./MobileMenuButton";
import MobileNavigation from "./MobileNavigation";
import { logout } from "../services/authentication";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router";
import { handleApiError } from "../utils";
import { useAuthStore } from "../store";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const clearUser = useAuthStore((state) => state.clearUser);
  const handleLogout = async () => {
    try {
      await logout();
      signOut();
      clearUser();
      navigate("/", { replace: true });
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">Dashboard</span>
          </div>
          <DesktopNavigation handleLogout={handleLogout} />
          <MobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>

      {isMobileMenuOpen && <MobileNavigation handleLogout={handleLogout} />}
    </header>
  );
}
