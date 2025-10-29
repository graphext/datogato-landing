export function BadgeSeal({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={`relative flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-[var(--accent)] bg-badge text-center font-semibold uppercase tracking-wide text-foreground shadow-[0_12px_0_var(--shadow-strong)] ${className ?? ""}`}
    >
      <span className="text-xs leading-tight">{text}</span>
      <div className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-theme-dark" />
    </div>
  );
}
