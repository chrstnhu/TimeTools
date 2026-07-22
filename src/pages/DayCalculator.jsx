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
    <div className="flex flex-col gap-4">
      {/* INPUT */}
      <Card>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-center">Convert duration</h2>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold block mb-1 text-center">
                Days
              </label>

              <Input
                className="text-center w-full"
                type="number"
                min="0"
                value={days}
                onChange={handleInput(setDays)}
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-center">
                Months
              </label>

              <Input
                className="text-center w-full"
                type="number"
                min="0"
                value={months}
                onChange={handleInput(setMonths)}
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-center">
                Years
              </label>

              <Input
                className="text-center w-full"
                type="number"
                min="0"
                value={years}
                onChange={handleInput(setYears)}
              />
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-2">
            <Button onClick={handleConvert}>Convert</Button>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </div>
      </Card>

      {hasResult && (
        <Card>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-center">Result</h2>

            <Card className="w-full mx-auto">
              <p className="text-3xl font-bold tracking-wider">
                {result.years}y {result.months}m {result.days}d
              </p>
            </Card>

            <div>
              <p className="font-semibold mb-2">Equivalent</p>

              <div className="grid grid-cols-3 gap-3">
                <Card>
                  <p className="text-sm text-gray-400">Total Days</p>

                  <p className="text-2xl font-bold">{result.totalDays}</p>
                </Card>

                <Card>
                  <p className="text-sm text-gray-400">Total Months</p>

                  <p className="text-2xl font-bold">
                    {Math.floor(result.totalDays / 30)}
                  </p>
                </Card>

                <Card>
                  <p className="text-sm text-gray-400">Total Years</p>

                  <p className="text-2xl font-bold">
                    {Math.floor(result.totalDays / 365)}
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
