export function BadgeSeal({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={`relative flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-[#a04c2d] bg-[#f4d9b7] text-center font-semibold uppercase tracking-wide text-[#5c2e1a] shadow-[0_12px_0_rgba(140,63,31,0.3)] ${className ?? ""}`}
    >
      <span className="text-xs leading-tight">{text}</span>
      <div className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-[#b15a30]" />
    </div>
  );
}
