import { useLocation } from "react-router-dom";
import { menuItems } from "@/constants/menuItems";
import ThemeToggle from "@/components/ui/ThemeToggle";

function Header() {
  const location = useLocation();

  const currentPage =
    menuItems.find((item) => item.path === location.pathname) ||
    menuItems[0];

  const Icon = currentPage.icon;

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-40
        flex h-16 items-center
        box-border
        bg-[var(--background)]
        px-4 sm:px-8
        text-[var(--text)]
        shadow-md
        sm:relative
      "
    >
      {/* MOBILE */}
      <div className="flex w-full min-w-0 items-center justify-between sm:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <img
            src="/logo.png"
            alt="Timetools Logo"
            className="app-logo h-8 w-auto shrink-0"
          />

          <h2 className="truncate text-xl font-bold text-[var(--text-title)]">
            Timetools
          </h2>
        </div>

        <div className="ml-2 shrink-0">
          <ThemeToggle />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden w-full min-w-0 items-center justify-between sm:flex sm:pl-16">
        <div className="flex min-w-0 items-center gap-3">
          {Icon && (
            <Icon
              size={24}
              className="shrink-0 text-[var(--primary)]"
            />
          )}

          <h2 className="truncate text-2xl font-bold text-[var(--text-title)]">
            {currentPage.name}
          </h2>
        </div>
      </div>
    </header>
  );
}

export default Header;