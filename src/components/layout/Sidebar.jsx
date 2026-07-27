import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { menuItems } from "@/constants/menuItems";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-16">
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col justify-between bg-[var(--background)] shadow-lg transition-all duration-300
        ${isOpen ? "w-60" : "w-16"}`}
      >
        {/* Header */}
        <div className="flex h-16 items-center px-4 justify-between">
          {isOpen && (
            <h2 className="text-xl font-bold text-[var(--text)]">Time Tools</h2>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-[var(--text)] hover:bg-white/10"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1 p-2 justify-between flex flex-col">
          <div>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center rounded-2xl p-3 text-[var(--text)]  transition-colors hover:bg-[var(--surface-hover)]
                    ${isOpen ? "gap-4" : "justify-center"}`}
                    >
                      <Icon size={22} />

                      {isOpen && (
                        <span className="whitespace-nowrap">{item.name}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <ThemeToggle isOpen={isOpen} />
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
