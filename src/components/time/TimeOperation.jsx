import { useState } from "react";
import Card from "@/components/ui/Card";
import { secondsToTime } from "@/utils/secondsToTime";
import TimeInput from "@/components/forms/TimeInput";
import Button from "@/components/ui/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import PageTitle from "@/components/ui/PageTitle"; // Importez PageTitle ici
import { Calculator, ArrowRightLeft } from "lucide-react"; // Importez les icônes de mode
import {
  Clock3,
  Clock9,
  History,
  Trash2,
  Plus,
  Minus,
  RotateCcw,
  BookmarkPlus,
} from "lucide-react";
import ResultTime from "@/components/time/ResultTime";
import SummaryGrid from "@/components/ui/SummaryGrid";
import ModeSelector from "@/components/ui/ModeSelector";

function timeToSeconds(time) {
  return (
    (Number(time.h) || 0) * 3600 +
    (Number(time.m) || 0) * 60 +
    (Number(time.s) || 0)
  );
}

export default function TimeOperation({ currentItem, mode, setMode }) {
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

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("timeCalculatorHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const timeModes = [
    { id: "calculator", label: "Calculator", icon: Calculator },
    { id: "interval", label: "Interval", icon: ArrowRightLeft },
  ];


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

    const calculatedResult = secondsToTime(total);

    setResult(calculatedResult);
    setHasResult(true);
    setActiveOperation(operation);

    const newCalculation = {
      time1: `${time1.h}h ${time1.m}m ${time1.s}s`,
      time2: `${time2.h}h ${time2.m}m ${time2.s}s`,
      operation: operation,
      result: `${calculatedResult.total.h}h ${calculatedResult.total.m}m ${calculatedResult.total.s}s`,
    };

    setHistory((prevHistory) => {
      const updated = [newCalculation, ...prevHistory].slice(0, 10);
      localStorage.setItem("timeCalculatorHistory", JSON.stringify(updated));
      return updated;
    });
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

  function handleClearHistory() {
    setHistory([]);
    localStorage.removeItem("timeCalculatorHistory");
  }

  const getChipLabel = () => {
    if (activeOperation === "+") return "+ Addition +";
    if (activeOperation === "-") return "- Subtraction -";
    return "Operation";
  };

  return (
    <div className="mx-auto max-w-5xl flex flex-col gap-6 p-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full items-start">
        <Card className="p-8 shadow-md rounded-3xl w-full bg-[var(--surface)] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[var(--border)]">
            <PageTitle
              title={currentItem.title}
              icon={currentItem.icon ? <currentItem.icon /> : null}
              label={currentItem.label}
            />

            <ModeSelector
              modes={timeModes}
              currentMode={mode}
              onModeChange={setMode}
            />
          </div>

          <div className="space-y-6">
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
                <Clock9 size={18} className="text-[var(--primary)]" />
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

            {errorMsg && (
              <p className="text-sm text-red-500 mt-2">{errorMsg}</p>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                type="button"
                onClick={() => handleCalculate("+")}
                variant="primary"
                shape="halfRounded"
                size="md"
                icon={Plus}
              >
                Add
              </Button>

              <Button
                type="button"
                onClick={() => handleCalculate("-")}
                variant="primary"
                shape="halfRounded"
                size="md"
                icon={Minus}
              >
                Subtract
              </Button>

              <Button
                type="button"
                onClick={handleKeep}
                variant="secondary"
                shape="halfRounded"
                size="md"
                icon={BookmarkPlus}
              >
                Keep Result
              </Button>

              <Button
                type="button"
                onClick={handleReset}
                variant="ghost"
                shape="halfRounded"
                size="md"
                icon={RotateCcw}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-6 w-full xl:max-w-md">
          <Card
            className={`p-8 shadow-lg rounded-3xl transition-all duration-300 ${
              hasResult
                ? "border-2 border-[var(--primary)] bg-[var(--primary)]/10 opacity-100"
                : "border border-[var(--border)] bg-[var(--surface)] opacity-100"
            }`}
          >
            <ResultTime
              title="Result"
              variant="time"
              time={result.total}
              label="Hours:Minutes:Seconds"
            />

            <hr className="my-6 border-t border-[var(--primary)] opacity-30" />

            <div className="mt-4">
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

          <Card className="p-6 shadow-md rounded-3xl bg-[var(--surface)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History size={18} className="text-[var(--primary)]" />
                <h3 className="text-sm font-semibold">Calculation History</h3>
              </div>
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="text-xs flex items-center gap-1 font-medium px-2.5 py-1 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all cursor-pointer"
                  title="Clear history"
                >
                  <Trash2 size={14} /> Clear
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-gray-400 italic">
                No calculations yet.
              </p>
            ) : (
              <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {history.map((entry, index) => (
                  <li
                    key={index}
                    className="border border-[var(--border)] p-2.5 rounded-lg bg-[var(--background)] text-xs flex justify-between items-center"
                  >
                    <span>
                      <strong>{entry.time1}</strong> {entry.operation}{" "}
                      <strong>{entry.time2}</strong>
                    </span>
                    <span className="text-[var(--primary)] font-bold">
                      = {entry.result}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
