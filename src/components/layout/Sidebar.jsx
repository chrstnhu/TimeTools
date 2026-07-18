import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Clock,
  Calendar,
  Cake,
  Globe,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Time Calculator", path: "/time-calculator", icon: Clock },
  { name: "Date Calculator", path: "/date-calculator", icon: Calendar },
  { name: "Age Calculator", path: "/age-calculator", icon: Cake },
  { name: "Time Zone", path: "/time-zone", icon: Globe },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-16">
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-[var(--background)] shadow-lg transition-all duration-300
        ${isOpen ? "w-56" : "w-16"}`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4">
          {isOpen && (
            <h2 className="text-xl font-bold text-white">
              Time Tools
            </h2>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-white hover:bg-white/10"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center rounded-lg p-3 text-white transition-colors hover:bg-white/10
                    ${isOpen ? "gap-4" : "justify-center"}`}
                  >
                    <Icon size={22} />

                    {isOpen && (
                      <span className="whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;