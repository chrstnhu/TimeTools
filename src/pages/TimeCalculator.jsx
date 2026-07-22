import { useState } from "react";
import Card from "@/components/ui/Card";
import { secondsToTime } from "@/utils/secondsToTime";
import TimeInput from "@/components/forms/TimeInput";
import CalculatorButtons from "@/components/calculator/CalculatorButtons";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

function timeToSeconds(time) {
  return time.h * 3600 + time.m * 60 + time.s;
}

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
  const [hasResult, setHasResult] = useState(false);

  const handleCalculate = (selectedOperation) => {
    const seconds1 = timeToSeconds(time1);
    const seconds2 = timeToSeconds(time2);

    let totalSeconds;
    if (selectedOperation === "+") {
      totalSeconds = seconds1 + seconds2;
    } else if (selectedOperation === "-") {
      totalSeconds = seconds1 - seconds2;
    }

    totalSeconds = Math.max(0, totalSeconds);

    setHasResult(true);
    setResult(secondsToTime(totalSeconds));
  };

  const handleReset = () => {
    setTime1({ h: 0, m: 0, s: 0 });
    setTime2({ h: 0, m: 0, s: 0 });
    setHasResult(false);
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
        {/* <div className="flex flex-col justify-between align-center items-center"> */}
        <div>
          <TimeInput
            label="First time"
            id="time1"
            value={time1}
            onChange={setTime1}
            maxHours={999}
          />

          <Divider
            sx={{
              "&::before, &::after": {
                borderColor: "var(--foreground)",
                opacity: 0.2,
              },
            }}
          >
            <Chip
              label="+"
              sx={{
                bgcolor: "var(--primary)",
                color: "var(--primary-foreground)",
                fontWeight: 700,
              }}
            />
          </Divider>

          <TimeInput
            label="Second time"
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

      {hasResult && (
        <Card>
          <h2 className="text-xl font-bold mb-4">Result</h2>

          <Card className="text-center">
            <p className="text-3xl font-bold tracking-wider">
              {result.total.h}h {String(result.total.m).padStart(2, "0")}m{" "}
              {String(result.total.s).padStart(2, "0")}s
            </p>
          </Card>

          <div className="mt-6">
            <p className="font-semibold mb-2">Equivalent</p>
            <div className="grid grid-cols-4 gap-3">
              <Card>
                <p className="text-sm text-gray-400">Days</p>
                <p className="text-xl">{result.days.d}</p>
              </Card>

              <Card>
                <p className="text-sm text-gray-400">HH</p>
                <p className="text-xl">{result.days.h}</p>
              </Card>

              <Card>
                <p className="text-sm text-gray-400">MM</p>
                <p className="text-xl">{result.days.m}</p>
              </Card>

              <Card>
                <p className="text-sm text-gray-400">SS</p>
                <p className="text-xl">{result.days.s}</p>
              </Card>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default TimeCalculator;
