import { useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { RotateCcw, ArrowRightLeft } from "lucide-react";
import ResultTime from "@/components/time/ResultTime";
import SummaryGrid from "@/components/ui/SummaryGrid";
import PageTitle from "@/components/ui/PageTitle";
import { menuItems } from "@/constants/menuItems";

function DayCalculator() {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  if (!currentItem) {
    return null;
  }

  const initialResult = {
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0,
  };

  const [days, setDays] = useState(0);
  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);

  const [result, setResult] = useState(initialResult);
  const [hasResult, setHasResult] = useState(false);

  const normalizeDuration = (totalDays) => {
    const years = Math.floor(totalDays / 365);
    const remainingDaysAfterYears = totalDays % 365;
    const months = Math.floor(remainingDaysAfterYears / 30);
    const days = remainingDaysAfterYears % 30;

    return {
      years,
      months,
      days,
    };
  };

  const handleConvert = () => {
    const totalDays = Number(days) + Number(months) * 30 + Number(years) * 365;
    const normalized = normalizeDuration(totalDays);

    setResult({
      ...normalized,
      totalDays,
    });

    setHasResult(true);
  };

  const handleReset = () => {
    setDays(0);
    setMonths(0);
    setYears(0);
    setResult(initialResult);
    setHasResult(false);
  };

  const handleInput = (setter) => (e) => {
    setter(Math.max(0, Number(e.target.value)));
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

          <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl">
            <div className="flex flex-col items-center">
              <Input
                className="text-center w-full rounded-xl border border-[var(--border)] font-bold text-lg p-2"
                type="number"
                min="0"
                value={days}
                onChange={handleInput(setDays)}
              />
              <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
                Days
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Input
                className="text-center w-full rounded-xl border border-[var(--border)] font-bold text-lg p-2"
                type="number"
                min="0"
                value={months}
                onChange={handleInput(setMonths)}
              />
              <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
                Months
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Input
                className="text-center w-full rounded-xl border border-[var(--border)] font-bold text-lg p-2"
                type="number"
                min="0"
                value={years}
                onChange={handleInput(setYears)}
              />
              <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
                Years
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 pt-2">
            <Button
              onClick={handleConvert}
              icon={ArrowRightLeft}
              variant="primary"
              shape="halfRounded"
              size="md"
            >
              Convert
            </Button>

            <Button
              onClick={handleReset}
              icon={RotateCcw}
              variant="ghost"
              shape="halfRounded"
              size="md"
              disabled={!days && !months && !years && !hasResult}
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
                title="Normalized Duration"
                variant="ymd"
                time={result}
                label="Years • Months • Days"
              />

              <SummaryGrid
                title="Equivalents"
                cols={3}
                items={[
                  {
                    value: result.totalDays.toLocaleString(),
                    label: "Total Days",
                  },
                  {
                    value: Math.floor(result.totalDays / 30).toLocaleString(),
                    label: "Total Months",
                  },
                  {
                    value: Math.floor(result.totalDays / 365).toLocaleString(),
                    label: "Total Years",
                  },
                ]}
              />
            </div>
          </Card>
        )}
    </div>
  );
}

export default DayCalculator;
