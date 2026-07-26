function Button({
  children,
  icon: Icon,
  variant = "primary",
  shape = "halfRounded", // "rounded", "square", "circle"
  size = "md", // "sm", "md", "lg"
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]",
    secondary:
      "bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-hover)]",
    ghost:
      "bg-transparent border-2 border-[var(--text)] text-[var(--text)] hover:bg-[var(--surface-hover)]",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
    warning:
      "bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30",
  };

  const shapes = {
    halfRounded: "rounded-2xl px-5 py-2.5", 
    rounded: "rounded-full px-5 py-2.5", 
    square: "rounded-lg px-4 py-2.5", 
    circle: "rounded-full p-3 aspect-square justify-center", 
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <button
      {...props}
      className={`
        flex flex-row
        items-center
        justify-center
        gap-2
        font-bold
        hover:scale-105
        hover:shadow-lg
        transition
        duration-300
        ${variants[variant] || variants.primary}
        ${shapes[shape] || shapes.rounded}
        ${className}
      `}
    >
      {Icon && <Icon size={iconSizes[size] || 20} />}
      {shape !== "circle" && children}
    </button>
  );
}

export default Button;
