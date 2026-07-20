import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Pause, Play, RotateCcw } from "lucide-react";

function Chronometer() {
  const [counter, setCounter] = useState(0);

  const intervalId = useRef(null);

  const handleStart = () => {
    if (intervalId.current) return;

    intervalId.current = setInterval(() => {
      setCounter((prev) => prev + 10);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  const handleReset = () => {
    handleStop();
    setCounter(0);
  };

  const hours = String(Math.floor(counter / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor(counter / (1000 * 60)) % 60).padStart(
    2,
    "0",
  );
  const seconds = String(Math.floor(counter / 1000) % 60).padStart(2, "0");
  const milliseconds = String(counter % 1000).padStart(3, "0");

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <label className="font-bold">Chronometer</label>

        <div className="flex justify-center my-4">
          <Card>
            <p className="text-xl">
              {hours}:{minutes}:{seconds}
              <span className="text-gray-400">:{milliseconds}</span>
            </p>
          </Card>
        </div>

        <div className="flex justify-center gap-2">
          <Button onClick={handleStop} icon={Pause}>
            Pause
          </Button>

          <Button onClick={handleStart} icon={Play}>
            Start
          </Button>

          <Button onClick={handleReset} icon={RotateCcw}>
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Chronometer;
