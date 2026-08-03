export default function PageTitle({ title, icon, label, withBorder = false }) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 text-center sm:text-left ${
        withBorder ? "pb-3 border-b border-[var(--border)]" : ""
      }`}
    >
      {/* Desktop icon (aligned with both title and label) */}
      {icon && (
        <span className="hidden sm:flex text-[var(--primary)] text-2xl items-center justify-center shrink-0">
          {icon}
        </span>
      )}

      <div className="flex flex-col items-center sm:items-start">
        {/* Mobile-only icon */}
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          {icon && (
            <span className="sm:hidden text-[var(--primary)] text-2xl flex items-center justify-center shrink-0">
              {icon}
            </span>
          )}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>

        {/* Label */}
        {label && (
          <p className="text-xs text-gray-400 mt-1 sm:mt-0.5">{label}</p>
        )}
      </div>
    </div>
  );
}
