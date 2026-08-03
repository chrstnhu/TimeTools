import { useLocation } from "react-router-dom";
import { menuItems } from "@/constants/menuItems";
import ThemeToggle from "@/components/ui/ThemeToggle";

function Header() {
  const location = useLocation();

  const currentPage =
    menuItems.find((item) => item.path === location.pathname) || menuItems[0];

  const Icon = currentPage.icon;

  return (
    <header className="fixed sm:relative z-11 flex h-16 w-full items-center shadow-md bg-[var(--background)] px-4 sm:px-8 text-[var(--text)]">
      
      {/* --- MOBILE --- */}
      <div className="flex sm:hidden items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <img 
            alt="Timetools Logo" 
            className="app-logo h-8 w-auto" 
          />

          <h2 className="text-xl font-bold text-[var(--text-title)]">
            Timetools
          </h2>
        </div>

        <ThemeToggle />
      </div>

      {/* --- DESKTOP --- */}
      <div className="hidden sm:flex items-center justify-between w-full sm:pl-16">
        <div className="flex items-center gap-3">
          {Icon && <Icon size={24} className="text-[var(--primary)]" />}
          <h2 className="text-2xl font-bold text-[var(--text-title)]">
            {currentPage.name}
          </h2>
        </div>
      </div>

    </header>
  );
}

export default Header;