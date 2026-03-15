'use client';

import { useState, useMemo } from 'react';
import { drills } from '@/data/drills';
import { Drill, TrainingFocus } from '@/types';
import FieldDiagram from './FieldDiagram';
import DiagramViewer from './DiagramViewer';
import { FOCUS_ICONS } from './Icons';

// ── Colour + label maps ─────────────────────────────────────────────────────
const CATEGORY_META: Record<TrainingFocus, { label: string; color: string }> = {
  'possession':    { label: 'Possession',    color: '#3b82f6' },
  'finishing':     { label: 'Finishing',     color: '#ef4444' },
  'first-touch':   { label: 'First Touch',   color: '#a855f7' },
  'close-control': { label: 'Close Control', color: '#14b8a6' },
  'dribbling':     { label: 'Dribbling',     color: '#f59e0b' },
  'long-passing':  { label: 'Long Passing',  color: '#22c55e' },
  'small-sided':   { label: 'Small Sided',   color: '#ec4899' },
  'fitness':       { label: 'Fitness',       color: '#f97316' },
};

const ALL_CATEGORIES: TrainingFocus[] = [
  'possession', 'finishing', 'first-touch', 'close-control',
  'dribbling', 'long-passing', 'small-sided', 'fitness',
];

// ── Drill detail sheet ───────────────────────────────────────────────────────
function DrillDetailSheet({ drill, onClose }: { drill: Drill; onClose: () => void }) {
  const [showDiagram, setShowDiagram] = useState(false);
  const meta = CATEGORY_META[drill.category];
  const FocusIcon = FOCUS_ICONS[drill.category];
  const equipLabels = drill.equipment.map((e) =>
    e.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  );

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      <div
        className="relative w-full max-w-[430px] mx-auto bg-[#0d1224] border-t border-[#1a2340] rounded-t-3xl animate-slide-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-0">
          <div className="w-10 h-1 bg-[#1a2340] rounded-full" />
        </div>

        {/* Diagram — tappable */}
        <button
          onClick={(e) => { e.stopPropagation(); setShowDiagram(true); }}
          className="relative w-full mt-4 px-5 block"
        >
          <FieldDiagram type={drill.diagramType} className="w-full h-44 rounded-2xl" />
          <div className="absolute bottom-3 right-7 bg-black/50 rounded-lg px-2 py-1 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-[9px] text-white/70">expand</span>
          </div>
        </button>

        {/* Content */}
        <div className="px-5 pt-4 pb-10 overflow-y-auto max-h-[55vh]">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ color: meta.color, backgroundColor: `${meta.color}18` }}
            >
              <FocusIcon className="w-3.5 h-3.5" />
              {meta.label}
            </span>
            <span className="text-[11px] text-slate-500 bg-[#1a2340] px-2 py-0.5 rounded-full">
              {drill.duration} min
            </span>
            <span className="text-[11px] text-slate-500 bg-[#1a2340] px-2 py-0.5 rounded-full capitalize">
              {drill.complexity}
            </span>
            {drill.soloFriendly && (
              <span className="text-[11px] text-blue-400 bg-blue-900/20 border border-blue-800/30 px-2 py-0.5 rounded-full">
                Solo OK
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{drill.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-5">{drill.description}</p>

          {/* Detail grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {[
              { label: 'Players',    value: `${drill.playersMin}–${drill.playersMax}` },
              { label: 'Setup',      value: drill.setupSize },
              {
                label: 'Level',
                value: drill.skillLevels.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', '),
              },
              {
                label: 'Age Groups',
                value: drill.ageGroups.length === 5 ? 'All ages' : drill.ageGroups.map((a) => a.replace('-', '–')).join(', '),
              },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#111827] border border-[#1a2340] rounded-xl p-3">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-medium text-white mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {/* Equipment */}
          <div className="mb-5">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Equipment</p>
            <div className="flex flex-wrap gap-2">
              {equipLabels.map((e) => (
                <span
                  key={e}
                  className="text-xs text-emerald-400 bg-emerald-900/20 border border-emerald-800/30 px-2.5 py-1 rounded-full"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* Setup + Sequence */}
          {drill.setup && (
            <div className="mb-4 bg-[#111827] border border-[#1a2340] rounded-xl p-3">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Setup</p>
              <p className="text-xs text-slate-300 leading-relaxed">{drill.setup}</p>
            </div>
          )}
          {drill.sequence && (
            <div className="mb-4 bg-[#111827] border border-[#1a2340] rounded-xl p-3">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Sequence</p>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{drill.sequence}</p>
            </div>
          )}
          {drill.repScheme && (
            <div className="mb-4 bg-[#111827] border border-[#1a2340] rounded-xl p-3">
              <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider mb-1">Reps / Duration</p>
              <p className="text-xs text-slate-300 leading-relaxed">{drill.repScheme}</p>
            </div>
          )}
          {drill.progression && (
            <div className="mb-4 bg-[#111827] border border-[#1a2340] rounded-xl p-3">
              <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">Progression</p>
              <p className="text-xs text-slate-300 leading-relaxed">{drill.progression}</p>
            </div>
          )}

          {/* Coaching tip */}
          <div className="bg-amber-950/30 border border-amber-800/30 rounded-2xl p-4">
            <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5">
              Coaching Tip
            </p>
            <p className="text-sm text-amber-200/80 leading-relaxed">{drill.coachingTip}</p>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1a2340] flex items-center justify-center text-slate-400"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>

    {showDiagram && (
      <DiagramViewer
        type={drill.diagramType}
        title={drill.title}
        onClose={() => setShowDiagram(false)}
      />
    )}
    </>
  );
}

// ── Library card ─────────────────────────────────────────────────────────────
function LibraryCard({ drill, onClick }: { drill: Drill; onClick: () => void }) {
  const meta = CATEGORY_META[drill.category];
  const FocusIcon = FOCUS_ICONS[drill.category];

  return (
    <button
      onClick={onClick}
      className="flex flex-col bg-[#0d1224] border border-[#1a2340] rounded-2xl overflow-hidden active:scale-[0.98] transition-transform text-left"
    >
      <FieldDiagram type={drill.diagramType} className="w-full h-28" />
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
            style={{ color: meta.color, backgroundColor: `${meta.color}18` }}
          >
            <FocusIcon className="w-2.5 h-2.5" />
            {meta.label}
          </span>
        </div>
        <h4 className="text-sm font-bold text-white leading-tight line-clamp-2 min-h-[2.5rem]">{drill.title}</h4>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-[10px] text-slate-500">{drill.duration}m</span>
          <span className="text-[10px] text-slate-700">·</span>
          <span className="text-[10px] text-slate-500">{drill.playersMin}–{drill.playersMax}p</span>
          {drill.soloFriendly && (
            <>
              <span className="text-[10px] text-slate-700">·</span>
              <span className="text-[10px] text-blue-400/70">Solo</span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function DrillLibrary() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<TrainingFocus | 'all'>('all');
  const [selected, setSelected] = useState<Drill | null>(null);

  const filtered = useMemo(() => {
    let list = drills;
    if (activeCategory !== 'all') list = list.filter((d) => d.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [query, activeCategory]);

  return (
    <>
      <div className="pb-6">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#080c18]/95 backdrop-blur-xl border-b border-[#1a2340]">
          <div className="px-5 pt-4 pb-3">
            <h2 className="text-lg font-bold text-white">Drill Library</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {drills.length} drills across 8 categories
            </p>
          </div>

          {/* Search */}
          <div className="px-5 pb-3">
            <div className="flex items-center gap-2.5 bg-[#0d1224] border border-[#1a2340] rounded-xl px-3.5 py-2.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#475569" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search drills…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 px-5 pb-3 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === 'all'
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-[#0d1224] border-[#1a2340] text-slate-400'
              }`}
            >
              All
            </button>
            {ALL_CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              const active = activeCategory === cat;
              const FocusIcon = FOCUS_ICONS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all"
                  style={
                    active
                      ? { backgroundColor: `${meta.color}20`, borderColor: `${meta.color}55`, color: meta.color }
                      : { backgroundColor: '#0d1224', borderColor: '#1a2340', color: '#94a3b8' }
                  }
                >
                  <FocusIcon className="w-3 h-3" />
                  {meta.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-xs text-slate-600">
            {filtered.length} {filtered.length === 1 ? 'drill' : 'drills'}
            {query && <> matching &ldquo;{query}&rdquo;</>}
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 px-8">
            <p className="text-slate-500 text-sm">No drills found.</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('all'); }}
              className="mt-3 text-xs text-blue-400"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="px-5 grid grid-cols-2 gap-3">
            {filtered.map((drill) => (
              <LibraryCard key={drill.id} drill={drill} onClick={() => setSelected(drill)} />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <DrillDetailSheet drill={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
