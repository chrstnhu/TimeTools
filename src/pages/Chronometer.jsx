import { useState, useRef, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Pause, Play, RotateCcw, Timer as TimerIcon } from "lucide-react";
import { formatTime } from "@/utils/formatTime";
import Timer from "@/components/time/Timer";
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
    <div className="mx-auto max-w-5xl flex flex-col gap-6 p-4">
      {/* ─── CHRONOMETER ─── */}
      <Card className="p-8 shadow-md rounded-3xl w-full bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex flex-col gap-6">
          <PageTitle
            title={currentItem.title}
            icon={<currentItem.icon />}
            label={currentItem.label}
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
              <Button
                onClick={handleStop}
                icon={Pause}
                variant="primary"
                size="md"
                shape="halfRounded"
              >
                Pause
              </Button>
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

            <Button
              onClick={handleReset}
              icon={RotateCcw}
              variant="ghost"
              size="md"
              shape="halfRounded"
              disabled={counter === 0 && !isStart}
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* ─── TIMER ─── */}
      <Card className="p-8 shadow-md rounded-3xl w-full bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex flex-col gap-6">
          <PageTitle
            title="Timer"
            icon={<TimerIcon />}
            label="Set a countdown for your activities"
          />
          <Timer />
        </div>
      </Card>
    </div>
  );
}

export default Chronometer;
