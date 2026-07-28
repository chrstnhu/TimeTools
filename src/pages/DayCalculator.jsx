import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { RotateCcw, Plus, Minus } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import { menuItems } from "@/constants/menuItems";
import ResultTime from "@/components/time/ResultTime";

function DayCalculator() {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  if (!currentItem) {
    return <Navigate to="/" replace />;
  }

  const [baseDate, setBaseDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [daysToAdd, setDaysToAdd] = useState(0);
  const [operation, setOperation] = useState("+");

  // Calculate new date
  const calculateNewDate = () => {
    const date = new Date(baseDate);
    const amount = Number(daysToAdd) || 0;

    if (operation === "+") {
      date.setDate(date.getDate() + amount);
    } else {
      date.setDate(date.getDate() - amount);
    }
    return date;
  };

  const resultDate = calculateNewDate();

  const handleReset = () => {
    setBaseDate(new Date().toISOString().split("T")[0]);
    setDaysToAdd(0);
    setOperation("+");
  };

  return (
    <div className="mx-auto max-w-5xl flex justify-center xl:flex-row sm:flex-col gap-8 p-4">
      <Card className="p-8 shadow-md rounded-3xl w-full bg-[var(--surface)]">
        <div className="space-y-6 mb-10">
          <PageTitle
            title={currentItem.title}
            icon={<currentItem.icon />}
            label={currentItem.label}
            withBorder={true}
          />

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 block">
                Start Date
              </label>
              <Input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] font-bold text-base p-3"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2 ml-3">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 block">
                  Operation
                </label>
                <div className="flex gap-2 pt-3">
                  <Button
                    type="button"
                    variant={operation === "+" ? "primary" : "ghost"}
                    onClick={() => setOperation("+")}
                    className="w-full"
                    icon={Plus}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant={operation === "-" ? "primary" : "ghost"}
                    onClick={() => setOperation("-")}
                    className="w-full"
                    icon={Minus}
                  >
                    Sub
                  </Button>
                </div>
              </div>

              <div className="w-1/2">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 block">
                  Days Amount
                </label>
                <Input
                  type="number"
                  min="0"
                  value={daysToAdd}
                  onChange={(e) =>
                    setDaysToAdd(Math.max(0, Number(e.target.value)))
                  }
                  className="w-full text-center rounded-xl border border-[var(--border)] font-bold text-base p-3"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              onClick={handleReset}
              icon={RotateCcw}
              variant="ghost"
              shape="halfRounded"
              size="md"
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-6 w-full xl:max-w-md">
        <Card className="p-8 shadow-lg rounded-3xl border-2 border-[var(--primary)] bg-[var(--primary)]/10">
          <ResultTime title="Resulting Date" variant="date" date={resultDate} />
        </Card>
      </div>
    </div>
  );
}

export default DayCalculator;
