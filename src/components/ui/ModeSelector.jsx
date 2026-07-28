import { motion } from "framer-motion";

export default function ModeSelector({ modes, currentMode, onModeChange }) {
  return (
    <div className="relative flex items-center gap-1 bg-[var(--background)] p-1.5 rounded-2xl border border-[var(--border)] self-start sm:self-auto">
      {modes.map((item) => {
        const IconComponent = item.icon;
        const isActive = currentMode === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onModeChange(item.id)}
            className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              isActive
                ? "text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--text)]"
            }`}
          >
            {/* Fond animé qui glisse d'un bouton à l'autre */}
            {isActive && (
              <motion.div
                layoutId="activeModeIndicator"
                className="absolute inset-0 bg-[var(--primary)] rounded-xl shadow-sm -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            {IconComponent && <IconComponent size={16} />}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}