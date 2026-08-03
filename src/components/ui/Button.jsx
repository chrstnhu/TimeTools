function Button({
  children,
  icon: Icon,
  variant = "primary",
  shape = "halfRounded", // "halfRounded", "rounded", "square", "circle"
  size = "md", // "sm", "md", "lg"
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]",
    secondary:
      "bg-[var(--surface)] border-2 text-[var(--text)] hover:bg-[var(--surface-hover)]",
    ghost:
      "bg-transparent border-2 border-[var(--text)] text-[var(--text)] hover:bg-[var(--primary)]/10",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
    warning:
      "bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30",
  };

  const sizes = {
    sm: {
      padding: shape === "circle" ? "p-2" : "px-3 py-1.5",
      text: "text-xs sm:text-sm",
    },
    md: {
      padding: shape === "circle" ? "p-3" : "px-4 sm:px-5 py-2 sm:py-2.5",
      text: "text-xs sm:text-base",
    },
    lg: {
      padding: shape === "circle" ? "p-4" : "px-6 py-3",
      text: "text-sm sm:text-lg",
    },
  };

  const shapes = {
    halfRounded: "rounded-2xl",
    rounded: "rounded-full",
    square: "rounded-lg",
    circle: "rounded-full aspect-square justify-center",
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 22,
  };

  const currentSize = sizes[size] || sizes.md;

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
        ${currentSize.text}
        ${currentSize.padding}
        ${variants[variant] || variants.primary}
        ${shapes[shape] || shapes.rounded}
        ${className}
      `}
    >
      {Icon && <Icon size={iconSizes[size] || 18} />}
      {shape !== "circle" && children}
    </button>
  );
}

export default Button;
