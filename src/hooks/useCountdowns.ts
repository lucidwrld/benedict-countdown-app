import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CountdownEvent } from '../types';

const KEY = 'bca_events_v1';

const load = (): CountdownEvent[] => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
};
const persist = (e: CountdownEvent[]) => localStorage.setItem(KEY, JSON.stringify(e));

export function useCountdowns() {
  const [events, setEvents] = useState<CountdownEvent[]>(load);

  const addEvent = useCallback((data: Omit<CountdownEvent, 'id' | 'createdAt'>) => {
    const ev: CountdownEvent = { ...data, id: uuidv4(), createdAt: new Date().toISOString() };
    setEvents(prev => { const next = [ev, ...prev]; persist(next); return next; });
  }, []);

  const updateEvent = useCallback((id: string, data: Partial<Omit<CountdownEvent, 'id' | 'createdAt'>>) => {
    setEvents(prev => { const next = prev.map(e => e.id === id ? { ...e, ...data } : e); persist(next); return next; });
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => { const next = prev.filter(e => e.id !== id); persist(next); return next; });
  }, []);

  return { events, addEvent, updateEvent, deleteEvent };
}
