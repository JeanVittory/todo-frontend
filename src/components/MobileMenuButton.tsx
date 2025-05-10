import React from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

type MobileMenuButtonProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: React.SetStateAction<boolean>) => void;
};

export default function MobileMenuButton({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: MobileMenuButtonProps) {
  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Abrir menú"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
