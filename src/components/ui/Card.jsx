function Card({ children, className = "" }) {
  return (
    <div
      className={`
        max-w-full
        p-4
        text-center
        rounded-2xl
        font-medium
        transition
        shadow-md
        text-[var(--text)]
        hover:shadow-lg
        ring-1 
        ring-[var(--foreground)]/10
        bg-[var(--background)]/80
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
