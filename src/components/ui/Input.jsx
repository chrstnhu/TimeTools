function Input({ type = "text", ...props }) {
  return (
    <input
      type={type}
      {...props}
      className="
        m-2
        py-4
        px-4
        rounded-lg
        font-medium
        transition
        shadow-md
        hover:shadow-lg
        bg-[var(--surface)]
        ring-1
        ring-[var(--background)]/70
      "
    />
  );
}

export default Input;