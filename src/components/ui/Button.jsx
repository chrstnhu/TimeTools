function Button({ children, icon: Icon, variant = "primary", ...props }) {

  const styles = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]",
    
    secondary:
      "bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
  };

  return (
    <button
        {...props}
        className={`
            flex flex-row
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            font-medium
            transition
            ${styles[variant]}
        `}
    >
      {Icon && <Icon size={16} />}
        {children}
    </button>
  );
}

export default Button;