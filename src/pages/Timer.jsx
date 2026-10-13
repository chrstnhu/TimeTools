import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import { Pause, Play, X, Hourglass } from "lucide-react";
import Input from "@/components/ui/Input";
import CircularTime from "@/components/time/CircularTime";
import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";

const QUICK_MINUTES = [2, 5, 10, 15, 30];

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
    <div className="mx-auto max-w-5xl flex flex-col gap-6 p-4">
      <Card className="p-8 shadow-md rounded-3xl w-full bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex flex-col gap-6">
          <PageTitle
            title="Timer"
            icon={<Hourglass />}
            label="Set a countdown for your activities"
            withBorder={true}
          />

          <div className="flex flex-col justify-center gap-3 my-4">
            <div className="flex flex-wrap justify-center gap-3">
              {QUICK_MINUTES.map((minutes) => (
                <Button
                  onClick={() => handleInputChange(minutes)}
                  shape="halfRounded"
                  variant="ghost"
                >
                  {minutes} min
                </Button>
              ))}
            </div>

            <div className="flex justify-center gap-2 pt-3 items-center">
              <div className="flex flex-col items-center">
                <Input
                  className="w-[80px] sm:w-[120px] rounded-3xl py-5 text-center text-lg sm:text-3xl font-bold shadow-sm transition focus:scale-105"
                  type="number"
                  min="0"
                  placeholder="Minutes"
                  value={timerInput.minutes}
                  onFocus={(e) => {
                    if (timerInput.minutes === 0) e.target.select();
                  }}
                  onChange={(e) => {
                    const raw = e.target.value;

                    setTimerInput((prev) => ({
                      ...prev,
                      minutes:
                        raw === ""
                          ? 0
                          : Math.max(0, Number(raw)),
                    }));
                  }}
                />

                <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
                  Minutes
                </span>
              </div>

              <p className="text-2xl font-bold">:</p>

              <div className="flex flex-col items-center">
                <Input
                  className="w-[80px] sm:w-[120px] rounded-3xl py-5 text-center text-lg sm:text-3xl font-bold shadow-sm transition focus:scale-105"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Seconds"
                  value={timerInput.seconds}
                  onFocus={(e) => {
                    if (timerInput.seconds === 0) e.target.select();
                  }}
                  onChange={(e) => {
                    const raw = e.target.value;

                    setTimerInput((prev) => ({
                      ...prev,
                      seconds:
                        raw === ""
                          ? 0
                          : Math.min(59, Math.max(0, Number(raw))),
                    }));
                  }}
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

          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {isStart ? (
              <>
                <Button onClick={handleTimerStop} icon={Pause} shape="square">
                  Pause
                </Button>
                <Button
                  onClick={handleTimerReset}
                  icon={X}
                  variant="ghost"
                  shape="square"
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
                  shape="square"
                >
                  Close
                </Button>
              </>
            ) : (
              <Button onClick={handleTimerStart} icon={Play} shape="square">
                Start
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Timer;
