interface Props { onAdd: () => void; }

export function EmptyState({ onAdd }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-28 px-8 gap-4">
      {/* Pulsing rings */}
      <div className="relative w-28 h-28 flex items-center justify-center mb-2">
        {[60, 90, 112].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border border-border animate-ring-expand"
            style={{
              width: size, height: size,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
        <span className="text-3xl relative z-10">⏳</span>
      </div>

      <h2 className="font-display text-2xl font-medium text-text-primary tracking-tight">
        No events yet
      </h2>
      <p className="text-sm text-text-muted font-sans max-w-xs">
        Add your first countdown and start watching time move.
      </p>
      <button
        onClick={onAdd}
        className="mt-2 bg-accent text-bg font-semibold font-sans text-sm rounded-xl px-6 py-2.5 hover:opacity-90 hover:-translate-y-px active:translate-y-0 transition-all duration-150 shadow-accent-glow"
      >
        + Add Event
      </button>
    </div>
  );
}
