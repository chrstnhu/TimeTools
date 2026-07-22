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
        bg-[var(--surface)]
        border
        border-gray-700
        placeholder:text-gray-500
        outline-none
        transition-all
        duration-200
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/30
        hover:border-gray-500
        ring-1
        ring-[var(--background)]/70
      `}
    />
  );
}

export default Input;
