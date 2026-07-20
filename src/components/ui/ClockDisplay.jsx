import { Sun, Moon } from "lucide-react";

function ClockDisplay({ time, size = "text-3xl" }) {
  return (
    <div
      className={`
        time
        ${size}
        font-bold
        flex
        items-center
        justify-center
        flex-wrap
        gap-1
      `}
    >
      <span className="bg-[var(--background)]/90 rounded-md p-2">
        {String(time.hour).padStart(2, "0")}
      </span>

      <span>:</span>

      <span className="bg-[var(--background)]/90 rounded-md p-2">
        {time.minute}
      </span>

      <span>:</span>

      <span className="bg-[var(--background)]/90 rounded-md p-2">
        {time.second}
      </span>

      {time.period && <span className="ml-2">{time.period}</span>}
      {time.isDay ? (
        <Sun className="text-yellow-400" size={14} />
      ) : (
        <Moon className="text-blue-300" size={14} />
      )}
    </div>
  );
}

export default ClockDisplay;
