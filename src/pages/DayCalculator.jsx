import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function DayCalculator() {
  const [days, setDays] = useState(0);
  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);
  const [result, setResult] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0,
  });
  const [hasResult, setHasResult] = useState(false);

  function normalizeDuration(totalDays) {
    const years = Math.floor(totalDays / 365);
    const remainingDaysAfterYears = totalDays % 365;
    const months = Math.floor(remainingDaysAfterYears / 30);
    const days = remainingDaysAfterYears % 30;

    setHasResult(true);
    return { years, months, days };
  }

  const handleConvert = () => {
    const totalDays = days + months * 30 + years * 365;

    const normalized = normalizeDuration(totalDays);

    setResult({
      ...normalized,
      totalDays,
    });
  };

  const handleReset = () => {
    setDays(0);
    setMonths(0);
    setYears(0);
    setResult({
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
    });
    setHasResult(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div>
          <div>
            <label>Day(s)</label>
            <Input
              type="number"
              min="0"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value) || 0)}
            ></Input>
          </div>
          <div>
            <label>Month(s)</label>
            <Input
              type="number"
              min="0"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value) || 0)}
            ></Input>
          </div>
          <div>
            <label>Year(s)</label>
            <Input
              type="number"
              min="0"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value) || 0)}
            ></Input>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <Button onClick={handleConvert}>Convert</Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </Card>
      {hasResult && (
        <Card>
          <label className="font-bold">Equivalent duration:</label>

          <p>
            {result.years} year(s), {result.months} month(s), {result.days}{" "}
            day(s)
          </p>

          <hr className="my-3" />
          <div className="flex flex-col gap-2">
            <p>Day(s)</p>
            <Card>{result.totalDays}</Card>
            <p>
              Month(s)
              <span className="ml-1 text-sm text-gray-400">
                (Based on 1 month = 30 days)
              </span>
            </p>

            <Card>{Math.floor(result.totalDays / 30)}</Card>
            <p>
              Year(s)
              <span className="ml-1 text-sm text-gray-400">
                (Based on 1 year = 365 days)
              </span>
            </p>
            <Card>{Math.floor(result.totalDays / 365)}</Card>
          </div>
        </Card>
      )}
    </div>
  );
}

export default DayCalculator;
