function Button({ children, icon: Icon, variant = "primary", ...props }) {
  const styles = {
    primary:
      "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]",

    secondary:
      "bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-hover)]",

    ghost:
      "bg-transparent border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-hover)]",

    success: "bg-emerald-600 text-white hover:bg-emerald-700",
  };

  return (
    <button
      {...props}
      className={`
            flex flex-row
            items-center
            gap-3
            px-5
            py-2.5
            rounded-full
            font-bold
            transition
            ${styles[variant]}
        `}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}
export default Button;
