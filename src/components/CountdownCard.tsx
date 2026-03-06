import { useState } from 'react';
import { CountdownEvent } from '../types';
import { useTimer } from '../hooks/useTimer';
import { getUrgency, getRingProgress, formatDate, pad, URGENCY_COLOR, URGENCY_TEXT, URGENCY_LABEL, URGENCY_SHADOW, URGENCY_BORDER } from '../utils';
import { RingProgress } from './RingProgress';

interface Props {
  event: CountdownEvent;
  onEdit: (e: CountdownEvent) => void;
  onDelete: (id: string) => void;
  index: number;
}

export function CountdownCard({ event, onEdit, onDelete, index }: Props) {
  const time = useTimer(event.targetDate);
  const urgency = getUrgency(time.total, time.isPast);
  const progress = getRingProgress(event.createdAt, event.targetDate);
  const color = URGENCY_COLOR[urgency];
  const [confirmDelete, setConfirmDelete] = useState(false);

  const delayClass = ['delay-0','delay-60','delay-120','delay-180','delay-240','delay-300'][Math.min(index, 5)];

  return (
    <article
      className={`
        group relative bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3
        overflow-hidden animate-card-in ${delayClass}
        transition-all duration-250 hover:-translate-y-0.5
        ${URGENCY_SHADOW[urgency]} ${URGENCY_BORDER[urgency]}
      `}
    >
      {/* Ambient glow orb */}
      <div
        className={`absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none
          ${urgency === 'critical' ? 'animate-pulse-glow' : ''}`}
        style={{ background: `radial-gradient(circle, ${color}28, transparent 70%)` }}
      />

      {/* Header row */}
      <div className="flex items-start gap-2.5">
        <span className="text-2xl leading-none mt-0.5 shrink-0">{event.emoji ?? '📅'}</span>

        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <span className={`text-xs font-semibold font-sans uppercase tracking-wide ${URGENCY_TEXT[urgency]}`}>
            {time.isPast ? 'Past' : URGENCY_LABEL[urgency]}
          </span>
          <span className="text-xs text-text-muted font-sans">{formatDate(event.targetDate)}</span>
        </div>

        {/* Action buttons - fade in on hover */}
        <div className="flex gap-1.5 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(event)}
            title="Edit"
            className="bg-raised border border-border rounded-lg p-1.5 text-text-muted hover:text-text-primary hover:bg-border transition-all duration-150"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          {confirmDelete ? (
            <div className="flex gap-1">
              <button
                onClick={() => onDelete(event.id)}
                className="bg-raised border border-critical text-critical rounded-lg px-2 py-1 text-xs font-semibold font-sans transition-all duration-150 hover:bg-critical/10"
              >Yes</button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-raised border border-border text-text-muted rounded-lg px-2 py-1 text-xs font-sans hover:text-text-primary transition-all duration-150"
              >No</button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              title="Delete"
              className="bg-raised border border-border rounded-lg p-1.5 text-text-muted hover:text-critical hover:border-critical transition-all duration-150"
            >
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Title & description */}
      <div>
        <h3 className="font-display text-lg font-medium text-text-primary tracking-tight leading-snug">
          {event.name}
        </h3>
        {event.description && (
          <p className="text-xs text-text-muted font-sans mt-1 leading-relaxed line-clamp-2">
            {event.description}
          </p>
        )}
      </div>

      {/* Countdown display */}
      <div className="flex items-center gap-4 pt-3 border-t border-border">
        {/* Ring with days */}
        <div className="relative w-[72px] h-[72px] shrink-0">
          <RingProgress progress={progress} size={72} strokeWidth={3.5} color={color} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {time.isPast ? (
              <span className="text-[0.6rem] text-text-muted font-sans uppercase tracking-wider">Done</span>
            ) : (
              <>
                <span className="font-mono text-xl font-medium text-text-primary leading-none">{time.days}</span>
                <span className="text-[0.6rem] text-text-muted font-sans uppercase tracking-wider mt-0.5">days</span>
              </>
            )}
          </div>
        </div>

        {/* HMS */}
        {!time.isPast ? (
          <div className="flex items-center gap-1.5">
            {[
              { val: time.hours,   label: 'hr' },
              { val: time.minutes, label: 'min' },
              { val: time.seconds, label: 'sec', accent: true },
            ].map(({ val, label, accent }, i) => (
              <>
                {i > 0 && (
                  <span key={`sep-${label}`} className="font-mono text-lg text-text-muted/40 pb-3">:</span>
                )}
                <div key={label} className="flex flex-col items-center gap-0.5">
                  <span
                    className="font-mono text-xl font-normal leading-none"
                    style={accent ? { color } : undefined}
                  >
                    {pad(val)}
                  </span>
                  <span className="text-[0.58rem] text-text-muted font-sans uppercase tracking-wider">{label}</span>
                </div>
              </>
            ))}
          </div>
        ) : (
          <span className="text-sm text-text-muted font-sans italic">This event has passed</span>
        )}
      </div>
    </article>
  );
}
