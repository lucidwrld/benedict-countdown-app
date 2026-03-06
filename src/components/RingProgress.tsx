interface RingProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color: string;
}

export function RingProgress({ progress, size = 72, strokeWidth = 3.5, color }: RingProgressProps) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(progress, 1));

  return (
    <svg
      width={size}
      height={size}
      className="shrink-0"
      style={{ transform: 'rotate(-90deg)' }}
    >
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }}
      />
    </svg>
  );
}
