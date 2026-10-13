import { useState } from "react";
import TimeInput from "@/components/forms/TimeInput";
import Button from "@/components/ui/Button";
import { RotateCcw, Check } from "lucide-react";

function TimeZoneInput({ setCustomTime }) {
  const [time1, setTime1] = useState({ h: 0, m: 0, s: 0 });

  const handleCalculate = () => {
    const h = Number(time1.h);
    const m = Number(time1.m);
    const s = Number(time1.s);

    if (
      !Number.isInteger(h) ||
      !Number.isInteger(m) ||
      !Number.isInteger(s) ||
      h < 0 || h > 23 ||
      m < 0 || m > 59 ||
      s < 0 || s > 59
    ) {
      return;
    }

    const now = new Date();

    const custom = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      h,
      m,
      s,
    );

    setCustomTime(custom);
  };

  const handleReset = () => {
    setTime1({ h: 0, m: 0, s: 0 });
    setCustomTime(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 my-2 w-full">
      <div className="w-full max-w-md">
        <TimeInput
          id="timezone-time"
          value={time1}
          onChange={setTime1}
          maxHours={23}
        />
      </div>

      <div className="flex flex-row items-center justify-center gap-3">
        <Button
          type="button"
          onClick={handleCalculate}
          icon={Check}
          variant="primary"
          shape="square"
          size="sm"
        >
          Try
        </Button>

        <Button
          type="button"
          onClick={handleReset}
          icon={RotateCcw}
          variant="ghost"
          shape="square"
          size="sm"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default TimeZoneInput;