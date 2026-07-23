import { useState } from "react";
import Card from "@/components/ui/Card";
import { secondsToTime } from "@/utils/secondsToTime";
import TimeInput from "@/components/forms/TimeInput";
import CalculatorButtons from "@/components/calculator/CalculatorButtons";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Clock3 } from "lucide-react";

function timeToSeconds(time) {
  return time.h * 3600 + time.m * 60 + time.s;
}

export default function TimeCalculator() {
  const initialResult = {
    total: { h: 0, m: 0, s: 0 },
    days: { d: 0, h: 0, m: 0, s: 0 },
  };

  const [time1, setTime1] = useState({ h: 0, m: 0, s: 0 });
  const [time2, setTime2] = useState({ h: 0, m: 0, s: 0 });

  const [result, setResult] = useState(initialResult);
  const [hasResult, setHasResult] = useState(false);

  function handleCalculate(operation) {
    const first = timeToSeconds(time1);
    const second = timeToSeconds(time2);

    let total = operation === "+" ? first + second : first - second;

    total = Math.max(0, total);

    setResult(secondsToTime(total));
    setHasResult(true);
  }

  function handleReset() {
    setTime1({ h: 0, m: 0, s: 0 });
    setTime2({ h: 0, m: 0, s: 0 });

    setResult(initialResult);
    setHasResult(false);
  }

  function handleKeep() {
    setTime1(result.total);
    setTime2({ h: 0, m: 0, s: 0 });

    setResult(initialResult);
  }

  return (
    <div className="mx-auto max-w-5xl flex justify-center xl:flex-row sm:flex-col gap-8">
      <Card className="p-8">
        <div className="space-y-8">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Clock3 size={18} />

              <h2 className="font-semibold">First time</h2>
            </div>

            <TimeInput
              label=""
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
              label=""
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
        <Card className="p-8 transition-all duration-300">
          <div className="text-center">
            <p className="mb-3 uppercase tracking-[0.3em] text-sm text-gray-400">
              Result
            </p>

            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg">
              <p
                className="text-6xl font-black tracking-widest"
                style={{
                  fontFamily: "var(--font-mono)",
                }}
              >
                {result.total.h}:{String(result.total.m).padStart(2, "0")}:
                {String(result.total.s).padStart(2, "0")}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="mb-6 text-center text-lg font-semibold">
              Equivalent
            </h3>

            <div className="grid gap-5 grid-cols-2">
              <Card className="rounded-3xl p-6 text-center">
                <p className="text-5xl font-bold">{result.days.d}</p>

                <p className="mt-2 uppercase tracking-widest text-xs text-gray-400">
                  Days
                </p>
              </Card>

              <Card className="rounded-3xl p-6 text-center">
                <p className="text-5xl font-bold">{result.days.h}</p>

                <p className="mt-2 uppercase tracking-widest text-xs text-gray-400">
                  Hours
                </p>
              </Card>

              <Card className="rounded-3xl p-6 text-center">
                <p className="text-5xl font-bold">{result.days.m}</p>

                <p className="mt-2 uppercase tracking-widest text-xs text-gray-400">
                  Minutes
                </p>
              </Card>

              <Card className="rounded-3xl p-6 text-center">
                <p className="text-5xl font-bold">{result.days.s}</p>

                <p className="mt-2 uppercase tracking-widest text-xs text-gray-400">
                  Seconds
                </p>
              </Card>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
