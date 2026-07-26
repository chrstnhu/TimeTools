import { useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "@/components/ui/Card";
import { secondsToTime } from "@/utils/secondsToTime";
import TimeInput from "@/components/forms/TimeInput";
import CalculatorButtons from "@/components/calculator/CalculatorButtons";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Clock3 } from "lucide-react";
import ResultTime from "@/components/time/ResultTime";
import SummaryGrid from "@/components/ui/SummaryGrid";
import PageTitle from "@/components/ui/PageTitle";
import { menuItems } from "@/constants/menuItems";

function timeToSeconds(time) {
  return (
    (Number(time.h) || 0) * 3600 +
    (Number(time.m) || 0) * 60 +
    (Number(time.s) || 0)
  );
}

export default function TimeCalculator() {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  if (!currentItem) {
    return <Navigate to="/" replace />;
  }

  const initialResult = {
    total: { h: 0, m: 0, s: 0 },
    days: { d: 0, h: 0, m: 0, s: 0 },
  };

  const [time1, setTime1] = useState({ h: 0, m: 0, s: 0 });
  const [time2, setTime2] = useState({ h: 0, m: 0, s: 0 });

  const [result, setResult] = useState(initialResult);
  const [hasResult, setHasResult] = useState(false);

  const [activeOperation, setActiveOperation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  function handleCalculate(operation) {
    const first = timeToSeconds(time1);
    const second = timeToSeconds(time2);

    if (operation === "-" && first < second) {
      setErrorMsg(
        "The first time must be greater than or equal to the second time for subtraction.",
      );
    } else {
      setErrorMsg("");
    }

    let total = operation === "+" ? first + second : first - second;
    total = Math.max(0, total);

    setResult(secondsToTime(total));
    setHasResult(true);
    setActiveOperation(operation);
  }

  function handleReset() {
    setTime1({ h: 0, m: 0, s: 0 });
    setTime2({ h: 0, m: 0, s: 0 });
    setResult(initialResult);
    setHasResult(false);
    setActiveOperation(null);
    setErrorMsg("");
  }

  function handleKeep() {
    setTime1(result.total);
    setTime2({ h: 0, m: 0, s: 0 });
    setResult(initialResult);
    setHasResult(false);
    setActiveOperation(null);
    setErrorMsg("");
  }

  const getChipLabel = () => {
    if (activeOperation === "+") return "+ Addition +";
    if (activeOperation === "-") return "- Substraction -";
    return "Operation";
  };

  return (
    <div className="mx-auto max-w-5xl flex justify-center xl:flex-row sm:flex-col gap-8 p-4">
      <Card className="p-8 shadow-md rounded-3xl w-full">
        <div className="space-y-6 mb-10">
          <PageTitle
            title={currentItem.title}
            icon={<currentItem.icon />}
            label={currentItem.label}
          />

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Clock3 size={18} className="text-[var(--primary)]" />
              <h3 className="font-semibold text-sm">First time</h3>
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
              "&::before, &::after": {
                borderColor: "var(--border)",
                mb: 3,
              },
            }}
          >
            <Chip
              label={getChipLabel()}
              sx={{
                bgcolor: "var(--primary)",
                color: "white",
                fontWeight: 700,
                fontSize: "0.75rem",
                px: 1,
                mb: 3,
              }}
            />
          </Divider>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Clock3 size={18} className="text-[var(--primary)]" />
              <h3 className="font-semibold text-sm">Second time</h3>
            </div>
            <TimeInput
              label=""
              id="time2"
              value={time2}
              onChange={setTime2}
              maxHours={999}
            />
          </div>

          {errorMsg && <p className="text-sm text-red-500 mt-2">{errorMsg}</p>}

          <CalculatorButtons
            onAdd={() => handleCalculate("+")}
            onSubtract={() => handleCalculate("-")}
            onReset={handleReset}
            onKeep={handleKeep}
          />
        </div>
      </Card>

      {!errorMsg && hasResult && (
        <Card className="p-8 border-1 border-[var(--primary)] bg-[var(--primary)]/10 shadow-lg rounded-3xl w-full xl:max-w-md transition-all duration-300">
          <ResultTime
            title="Result"
            variant="time"
            time={result.total}
            label="Hours:Minutes:Seconds"
          />

          <hr className="my-6 border-t border-[var(--primary)] opacity-50" />

          <div className="mt-8">
            <SummaryGrid
              title="Equivalent"
              items={[
                { value: result.days.d, label: "Days" },
                { value: result.days.h, label: "Hours" },
                { value: result.days.m, label: "Minutes" },
                { value: result.days.s, label: "Seconds" },
              ]}
            />
          </div>
        </Card>
      )}
    </div>
  );
}
