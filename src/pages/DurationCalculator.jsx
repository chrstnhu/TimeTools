import { useState } from "react";
import Card from "@/components/ui/Card";
import { secondsToTime } from "@/utils/secondsToTime";
import TimeInput from "@/components/forms/TimeInput";
import CalculatorButtons from "@/components/calculator/CalculatorButtons";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Clock3 } from "lucide-react";

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
    <div className="mx-auto max-w-5xl flex justify-center xl:flex-row sm:flex-col gap-8">
      <Card className="p-8">
        <div className="space-y-8">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Clock3 size={18} />

              <h2 className="font-semibold">First Hours</h2>
            </div>

            <TimeInput
              id="time1"
              value={time1}
              onChange={setTime1}
              maxHours={999}
            />
          </div>
          <Divider
            sx={{
              "&::before,&::after": {
                borderColor: "var(--border)",
              },
            }}
          >
            <Chip
              label="Operation"
              sx={{
                bgcolor: "var(--primary)",
                color: "white",
                fontWeight: 700,
              }}
            />
          </Divider>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <Clock3 size={18} />

              <h2 className="font-semibold">Second time</h2>
            </div>
            <TimeInput
              id="time2"
              value={time2}
              onChange={setTime2}
              maxHours={999}
            />
          </div>

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
          <div className="space-y-5">
            <div>
              <label className="text-lg font-semibold">Total Duration</label>

              <p className="text-sm text-gray-400">Calculated duration</p>
            </div>

            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg">
              <p
                className="text-2xl font-black tracking-widest"
                style={{
                  fontFamily: "var(--font-mono)",
                }}
              >
                {" "}
                {result.negative && "-"}
                {!result.negative && "+"}
                {result.days.d}d {String(result.days.h).padStart(2, "0")}:
                {String(result.days.m).padStart(2, "0")}:
                {String(result.days.s).padStart(2, "0")}s
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default DurationCalculator;
