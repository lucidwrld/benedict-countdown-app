import { useState } from 'react';
import { CountdownEvent } from './types';
import { useCountdowns } from './hooks/useCountdowns';
import { CountdownCard } from './components/CountdownCard';
import { EventModal } from './components/EventModal';
import { EmptyState } from './components/EmptyState';

type Sort = 'soonest' | 'recent' | 'name';

export default function App() {
  const { events, addEvent, updateEvent, deleteEvent } = useCountdowns() 
  const [showModal, setShowModal] = useState(false) 
  const [editing, setEditing] = useState<CountdownEvent | null>(null) 
  const [sort, setSort] = useState<Sort>('soonest') 

  const openCreate = () => { 
    setEditing(null)  
    setShowModal(true)  
  };
  const openEdit = (e: CountdownEvent) => { 
    setEditing(e) 
    setShowModal(true)  
  };
  const handleSave = (data: Omit<CountdownEvent, 'id' | 'createdAt'>) => {
    editing ? updateEvent(editing.id, data) : addEvent(data) 
  };

  const sorted = [...events].sort((a, b) =>
    sort === 'soonest' ? new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
    : sort === 'recent' ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    : a.name.localeCompare(b.name)
  ) 

  const sortLabels: { key: Sort; label: string }[] = [
    { key: 'soonest', label: 'Soonest' },
    { key: 'recent',  label: 'Recent'  },
    { key: 'name',    label: 'A–Z'     },
  ] 

  return (
    <div className="min-h-screen bg-bg relative">
      {/* Ambient background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-150 h-100 rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.06), transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-125 h-87.5 rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(96,165,250,0.05), transparent 70%)' }} />
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-border backdrop-blur-xl"
        style={{ background: 'rgba(15,15,16,0.8)' }}>
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Brand */}
           <span className="font-display text-accent text-xl font-semibold   tracking-tight">BCA</span>

          <div className="flex items-center gap-3">
            {/* Sort tabs */}
            {events.length > 0 && (
              <div className="flex bg-raised border border-border rounded-xl p-1 gap-0.5">
                {sortLabels.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setSort(key)}
                    className={`rounded-lg px-3 py-1.5 cursor-pointer text-xs font-sans transition-all duration-150
                      ${sort === key
                        ? 'bg-surface text-text-primary shadow-sm'
                        : 'text-text-muted hover:text-text-secondary'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* Add button */}
            <button
              onClick={openCreate}
              className="flex items-center cursor-pointer gap-1.5 bg-accent text-bg font-semibold font-sans text-sm rounded-xl px-4 py-2 hover:opacity-90 hover:-translate-y-px active:translate-y-0 transition-all duration-150 shadow-accent-glow hover:shadow-accent-glow-lg"
            >
              <span className="text-base leading-none">+</span> New Event
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8 pb-16">
        {events.length === 0 ? (
          <EmptyState onAdd={openCreate} />
        ) : (
          <>
            <p className="text-xs text-text-muted font-sans uppercase tracking-widest mb-5">
              {events.length} {events.length === 1 ? 'event' : 'events'} tracked
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sorted.map((event, i) => (
                <CountdownCard
                  key={event.id}
                  event={event}
                  onEdit={openEdit}
                  onDelete={deleteEvent}
                  index={i}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {showModal && (
        <EventModal
          event={editing}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditing(null); }}
        />
      )}
    </div>
  );
}
