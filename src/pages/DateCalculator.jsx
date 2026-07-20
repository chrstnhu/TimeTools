import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Button from "@/components/ui/Button";

function DateCalculator() {
  const [range, setRange] = useState();
  function getDaysDifference() {
    if (!range?.from || !range?.to) return null;

    const diffTime = Math.abs(range.to - range.from) + 1;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const days = getDaysDifference();

  const handleReset = () => {
    setRange(null);
  };

  const hasResult = days !== null;
  
  return (
    <div className="bg-[var(--background)] p-5 rounded-lg text-white">
      <label>
        Select a start and end date to calculate the number of days (include
        start and end date):
      </label>

      <DayPicker
        captionLayout="dropdown"
        navLayout="after"
        mode="range"
        selected={range}
        onSelect={setRange}
        classNames={{
          months: "flex justify-center",
          caption: "text-lg font-bold text-white",

          weekday: "text-sm font-medium text-gray-400",

          today: "border border-white-400",

          day: "text-white hover:bg-blue-600 rounded-full",
          range_start: "bg-blue-800 text-white",
          range_middle: "bg-blue-100 text-white ",
          range_end: "bg-blue-800 text-white",

          selected: "bg-blue-500 text-white rounded-full",

          outside: "text-gray-600",

          footer: "text-center text-gray-400",
        }}
      />

      {hasResult && (
        <div className="flex flex-col items-center text-gray-400 gap-2">
          <div className="flex flex-row gap-2 items-center">
            {range?.from && (
              <p>
                From
                <span className="text-white ml-1">
                  {range.from.toLocaleDateString()}
                </span>
              </p>
            )}

            {range?.to && (
              <p>
                to
                <span className="text-white ml-1">
                  {range.to.toLocaleDateString()}
                </span>
              </p>
            )}
            {days !== null && (
              <p className="text-xl font-bold text-white">({days} days)</p>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col items-center text-gray-400 gap-2">
        <Button
          type="button"
          onClick={handleReset}
          className="ml-2 text-blue-400"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default DateCalculator;
