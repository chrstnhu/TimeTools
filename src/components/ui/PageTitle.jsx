export default function PageTitle({ title, icon, label }) {
  return (
    <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
      {icon && <span size={22} className="text-[var(--primary)]">{icon}</span>}{" "}
      <div className="flex flex-col items-start">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}
