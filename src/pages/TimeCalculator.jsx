import { useState } from "react";
import Card from "@/components/ui/Card";
import { secondsToTime } from "@/utils/secondsToTime";
import TimeInput from "@/components/calculator/TimeInput";
import CalculatorButtons from "@/components/calculator/CalculatorButtons";

function TimeCalculator() {
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
    <div className="flex flex-col gap-4">
      <Card>
        <div>
          <TimeInput
            label="Time 1"
            id="time1"
            value={time1}
            onChange={setTime1}
            maxHours={999}
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
      </Card>

      <Card>
        <div className="flex flex-col">
          <label htmlFor="result">Result:</label>

          <div className="flex flex-row items-center">
            <p>
              {result.total.h} h {result.total.m.toString().padStart(2, "0")} m{" "}
              {result.total.s.toString().padStart(2, "0")} s{" "}
            </p>
          </div>

          <div className="mt-4">
            <h3>With days:</h3>

            <p>
              {result.days.d} d {result.days.h} h {result.days.m} m{" "}
              {result.days.s} s
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TimeCalculator;
