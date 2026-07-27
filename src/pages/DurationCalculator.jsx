import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Card from "@/components/ui/Card";
import { secondsToTime } from "@/utils/secondsToTime";
import TimeInput from "@/components/forms/TimeInput";
import CalculatorButtons from "@/components/calculator/CalculatorButtons";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Clock3, History, Trash2 } from "lucide-react";
import ResultTime from "@/components/time/ResultTime";
import SummaryGrid from "@/components/ui/SummaryGrid";
import PageTitle from "@/components/ui/PageTitle";
import { menuItems } from "@/constants/menuItems";

function DurationCalculator() {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  if (!currentItem) {
    return <Navigate to="/" replace />;
  }

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
  const [activeOperation, setActiveOperation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("durationCalculatorHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const handleCalculate = (selectedOperation) => {
    const seconds1 =
      (Number(time1.h) || 0) * 3600 +
      (Number(time1.m) || 0) * 60 +
      (Number(time1.s) || 0);

    // Limit check for First Duration (max 24 hours = 86400 seconds)
    if (seconds1 > 86400) {
      setErrorMsg("First duration cannot exceed 24 hours.");
      return;
    } else {
      setErrorMsg("");
    }

    const seconds2 =
      (Number(time2.h) || 0) * 3600 +
      (Number(time2.m) || 0) * 60 +
      (Number(time2.s) || 0);

    let totalSeconds;

    if (selectedOperation === "+") {
      totalSeconds = seconds1 + seconds2;
    } else {
      totalSeconds = seconds1 - seconds2;
    }

    const negative = totalSeconds < 0;
    const calculatedResult = secondsToTime(Math.abs(totalSeconds));

    setResult({
      ...calculatedResult,
      negative,
    });
    setHasResult(true);
    setActiveOperation(selectedOperation);

    const newCalculation = {
      time1: `${time1.h}h ${time1.m}m ${time1.s}s`,
      time2: `${time2.h}h ${time2.m}m ${time2.s}s`,
      operation: selectedOperation,
      result: `${negative ? "-" : ""}${calculatedResult.days.d}d ${calculatedResult.days.h}h ${calculatedResult.days.m}m ${calculatedResult.days.s}s`,
    };

    setHistory((prevHistory) => {
      const updated = [newCalculation, ...prevHistory].slice(0, 10);
      localStorage.setItem(
        "durationCalculatorHistory",
        JSON.stringify(updated),
      );
      return updated;
    });
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
    setActiveOperation(null);
    setErrorMsg("");
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
    setActiveOperation(null);
    setErrorMsg("");
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("durationCalculatorHistory");
  };

  const getChipLabel = () => {
    if (activeOperation === "+") return "+ Addition +";
    if (activeOperation === "-") return "- Subtraction -";
    return "Operation";
  };

  return (
    <div className="mx-auto max-w-5xl flex justify-center xl:flex-row sm:flex-col gap-8 p-4">
      {/* ─── INPUT FORM CARD ─── */}
      <Card className="p-8 shadow-md rounded-3xl w-full bg-[var(--surface)]">
        <div className="space-y-6 mb-10">
          <PageTitle
            title={currentItem.title}
            icon={<currentItem.icon />}
            label={currentItem.label}
          />

          {/* First Duration Input */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock3 size={18} className="text-[var(--primary)]" />
                <h3 className="font-semibold text-sm">
                  First Duration (Max 24h)
                </h3>
              </div>
            </div>

            <TimeInput
              id="time1"
              value={time1}
              onChange={setTime1}
              maxHours={24}
            />
            {errorMsg && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">
                {errorMsg}
              </p>
            )}
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

          {/* Second Duration Input */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Clock3 size={18} className="text-[var(--primary)]" />
              <h3 className="font-semibold text-sm">Second Duration</h3>
            </div>

            <TimeInput
              id="time2"
              value={time2}
              onChange={setTime2}
              maxHours={999}
            />
          </div>

          <div className="pt-2">
            <CalculatorButtons
              onAdd={() => handleCalculate("+")}
              onSubtract={() => handleCalculate("-")}
              onReset={handleReset}
              onKeep={handleKeep}
            />
          </div>
        </div>
      </Card>

      {/* ─── RIGHT COLUMN (RESULT + HISTORY) ─── */}
      <div className="flex flex-col gap-6 w-full xl:max-w-md">
        {/* Result Card */}
        <Card
          className={`p-8 shadow-lg rounded-3xl transition-all duration-300 ${
            hasResult
              ? "border-2 border-[var(--primary)] bg-[var(--primary)]/10 opacity-100"
              : "border border-[var(--border)] bg-[var(--surface)] opacity-100"
          }`}
        >
          <div className="flex flex-col gap-6">
            <ResultTime
              title="Total Duration"
              variant="full"
              time={result.days}
              negative={result.negative}
              hasOperation={true}
              label="Days • Hours:Minutes:Seconds"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DurationCalculator;
