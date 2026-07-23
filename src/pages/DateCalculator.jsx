import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

function DateCalculator() {
  const [range, setRange] = useState();
  function getDaysDifference() {
    if (!range?.from || !range?.to) return null;

    const diffTime = Math.abs(range.to - range.from) + 1;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const days = getDaysDifference();
  const hasResult = days !== null;

  const handleReset = () => {
    setRange(undefined);
  };

  return (
    <div className="mx-auto max-w-5xl flex justify-center xl:flex-row sm:flex-col gap-8">
      <Card>
        <label>Select a start and end date (include start and end date):</label>

        <DayPicker
          captionLayout="dropdown"
          navLayout="after"
          mode="range"
          selected={range}
          onSelect={setRange}
          classNames={{
            months: "flex justify-center",
            caption: "text-lg font-bold text-[var(--text)]",

            weekday: "text-sm font-medium text-gray-400",

            today: "border border-white-400",

            day: "text-[var(--text)] hover:bg-[var(--primary)] rounded-full",
            range_start: "bg-[var(--primary)] text-[var(--primary-foreground)]",
            range_middle:
              "bg-[var(--primary)]/50  text-[var(--primary-foreground)] ",
            range_end: "bg-[var(--primary)] text-[var(--primary-foreground)]",

            selected:
              "bg-[var(--primary)]  text-[var(--primary-foreground)] rounded-full",

            outside: "text-gray-600",
          }}
        />

        <div className="flex justify-center mt-6">
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </Card>

      {hasResult && (
        <Card className="p-8 transition-all duration-300">
          <p className="mb-3 uppercase tracking-[0.3em] text-sm text-gray-400">
            Result
          </p>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg">
            <p
              className="text-6xl font-black tracking-widest"
              style={{
                fontFamily: "var(--font-mono)",
              }}
            >
              {days}
              <span className="text-lg ml-2 text-gray-400">day(s)</span>
            </p>
          </div>

          <div className="grid gap-5 grid-cols-2 mt-6">
            <Card className="rounded-3xl p-6 text-center">
              <p className="text-sm text-gray-400 uppercase">From</p>
              <p className="font-semibold">{range.from.toLocaleDateString()}</p>
            </Card>

            <Card className="rounded-3xl p-6 text-center">
              <p className="text-sm text-gray-400 uppercase">To</p>
              <p className="font-semibold">{range.to.toLocaleDateString()}</p>
            </Card>
          </div>
        </Card>
      )}
    </div>
  );
}

export default DateCalculator;
