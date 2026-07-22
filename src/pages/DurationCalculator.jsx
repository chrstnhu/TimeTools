import { useState } from "react";
import Card from "@/components/ui/Card";
import { secondsToTime } from "@/utils/secondsToTime";
import TimeInput from "@/components/forms/TimeInput";
import CalculatorButtons from "@/components/calculator/CalculatorButtons";

function DurationCalculator() {
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
    negative: false,
  };

  const [time1, setTime1] = useState({
    h: 0,
    m: 0,
    s: 0,
  });

  const [time2, setTime2] = useState({
    h: 0,
    m: 0,
    s: 0,
  });

  const [result, setResult] = useState(initialResult);
  const [hasResult, setHasResult] = useState(false);

  const handleCalculate = (selectedOperation) => {
    const seconds1 = time1.h * 3600 + time1.m * 60 + time1.s;

    const seconds2 = time2.h * 3600 + time2.m * 60 + time2.s;

    let totalSeconds;

    if (selectedOperation === "+") {
      totalSeconds = seconds1 + seconds2;
    } else {
      totalSeconds = seconds1 - seconds2;
    }

    const negative = totalSeconds < 0;

    setResult({
      ...secondsToTime(Math.abs(totalSeconds)),
      negative,
    });

    setHasResult(true);
  };

  const handleReset = () => {
    setTime1({
      h: 0,
      m: 0,
      s: 0,
    });

    setTime2({
      h: 0,
      m: 0,
      s: 0,
    });

    setResult(initialResult);
    setHasResult(false);
  };

  const handleKeep = () => {
    setTime1(result.total);

    setTime2({
      h: 0,
      m: 0,
      s: 0,
    });

    setResult(initialResult);
    setHasResult(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <TimeInput
          label="First hours "
          id="time1"
          value={time1}
          onChange={setTime1}
          maxHours={999}
        />

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[var(--foreground)]/20"></div>
          <span className="text-gray-400 font-bold text-lg">+</span>
          <div className="flex-1 h-px bg-[var(--foreground)]/20"></div>
        </div>

        <TimeInput
          label="Second hours"
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
      </Card>

      {hasResult && (
        <Card>
          <div className="space-y-5">
            <div>
              <label className="text-lg font-semibold">Duration</label>

              <p className="text-sm text-gray-400">Calculated duration</p>
            </div>

            <Card>
              <div className="text-center">
                <p className="text-sm text-gray-400">Total duration</p>

                <p className={`text-3xl font-bold`}>
                  {result.negative && "-"}
                  {!result.negative && "+"}
                  {result.days.d}d {String(result.days.h).padStart(2, "0")}h{" "}
                  {String(result.days.m).padStart(2, "0")}m{" "}
                  {String(result.days.s).padStart(2, "0")}s
                </p>
              </div>
            </Card>
          </div>
        </Card>
      )}
    </div>
  );
}

export default DurationCalculator;
