import { useState } from "react";
import Card from "@/components/ui/Card";
import TimeInput from "@/components/forms/TimeInput";
import Button from "@/components/ui/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import PageTitle from "@/components/ui/PageTitle";
import {
  Clock3,
  Clock9,
  Calendar,
  ArrowRight,
  Calculator,
  RotateCcw,
  ArrowRightLeft,
} from "lucide-react";
import ResultTime from "@/components/time/ResultTime";
import ModeSelector from "@/components/ui/ModeSelector";
import { motion } from "framer-motion";

export default function TimeInterval({ currentItem, mode, setMode }) {
  const initialResult = {
    total: { h: 0, m: 0, s: 0 },
    days: { d: 0, h: 0, m: 0, s: 0 },
    negative: false,
    dayLabel: "Today",
  };

  const [durTime1, setDurTime1] = useState({ h: 0, m: 0, s: 0 });
  const [day1Offset, setDay1Offset] = useState(0);
  const [durTime2, setDurTime2] = useState({ h: 0, m: 0, s: 0 });
  const [day2Offset, setDay2Offset] = useState(0);

  const [result, setResult] = useState(initialResult);
  const [hasResult, setHasResult] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const timeModes = [
    { id: "calculator", label: "Calculator", icon: Calculator },
    { id: "interval", label: "Interval", icon: ArrowRightLeft },
  ];

  const handleCalculate = () => {
    const s1 =
      (Number(durTime1.h) || 0) * 3600 +
      (Number(durTime1.m) || 0) * 60 +
      (Number(durTime1.s) || 0);

    const s2 =
      (Number(durTime2.h) || 0) * 3600 +
      (Number(durTime2.m) || 0) * 60 +
      (Number(durTime2.s) || 0);

    if (s1 >= 86400 || s2 >= 86400) {
      setErrorMsg("Times must be between 00:00 and 23:59.");
      return;
    }

    const absoluteSeconds1 = s1 + day1Offset * 86400;
    const absoluteSeconds2 = s2 + day2Offset * 86400;

    if (absoluteSeconds1 > absoluteSeconds2) {
      setErrorMsg("Start time must be before or equal to End time.");
      return;
    }

    setErrorMsg("");

    const diffSeconds = absoluteSeconds2 - absoluteSeconds1;
    const absTotal = Math.abs(diffSeconds);

    const days = Math.floor(absTotal / 86400);
    const hours = Math.floor((absTotal % 86400) / 3600);
    const minutes = Math.floor((absTotal % 3600) / 60);
    const seconds = absTotal % 60;

    const calculatedResult = {
      total: { h: Math.floor(absTotal / 3600), m: minutes, s: seconds },
      days: { d: days, h: hours, m: minutes, s: seconds },
    };

    let resultDayLabel = "Today";
    if (days > 0) {
      resultDayLabel = `${days} day${days > 1 ? "s" : ""} duration`;
    } else if (hours > 0 || minutes > 0) {
      resultDayLabel = "Within same period";
    } else {
      resultDayLabel = "Exact same time";
    }

    setResult({
      ...calculatedResult,
      negative: false,
      dayLabel: resultDayLabel,
    });
    setHasResult(true);
  };

  const handleReset = () => {
    setDurTime1({ h: 0, m: 0, s: 0 });
    setDay1Offset(0);
    setDurTime2({ h: 0, m: 0, s: 0 });
    setDay2Offset(0);
    setResult(initialResult);
    setHasResult(false);
    setErrorMsg("");
  };

  return (
    <div className="mx-auto max-w-5xl flex flex-col gap-6 p-4">
      {/* items-stretch aligne parfaitement les hauteurs des deux colonnes */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full items-stretch">
        {/* ─── LEFT COLUMN: TIME INTERVAL INPUTS ─── */}
        <Card className="p-8 shadow-md rounded-3xl w-full h-full bg-[var(--surface)] flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 pb-6 border-b border-[var(--border)] text-center sm:text-left">
              {currentItem && (
                <PageTitle
                  title={currentItem.title}
                  icon={currentItem.icon ? <currentItem.icon /> : null}
                  label={currentItem.label}
                />
              )}

              <ModeSelector
                modes={timeModes}
                currentMode={mode}
                onModeChange={setMode}
              />
            </div>

            <div className="space-y-6">
              {/* Start Time */}
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Clock3
                      size={18}
                      className="text-[var(--primary)] shrink-0"
                    />
                    <h3 className="font-semibold text-sm">Start time</h3>
                  </div>

                  <div className="relative flex items-center gap-0.5 sm:gap-1 bg-[var(--background)] p-1 rounded-xl border border-[var(--border)] text-xs">
                    <Calendar
                      size={14}
                      className="text-[var(--primary)] ml-1 relative z-10 shrink-0"
                    />

                    {[-1, 0, 1].map((offset) => {
                      const isSelected = day1Offset === offset;
                      return (
                        <Button
                          key={offset}
                          type="button"
                          onClick={() => setDay1Offset(offset)}
                          variant="ghost"
                          size="sm"
                          shape="square"
                          className={`relative z-10 text-xs px-1.5 sm:px-2 py-1 h-auto border-none transition-colors ${
                            isSelected
                              ? "!text-white"
                              : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeDay1"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              }}
                              className="absolute inset-0 bg-[var(--primary)] rounded-lg -z-10"
                            />
                          )}
                          <span className="hidden sm:inline">
                            {offset === -1
                              ? "Yesterday"
                              : offset === 0
                                ? "Today"
                                : "Tomorrow"}
                          </span>
                          <span className="sm:hidden">
                            {offset === -1
                              ? "Yest."
                              : offset === 0
                                ? "Today"
                                : "Tom."}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <TimeInput
                  id="durTime1"
                  value={durTime1}
                  onChange={setDurTime1}
                  maxHours={23}
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
                  label="Elapsed Time Span"
                  icon={<ArrowRight size={14} />}
                  sx={{
                    bgcolor: "var(--primary)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    px: 1,
                    mb: 3,
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
              </Divider>

              {/* End Time */}
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Clock9
                      size={18}
                      className="text-[var(--primary)] shrink-0"
                    />
                    <h3 className="font-semibold text-sm">End time (To)</h3>
                  </div>

                  <div className="relative flex items-center gap-0.5 sm:gap-1 bg-[var(--background)] p-1 rounded-xl border border-[var(--border)] text-xs">
                    <Calendar
                      size={14}
                      className="text-[var(--primary)] ml-1 relative z-10 shrink-0"
                    />

                    {[-1, 0, 1].map((offset) => {
                      const isSelected = day2Offset === offset;
                      return (
                        <Button
                          key={offset}
                          type="button"
                          onClick={() => setDay2Offset(offset)}
                          variant="ghost"
                          size="sm"
                          shape="square"
                          className={`relative z-10 px-1.5 sm:px-2 py-1 h-auto text-xs border-none transition-colors ${
                            isSelected
                              ? "!text-white"
                              : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeDay2"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              }}
                              className="absolute inset-0 bg-[var(--primary)] rounded-lg -z-10"
                            />
                          )}
                          <span className="hidden sm:inline">
                            {offset === -1
                              ? "Yesterday"
                              : offset === 0
                                ? "Today"
                                : "Tomorrow"}
                          </span>
                          <span className="sm:hidden">
                            {offset === -1
                              ? "Yest."
                              : offset === 0
                                ? "Today"
                                : "Tom."}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <TimeInput
                  id="durTime2"
                  value={durTime2}
                  onChange={setDurTime2}
                  maxHours={23}
                />
                {errorMsg && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium text-center sm:text-left">
                    {errorMsg}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Button
              type="button"
              onClick={handleCalculate}
              variant="primary"
              shape="square"
              size="md"
              icon={Calculator}
              className="flex-1"
            >
              Calculate
            </Button>

            <Button
              type="button"
              onClick={handleReset}
              variant="secondary"
              shape="square"
              size="md"
              icon={RotateCcw}
              className="flex-1"
            >
              Reset
            </Button>
          </div>
        </Card>

        {/* ─── RIGHT COLUMN: RESULT CARD ─── */}
        <div className="flex flex-col gap-6 w-full h-full">
          <Card
            className={`p-8 shadow-lg rounded-3xl h-full transition-all duration-300 flex flex-col justify-between ${
              hasResult
                ? "border-2 border-[var(--primary)] bg-[var(--primary)]/10 opacity-100"
                : "border border-[var(--border)] bg-[var(--surface)] opacity-100"
            }`}
          >
            <div className="flex flex-col gap-6">
              <ResultTime
                title="Time Between Both"
                variant="daytime"
                time={result.days}
                dayLabel={result.dayLabel}
                negative={result.negative}
                hasOperation={false}
                label="Hours:Minutes:Seconds"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
