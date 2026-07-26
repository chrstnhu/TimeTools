function Input({ type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      {...props}
      className={`
        ${className}
        m-2
        py-4
        px-4
        rounded-2xl
        font-medium
        transition
        shadow-md
        hover:shadow-lg
        bg-[var(--surface-input)]
        placeholder:text-gray-500
        outline-none
        transition-all
        duration-200
        focus:ring-2
        focus:ring-[var(--ring)]
        text-[var(--text)]
      `}
    />
  );
}

export default Input;
