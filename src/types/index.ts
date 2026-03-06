export type EventUrgency = 'critical' | 'soon' | 'upcoming' | 'distant';

export interface CountdownEvent {
  id: string;
  name: string;
  targetDate: string;
  description?: string;
  emoji?: string;
  createdAt: string;
}

export interface TimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}
