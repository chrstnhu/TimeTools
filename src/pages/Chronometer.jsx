import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Pause, Play, RotateCcw } from "lucide-react";
import { formatTime } from "@/utils/formatTime";
import Timer from "@/components/time/Timer";

function Chronometer() {
  const [counter, setCounter] = useState(0);
  const [isStart, setIsStart] = useState(false);

  const intervalId = useRef(null);

  const handleStart = () => {
    if (intervalId.current) return;

    setIsStart(true);
    intervalId.current = setInterval(() => {
      setCounter((prev) => prev + 10);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
    setIsStart(false);
  };

  const handleReset = () => {
    handleStop();

    setCounter(0);
    setIsStart(false);
  };

  const chrono = formatTime(counter);

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* CHRONOMETER */}
      <Card>
        <label className="font-bold text-center block">Chronometer</label>

        <div className="flex justify-center my-4">
          <Card className="w-fit">
            <p className="text-2xl font-bold">
              {chrono.hours}:{chrono.minutes}:{chrono.seconds}
              <span className="text-gray-400">:{chrono.milliseconds}</span>
            </p>
          </Card>
        </div>

        <div className="flex justify-center gap-2">
          {isStart ? (
            <Button onClick={handleStop} icon={Pause}>
              Pause
            </Button>
          ) : (
            <Button onClick={handleStart} icon={Play}>
              Start
            </Button>
          )}

          <Button onClick={handleReset} icon={RotateCcw}>
            Reset
          </Button>
        </div>
      </Card>

      {/* TIMER */}
      <Card>
        <label className="font-bold text-center block">Timer</label>
        <Timer />
      </Card>
    </div>
  );
}

export default Chronometer;
