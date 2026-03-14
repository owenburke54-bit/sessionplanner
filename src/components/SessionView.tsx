'use client';

import { useState } from 'react';
import { Session, SessionDrill, SessionFormData, Drill } from '@/types';
import FieldDiagram from './FieldDiagram';
import SwapDrillSheet from './SwapDrillSheet';
import { alternativesFor } from '@/lib/sessionGenerator';

interface Props {
  session: Session | null;
  onUpdate: (session: Session) => void;
  onBuildNew: () => void;
}

// ── Label maps ──────────────────────────────────────────────────────────────
const SECTION_META: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  warmup: { label: 'Warm-Up', color: '#f59e0b', icon: '🔥' },
  technical: { label: 'Technical', color: '#3b82f6', icon: '⚙️' },
  main: { label: 'Main Drill', color: '#10b981', icon: '🎯' },
  game: { label: 'Applied Game', color: '#ef4444', icon: '⚽' },
  cooldown: { label: 'Cool-Down', color: '#a855f7', icon: '🧘' },
};

const FOCUS_LABELS: Record<string, string> = {
  possession: 'Possession',
  finishing: 'Finishing',
  'first-touch': 'First Touch',
  'close-control': 'Close Control',
  dribbling: 'Dribbling',
  'long-passing': 'Long Passing',
  'small-sided': 'Small Sided',
  fitness: 'Fitness',
};

const AGE_LABELS: Record<string, string> = {
  'u8-u10': 'U8–U10',
  'u11-u13': 'U11–U13',
  'u14-u16': 'U14–U16',
  'u17-u19': 'U17–U19',
  'college-adult': 'College / Adult',
};

const FIELD_LABELS: Record<string, string> = {
  'small-box': 'Small Box',
  'small-half': 'Small Half',
  'full-half': 'Full Half',
  'full-field': 'Full Field',
};

// ── Empty state ─────────────────────────────────────────────────────────────
function EmptySession({ onBuildNew }: { onBuildNew: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#0d1224] border border-[#1a2340] flex items-center justify-center mb-5 text-3xl">
        📋
      </div>
      <h3 className="text-lg font-bold text-white mb-2">No session yet</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-[240px]">
        Build your first training session to see it here.
      </p>
      <button
        onClick={onBuildNew}
        className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl transition-all active:scale-95"
      >
        Build Session
      </button>
    </div>
  );
}

