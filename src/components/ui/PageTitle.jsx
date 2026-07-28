export default function PageTitle({ title, icon, label, withBorder = false }) {
  return (
    <div
      className={`flex items-center gap-3 ${
        withBorder ? "pb-3 border-b border-[var(--border)]" : ""
      }`}
    >
      {icon && (
        <span size={22} className="text-[var(--primary)]">
          {icon}
        </span>
      )}{" "}
      <div className="flex flex-col items-start align-start justify-start gap-1">
        <h2 className="text-xl font-bold items-start align-start justify-start gap-1">{title}</h2>
        <p className="text-xs text-gray-400 items-start align-start justify-start gap-1">{label}</p>
      </div>
    </div>
  );
}
