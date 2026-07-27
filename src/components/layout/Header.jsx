import { useLocation } from "react-router-dom";
import { menuItems } from "@/constants/menuItems";
function Header() {
  const location = useLocation();

  const currentPage =
    menuItems.find((item) => item.path === location.pathname) || menuItems[0];

  const Icon = currentPage.icon;

  return (
    <header className="pl-20 relative z-10 flex h-16 items-center shadow-md bg-[var(--background)] p-4 text-[var(--text)]">
      <div className="flex items-center gap-3">
        {Icon && <Icon size={24} className="text-[var(--primary)]" />}
        <h2 className="text-2xl font-bold text-[var(--text-title)]">
          {currentPage.name}
        </h2>
      </div>
    </header>
  );
}

export default Header;
