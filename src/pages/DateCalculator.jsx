import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Calendar as CalendarIcon,
  RotateCcw,
} from "lucide-react";
import ResultTime from "@/components/time/ResultTime";
import SummaryGrid from "@/components/ui/SummaryGrid";
import PageTitle from "@/components/ui/PageTitle";
import { menuItems } from "@/constants/menuItems";

function DateCalculator() {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  if (!currentItem) {
    return null;
  }

  const [range, setRange] = useState();

  function getDaysDifference() {
    if (!range?.from || !range?.to) return null;

    const diffTime = Math.abs(range.to.getTime() - range.from.getTime());
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }

  const days = getDaysDifference();
  const hasResult = days !== null;

  const handleReset = () => {
    setRange(undefined);
  };

  return (
    <div className="mx-auto max-w-5xl flex justify-center xl:flex-row flex-col gap-8 p-4">
      {/* ─── CALENDAR PICKER CARD ─── */}
      <Card className="p-8 border-2 border-[var(--border)] shadow-md rounded-3xl w-full xl:max-w-md">
        <div className="flex flex-col gap-6 mb-10">
          <PageTitle
            title={currentItem.title}
            icon={<currentItem.icon />}
            label={currentItem.label}
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

          <div className="flex justify-center pt-2">
            <Button
              type="button"
              onClick={handleReset}
              disabled={!range}
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

      {/* ─── RESULT DISPLAY CARD ─── */}
      {hasResult && (
        <Card className="p-8 border-1 border-[var(--primary)] bg-[var(--primary)]/10 shadow-lg rounded-3xl w-full xl:max-w-md transition-all duration-300">
          <div className="flex flex-col gap-6">
            <ResultTime
              title="Duration Result"
              variant="daysOnly"
              days={days}
            />

            <SummaryGrid
              title="Selected Period"
              items={[
                {
                  value: range.from.toLocaleDateString(),
                  label: "Start Date",
                  icon: (
                    <CalendarIcon size={14} className="text-[var(--primary)]" />
                  ),
                },
                {
                  value: range.to.toLocaleDateString(),
                  label: "End Date",
                  icon: (
                    <CalendarIcon size={14} className="text-[var(--primary)]" />
                  ),
                },
              ]}
            />
          </div>
        </Card>
      )}
    </div>
  );
}

export default DateCalculator;
