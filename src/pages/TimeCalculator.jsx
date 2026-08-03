import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import TimeOperation from "@/components/time/TimeOperation";
import TimeInterval from "@/components/time/TimeInterval";
import { menuItems } from "@/constants/menuItems";

export default function TimeCalculator() {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  const [mode, setMode] = useState("calculator");

  if (!currentItem) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto max-w-5xl transition-all duration-300">
      {mode === "calculator" ? (
        <TimeOperation
          currentItem={currentItem}
          mode={mode}
          setMode={setMode}
        />
      ) : (
        <TimeInterval
          currentItem={currentItem}
          mode={mode}
          setMode={setMode}
        />
      )}
    </div>
  );
}
