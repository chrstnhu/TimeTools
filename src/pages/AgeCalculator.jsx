import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { calculateAge } from "@/utils/calculateAge";

function AgeCalculator() {
  const [selected, setSelected] = useState(null);

  const age = selected ? calculateAge(selected) : null;

  const isInvalidDate =
    age && (age.days < 0 || age.months < 0 || age.years < 0);

  const totalDays = selected
    ? Math.floor((new Date() - selected) / (1000 * 60 * 60 * 24))
    : null;

  const handleReset = () => {
    setSelected(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-semibold">Select your birth date</label>

            <p className="text-sm text-gray-400">
              Choose your date of birth to calculate your age.
            </p>
          </div>

          <div className="flex justify-center">
            <DayPicker
              captionLayout="dropdown"
              navLayout="after"
              mode="single"
              selected={selected}
              onSelect={setSelected}
              disabled={{ after: new Date() }}
              classNames={{
                months: "flex justify-center",

                caption: "text-lg font-bold text-[var(--text)]",

                weekday: "text-sm font-medium text-gray-400",

                today: "border border-blue-400",

                day: "text-[var(--text-foreground)] hover:bg-[var(--primary)] rounded-full",

                selected:
                  "bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full",

                outside: "text-gray-600",
              }}
            />
          </div>

          <div className="flex justify-center">
            <Button type="button" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {isInvalidDate && (
        <Card>
          <p className="text-red-400 font-semibold">
            Please select a valid birth date.
          </p>
        </Card>
      )}

      {age && !isInvalidDate && (
        <Card>
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-bold text-lg">Your age</h2>

              <p className="text-sm text-gray-400">Current age calculation</p>
            </div>

            <Card>
              <p className="text-xl font-bold text-center">
                {age.years} year(s), {age.months} month(s), {age.days} day(s)
              </p>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Card>
                <p className="text-sm text-gray-400">Total days</p>

                <p className="text-2xl font-bold">{totalDays}</p>
              </Card>

              <Card>
                <p className="text-sm text-gray-400">Born date</p>

                <p className="text-lg font-bold">
                  {selected.toLocaleDateString()}
                </p>
              </Card>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default AgeCalculator;
