import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { calculateAge } from "@/utils/calculateAge";
import { Calendar as RotateCcw } from "lucide-react";
import ResultTime from "@/components/time/ResultTime";
import SummaryGrid from "@/components/ui/SummaryGrid";
import PageTitle from "@/components/ui/PageTitle";
import { menuItems } from "@/constants/menuItems";

function AgeCalculator() {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  if (!currentItem) {
    return null;
  }

  const [selected, setSelected] = useState(null);

  const age = selected ? calculateAge(selected) : null;
  const isInvalidDate =
    age && (age.days < 0 || age.months < 0 || age.years < 0);

  const getStats = (birthDate) => {
    if (!birthDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const birth = new Date(birthDate);
    birth.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths =
      (today.getFullYear() - birth.getFullYear()) * 12 +
      (today.getMonth() - birth.getMonth());

    let nextBday = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate(),
    );
    if (nextBday < today) nextBday.setFullYear(today.getFullYear() + 1);

    const daysToNext = Math.ceil(
      (nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    const nextAge = nextBday.getFullYear() - birth.getFullYear();

    return {
      totalDays,
      totalWeeks,
      totalMonths,
      nextBdayFormatted: nextBday.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      nextAge,
      daysToNext,
    };
  };

  const stats = selected && !isInvalidDate ? getStats(selected) : null;

  return (
    <div className="mx-auto max-w-5xl flex justify-center xl:flex-row flex-col gap-8 p-4">
      {/* ─── CALENDAR PICKER CARD ─── */}
      <Card className="p-8 border-2 border-[var(--border)] shadow-md rounded-3xl w-full xl:max-w-md">
        <div className="flex flex-col gap-6">
          <PageTitle title={currentItem.title} icon={<currentItem.icon />} label={currentItem.label} />

          <div className="flex justify-center p-3 rounded-2xl">
            <DayPicker
              captionLayout="dropdown"
              navLayout="after"
              mode="single"
              selected={selected}
              onSelect={setSelected}
              disabled={{ after: new Date() }}
              classNames={{
                months: "flex justify-center",
                caption: "text-base font-bold text-[var(--text)]",
                weekday: "text-xs font-semibold text-gray-400",
                today:
                  "border border-[var(--primary)] text-[var(--primary)] font-bold",
                day: "text-sm text-[var(--text)] hover:bg-[var(--primary)]/20 rounded-xl transition-all",
                selected:
                  "!bg-[var(--primary)] !text-white font-bold rounded-xl shadow-sm",
                outside: "text-gray-600 opacity-40",
              }}
            />
          </div>

          <div className="flex justify-center pt-2">
            <Button
              type="button"
              onClick={() => setSelected(null)}
              disabled={!selected}
              variant="ghost"
              size="sm"
              icon={RotateCcw}
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* ─── ERROR STATE ─── */}
      {isInvalidDate && (
        <Card className="p-6 border-2 border-red-500/50 bg-red-500/10 rounded-3xl h-fit">
          <p className="text-red-400 text-sm font-semibold text-center">
            Please select a valid birth date in the past.
          </p>
        </Card>
      )}

      {/* ─── CONDENSED RESULT CARD ─── */}
      {age && !isInvalidDate && stats && (
        <Card className="p-8 border-1 border-[var(--primary)] bg-[var(--primary)]/10 shadow-lg rounded-3xl w-full xl:max-w-md transition-all duration-300">
          <div className="flex flex-col gap-6">
            <ResultTime
              title="Result"
              variant="ymd"
              time={age}
              label="Years • Months • Days"
            />

            <hr className="border-t border-[var(--primary)] opacity-50" />

            <SummaryGrid
              title="Summary"
              cols={2}
              items={[
                {
                  value: stats.totalDays.toLocaleString(),
                  label: "Total Days",
                },
                {
                  value: stats.totalWeeks.toLocaleString(),
                  label: "Total Weeks",
                },
                {
                  value: stats.totalMonths.toLocaleString(),
                  label: "Total Months",
                },
                {
                  value: `${stats.daysToNext} days`,
                  label: `Turns ${stats.nextAge} in`,
                },
              ]}
            />
          </div>
        </Card>
      )}
    </div>
  );
}

export default AgeCalculator;
