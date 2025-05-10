import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

type MobileNavigationProps = {
  handleLogout: () => void;
};

export default function MobileNavigation({
  handleLogout,
}: MobileNavigationProps) {
  return (
    <div className="md:hidden bg-white border-t border-gray-200">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full justify-start mt-2 flex items-center"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
