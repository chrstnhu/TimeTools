import { useState } from "react";
import Card from "@/components/ui/Card";
import { secondsToTime } from "@/utils/secondsToTime";
import TimeInput from "@/components/forms/TimeInput";
import Button from "@/components/ui/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import PageTitle from "@/components/ui/PageTitle";
import { Calculator, ArrowRightLeft } from "lucide-react";
import {
  Clock3,
  Clock9,
  History,
  Trash2,
  Plus,
  Minus,
  RotateCcw,
  BookmarkPlus,
  Check,
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

export default function TimeOperation({
  currentItem,
  mode,
  setMode,
}) {
  const initialResult = {
    total: { h: 0, m: 0, s: 0 },
    days: { d: 0, h: 0, m: 0, s: 0 },
  };

  const zeroTime = { h: 0, m: 0, s: 0 };

  const [time1, setTime1] = useState({ ...zeroTime });
  const [time2, setTime2] = useState({ ...zeroTime });

  const [result, setResult] = useState(initialResult);
  const [hasResult, setHasResult] = useState(false);
  const [activeOperation, setActiveOperation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("timeCalculatorHistory");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [keepMode, setKeepMode] = useState(() => {
    return (
      localStorage.getItem("timeCalculatorKeepMode") || "manual"
    );
  });

  function handleKeepModeChange(newMode) {
    setKeepMode(newMode);
    localStorage.setItem("timeCalculatorKeepMode", newMode);
  }

  const timeModes = [
    { id: "calculator", label: "Calculator", icon: Calculator },
    { id: "interval", label: "Interval", icon: ArrowRightLeft },
  ];

  function handleCalculate(operation) {
    const first = timeToSeconds(time1);
    const second = timeToSeconds(time2);

    // Validate subtraction before calculating.
    if (operation === "-" && first < second) {
      setErrorMsg(
        "The first time must be greater than or equal to the second time for subtraction."
      );
      return;
    }

    setErrorMsg("");

    const total =
      operation === "+" ? first + second : first - second;

    const calculatedResult = secondsToTime(total);

    setResult(calculatedResult);
    setHasResult(true);
    setActiveOperation(operation);

    // Automatic mode: reuse the result immediately.
    if (keepMode === "auto") {
      setTime1(calculatedResult.total);
      setTime2({ ...zeroTime });
    }

    const newCalculation = {
      time1: `${time1.h}h ${time1.m}m ${time1.s}s`,
      time2: `${time2.h}h ${time2.m}m ${time2.s}s`,
      operation,
      result: `${calculatedResult.total.h}h ${calculatedResult.total.m}m ${calculatedResult.total.s}s`,
    };

    setHistory((prevHistory) => {
      const updated = [newCalculation, ...prevHistory].slice(0, 10);

      localStorage.setItem(
        "timeCalculatorHistory",
        JSON.stringify(updated)
      );

      return updated;
    });
  }

  function handleReset() {
    setTime1({ ...zeroTime });
    setTime2({ ...zeroTime });
    setResult(initialResult);
    setHasResult(false);
    setActiveOperation(null);
    setErrorMsg("");
  }

  function handleKeep() {
    if (!hasResult) return;

    setTime1({ ...result.total });
    setTime2({ ...zeroTime });
    setResult(initialResult);
    setHasResult(false);
    setActiveOperation(null);
    setErrorMsg("");
  }

  function handleClearHistory() {
    setHistory([]);
    localStorage.removeItem("timeCalculatorHistory");
  }

  function getChipLabel() {
    if (activeOperation === "+") return "+ Addition +";
    if (activeOperation === "-") return "- Subtraction -";
    return "Operation";
  }

  return (
    <div className="mx-auto max-w-5xl flex flex-col gap-6 p-4">
      {/* items-stretch égalise la hauteur des deux colonnes principal de la grille */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full items-stretch">
        {/* ─── LEFT COLUMN: TIME INPUTS CARD ─── */}
        <Card className="p-8 shadow-md rounded-3xl w-full h-full bg-[var(--surface)] flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4 pb-6 border-b border-[var(--border)]">
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

            {/* Time inputs */}
            <div className="space-y-6">

              {/* First time */}
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

              {/* Operation indicator */}
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

              {/* Second time */}
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

              {/* Error */}
              {errorMsg && (
                <p className="text-sm text-red-500 mt-2">{errorMsg}</p>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          {/* ACTION BUTTONS */}
<div className="grid grid-cols-2 gap-3 pt-2">
  {/* Add */}
  <Button
    type="button"
    onClick={() => handleCalculate("+")}
    variant="primary"
    shape="square"
    size="md"
    icon={Plus}
  >
    Add
  </Button>

  {/* Subtract */}
  <Button
    type="button"
    onClick={() => handleCalculate("-")}
    variant="primary"
    shape="square"
    size="md"
    icon={Minus}
  >
    Subtract
  </Button>

  {/* Keep result + Auto */}
  <div className="flex min-w-0 flex-col gap-1 rounded-xl border border-[var(--border)] p-1 sm:flex-row sm:items-stretch sm:gap-0 sm:p-0">
    <button
      type="button"
      onClick={handleKeep}
      disabled={!hasResult}
      className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-1.5 py-3 text-sm font-medium transition-colors hover:bg-[var(--primary)]/10 disabled:cursor-not-allowed disabled:opacity-40 sm:px-2"
    >
      <BookmarkPlus size={17} className="shrink-0" />
      <span className="truncate">Keep result</span>
    </button>

    <button
      type="button"
      role="checkbox"
      aria-checked={keepMode === "auto"}
      aria-label="Auto"
      title="Automatic result retention"
      onClick={() =>
        handleKeepModeChange(
          keepMode === "auto" ? "manual" : "auto"
        )
      }
      className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium transition-colors sm:border-l sm:border-[var(--border)] sm:px-2.5 ${
        keepMode === "auto"
          ? "bg-[var(--primary)]/10 text-[var(--primary)]"
          : "text-gray-400 hover:bg-[var(--primary)]/5"
      }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
          keepMode === "auto"
            ? "border-[var(--primary)] bg-[var(--primary)] text-white"
            : "border-current"
        }`}
      >
        {keepMode === "auto" && <Check size={12} />}
      </span>
      <span>Auto</span>
    </button>
  </div>

  {/* Reset stays beside Keep result */}
  <Button
    type="button"
    onClick={handleReset}
    variant="ghost"
    shape="square"
    size="md"
    icon={RotateCcw}
  >
    Reset
  </Button>
</div>
        </Card>

        {/* ─── RIGHT COLUMN: RESULT & HISTORY ─── */}
        <div className="flex flex-col gap-6 w-full h-full justify-between">
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
                  type="button"
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
              <ul className="space-y-2 max-h-36 overflow-y-auto pr-1">
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