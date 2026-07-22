import { useState } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle({ isOpen }) {
  const [light, setLight] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (light) {
      html.classList.remove("light");
    } else {
      html.classList.add("light");
    }

    setLight(!light);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`flex w-full items-center rounded-2xl p-3 text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors
      ${isOpen ? "gap-4" : "justify-center"}`}
    >
      {light ? <Moon size={22} /> : <Sun size={22} />}

      {isOpen && <span>{light ? "Dark mode" : "Light mode"}</span>}
    </button>
  );
}

export default ThemeToggle;
