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
    <>
      {/* MOBILE: MORE MENU */}
      {showMoreMobile && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 sm:hidden"
          onClick={() => setShowMoreMobile(false)}
        >
          <div
            className="absolute bottom-20 right-3 flex w-48 max-w-[calc(100vw-1.5rem)] flex-col gap-1 overflow-hidden rounded-2xl border border-white/10 bg-[var(--background)] p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {secondaryMobileItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMoreMobile(false)}
                  className="flex min-w-0 items-center gap-3 rounded-xl p-3 text-[var(--text)] hover:bg-[var(--surface-hover)]"
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="break-words text-sm font-medium">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-x-0 bottom-0 z-50 box-border flex h-16 w-full max-w-full items-center justify-between overflow-hidden border-t border-white/10 bg-[var(--background)] shadow-lg transition-all duration-300 sm:inset-x-auto sm:bottom-auto sm:left-0 sm:top-0 sm:h-screen sm:max-w-none sm:flex-col sm:border-t-0 ${
          isOpen ? "sm:w-60" : "sm:w-16"
        }`}
      >
        {/* DESKTOP HEADER */}
        <div
          className={`hidden h-16 shrink-0 items-center px-4 sm:flex sm:w-full ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex min-w-0 items-center gap-2 overflow-hidden">
            <img
              src="/logo.png"
              alt="Timetools Logo"
              className="app-logo h-8 w-auto shrink-0"
            />

            {isOpen && (
              <h2 className="whitespace-nowrap text-xl font-bold text-[var(--text)]">
                Time Tools
              </h2>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            className="shrink-0 rounded-md p-2 text-[var(--text)] hover:bg-white/10"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex min-w-0 w-full items-center justify-between p-2 sm:mt-4 sm:flex-1 sm:flex-col">
          {/* MOBILE NAVIGATION */}
          <ul className="flex w-full min-w-0 items-center justify-around sm:hidden">
            {primaryMobileItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path} className="min-w-0">
                  <Link
                    to={item.path}
                    aria-label={item.name}
                    className="flex items-center justify-center rounded-2xl p-3 text-[var(--text)] hover:bg-[var(--surface-hover)]"
                  >
                    <Icon size={22} />
                  </Link>
                </li>
              );
            })}

            {secondaryMobileItems.length > 0 && (
              <li className="min-w-0">
                <button
                  type="button"
                  onClick={() => setShowMoreMobile(!showMoreMobile)}
                  aria-label="More navigation options"
                  aria-expanded={showMoreMobile}
                  className="flex items-center justify-center rounded-2xl p-3 text-[var(--text)] hover:bg-[var(--surface-hover)]"
                >
                  <MoreHorizontal size={22} />
                </button>
              </li>
            )}
          </ul>

          {/* DESKTOP NAVIGATION */}
          <ul className="hidden w-full min-w-0 sm:flex sm:flex-col sm:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path} className="min-w-0">
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex min-w-0 items-center rounded-2xl p-3 text-[var(--text)] transition-colors hover:bg-[var(--surface-hover)] ${
                      isOpen ? "sm:gap-4" : "justify-center"
                    }`}
                  >
                    <Icon size={22} className="shrink-0" />

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

          {/* THEME TOGGLE */}
          <div className="hidden sm:block">
            <ThemeToggle isOpen={isOpen} />
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;