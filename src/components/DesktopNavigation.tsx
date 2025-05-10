import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

type DesktopNavigationProps = {
  handleLogout: () => void;
};

export default function DesktopNavigation({
  handleLogout,
}: DesktopNavigationProps) {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="ml-4 flex items-center"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </nav>
  );
}
