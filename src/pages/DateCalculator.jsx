import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import ResultTime from "@/components/time/ResultTime";
import PageTitle from "@/components/ui/PageTitle";
import { menuItems } from "@/constants/menuItems";

function DateCalculator() {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  if (!currentItem) {
    return <Navigate to="/" replace />;
  }

  const [range, setRange] = useState();
  const [includeStart, setIncludeStart] = useState(false);

  function getDaysDifference() {
    if (!range?.from) return null;

    const endDate = range.to || range.from;

    const diffTime = Math.abs(endDate.getTime() - range.from.getTime());
    const baseDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    return includeStart ? baseDays + 1 : baseDays;
  }

  const days = getDaysDifference();
  const hasResult = days !== null;

  const handleReset = () => {
    setRange(undefined);
    setIncludeStart(false);
  };

  return (
    <div className="mx-auto max-w-5xl flex justify-center xl:flex-row sm:flex-col gap-8 p-4">
      {/* ─── CALENDAR PICKER CARD ─── */}
      <Card className="p-8 shadow-md rounded-3xl w-full bg-[var(--surface)]">
        <div className="space-y-6 mb-10">
          <PageTitle
            title={currentItem.title}
            icon={<currentItem.icon />}
            label={currentItem.label}
            withBorder={true}
          />

          <div className="flex justify-center p-3 rounded-2xl">
            <DayPicker
              captionLayout="dropdown"
              navLayout="after"
              mode="range"
              selected={range}
              onSelect={setRange}
              classNames={{
                months: "flex justify-center",
                caption: "text-base font-bold text-[var(--text)]",
                nav_button:
                  "text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg",
                chevron:
                  "fill-[var(--primary)] stroke-[var(--primary)] text-[var(--primary)]",
                weekday: "text-xs font-semibold text-gray-400",
                today:
                  "border border-[var(--primary)] text-[var(--primary)] font-bold",
                day: "text-sm text-[var(--text)] hover:bg-[var(--primary)]/20 rounded-xl transition-all",
                range_start:
                  "!bg-[var(--primary)] !text-white font-bold rounded-l-xl",
                range_middle:
                  "!bg-[var(--primary)]/20 !text-[var(--primary)] font-bold rounded-none",
                range_end:
                  "!bg-[var(--primary)] !text-white font-bold rounded-r-xl",
                selected:
                  "!bg-[var(--primary)] !bg-[var(--primary)] font-bold rounded-xl",
                outside: "text-gray-600 opacity-40",
              }}
            />
          </div>

          {/* ─── SWITCH & RESET ACTIONS ─── */}
          <div className="flex flex-col sm:flex-row items-center justify-center px-2 pt-2 gap-4">
            <label
              className={`flex items-center gap-3 text-sm transition-opacity ${
                !range
                  ? "opacity-50 cursor-not-allowed font-normal"
                  : includeStart
                    ? "cursor-pointer text-[var(--text)] font-bold scale-105 underline"
                    : "cursor-pointer text-[var(--text)] font-normal scale-100 no-underline"
              }`}
            >
              <Switch
                checked={includeStart}
                onCheckedChange={setIncludeStart}
                disabled={!range}
              />
              <span>Include start date</span>
            </label>

            <Button
              type="button"
              onClick={handleReset}
              disabled={!range && !includeStart}
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              shape="halfRounded"
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* ─── RIGHT COLUMN (RESULT DISPLAY CARD) ─── */}
      <div className="flex flex-col gap-6 w-full xl:max-w-md">
        <Card
          className={`p-8 shadow-lg rounded-3xl transition-all duration-300 ${
            hasResult
              ? "border-2 border-[var(--primary)] bg-[var(--primary)]/10 opacity-100"
              : "border border-[var(--border)] bg-[var(--surface)] opacity-100"
          }`}
        >
          <div className="flex flex-col gap-6">
            <ResultTime
              title="Duration Result"
              variant="daysOnly"
              days={days !== null ? days : 0}
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="p-4 text-left bg-[var(--background)] rounded-2xl w-full">
                <p className="uppercase tracking-widest text-xs text-gray-400 font-semibold">
                  Start Date
                </p>
                <div className="text-lg font-bold flex items-center gap-1.5 mt-1 text-[var(--text-title)]">
                  <CalendarIcon size={16} className="text-[var(--primary)]" />
                  <span>
                    {range?.from ? range.from.toLocaleDateString() : "-"}
                  </span>
                </div>
              </div>

              <div className="p-4 text-left bg-[var(--background)] rounded-2xl w-full">
                <p className="uppercase tracking-widest text-xs text-gray-400 font-semibold">
                  End Date
                </p>
                <div className="text-lg font-bold flex items-center gap-1.5 mt-1 text-[var(--text-title)]">
                  <CalendarIcon size={16} className="text-[var(--primary)]" />
                  <span>
                    {range?.to
                      ? range.to.toLocaleDateString()
                      : range?.from
                        ? range.from.toLocaleDateString()
                        : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DateCalculator;