// ── Drill Card ──────────────────────────────────────────────────────────────
function DrillCard({
  sd,
  onSwap,
  onRemove,
}: {
  sd: SessionDrill;
  onSwap: (sd: SessionDrill) => void;
  onRemove: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const { drill, duration, section } = sd;
  const meta = SECTION_META[section];

  const equipLabels = drill.equipment.map((e) =>
    e.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  );

  return (
    <div className="bg-[#0d1224] border border-[#1a2340] rounded-2xl overflow-hidden">
      {/* Section badge + header */}
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-0">
        <span className="text-sm">{meta.icon}</span>
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ color: meta.color, backgroundColor: `${meta.color}18` }}
        >
          {meta.label}
        </span>
        <span className="ml-auto text-xs font-bold text-white tabular-nums">
          {duration} min
        </span>
      </div>

      {/* Diagram + Info */}
      <div className="flex gap-3 p-4">
        <FieldDiagram
          type={drill.diagramType}
          className="w-28 h-20 shrink-0 rounded-xl"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white leading-tight">{drill.title}</h4>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className="text-[10px] text-slate-500 bg-[#1a2340] px-2 py-0.5 rounded-full">
              {drill.playersMin}–{drill.playersMax}p
            </span>
            <span className="text-[10px] text-slate-500 bg-[#1a2340] px-2 py-0.5 rounded-full">
              {drill.setupSize}
            </span>
          </div>
          {/* Equipment */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {equipLabels.slice(0, 3).map((e) => (
              <span key={e} className="text-[10px] text-emerald-400/70 bg-emerald-900/20 px-1.5 py-0.5 rounded">
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Expandable description */}
      {expanded && (
        <div className="px-4 pb-3 space-y-3 border-t border-[#1a2340] pt-3">
          <p className="text-xs text-slate-400 leading-relaxed">{drill.description}</p>
          {drill.coachingTip && (
            <div className="bg-amber-950/30 border border-amber-800/30 rounded-xl p-3">
              <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                💡 Coaching Tip
              </p>
              <p className="text-xs text-amber-200/80 leading-relaxed">{drill.coachingTip}</p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex border-t border-[#1a2340]">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex-1 py-3 text-xs font-medium text-slate-400 active:bg-white/5 transition-colors"
        >
          {expanded ? 'Less' : 'Details'}
        </button>
        <div className="w-px bg-[#1a2340]" />
        <button
          onClick={() => onSwap(sd)}
          className="flex-1 py-3 text-xs font-medium text-blue-400 active:bg-white/5 transition-colors"
        >
          Swap
        </button>
        <div className="w-px bg-[#1a2340]" />
        <button
          onClick={() => onRemove(sd.id)}
          className="flex-1 py-3 text-xs font-medium text-red-400/70 active:bg-white/5 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function SessionView({ session, onUpdate, onBuildNew }: Props) {
  const [swapping, setSwapping] = useState<SessionDrill | null>(null);

  if (!session) return <EmptySession onBuildNew={onBuildNew} />;

  const totalTime = session.drills.reduce((s, d) => s + d.duration, 0);

  const handleRemove = (id: string) => {
    const updated: Session = {
      ...session,
      drills: session.drills.filter((d) => d.id !== id),
      totalTime: session.drills
        .filter((d) => d.id !== id)
        .reduce((s, d) => s + d.duration, 0),
    };
    onUpdate(updated);
  };

  const handleSwap = (replacement: Drill) => {
    if (!swapping) return;
    const updated: Session = {
      ...session,
      drills: session.drills.map((d) =>
        d.id === swapping.id ? { ...d, drill: replacement } : d
      ),
    };
    onUpdate(updated);
    setSwapping(null);
  };

  const formData: SessionFormData = {
    ageGroup: session.ageGroup,
    skillLevel: session.skillLevel,
    playerCount: session.playerCount,
    fieldSize: session.fieldSize,
    sessionLength: session.sessionLength,
    focus: session.focus,
    equipment: session.equipment,
    sessionType: session.sessionType,
  };

  const getAlternatives = (sd: SessionDrill) =>
    alternativesFor(sd.drill.id, formData, sd.section);

  return (
    <>
      <div className="pb-6">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#080c18]/95 backdrop-blur-xl border-b border-[#1a2340]">
          <div className="px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Your Session</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {FOCUS_LABELS[session.focus]} · {AGE_LABELS[session.ageGroup]}
                </p>
              </div>
              <button
                onClick={onBuildNew}
                className="px-3.5 py-2 text-xs font-semibold text-blue-400 bg-blue-600/10 border border-blue-600/20 rounded-xl active:bg-blue-600/20 transition-colors"
              >
                New Session
              </button>
            </div>
          </div>

          {/* Session stats */}
          <div className="flex border-t border-[#1a2340]">
            {[
              { label: 'Duration', value: `${totalTime} min` },
              { label: 'Players', value: String(session.playerCount) },
              { label: 'Field', value: FIELD_LABELS[session.fieldSize] },
              { label: 'Level', value: session.skillLevel.charAt(0).toUpperCase() + session.skillLevel.slice(1) },
            ].map(({ label, value }) => (
              <div key={label} className="flex-1 text-center py-3 border-r border-[#1a2340] last:border-r-0">
                <p className="text-xs font-bold text-white">{value}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Drill cards */}
        <div className="px-5 pt-5 space-y-3">
          {session.drills.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-sm">All drills removed.</p>
              <button
                onClick={onBuildNew}
                className="mt-4 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl"
              >
                Rebuild Session
              </button>
            </div>
          ) : (
            session.drills.map((sd) => (
              <DrillCard
                key={sd.id}
                sd={sd}
                onSwap={setSwapping}
                onRemove={handleRemove}
              />
            ))
          )}
        </div>

        {/* Time summary */}
        {session.drills.length > 0 && (
          <div className="mx-5 mt-4 p-4 bg-[#0d1224] border border-[#1a2340] rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Total session time</span>
              <span className="text-base font-bold text-white">{totalTime} min</span>
            </div>
            {/* Mini timeline */}
            <div className="flex gap-0.5 mt-3 h-2 rounded-full overflow-hidden">
              {session.drills.map((sd) => (
                <div
                  key={sd.id}
                  style={{
                    flex: sd.duration,
                    backgroundColor: SECTION_META[sd.section]?.color ?? '#3b82f6',
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2.5">
              {session.drills.map((sd) => (
                <div key={sd.id} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: SECTION_META[sd.section]?.color ?? '#3b82f6' }}
                  />
                  <span className="text-[10px] text-slate-500">
                    {SECTION_META[sd.section]?.label} ({sd.duration}m)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Swap sheet */}
      {swapping && (
        <SwapDrillSheet
          current={swapping}
          alternatives={getAlternatives(swapping)}
          onSwap={handleSwap}
          onClose={() => setSwapping(null)}
        />
      )}
    </>
  );
}
