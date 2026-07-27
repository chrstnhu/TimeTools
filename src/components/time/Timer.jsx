import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import { Pause, Play, X } from "lucide-react";
import Input from "@/components/ui/Input";
import CircularTime from "@/components/time/CircularTime";

function Timer() {
  const [timer, setTimer] = useState(0);
  const [timerInput, setTimerInput] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [totalTime, setTotalTime] = useState(0);
  const [isStart, setStart] = useState(false);

  const timerInterval = useRef(null);
  const [elapsed, setElapsed] = useState(0);

  const [flags, setFlags] = useState([]);

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
      setTotalTime(duration);
    }

    setStart(true);
    timerInterval.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 10) {
          clearInterval(timerInterval.current);
          timerInterval.current = null;
          setStart(false);
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

  const handleTimerFlag = () => {
    setFlags((prevFlags) => [...prevFlags, elapsed]);
  };

  const handleTimerReset = () => {
    handleTimerStop();
    setTimer(0);
    setTotalTime(0);
    setElapsed(0);
    setTimerInput({
      minutes: 0,
      seconds: 0,
    });
  };

  useEffect(() => {
    return () => {
      clearInterval(timerInterval.current);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center gap-3 my-4">
        <div className="flex justify-center gap-3">
          <Button
            onClick={() => handleInputChange(2)}
            shape="halfRounded"
            variant="ghost"
          >
            2 min
          </Button>
          <Button
            onClick={() => handleInputChange(5)}
            shape="halfRounded"
            variant="ghost"
          >
            5 min
          </Button>
          <Button
            onClick={() => handleInputChange(10)}
            shape="halfRounded"
            variant="ghost"
          >
            10 min
          </Button>
          <Button
            onClick={() => handleInputChange(30)}
            shape="halfRounded"
            variant="ghost"
          >
            30 min
          </Button>
        </div>

        <div className="flex justify-center gap-2 pt-3 items-center">
          <div className="flex flex-col">
            <Input
              className="w-[120px]
                rounded-3xl
                py-5
                text-center
                text-3xl
                font-bold
                shadow-sm
                transition
                focus:scale-105"
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
            <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
              Minutes
            </span>
          </div>
          <p>:</p>
          <div className="flex flex-col items-center">
            <Input
              className="w-[120px]
                rounded-3xl
                py-5
                text-center
                text-3xl
                font-bold
                shadow-sm
                transition
                focus:scale-105"
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
            <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
              Seconds
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 items-center">
        {totalTime > 0 && (
          <CircularTime totalTime={totalTime} remainingTime={timer} />
        )}
      </div>

      <div className="flex justify-center gap-3 mt-2">
        {isStart ? (
          <>
            <Button onClick={handleTimerStop} icon={Pause}>
              Pause
            </Button>
            <Button
              onClick={handleTimerReset}
              icon={X}
              variant="ghost"
              shape="halfRounded"
            >
              Close
            </Button>
          </>
        ) : timer > 0 ? (
          <>
            <Button onClick={handleTimerStart} icon={Play}>
              Start
            </Button>
            <Button
              onClick={handleTimerReset}
              icon={X}
              variant="ghost"
              shape="halfRounded"
            >
              Close
            </Button>
          </>
        ) : (
          <Button onClick={handleTimerStart} icon={Play}>
            Start
          </Button>
        )}
      </div>
    </>
  );
}

export default Timer;
