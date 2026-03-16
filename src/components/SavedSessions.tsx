'use client';

import { PlannedSession } from '@/types';
import { useSavedSessions } from '@/hooks/useSavedSessions';

interface Props {
  onLoad: (session: PlannedSession) => void;
}

const FOCUS_LABELS: Record<string, string> = {
  'possession':    'Possession',
  'finishing':     'Finishing',
  'first-touch':   'First Touch',
  'close-control': 'Close Control',
  'dribbling':     'Dribbling',
  'long-passing':  'Long Passing',
  'small-sided':   'Small Sided',
  'fitness':       'Fitness',
  'juggling':      'Juggling',
  'goalkeeper':    'Goalkeeper',
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return '';
  }
}

export default function SavedSessions({ onLoad }: Props) {
  const { sessions, remove } = useSavedSessions();

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#0d1224] border border-[#1a2340] flex items-center justify-center mb-5">
          <svg
            width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="#475569" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No saved sessions</h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-[240px]">
          Build a session and tap &ldquo;Save Session&rdquo; to store it here.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#080c18]/95 backdrop-blur-xl border-b border-[#1a2340] px-5 py-4">
        <h2 className="text-lg font-bold text-white">Saved Sessions</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {sessions.length} session{sessions.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      <div className="px-5 pt-5 space-y-3">
        {sessions.map((s) => (
          <div key={s.id} className="bg-[#0d1224] border border-[#1a2340] rounded-2xl overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white leading-tight">{s.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{formatDate(s.createdAt)}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.focuses.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] text-blue-400/80 bg-blue-900/20 px-2 py-0.5 rounded-full"
                      >
                        {FOCUS_LABELS[f] ?? f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-bold text-white">{s.totalTime}m</p>
                  <p className="text-[10px] text-slate-600">{s.playerCount}p</p>
                </div>
              </div>
            </div>
            <div className="flex border-t border-[#1a2340]">
              <button
                onClick={() => onLoad(s)}
                className="flex-1 py-3 text-xs font-semibold text-blue-400 active:bg-white/5 transition-colors"
              >
                Load Session
              </button>
              <div className="w-px bg-[#1a2340]" />
              <button
                onClick={() => remove(s.id)}
                className="flex-1 py-3 text-xs font-medium text-red-400/70 active:bg-white/5 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
