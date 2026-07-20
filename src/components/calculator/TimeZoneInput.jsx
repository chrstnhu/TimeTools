import { useState } from "react";
import TimeInput from "@/components/calculator/TimeInput";
import Button from "@/components/ui/Button";

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

  return (
    <div
      className={`
        font-bold
        flex
        items-center
        align-center
        self-center
        justify-center
        flex-wrap
        gap-1
      `}
    >
      <TimeInput id="time1" value={time1} onChange={setTime1} maxHours={23} />

      <div className="flex flex-row gap-2 mx-4">
        <Button onClick={handleCalculate}>Try</Button>
        <Button onClick={() => setCustomTime(null)}>Reset</Button>
      </div>
    </div>
  );
}

export default TimeZoneInput;
