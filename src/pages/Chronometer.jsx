import { useState, useRef, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Pause, Play, RotateCcw, Flag } from "lucide-react";
import { formatTime } from "@/utils/formatTime";
import PageTitle from "@/components/ui/PageTitle";
import { menuItems } from "@/constants/menuItems";

function Chronometer() {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  if (!currentItem) {
    return <Navigate to="/" replace />;
  }

  const [counter, setCounter] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [laps, setLaps] = useState([]);

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
    setLaps([]);
    setIsStart(false);
  };

  const handleLap = () => {
    if (!isStart) return;

    const previousTotalTime = laps.length > 0 ? laps[0].totalTimeMs : 0;
    const currentLapTimeMs = counter - previousTotalTime;

    const newLap = {
      id: laps.length + 1,
      lapTimeMs: currentLapTimeMs,
      totalTimeMs: counter,
    };

    setLaps((prevLaps) => [newLap, ...prevLaps]);
  };

  const chrono = formatTime(counter);

  const lapTimes = laps.map((lap) => lap.lapTimeMs);
  const minLapTime = lapTimes.length > 1 ? Math.min(...lapTimes) : null;
  const maxLapTime = lapTimes.length > 1 ? Math.max(...lapTimes) : null;

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl flex flex-col gap-6 p-4">
      {/* ─── CHRONOMETER ─── */}
      <Card className="p-8 shadow-md rounded-3xl w-full bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex flex-col gap-6">
          <PageTitle
            title={currentItem.title}
            icon={<currentItem.icon />}
            label={currentItem.label}
            withBorder={true}
          />

          <div className="flex justify-center">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/50 p-6 shadow-inner w-full max-w-md text-center">
              <p
                className="text-4xl sm:text-5xl font-black tracking-wider text-[var(--text)]"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {chrono.hours}:{chrono.minutes}:{chrono.seconds}
                <span className="text-[var(--primary)] font-bold text-2xl sm:text-3xl ml-1">
                  .{chrono.milliseconds}
                </span>
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 pt-2">
            {isStart ? (
              <>
                <Button
                  onClick={handleLap}
                  icon={Flag}
                  variant="secondary"
                  size="md"
                  shape="halfRounded"
                >
                  Lap
                </Button>
                <Button
                  onClick={handleStop}
                  icon={Pause}
                  variant="primary"
                  size="md"
                  shape="halfRounded"
                >
                  Pause
                </Button>
                <Button
                  onClick={handleReset}
                  icon={RotateCcw}
                  variant="ghost"
                  size="md"
                  shape="halfRounded"
                  disabled={true}
                  className="disabled:bg-[var(--surface-disabled)] disabled:text-[var(--text-disabled)] disabled:cursor-not-allowed"
                >
                  Reset
                </Button>
              </>
            ) : counter > 0 ? (
              <>
                <Button
                  onClick={handleLap}
                  icon={Flag}
                  variant="secondary"
                  size="md"
                  shape="halfRounded"
                  disabled={true}
                  className="disabled:bg-[var(--surface-disabled)] disabled:text-[var(--text-disabled)] disabled:cursor-not-allowed"
                >
                  Lap
                </Button>
                <Button
                  onClick={handleStart}
                  icon={Play}
                  variant="primary"
                  size="md"
                  shape="halfRounded"
                >
                  Start
                </Button>
                <Button
                  onClick={handleReset}
                  icon={RotateCcw}
                  variant="ghost"
                  size="md"
                  shape="halfRounded"
                >
                  Reset
                </Button>
              </>
            ) : (
              <Button
                onClick={handleStart}
                icon={Play}
                variant="primary"
                size="md"
                shape="halfRounded"
              >
                Start
              </Button>
            )}
          </div>

          {/* ─── LAPS LIST ─── */}
          {laps.length > 0 && (
            <div className="flex justify-center pt-4">
              <div className="w-full max-w-lg max-h-64 overflow-y-auto flex flex-col gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)]/30 p-4">
                <div className="grid grid-cols-3 text-xs font-semibold text-[var(--text)] opacity-70 px-2 pb-2 border-b border-[var(--border)]">
                  <span className="text-left">Laps</span>
                  <span className="text-center">Lap Time</span>
                  <span className="text-right">Total Time</span>
                </div>

                {laps.map((lap) => {
                  const formattedLap = formatTime(lap.lapTimeMs);
                  const formattedTotal = formatTime(lap.totalTimeMs);

                  let textColor = "text-[var(--text)]";
                  if (lap.lapTimeMs === minLapTime) {
                    textColor = "text-blue-500 font-bold";
                  } else if (lap.lapTimeMs === maxLapTime) {
                    textColor = "text-red-500 font-bold";
                  }

                  return (
                    <div
                      key={lap.id}
                      className="grid grid-cols-3 items-center px-2 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm"
                    >
                      <span className="font-medium text-left text-[var(--text)]">
                        {lap.id}
                      </span>
                      <span className={`font-mono text-center ${textColor}`}>
                        +{formattedLap.minutes}:{formattedLap.seconds}.
                        {formattedLap.milliseconds}
                      </span>
                      <span className="font-mono text-right text-[var(--text)] opacity-80">
                        {formattedTotal.minutes}:{formattedTotal.seconds}.
                        {formattedTotal.milliseconds}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Chronometer;
