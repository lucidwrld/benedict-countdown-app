import { useState, useEffect, useRef } from 'react';
import { CountdownEvent } from '../types';

const EMOJIS = ['🎯', '🎂', '🚀', '⚡', '🌟', '🎉', '🔥', '💡', '🏆', '📅', '💼', '🌙', '🎸', '🏖️', '✈️'];

interface Props {
  event?: CountdownEvent | null;
  onSave: (data: Omit<CountdownEvent, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

export function EventModal({ event, onSave, onClose }: Props) {
  const [name, setName] = useState(event?.name ?? '');
  const [targetDate, setTargetDate] = useState(() => {
    if (!event?.targetDate) return '';
    const d = new Date(event.targetDate);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  });
  const [description, setDescription] = useState(event?.description ?? '');
  const [emoji, setEmoji] = useState(event?.emoji ?? '🎯');
  const [errors, setErrors] = useState<{ name?: string; date?: string }>({});
  const [visible, setVisible] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    setTimeout(() => nameRef.current?.focus(), 80);
  }, []);

  const close = () => { setVisible(false); setTimeout(onClose, 220); };

  const submit = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Event name is required';
    if (!targetDate) e.date = 'Date is required';
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ name: name.trim(), targetDate: new Date(targetDate).toISOString(), description: description.trim() || undefined, emoji });
    close();
  };

  const inputBase = 'w-full bg-raised border border-border rounded-xl px-3.5 py-2.5 text-text-primary font-sans text-sm outline-none transition-all duration-150 focus:border-accent focus:ring-2 focus:ring-accent/20 placeholder:text-text-muted/50';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={e => e.target === e.currentTarget && close()}
    >
      <div className={`w-full max-w-md bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-250 ${visible ? 'animate-modal-in' : 'opacity-0 translate-y-4 scale-95'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-0">
          <h2 className="font-display text-xl font-medium text-text-primary tracking-tight">
            {event ? 'Edit Event' : 'New Event'}
          </h2>
          <button
            onClick={close}
            className="text-text-muted hover:text-text-primary hover:bg-border rounded-lg px-2 py-1 text-xl leading-none transition-colors duration-150"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 px-6 py-5">
          {/* Emoji picker */}
          <div className="flex flex-wrap gap-1.5">
            {EMOJIS.map(e => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all duration-150 hover:scale-110
                  ${emoji === e
                    ? 'border-2 border-accent bg-accent/15'
                    : 'bg-raised border-2 border-transparent'}`}
              >
                {e}
              </button>
            ))}
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text-muted text-xs font-semibold uppercase tracking-widest font-sans">Event Name</label>
            <input
              ref={nameRef}
              type="text"
              placeholder="e.g. Product Launch"
              value={name}
              onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
              onKeyDown={e => e.key === 'Enter' && submit()}
              className={`${inputBase} ${errors.name ? 'border-critical focus:border-critical focus:ring-critical/20' : ''}`}
            />
            {errors.name && <span className="text-critical text-xs font-sans">{errors.name}</span>}
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text-muted text-xs font-semibold uppercase tracking-widest font-sans">Date & Time</label>
            <input
              type="datetime-local"
              value={targetDate}
              onChange={e => { setTargetDate(e.target.value); setErrors(p => ({ ...p, date: undefined })); }}
              className={`${inputBase} ${errors.date ? 'border-critical focus:border-critical focus:ring-critical/20' : ''}`}
            />
            {errors.date && <span className="text-critical text-xs font-sans">{errors.date}</span>}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text-muted text-xs font-sans">
              <span className="font-semibold uppercase tracking-widest">Description</span>
              <span className="normal-case tracking-normal font-normal ml-1 opacity-60">optional</span>
            </label>
            <textarea
              placeholder="Add a note..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className={`${inputBase} resize-y min-h-18`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 justify-end px-6 pb-6">
          <button
            onClick={close}
            className="border border-border text-text-secondary hover:text-text-primary hover:border-text-secondary rounded-xl px-4 py-2 text-sm font-sans transition-all duration-150"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="bg-accent text-bg font-semibold font-sans text-sm rounded-xl px-5 py-2 hover:opacity-90 hover:-translate-y-px active:translate-y-0 transition-all duration-150 shadow-accent-glow"
          >
            {event ? 'Save Changes' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  );
}
