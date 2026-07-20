import { useLocation } from "react-router-dom";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Time Calculator", path: "/time-calculator" },
  { name: "Date Calculator", path: "/date-calculator" },
  { name: "Duration Calculator", path: "/duration-calculator" },
  { name: "Day Calculator", path: "/day-calculator" },
  { name: "Age Calculator", path: "/age-calculator" },
  { name: "Time Zone", path: "/time-zone" },
  { name: "Chronometer", path: "/chronometer" },

];

function Header() {
  const location = useLocation();

  const currentPage =
    menuItems.find((item) => item.path === location.pathname) || menuItems[0];

  return (
    <header className="relative z-10 flex h-16 items-center border-b-1 border-[var(--background)] bg-[var(--background)]/90 p-4 text-white">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">{currentPage.name}</h2>
      </div>
    </header>
  );
}

export default Header;
