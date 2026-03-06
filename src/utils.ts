import { EventUrgency } from './types';

export function getUrgency(totalMs: number, isPast: boolean): EventUrgency {
  if (isPast) return 'critical';
  const days = totalMs / 86400000;
  if (days <= 3) return 'critical';
  if (days <= 14) return 'soon';
  if (days <= 60) return 'upcoming';
  return 'distant';
}

export function getRingProgress(createdAt: string, targetDate: string): number {
  const total = new Date(targetDate).getTime() - new Date(createdAt).getTime();
  if (total <= 0) return 1;
  return Math.min(Math.max((Date.now() - new Date(createdAt).getTime()) / total, 0), 1);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
}

export const pad = (n: number) => String(n).padStart(2, '0');

export const URGENCY_COLOR: Record<EventUrgency, string> = {
  critical: '#ff4d4d',
  soon: '#f59e0b',
  upcoming: '#34d399',
  distant: '#60a5fa',
};

// Tailwind text color classes per urgency
export const URGENCY_TEXT: Record<EventUrgency, string> = {
  critical: 'text-critical',
  soon: 'text-soon',
  upcoming: 'text-upcoming',
  distant: 'text-distant',
};

// Tailwind shadow classes per urgency (used on hover)
export const URGENCY_SHADOW: Record<EventUrgency, string> = {
  critical: 'hover:shadow-critical-glow',
  soon: 'hover:shadow-soon-glow',
  upcoming: 'hover:shadow-upcoming-glow',
  distant: 'hover:shadow-distant-glow',
};

export const URGENCY_BORDER: Record<EventUrgency, string> = {
  critical: 'hover:border-critical',
  soon: 'hover:border-soon',
  upcoming: 'hover:border-upcoming',
  distant: 'hover:border-distant',
};

export const URGENCY_LABEL: Record<EventUrgency, string> = {
  critical: ' Critical',
  soon: 'Soon',
  upcoming: 'Upcoming',
  distant: 'Horizon',
};
