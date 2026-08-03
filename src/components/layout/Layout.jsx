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
    <div className="min-h-screen bg-[var(--background)]/90">
      <Header />
      <Sidebar />

      <div className="sm:ml-16 pt-12 pb-16 sm:p-0">
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/time-calculator" element={<TimeCalculator />} />
            <Route path="/time-zone" element={<TimeZoneCalculator />} />
            <Route path="/date-calculator" element={<DateCalculator />} />
            <Route path="/day-calculator" element={<DayCalculator />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/chronometer" element={<Chronometer />} />
            <Route path="/timer" element={<Timer />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Layout;
