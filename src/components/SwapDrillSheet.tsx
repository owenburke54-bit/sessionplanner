'use client';

import { useEffect, useState } from 'react';
import { Drill, SessionDrill } from '@/types';
import FieldDiagram from './FieldDiagram';
import DiagramViewer from './DiagramViewer';

interface Props {
  current: SessionDrill;
  alternatives: Drill[];
  onSwap: (drill: Drill) => void;
  onClose: () => void;
}

const SECTION_META: Record<string, { label: string; color: string; icon: string }> = {
  warmup:    { label: 'Warm-Up',    color: '#f59e0b', icon: '🔥' },
  technical: { label: 'Technical',  color: '#3b82f6', icon: '⚙️' },
  main:      { label: 'Main Drill', color: '#10b981', icon: '🎯' },
  game:      { label: 'Applied',    color: '#ef4444', icon: '⚽' },
  cooldown:  { label: 'Cool-Down',  color: '#a855f7', icon: '🧘' },
};

function AlternativeCard({
  drill,
  current,
  onSelect,
}: {
  drill: Drill;
  current: SessionDrill;
  onSelect: () => void;
}) {
  const [showDiagram, setShowDiagram] = useState(false);

  const equipLabels = drill.equipment.map((e) =>
    e.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  );

  return (
    <>
      <div className="bg-[#111827] border border-[#1a2340] rounded-2xl overflow-hidden">
        {/* Diagram — tappable */}
        <button
          onClick={() => setShowDiagram(true)}
          className="w-full relative"
          aria-label="Expand diagram"
        >
          <FieldDiagram type={drill.diagramType} className="w-full h-32" />
          <div className="absolute bottom-2 right-2 bg-black/50 rounded-lg px-1.5 py-0.5 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-[9px] text-white/70">expand</span>
          </div>
        </button>

        <div className="p-3">
          <h4 className="text-sm font-bold text-white leading-tight mb-2">{drill.title}</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3 line-clamp-2">
            {drill.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="text-[10px] text-slate-500 bg-[#1a2340] px-2 py-0.5 rounded-full">
              {drill.duration} min
            </span>
            <span className="text-[10px] text-slate-500 bg-[#1a2340] px-2 py-0.5 rounded-full">
              {drill.playersMin}–{drill.playersMax}p
            </span>
            <span className="text-[10px] text-slate-500 bg-[#1a2340] px-2 py-0.5 rounded-full capitalize">
              {drill.complexity}
            </span>
            {drill.soloFriendly && (
              <span className="text-[10px] text-blue-400/80 bg-blue-900/20 px-2 py-0.5 rounded-full">
                Solo OK
              </span>
            )}
          </div>

          {/* Equipment */}
          <div className="flex flex-wrap gap-1 mb-3">
            {equipLabels.slice(0, 3).map((e) => (
              <span key={e} className="text-[10px] text-emerald-400/70 bg-emerald-900/20 px-1.5 py-0.5 rounded">
                {e}
              </span>
            ))}
          </div>

          {/* Swap CTA */}
          <button
            onClick={onSelect}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Use This Drill
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

export default function SwapDrillSheet({ current, alternatives, onSwap, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const meta = SECTION_META[current.section];

  return (
    <div className="fixed inset-0 z-50 bg-[#080c18] animate-fade-in overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#080c18]/95 backdrop-blur-xl border-b border-[#1a2340]">
        <div className="max-w-[430px] mx-auto px-5 py-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                style={{ color: meta.color, backgroundColor: `${meta.color}18` }}
              >
                {meta.icon} {meta.label}
              </span>
            </div>
            <h2 className="text-base font-bold text-white leading-tight">Swap Drill</h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[240px]">
              Replacing: <span className="text-slate-400">{current.drill.title}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-full bg-[#1a2340] flex items-center justify-center text-slate-400 active:bg-[#252f48] mt-0.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[430px] mx-auto px-5 py-5 pb-10">
        {alternatives.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-[#0d1224] border border-[#1a2340] flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">No alternatives found</p>
            <p className="text-slate-600 text-xs leading-relaxed max-w-[200px] mx-auto">
              Try adjusting your player count or skill level to unlock more options.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-5 py-2.5 text-xs font-semibold text-slate-300 bg-[#0d1224] border border-[#1a2340] rounded-xl"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-600 mb-4">
              {alternatives.length} alternative{alternatives.length !== 1 ? 's' : ''} · tap a diagram to expand
            </p>
            <div className="space-y-4">
              {alternatives.map((drill) => (
                <AlternativeCard
                  key={drill.id}
                  drill={drill}
                  current={current}
                  onSelect={() => onSwap(drill)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
