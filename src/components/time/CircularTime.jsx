export default function CircularTime({ totalTime, remainingTime }) {
  const size = 120;
  const strokeWidth = 8;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = totalTime > 0 ? remainingTime / totalTime : 0;
  const strokeDashoffset = circumference - progress * circumference;

  const safeTime = Math.max(0, remainingTime);
  const minutes = String(Math.floor(safeTime / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((safeTime % 60000) / 1000)).padStart(
    2,
    "0",
  );
  const ms = String(Math.floor((safeTime % 1000) / 10)).padStart(2, "0");

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 fill-none"
        />

        {/* Progress Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-[var(--primary)] fill-none"
        />
      </svg>

      {/* Time display */}
      <div className="absolute font-bold text-sm">
        {minutes}:{seconds}.<span className="text-xs opacity-75">{ms}</span>
      </div>
    </div>
  );
}
