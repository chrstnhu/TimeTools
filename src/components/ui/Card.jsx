function Card({ children }) {
  return (
    <div
      className={`
        px-4
        py-2
        mx-4
        rounded-lg
        font-medium
        transition
        shadow-md
        text-[var(--foreground)]
        hover:shadow-lg
        ring-1 
        ring-[var(--foreground)]/10
        bg-[var(--background)]/80
      `}
    >
      {children}
    </div>
  );
}

export default Card;