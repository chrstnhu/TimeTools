import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MoreHorizontal } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { menuItems } from "@/constants/menuItems";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreMobile, setShowMoreMobile] = useState(false);

  const primaryMobileItems = menuItems.slice(0, 3);
  const secondaryMobileItems = menuItems.slice(3);

  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full sm:top-0 sm:h-screen sm:w-16">
      {/* Menu "more..." for Mobile */}
      {showMoreMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={() => setShowMoreMobile(false)}
        >
          <div
            className="absolute bottom-20 right-4 w-48 rounded-2xl bg-[var(--background)] p-2 shadow-2xl border border-white/10 flex flex-col gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {secondaryMobileItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMoreMobile(false)}
                  className="flex items-center gap-3 rounded-xl p-3 text-[var(--text)] hover:bg-[var(--surface-hover)]"
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <aside
        className={`fixed bottom-0 left-0 z-50 flex w-full items-center justify-between border-t border-white/10 bg-[var(--background)] shadow-lg transition-all duration-300 sm:bottom-auto sm:top-0 sm:h-screen sm:flex-col sm:border-t-0 ${
          isOpen ? "sm:w-60" : "sm:w-16"
        }`}
      >
        {/* Header Desktop avec Logo */}
        <div
          className={`hidden h-16 items-center px-4 sm:flex sm:w-full ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src="/logo.png"
              alt="Timetools Logo"
              className="app-logo h-8 w-auto shrink-0"
            />
            {isOpen && (
              <h2 className="text-xl font-bold text-[var(--text)] whitespace-nowrap">
                Time Tools
              </h2>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-[var(--text)] hover:bg-white/10"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex w-full items-center justify-between p-2 sm:mt-4 sm:flex-1 sm:flex-col">
          {/* --- Mobile display --- */}
          <ul className="flex w-full justify-around sm:hidden">
            {primaryMobileItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center justify-center rounded-2xl p-3 text-[var(--text)]"
                  >
                    <Icon size={22} />
                  </Link>
                </li>
              );
            })}

            {/* Icon "..." */}
            {secondaryMobileItems.length > 0 && (
              <li>
                <button
                  onClick={() => setShowMoreMobile(!showMoreMobile)}
                  className="flex items-center justify-center rounded-2xl p-3 text-[var(--text)] hover:bg-[var(--surface-hover)]"
                >
                  <MoreHorizontal size={22} />
                </button>
              </li>
            )}
          </ul>

          {/* --- Desktop display --- */}
          <ul className="hidden sm:flex w-full sm:flex-col sm:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center rounded-2xl p-3 text-[var(--text)] transition-colors hover:bg-[var(--surface-hover)] ${
                      isOpen ? "sm:gap-4" : "justify-center"
                    }`}
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

          {/* ThemeToggle */}
          <div className="hidden sm:block">
            <ThemeToggle isOpen={isOpen} />
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;