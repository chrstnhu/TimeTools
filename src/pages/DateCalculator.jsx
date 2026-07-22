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
    <div>
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
        <Card className="mt-4">
          <h2 className="text-xl font-bold mb-4">Result</h2>

          <Card className="text-center">
            <p className="text-3xl font-bold text-[var(--text-color)]">
              {days}
              <span className="text-lg ml-2 text-gray-400">day(s)</span>
            </p>
          </Card>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="rounded-2xl bg-[var(--surface)] p-4 text-center">
              <p className="text-xs text-gray-400">From</p>

              <p className="font-semibold">{range.from.toLocaleDateString()}</p>
            </div>

            <div className="rounded-2xl bg-[var(--surface)] p-4 text-center">
              <p className="text-xs text-gray-400">To</p>

              <p className="font-semibold">{range.to.toLocaleDateString()}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default DateCalculator;
