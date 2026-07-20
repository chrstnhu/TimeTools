import { useState } from "react";
import Card from "@/components/ui/Card";

function DateCalculator() {
  const initialResult = {
    total: {
      h: 0,
      m: 0,
      s: 0,
    },
    days: {
      d: 0,
      h: 0,
      m: 0,
      s: 0,
    },
  };

  const [time1, setTime1] = useState({ h: 0, m: 0, s: 0 });
  const [time2, setTime2] = useState({ h: 0, m: 0, s: 0 });
  const [result, setResult] = useState(initialResult);

  const handleCalculate = (selectedOperation) => {
    const seconds1 = time1.h * 3600 + time1.m * 60 + time1.s;
    const seconds2 = time2.h * 3600 + time2.m * 60 + time2.s;

    let totalSeconds;
    if (selectedOperation === "+") {
      totalSeconds = seconds1 + seconds2;
    } else if (selectedOperation === "-") {
      totalSeconds = seconds1 - seconds2;
    }

    totalSeconds = Math.max(0, totalSeconds);

    setResult(secondsToTime(totalSeconds));
  };

  const handleReset = () => {
    setTime1({ h: 0, m: 0, s: 0 });
    setTime2({ h: 0, m: 0, s: 0 });
    setResult(initialResult);
  };

  const handleKeep = () => {
    setTime1(result.total);
    setTime2({ h: 0, m: 0, s: 0 });
    setResult(initialResult);
  };

  return (
    <Card>
      <div>
        <TimeInput
          label="Time 1"
          id="time1"
          value={time1}
          onChange={setTime1}
          maxHours={23}
        />

        <TimeInput
          label="Time 2"
          id="time2"
          value={time2}
          onChange={setTime2}
          maxHours={999}
        />

        <CalculatorButtons
          onAdd={() => handleCalculate("+")}
          onSubtract={() => handleCalculate("-")}
          onReset={handleReset}
          onKeep={handleKeep}
        />
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="result">Result:</label>
        <div className="mt-4">
          <p className="text-lg font-bold flex flex-row gap-2 items-center">
            {result.days.d} d {result.days.h} h {result.days.m} m{" "}
            {result.days.s} s{" "}
            {result.days.d > 0 && (
              <p className="text-sm text-gray-500">
                (+{result.days.d} {result.days.d === 1 ? "day" : "days"})
              </p>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default DateCalculator;
