import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Pause, Play, RotateCcw } from "lucide-react";
import { formatTime } from "@/utils/formatTime";
import Input from "@/components/ui/Input";

function Timer() {
  const [timer, setTimer] = useState(0);
  const [timerInput, setTimerInput] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [isStart, setStart] = useState(false);

  const timerInterval = useRef(null);
  const [elapsed, setElapsed] = useState(0);

  const handleInputChange = (minutes) => {
    setTimerInput({
      minutes,
      seconds: 0,
    });
  };

  const handleTimerStart = () => {
    if (timerInterval.current) return;

    let duration = timer;

    if (duration === 0) {
      duration = (timerInput.minutes * 60 + timerInput.seconds) * 1000;
      if (duration <= 0) return;
      setTimer(duration);
    }

    setStart(true);
    timerInterval.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 10) {
          clearInterval(timerInterval.current);
          timerInterval.current = null;
          return 0;
        }

        return prev - 10;
      });

      setElapsed((prev) => prev + 10);
    }, 10);
  };

  const handleTimerStop = () => {
    clearInterval(timerInterval.current);
    timerInterval.current = null;
    setStart(false);
  };

  const handleTimerReset = () => {
    handleTimerStop();
    setTimer(0);
    setElapsed(0);
    setTimerInput({
      minutes: 0,
      seconds: 0,
    });
    setStart(false);
  };

  const remaining = formatTime(timer);
  const elapsedTime = formatTime(elapsed);
  useEffect(() => {
    return () => {
      clearInterval(timerInterval.current);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center gap-3 my-4">
        <div className="flex justify-center gap-3">
          <Button onClick={() => handleInputChange(2)}>2 min</Button>
          <Button onClick={() => handleInputChange(5)}>5 min</Button>
          <Button onClick={() => handleInputChange(10)}>10 min</Button>
          <Button onClick={() => handleInputChange(30)}>30 min</Button>
        </div>

        <div>
          <Input
            className="w-[120px]"
            type="number"
            min="0"
            placeholder="Minutes"
            value={timerInput.minutes}
            onChange={(e) =>
              setTimerInput({
                ...timerInput,
                minutes: Number(e.target.value),
              })
            }
          />

          <Input
            className="w-[120px]"
            type="number"
            min="0"
            max="59"
            placeholder="Seconds"
            value={timerInput.seconds}
            onChange={(e) =>
              setTimerInput({
                ...timerInput,
                seconds: Number(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <Card className="w-[150px]">
          <p className="text-sm text-gray-400">Remaining</p>

          <p className="text-xl font-bold">
            {remaining.minutes}:{remaining.seconds}:
            <span className="text-gray-400">{remaining.milliseconds}</span>
          </p>
        </Card>

        <Card className="w-[150px]">
          <p className="text-sm text-gray-400">Elapsed</p>

          <p className="text-xl font-bold">
            {elapsedTime.minutes}:{elapsedTime.seconds}:
            <span className="text-gray-400">{elapsedTime.milliseconds}</span>
          </p>
        </Card>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        {isStart ? (
          <Button onClick={handleTimerStop} icon={Pause}>
            Pause
          </Button>
        ) : (
          <Button onClick={handleTimerStart} icon={Play}>
            Start
          </Button>
        )}

        <Button onClick={handleTimerReset} icon={RotateCcw}>
          Reset
        </Button>
      </div>
    </>
  );
}

export default Timer;
