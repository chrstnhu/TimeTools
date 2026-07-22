import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TimeCalculator from "@/pages/TimeCalculator";
import DurationCalculator from "@/pages/DurationCalculator";
import TimeZoneCalculator from "@/pages/TimeZoneCalculator";
import DateCalculator from "@/pages/DateCalculator";
import DayCalculator from "@/pages/DayCalculator";
import AgeCalculator from "@/pages/AgeCalculator";
import Chronometer from "@/pages/Chronometer";
import HomePage from "@/pages/HomePage";


function Layout() {
  return (
    <div className="min-h-screen bg-[var(--background)]/90">
      <Sidebar />

      <div className="ml-16">
        <Header />

        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/time-calculator" element={<TimeCalculator />} />
            <Route
              path="/duration-calculator"
              element={<DurationCalculator />}
            />
            <Route path="/time-zone" element={<TimeZoneCalculator />} />
            <Route path="/date-calculator" element={<DateCalculator />} />
            <Route path="/day-calculator" element={<DayCalculator />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/chronometer" element={<Chronometer />} />

          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Layout;
