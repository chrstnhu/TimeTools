import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TimeCalculator from "@/pages/TimeCalculator";
import DurationCalculator from "@/pages/DurationCalculator";
import TimeZoneCalculator from "@/pages/TimeZoneCalculator";

function Layout() {
  return (
    <div className="min-h-screen bg-[var(--background)]/90">
      <Sidebar />

      <div className="ml-16">
        <Header />

        <main className="p-4">
          <Routes>
            <Route path="/time-calculator" element={<TimeCalculator />} />
            <Route
              path="/duration-calculator"
              element={<DurationCalculator />}
            />
            <Route path="/time-zone" element={<TimeZoneCalculator />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Layout;
