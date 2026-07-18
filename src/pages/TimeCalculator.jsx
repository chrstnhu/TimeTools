import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { secondsToTime } from "../utils/secondsToTime";
import { RotateCcw, Plus, Minus, Save } from "lucide-react";

function TimeCalculator() {
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
  };

  const [time1, setTime1] = useState({ h: 0, m: 0, s: 0 });
  const [time2, setTime2] = useState({ h: 0, m: 0, s: 0 });
  const [result, setResult] = useState(initialResult);

  const handleCalculate = (selectedOperation) => {

    const seconds1 = time1.h * 3600 + time1.m * 60 + time1.s;
    const seconds2 = time2.h * 3600 + time2.m * 60 + time2.s;

    let totalSeconds;
    if (selectedOperation === "+") {
      totalSeconds = seconds1 + seconds2;
    } else if (selectedOperation === "-") {
      totalSeconds = seconds1 - seconds2;
    }

    totalSeconds = Math.max(0, totalSeconds);

    setResult(secondsToTime(totalSeconds));
  };

  const handleReset = () => {
    setTime1({ h: 0, m: 0, s: 0 });
    setTime2({ h: 0, m: 0, s: 0 });
    setResult(initialResult);
  };

  const handleKeep = () => {
    setTime1(result.total);
    setTime2({ h: 0, m: 0, s: 0 });
    setResult(initialResult);
  };

  return (
    <Card>
      <div >

        <div>
          <label htmlFor="time1">Time 1:</label>

          <div className="flex flex-row items-center">
            <Input
              type="number"
              min="0"
              id="time1-h"
              value={time1.h}
              onChange={(e) =>
                setTime1({
                  ...time1,
                  h: parseInt(e.target.value) || 0,
                })
              }
            />
            <p>h</p>

            <Input
              type="number"
              min="0"
              max="59"
              id="time1-m"
              value={time1.m}
              onChange={(e) =>
                setTime1({
                  ...time1,
                  m: parseInt(e.target.value) || 0,
                })
              }
            />
            <p>m</p>

            <Input
              type="number"
              min="0"
              max="59"
              id="time1-s"
              value={time1.s}
              onChange={(e) =>
                setTime1({
                  ...time1,
                  s: parseInt(e.target.value) || 0,
                })
              }
            />
            <p>s</p>
          </div>
        </div>


        <div>
          <label htmlFor="time2">Time 2:</label>

          <div className="flex flex-row items-center">
            <Input
              type="number"
              min="0"
              id="time2-h"
              value={time2.h}
              onChange={(e) =>
                setTime2({
                  ...time2,
                  h: parseInt(e.target.value) || 0,
                })
              }
            />
            <p>h</p>

            <Input
              type="number"
              min="0"
              max="59"
              id="time2-m"
              value={time2.m}
              onChange={(e) =>
                setTime2({
                  ...time2,
                  m: parseInt(e.target.value) || 0,
                })
              }
            />
            <p>m</p>

            <Input
              type="number"
              min="0"
              max="59"
              id="time2-s"
              value={time2.s}
              onChange={(e) =>
                setTime2({
                  ...time2,
                  s: parseInt(e.target.value) || 0,
                })
              }
            />
            <p>s</p>
          </div>
        </div>


        <div className="flex gap-2 mt-4">
          <div className="flex gap-2 my-4">
            <Button
              icon={Plus}
              type="button"
              onClick={() => {
                handleCalculate("+");
              }}
            >
              Add
            </Button>

            <Button
              icon={Minus}
              type="button"
              onClick={() => {
                handleCalculate("-");
              }}
            >
              Subtract
            </Button>

            <Button icon={RotateCcw} type="button" onClick={handleReset}>
              Reset
            </Button>

            <Button icon={Save} type="button" onClick={handleKeep}>
              Keep time
            </Button>
          </div>

        </div>

      </div>


      <div className="flex flex-col mt-4">
        <label htmlFor="result">Result:</label>

        <div className="flex flex-row items-center">
          <p> 
            {result.total.h} h{" "}
            {result.total.m.toString().padStart(2, "0")} m{" "}
            {result.total.s.toString().padStart(2, "0")} s{" "}
          </p>
        </div>

        <div className="mt-4">
          <h3>With days:</h3>

          <p>
            {result.days.d} d{" "}
            {result.days.h} h{" "}
            {result.days.m} m{" "}
            {result.days.s} s
          </p>
        </div>

      </div>

    </Card>
  );
}

export default TimeCalculator;