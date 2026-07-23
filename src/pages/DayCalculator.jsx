import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function DayCalculator() {
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
    <div className="mx-auto max-w-5xl flex justify-center xl:flex-row sm:flex-col gap-8">
      {/* INPUT */}
      <Card className="p-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-center">Convert duration</h2>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <Input
                className="text-center w-full"
                type="number"
                min="0"
                value={days}
                onChange={handleInput(setDays)}
              />
              <label className="uppercase font-semibold block mb-1 text-center text-gray-500">
                Days
              </label>
            </div>

            <div>
              <Input
                className="text-center w-full"
                type="number"
                min="0"
                value={months}
                onChange={handleInput(setMonths)}
              />
              <label className="uppercase font-semibold block mb-1 text-center text-gray-500">
                Months
              </label>
            </div>

            <div>
              <Input
                className="text-center w-full"
                type="number"
                min="0"
                value={years}
                onChange={handleInput(setYears)}
              />
              <label className="uppercase font-semibold block mb-1 text-center text-gray-500">
                Years
              </label>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-2">
            <Button onClick={handleConvert}>Convert</Button>
            <Button onClick={handleReset}>Reset</Button>
          </div>
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
                {" "}
                {result.years}y {result.months}m {result.days}d
              </p>
            </div>

            <div className="mt-10">
              <h3 className="mb-6 text-center text-lg font-semibold">
                Equivalent
              </h3>

              <div className="grid gap-5 grid-cols-2">
                <Card className="rounded-3xl p-6 text-center">
                  <p className="text-2xl font-bold">{result.totalDays}</p>
                  <p className="mt-2 uppercase tracking-widest text-xs text-gray-400">
                    Totals Days
                  </p>
                </Card>

                <Card className="rounded-3xl p-6 text-center">
                  <p className="text-2xl font-bold">
                    {Math.floor(result.totalDays / 30)}
                  </p>
                  <p className="mt-2 uppercase tracking-widest text-xs text-gray-400">
                    Total Months
                  </p>
                </Card>

                <Card className="rounded-3xl p-6 text-center">
                  <p className="text-2xl font-bold">
                    {Math.floor(result.totalDays / 365)}
                  </p>
                  <p className="mt-2 uppercase tracking-widest text-xs text-gray-400">
                    Total Years
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default DayCalculator;
