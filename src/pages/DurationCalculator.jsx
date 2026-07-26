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


function DurationCalculator() {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  if (!currentItem) {
    return null;
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

  const handleCalculate = (selectedOperation) => {
    const seconds1 =
      (Number(time1.h) || 0) * 3600 +
      (Number(time1.m) || 0) * 60 +
      (Number(time1.s) || 0);

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
    <div className="mx-auto max-w-5xl flex justify-center xl:flex-row flex-col gap-8 p-4">
      {/* ─── INPUT FORM CARD ─── */}
      <Card className="p-8 border-2 border-[var(--border)] shadow-md rounded-3xl w-full xl:max-w-md">
        <div className="flex flex-col gap-6 mb-10">
          <PageTitle
            title={currentItem.title}
            icon={<currentItem.icon />}
            label={currentItem.label}
          />

          {/* First Duration Input */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Clock3 size={18} className="text-[var(--primary)]" />
              <h3 className="font-semibold text-sm">First Duration</h3>
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
              },
            }}
          >
            <Chip
              label="Operation"
              sx={{
                bgcolor: "var(--primary)",
                color: "white",
                fontWeight: 700,
                fontSize: "0.75rem",
                px: 1,
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

      {/* ─── RESULT CARD ─── */}
      {hasResult && (
        <Card className="p-8 border-1 border-[var(--primary)] bg-[var(--primary)]/10 shadow-lg rounded-3xl w-full xl:max-w-md transition-all duration-300">
          <div className="flex flex-col gap-6">
            <ResultTime
              title="Total Duration"
              variant="full"
              time={result.days}
              negative={result.negative}
              hasOperation={true}
              label="Days • Hours:Minutes:Seconds"
            />

            {/* Summary Sub-Grid */}
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

export default DurationCalculator;
