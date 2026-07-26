export default function ResultTime({
  title = "Result",
  time, // Objet { h, m, s } or { d, h, m, s } or { years, months, days }
  days, // Days
  variant = "time", // "time" | "full" | "daysOnly"
  label,
  negative = false,
  hasOperation = false,
}) {
  const pad = (num) => String(num || 0).padStart(2, "0");

  return (
    <div className="text-start">
      <h2 className="mb-2 uppercase tracking-[0.2em] font-bold text-[var(--primary)]">
        {title}
      </h2>

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

        {/* Explanatory option */}
        {label && (
          <p className="text-sm text-[var(--text)] uppercase tracking-widest mt-2">
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
