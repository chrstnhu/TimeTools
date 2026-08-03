import { useState } from "react";
import TimeInput from "@/components/forms/TimeInput";
import Button from "@/components/ui/Button";
import { RotateCcw, Check } from "lucide-react";

function TimeZoneInput({ setCustomTime }) {
  const [time1, setTime1] = useState({ h: 0, m: 0, s: 0 });

  const handleCalculate = () => {
    const now = new Date();

    const custom = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      Number(time1.h),
      Number(time1.m),
      Number(time1.s),
    );

    setCustomTime(custom);
  };

  const handleReset = () => {
    setTime1({ h: 0, m: 0, s: 0 });
    setCustomTime(null);
  };

  return (
    <div className="flex flex-col items-center gap-3 my-2">
      <TimeInput id="time1" value={time1} onChange={setTime1} maxHours={23} />

      <div className="flex flex-row items-center gap-2">
        <Button
          onClick={handleCalculate}
          icon={Check}
          variant="primary"
          shape="square"
          size="sm"
        >
          Try
        </Button>

        <Button
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
