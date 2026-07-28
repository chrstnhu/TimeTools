export default function ResultTime({
  title = "Result",
  time, // Object { h, m, s } or { d, h, m, s }
  days,
  dayLabel, // "Yesterday", "Today", "Tomorrow", etc.
  date,
  variant = "time", // "time" | "full" | "daysOnly" | "ymd" | "date" | "daytime"
  label,
  negative = false,
  hasOperation = false,
}) {
  const pad = (num) => String(num || 0).padStart(2, "0");

  const daysCount = time?.d || 0;
  const standardHours = time?.h || 0;
  const totalHours = daysCount * 24 + standardHours;

  return (
    <div className="text-start">
      <div className="flex items-center justify-between mb-2">
        <h2 className="uppercase tracking-[0.2em] font-bold text-[var(--primary)]">
          {title}
        </h2>
      </div>

      <div className="rounded-2xl py-4">
        {/* VARIANT 1 : Standard HH:MM:SS */}
        {variant === "time" && time && (
          <p
            className="text-5xl font-black tracking-wider text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
          </p>
        )}

        {/* VARIANT 2 : Format (+/- Xd HH:MM:SSs) */}
        {variant === "full" && time && (
          <p
            className="text-3xl sm:text-4xl font-black tracking-wider text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {hasOperation && (negative ? "-" : "+")}
            {time.d !== undefined && `${time.d}d `}
            {pad(time.h)}:{pad(time.m)}:{pad(time.s)}s
          </p>
        )}

        {/* VARIANT : Day + Format*/}
        {variant === "daytime" && time && (
          <div className="flex flex-col gap-2">
            {dayLabel && (
              <span className="text-lg font-bold text-[var(--primary)]">
                {negative ? "-" : ""}
                {dayLabel}
              </span>
            )}

            <div className="flex items-baseline gap-3 flex-wrap">
              <p
                className="text-3xl sm:text-4xl font-black tracking-wider text-[var(--foreground)]"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {pad(totalHours)}:{pad(time.m)}:{pad(time.s)}
              </p>

              {daysCount > 0 && (
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-secondary)]">
                  ({daysCount * 24}h ({daysCount}d) + {standardHours}h)
                </span>
              )}
            </div>
          </div>
        )}

        {/* VARIANT 3 : Format with days */}
        {variant === "daysOnly" && (
          <p
            className="text-5xl font-black tracking-wider text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {days ?? 0}
            <span className="text-base font-semibold text-[var(--text)] ml-1">
              day(s)
            </span>
          </p>
        )}

        {/* VARIANT 4 : Format years / months / days */}
        {variant === "ymd" && time && (
          <p
            className="text-3xl sm:text-4xl font-black tracking-wider text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {time.years || 0}y {time.months || 0}m {time.days || 0}d
          </p>
        )}

        {/* VARIANT 5 : Format date */}
        {variant === "date" && date && (
          <p className="text-2xl sm:text-3xl font-black text-[var(--text-title)] tracking-tight">
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        {/* Explanatory option */}
        {label && (
          <p className="text-sm text-[var(--text)] uppercase tracking-widest mt-3">
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
