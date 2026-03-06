import { useState, useEffect } from 'react';
import { TimeRemaining } from '../types';

function calc(target: string): TimeRemaining {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  return {
    total: diff,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    isPast: false,
  };
}

export function useTimer(targetDate: string): TimeRemaining {
  const [time, setTime] = useState(() => calc(targetDate));
  useEffect(() => {
    setTime(calc(targetDate));
    const id = setInterval(() => setTime(calc(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}
