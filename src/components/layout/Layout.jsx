import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TimeCalculator from "@/pages/TimeCalculator";
import TimeZoneCalculator from "@/pages/TimeZoneCalculator";
import DateCalculator from "@/pages/DateCalculator";
import DayCalculator from "@/pages/DayCalculator";
import AgeCalculator from "@/pages/AgeCalculator";
import Chronometer from "@/pages/Chronometer";
import HomePage from "@/pages/HomePage";
import Timer from "@/pages/Timer";

function Layout() {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-[var(--background)]/90">
      <Header />
      <Sidebar />

      {/* Main content */}
      <div className="box-border w-full min-w-0 pt-16 pb-20 sm:ml-16 sm:w-[calc(100%-4rem)] sm:pt-0 sm:pb-0">
        <main className="box-border w-full min-w-0 p-3 sm:p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/time-calculator"
              element={<TimeCalculator />}
            />
            <Route
              path="/time-zone"
              element={<TimeZoneCalculator />}
            />
            <Route
              path="/date-calculator"
              element={<DateCalculator />}
            />
            <Route
              path="/day-calculator"
              element={<DayCalculator />}
            />
            <Route
              path="/age-calculator"
              element={<AgeCalculator />}
            />
            <Route
              path="/chronometer"
              element={<Chronometer />}
            />
            <Route path="/timer" element={<Timer />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Layout;