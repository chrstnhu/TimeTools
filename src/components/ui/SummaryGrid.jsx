export default function SummaryGrid({
  title,
  items,
  cols = 2,
  className = "",
}) {
  const gridColsClass =
    {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
    }[cols] || "grid-cols-2";

  return (
    <div>
      {title && (
        <h3 className="mb-4 text-left text-xs font-bold uppercase tracking-wider text-[var(--text)]">
          {title}
        </h3>
      )}

      <div className={`grid gap-3 ${gridColsClass} ${className}`}>
        {items.map((item, index) => (
          <div key={index} className="p-4 text-left">
            <p className="uppercase tracking-widest text-sm text-[var(--text)] font-semibold">
              {item.label}
            </p>

            <div className="text-4xl font-bold flex items-center justify-start gap-1.5 mt-1 text-[var(--text-title)]">
              {item.icon}
              <span>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
